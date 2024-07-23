import { IBagInfoElement } from "../../config/BagInfo";
import { GameConfig } from "../../config/GameConfig";
import { MapEx } from "../../Tools/MapEx";
import BagInfoPanel_Generate from "../../ui-generate/module/BagModule/BagInfoPanel_generate";
import BagItem_Generate from "../../ui-generate/module/BagModule/BagItem_generate";
import BagPanel_Generate from "../../ui-generate/module/BagModule/BagPanel_generate";
import BagTab_Generate from "../../ui-generate/module/BagModule/BagTab_generate";
import HUDModuleC from "../HUDModule/HUDModuleC";

/**
0-黄阶-213189
1-玄阶-213181
2-地阶-213190
3-天阶-213187
 */
const bagItemBgIcons: string[] = ["213189", "213181", "213190", "213187"];
const bagItemGoEffect: string[] = ["311092", "311092", "311092", "311092"];

export class BagData extends Subdata {
    @Decorator.persistence()
    public bagIds: number[] = [];
    @Decorator.persistence()
    public usingBagIds: MapEx.MapExClass<number> = {};

    public setBagId(bagId: number): void {
        if (!this.bagIds.includes(bagId)) {
            this.bagIds.push(bagId);
        }
        this.save(true);
    }

    public setUsingBagId(key: number, bagId: number): void {
        MapEx.set(this.usingBagIds, key, bagId);
        this.save(true);
    }
}


export class BagModuleC extends ModuleC<BagModuleS, BagData> {
    private hudModuleC: HUDModuleC = null;
    private get getHUDModuleC(): HUDModuleC {
        if (!this.hudModuleC) {
            this.hudModuleC = ModuleService.getModule(HUDModuleC);
        }
        return this.hudModuleC;
    }

    private bagInfoPanel: BagInfoPanel = null;
    private get getBagInfoPanel(): BagInfoPanel {
        if (!this.bagInfoPanel) {
            this.bagInfoPanel = mw.UIService.create(BagInfoPanel);
        }
        return this.bagInfoPanel;
    }

    private bagPanel: BagPanel = null;
    private get getBagPanel(): BagPanel {
        if (!this.bagPanel) {
            this.bagPanel = mw.UIService.getUI(BagPanel);
        }
        return this.bagPanel;
    }

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        this.getHUDModuleC.onOpenShopAction.add(() => {
            this.getBagPanel.show();
        });
    }

    protected onEnterScene(sceneType: number): void {
        this.initBagData();
        this.initTrigger();
    }

    private bagIds: number[] = [];
    private usingBagIds: MapEx.MapExClass<number> = {};
    private initBagData(): void {
        this.bagIds = this.data.bagIds;
        this.usingBagIds = this.data.usingBagIds;
    }

    public isHasBagId(bagId: number): boolean {
        return this.bagIds.includes(bagId);
    }

    public setBagId(bagId: number): void {
        if (this.bagIds.includes(bagId)) {
            //Has
            return;
        }
        this.bagIds.push(bagId);
        this.server.net_setBagId(bagId);
    }

    public setUsingBagId(bagId: number): void {
        let key = (Math.floor(bagId / 10000)) - 1;
        MapEx.set(this.usingBagIds, key, bagId);
        this.server.net_setUsingBagId(key, bagId);
    }

    public clickBagItem(bagId: number, buyComplete: () => void): void {
        let isHas = this.isHasBagId(bagId);
        this.getBagInfoPanel.showThis(bagId, isHas, () => {
            if (isHas) {
                //Use
            } else {
                //Tips
                //Ads Find
            }
        }, () => {
            let price = GameConfig.BagInfo.getElement(bagId)?.Price;
            let hasCoin = 0;
            if (hasCoin >= price) {
                this.setBagId(bagId);
                if (buyComplete) buyComplete();
                //Tips -Geted
            } else {
                //Tips
                //弹窗
            }
        }, () => {
            //Find
        });
    }

    private isInitComplete: boolean = false;
    private async initTrigger(): Promise<void> {
        let parentTrigger = await mw.GameObject.asyncFindGameObjectById("2285B717");
        await parentTrigger.asyncReady();
        parentTrigger.getChildren().forEach(async (value: mw.GameObject) => {
            if (!(value instanceof mw.Trigger)) return;
            let bagId = Number(value.name.split(`-`)[1]);
            if (isNaN(bagId) || bagId < 0) return;
            let isInitItemSuccessfully = await this.isInitItemSuccessfully(bagId, value.worldTransform.position);
            if (!isInitItemSuccessfully) return;
            value.onEnter.add((gameObject: mw.GameObject) => {
                this.onEnterTrigger(gameObject, bagId);
            });
        });
        this.isInitComplete = true;
    }

    private onEnterTrigger(go: mw.GameObject, bagId: number): void {
        if (!(go instanceof mw.Character)) return;
        if (go.gameObjectId != this.localPlayer.character.gameObjectId) return;
        this.setBagId(bagId);
    }

    private bagItemMap: Map<number, { go: mw.Model, effectId: number }> = new Map<number, { go: mw.Model, effectId: number }>();
    private async isInitItemSuccessfully(bagId: number, loc: mw.Vector): Promise<boolean> {
        let bagInfoElement = GameConfig.BagInfo.getElement(bagId);
        if (!bagInfoElement) return false;
        let assetId = bagInfoElement?.AssetId;
        if (!assetId || assetId == "") return false;

        let bagItemGo = await GameObjPool.asyncSpawn(assetId) as mw.Model;
        if (!(bagItemGo instanceof mw.Character)) bagItemGo.collisionEnabled = false;
        bagItemGo.worldTransform.position = loc;

        let effectId = EffectService.playAtPosition(bagItemGoEffect[bagInfoElement?.Rarity], loc, { loopCount: 0 });

        this.bagItemMap.set(bagId, { go: bagItemGo, effectId: effectId });
        return true;
    }

    private recycleItem(bagId: number): void {
        if (!this.bagItemMap.has(bagId)) return;
        GameObjPool.despawn(this.bagItemMap.get(bagId)?.go);
        EffectService.stop(this.bagItemMap.get(bagId)?.effectId);
    }

    protected onUpdate(dt: number): void {
        this.setBagItemRot(dt);
    }

    private setBagItemRot(dt: number): void {
        if (!this.isInitComplete) return;
        this.bagItemMap.forEach((value: { go: mw.GameObject, effectId: number }, key: number) => {
            value.go.worldTransform.rotation = new mw.Rotation(0, 0, value.go.worldTransform.rotation.z + dt * 50);
        });
    }
}

export class BagModuleS extends ModuleS<BagModuleC, BagData> {

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {

    }

    public net_setBagId(bagId: number): void {
        this.currentData.setBagId(bagId);
    }

    public net_setUsingBagId(key: number, bagId: number): void {
        this.currentData.setUsingBagId(key, bagId);
    }
}

export class BagPanel extends BagPanel_Generate {

    protected onStart(): void {
        this.initTab();
        this.initBagData();
    }

    private bagTabs: BagTab[] = [];
    private initTab(): void {
        let tabNames = GameConfig.BagInfo.getElement(1).Name.split(`|`);
        for (let i = 0; i < tabNames.length; ++i) {
            let bagTab = mw.UIService.create(BagTab);
            bagTab.setData(tabNames[i]);
            bagTab.mButton.onClicked.add(() => { this.bindBagTabButton(i) });
            this.mTabContentCanvas.addChild(bagTab.uiObject);
            this.bagTabs.push(bagTab);
        }
    }

    private currentBagTabIndex: number = -1;
    private bindBagTabButton(index: number): void {
        if (this.currentBagTabIndex == index) return;
        if (this.currentBagTabIndex != -1) {
            this.bagTabs[this.currentBagTabIndex].unSelect();
        }
        this.currentBagTabIndex = index;
        this.bagTabs[this.currentBagTabIndex].select();
        this.initBagItem();
    }

    private bagIdsMap: Map<number, number[]> = new Map<number, number[]>();
    private initBagData(): void {
        this.bagIdsMap.clear();
        GameConfig.BagInfo.getAllElement().forEach((value: IBagInfoElement) => {
            let key = (Math.floor(value.ID / 10000)) - 1;
            if (key < 0) return;
            console.error(`key:${key}`);
            if (this.bagIdsMap.has(key)) {
                this.bagIdsMap.get(key)?.push(value.ID);
            } else {
                this.bagIdsMap.set(key, [value.ID]);
            }
        });
        this.bindBagTabButton(0);
    }

    private bagItems: BagItem[] = [];
    private initBagItem(): void {
        if (!this.bagIdsMap.has(this.currentBagTabIndex)) return;
        let bagIds = this.bagIdsMap.get(this.currentBagTabIndex);
        if (bagIds.length >= this.bagItems.length) {
            for (let i = 0; i < this.bagItems.length; ++i) {
                this.bagItems[i].setData(bagIds[i]);
                this.bagItems[i].uiObject.visibility = mw.SlateVisibility.SelfHitTestInvisible;
            }
            for (let i = this.bagItems.length; i < bagIds.length; ++i) {
                let bagItem = mw.UIService.create(BagItem);
                this.mContentCanvas.addChild(bagItem.uiObject);
                bagItem.setData(bagIds[i]);
                this.bagItems.push(bagItem);
            }
        } else {
            for (let i = 0; i < bagIds.length; ++i) {
                this.bagItems[i].setData(bagIds[i]);
                this.bagItems[i].uiObject.visibility = mw.SlateVisibility.SelfHitTestInvisible;
            }
            for (let i = bagIds.length; i < this.bagItems.length; ++i) {
                this.bagItems[i].uiObject.visibility = mw.SlateVisibility.Collapsed;
            }
        }
    }

    public show(...param): void {
        mw.UIService.showUI(this, this.layer, ...param);
    }

    public hide(): void {
        mw.UIService.hideUI(this);
    }
}

export class BagItem extends BagItem_Generate {
    private bagModuleC: BagModuleC = null;
    private get getBagModuleC(): BagModuleC {
        if (!this.bagModuleC) {
            this.bagModuleC = ModuleService.getModule(BagModuleC);
        }
        return this.bagModuleC;
    }

    protected onStart(): void {
        this.bindButton();
    }

    private bindButton(): void {
        this.mClickButton.onClicked.add(this.bindClickButton.bind(this));
    }

    private bindClickButton(): void {
        this.getBagModuleC.clickBagItem(this.bagId, this.setHas.bind(this));
    }

    private bagId: number = -1;
    public setData(bagId: number): void {
        this.bagId = bagId;
        let bagInfoElement = GameConfig.BagInfo.getElement(bagId);
        if (!bagInfoElement) return;
        this.setHas();
        this.setName(bagInfoElement.Name);
        this.setBgIcon(bagInfoElement.Rarity);
        this.setIconImage(bagInfoElement.AssetId);
    }

    private setName(name: string): void {
        this.mNameTextBlock.text = name;
    }

    private setHas(): void {
        this.mHasTextBlock.text = this.getBagModuleC.isHasBagId(this.bagId) ? "点击使用" : "点击获得";
    }

    private setIconImage(assetId: string): void {
        mw.assetIDChangeIconUrlRequest([assetId]).then(() => {
            try {
                let assetIconData = mw.getAssetIconDataByAssetID(assetId);
                this.mIconImage.setImageByAssetIconData(assetIconData);
            } catch (error) { }
        });
    }

    private setBgIcon(rarity: number): void {
        this.mBgImage.imageGuid = bagItemBgIcons[rarity];
    }
}

export class BagTab extends BagTab_Generate {
    protected onStart(): void {
    }

    public setData(name: string): void {
        this.mTextBlock.text = name;
    }

    public select(): void {
        this.uiObject.size = new mw.Vector2(300, 150);
        this.mButton.normalImageGuid = "100705";
        this.mButton.pressedImageGuid = "100705";
    }

    public unSelect(): void {
        this.uiObject.size = new mw.Vector2(250, 125);
        this.mButton.normalImageGuid = "100707";
        this.mButton.pressedImageGuid = "100707";
    }
}

export class BagInfoPanel extends BagInfoPanel_Generate {
    protected onStart(): void {
        this.bindButton();
    }

    private bindButton(): void {
        this.mUseButton.onClicked.add(this.addUseButton.bind(this));
        this.mPriceButton.onClicked.add(this.addPriceButton.bind(this));
        this.mAdsButton.onClose.add(this.addAdsButton.bind(this));
        this.mCloseButton.onClicked.add(this.bindCloseButton.bind(this));
    }

    private addUseButton(): void {
        if (this.useCallBack) this.useCallBack();
        this.hide();
    }

    private addPriceButton(): void {
        this.hide();
        if (this.priceCallBack) this.priceCallBack();
    }

    private addAdsButton(isSuccess: boolean): void {
        this.hide();
        if (!isSuccess) {
            return;
        }
        if (this.adsCallBack) this.adsCallBack();
    }

    private bindCloseButton(): void {
        this.hide();
    }

    private bagId: number = -1;
    private isHas: boolean = false;
    private useCallBack: () => void = null;
    private priceCallBack: () => void = null;
    private adsCallBack: () => void = null;
    public showThis(bagId: number, isHas: boolean, useCallBack: () => void, preceCallBack: () => void, adsCallBack: () => void): void {
        this.bagId = bagId;
        this.isHas = isHas;
        this.setUI();
        this.useCallBack = useCallBack;
        this.priceCallBack = preceCallBack;
        this.adsCallBack = adsCallBack;
    }

    private setUI(): void {
        if (this.isHas) {
            this.mPriceButton.visibility = mw.SlateVisibility.Collapsed;
            this.mAdsButton.visibility = mw.SlateVisibility.Collapsed;
        } else {
            this.mPriceButton.visibility = mw.SlateVisibility.Visible;
            this.mAdsButton.visibility = mw.SlateVisibility.Visible;
        }
        let bagInfoElement = GameConfig.BagInfo.getElement(this.bagId);
        this.mTitleTextBlock.text = bagInfoElement?.Name;
        this.mNameTextBlock.text = bagInfoElement?.Name;
        let assetId = bagInfoElement?.AssetId;
        mw.assetIDChangeIconUrlRequest([assetId]).then(() => {
            try {
                let assetIconData = mw.getAssetIconDataByAssetID(assetId);
                this.mIconImage.setImageByAssetIconData(assetIconData);
            } catch (error) { }
        });
    }

    protected onHide(): void {
        this.useCallBack = null;
        this.priceCallBack = null;
        this.adsCallBack = null;
    }

    public show(...param): void {
        mw.UIService.showUI(this, this.layer, ...param);
    }

    public hide(): void {
        mw.UIService.hideUI(this);
    }
}