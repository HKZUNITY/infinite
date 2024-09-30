import { Notice } from "../../common/notice/Notice";
import GlobalData from "../../const/GlobalData";
import { Utils } from "../../Tools/utils";
import SwordItem_Generate from "../../ui-generate/module/FlyModule/SwordItem_generate";
import SwordPanel_Generate from "../../ui-generate/module/FlyModule/SwordPanel_generate";
import SwordTipsPanel_Generate from "../../ui-generate/module/FlyModule/SwordTipsPanel_generate";
import AdTipsPanel from "../AdsModule/ui/AdTipsPanel";
import HUDModuleC from "../HUDModule/HUDModuleC";
import HUDPanel from "../HUDModule/ui/HUDPanel";
import { LevelItem } from "../LevelModule/LevelModule";
import PlayerModuleC from "../PlayerModule/PlayerModuleC";
import PlayerModuleS from "../PlayerModule/PlayerModuleS";

export class SwordTipsPanel extends SwordTipsPanel_Generate {
    protected onStart(): void {
        this.initUI();
        this.bindButton();
    }

    private initUI(): void {
        this.mArkTextBlock.text = `派队币购买`;
        this.mDiamondTextBlock.text = `钻石购买`;
    }

    private bindButton(): void {
        this.mCloseButton.onClicked.add(this.addClickButton.bind(this));
        this.mArkButton.onClicked.add(this.addArkButton.bind(this));
        this.mDiamondButton.onClicked.add(this.addDiamondButton.bind(this));
    }

    private addClickButton(): void {
        this.hide();
        if (this.closeCallBack) this.closeCallBack();
    }

    private addArkButton(): void {
        if (this.arkCallBack) this.arkCallBack();
    }

    private addDiamondButton(): void {
        if (this.diamondCallBack) this.diamondCallBack();
    }

    private arkCallBack: () => void = null;
    private diamondCallBack: () => void = null;
    private closeCallBack: () => void = null;
    public showPanel(key: number, arkCallBack: () => void, diamondCallBack: () => void, closeCallBack: () => void): void {
        let swordData = swordDataMap.get(key);
        if (swordData.diamond <= 0) {
            this.mContentTextBlock.text = `消耗 ${swordData.ark}派队币`;
            this.mDiamondButton.visibility = mw.SlateVisibility.Collapsed;
        } else {
            this.mContentTextBlock.text = `消耗 ${swordData.diamond}钻石 或\n消耗 ${swordData.ark}派队币`;
            this.mDiamondButton.visibility = mw.SlateVisibility.Visible;
        }
        this.arkCallBack = arkCallBack;
        this.diamondCallBack = diamondCallBack;
        this.closeCallBack = closeCallBack;
        this.show();
    }
}

export class SwordItem extends SwordItem_Generate {
    private flyModuleC: FlyModuleC = null;
    private get getFlyModuleC(): FlyModuleC {
        if (!this.flyModuleC) {
            this.flyModuleC = ModuleService.getModule(FlyModuleC);
        }
        return this.flyModuleC;
    }

    protected onStart(): void {
        this.initUI();
        this.bindButton();
    }

    private initUI(): void {
        this.mDiamondIconImage.imageGuid = GlobalData.diamondIcon;
        this.mArkIconImage.imageGuid = GlobalData.arkIcon;
        this.mHasTextBlock.text = `点击获得`;
    }

    private bindButton(): void {
        this.mClickButton.onClicked.add(this.addClickButton.bind(this));
    }

    private addClickButton(): void {
        this.getFlyModuleC.clickSwordItem(this.key, () => {
            this.buyComplete();
        });
    }

    private key: number = 0;
    public initItem(key: number): void {
        this.key = key;
        let swordData: SwordData = swordDataMap.get(this.key);
        let iconStr = swordData.icon.split(`_`);
        if (iconStr[0] == `mode`) {
            Utils.setImageByAssetIconData(this.mIconImage, iconStr[1]);
        } else if (iconStr[0] == `icon`) {
            this.mIconImage.imageGuid = iconStr[1];
        }
        this.mNameTextBlock.text = swordData.name;
        if (swordData.diamond <= 0) {
            this.mDiamondCanvas.visibility = mw.SlateVisibility.Collapsed;
            this.mIconImage.position = new mw.Vector2(7, 42);
            this.mIconImage.size = new mw.Vector2(210, 210);
        } else {
            this.mDiamondTextBlock.text = `${swordData.diamond}`;
            this.mDiamondCanvas.visibility = mw.SlateVisibility.SelfHitTestInvisible;
        }
        this.mArkTextBlock.text = `${swordData.ark}`;

        this.refreshUI();
    }

    private refreshUI(): void {
        if (this.getFlyModuleC.isHasSwordId(this.key)) {
            this.buyComplete();
        } else {
            this.mHasCanvas.visibility = mw.SlateVisibility.SelfHitTestInvisible;
        }
    }

    private buyComplete(): void {
        this.mHasCanvas.visibility = mw.SlateVisibility.Collapsed;
        this.mDiamondCanvas.visibility = mw.SlateVisibility.Collapsed;
        this.mArkIconImage.visibility = mw.SlateVisibility.Collapsed;
        this.mArkTextBlock.text = `点击使用`;
        this.mArkTextBlock.textHorizontalLayout = mw.UITextHorizontalLayout.NoClipping;
        this.mArkTextBlock.textAlign = mw.TextJustify.Right;

        this.mIconImage.position = new mw.Vector2(7, 42);
        this.mIconImage.size = new mw.Vector2(210, 210);
    }
}

export class SwordPanel extends SwordPanel_Generate {
    private hudPanel: HUDPanel = null;
    private get getHudPanel(): HUDPanel {
        if (!this.hudPanel) {
            this.hudPanel = mw.UIService.getUI(HUDPanel);
        }
        return this.hudPanel
    }
    protected onStart(): void {
        this.initUI();
        this.bindButton();
    }

    private initUI(): void {
        this.mTitleTextBlock.text = "御剑飞行商城";
        this.mIconDiamondImage.imageGuid = GlobalData.diamondIcon;
        this.mIconArkImage.imageGuid = GlobalData.arkIcon;
        this.initItem();
    }

    private bindButton(): void {
        this.mCloseButton.onClicked.add(this.addCloseButton.bind(this));
        Event.addLocalListener(`UpdateDiamondTextBlock`, this.updateDiamondTextBlock.bind(this));

    }

    private addCloseButton(): void {
        this.hideTween();
    }

    private swordItems: SwordItem[] = [];
    private initItem(): void {
        swordDataMap.forEach((value: SwordData, key: number) => {
            let swordItem = mw.UIService.create(SwordItem);
            swordItem.initItem(key);
            this.mCanvas.addChild(swordItem.uiObject);
            this.swordItems.push(swordItem);
        });
    }

    public updateArkTextBlock(arkCount: number): void {
        this.mArkCountTextBlock.text = `${arkCount}`;
    }

    public updateDiamondTextBlock(diamondCount: number): void {
        this.mDiamondCountTextBlock.text = `${diamondCount}`;
    }

    protected onShow(...params: any[]): void {
        Utils.openUITween(
            this.rootCanvas,
            () => {
                this.getHudPanel.hide();
            },
            null
        );
    }

    public hideTween(): void {
        Utils.closeUITween(
            this.rootCanvas,
            null,
            () => {
                this.hide();
                this.getHudPanel.show();
            });
    }
}

export class FlyData extends Subdata {
    @Decorator.persistence()
    public flyIds: number[] = [];

    @Decorator.persistence()
    public swordIds: number[] = [];

    @Decorator.persistence()
    public usingSwordId: number = 0;

    public delFlyId(swordId: number): void {
        if (!this.swordIds.includes(swordId)) {
            this.swordIds.push(swordId);
        }
        this.flyIds.length = 0;
        this.save(true);
    }

    public setSwordId(swordId: number): void {
        if (!this.swordIds.includes(swordId)) {
            this.swordIds.push(swordId);
        }
        this.save(true);
    }

    public setUsingSwordId(swordId: number): void {
        if (this.usingSwordId == swordId) return;
        this.usingSwordId = swordId;
        this.save(true);
    }
}

export class SwordData {
    public id: number;
    public name: string;
    public icon: string;
    public diamond: number;
    public ark: number;
    public commodityId: string;
    public npcId: string;
    public skinId: string;
    public animationId: string;
    public swordPrefabId: string;
}

const swordTriggerId: string = "0D77F0C2";
const swordWorldUIId: string = "21930ABA";
export const swordDataMap: Map<number, SwordData> = new Map<number, SwordData>();
swordDataMap.set(1, { id: 1, name: "御剑_智弑者", icon: "mode_31724", diamond: 2800, ark: 600, commodityId: "37zTtTSg2c60001PE", npcId: "3C256CEA", skinId: "268ED77E4D6DFFFD309A05BA9BE0A309", animationId: "285774", swordPrefabId: "9F82AAFB4DE4AFC4ADB866A11D838D73" });
swordDataMap.set(2, { id: 2, name: "御剑_冰钻剑", icon: "mode_31712", diamond: 30000, ark: 1500, commodityId: "Ac8BwTjIqya0001PF", npcId: "3776969F", skinId: "BDFB169745A51FDCFCC95F930B93FF06", animationId: "285774", swordPrefabId: "1F1C60AE4477C35E7A866B9B1EC115B0" });
swordDataMap.set(3, { id: 3, name: "御剑_断狂剑", icon: "mode_269895", diamond: 50000, ark: 2500, commodityId: "5RQ4kLNvse30001PG", npcId: "2D50E787", skinId: "C1052B3F48E85F92B636938767F2C051", animationId: "285774", swordPrefabId: "8124134E4CBF3FA72E07A7B4EEFCF00D" });
swordDataMap.set(4, { id: 4, name: "御剑_黄金剑", icon: "mode_218730", diamond: -1, ark: 3000, commodityId: "ARlkmT3Usqb0001PH", npcId: "0F6CADC5", skinId: "0B11729440BFEE070D9B1F9BF3C27D6E", animationId: "285774", swordPrefabId: "CDA48366471D1E2820A362823CC0E991" });
swordDataMap.set(5, { id: 5, name: "御剑_恶魔剑", icon: "mode_122956", diamond: -1, ark: 5000, commodityId: "AiOAFX4FHqP0001PI", npcId: "373123C7", skinId: "65980CA14CDB69DA3768E692D62B2EA5", animationId: "285774", swordPrefabId: "8916A58D484FBB70C4AC53883A1B4CA5" });
swordDataMap.set(6, { id: 6, name: "御剑_飞行器", icon: "mode_87017", diamond: -1, ark: 6800, commodityId: "4uaXGuU0QS20001PJ", npcId: "0CA13464", skinId: "23BB2A944F3CE285BBCD3084FB10A724", animationId: "285774", swordPrefabId: "22D90B924C59CC74C1EFFD9784B19249" });

export class FlyModuleC extends ModuleC<FlyModuleS, FlyData> {
    private swordPanel: SwordPanel = null;
    private get getSwordPanel(): SwordPanel {
        if (!this.swordPanel) {
            this.swordPanel = mw.UIService.getUI(SwordPanel);
        }
        return this.swordPanel;
    }
    private swordTipsPanel: SwordTipsPanel = null;
    private get getSwordTipsPanel(): SwordTipsPanel {
        if (!this.swordTipsPanel) {
            this.swordTipsPanel = mw.UIService.getUI(SwordTipsPanel);
        }
        return this.swordTipsPanel;
    }

    private hudModuleC: HUDModuleC = null;
    private get getHudModuleC(): HUDModuleC {
        if (!this.hudModuleC) {
            this.hudModuleC = ModuleService.getModule(HUDModuleC);
        }
        return this.hudModuleC;
    }

    private adTipsPanel: AdTipsPanel = null;
    private get getAdTipsPanel(): AdTipsPanel {
        if (!this.adTipsPanel) {
            this.adTipsPanel = mw.UIService.create(AdTipsPanel);
        }
        return this.adTipsPanel
    }

    private playerModuleC: PlayerModuleC = null;
    private get getPlayerModuleC(): PlayerModuleC {
        if (!this.playerModuleC) {
            this.playerModuleC = ModuleService.getModule(PlayerModuleC);
        }
        return this.playerModuleC;
    }

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        this.bindAction();
    }

    private bindAction(): void {
        this.getHudModuleC.onOpenSwordAction.add(this.addOpenSwordPanel.bind(this));
        this.getHudModuleC.onOnOffFlyAction.add(this.addOnOffSword.bind(this));
        mw.PurchaseService.onArkBalanceUpdated.add(this.addArkUpdate.bind(this));
    }

    private addOpenSwordPanel(): void {
        this.getSwordPanel.show();
        mw.PurchaseService.getArkBalance(); // 触发代币余额刷新。接收更新的值要用mw.PurchaseService.onArkBalanceUpdated
    }

    private addArkUpdate(amount: number): void {
        //刷新逻辑，amount为当前代币数量
        console.error(`ArkModuleC addArkUpdate amount: ${amount}`);
        this.getSwordPanel.updateArkTextBlock(amount);
    }

    public clickSwordItem(key: number, buySuccessCallback: () => void): void {
        if (this.isHasSwordId(key)) {
            this.setUsingSwordId(key);
            this.addOnOffSword(true);
        } else {
            let swordData = swordDataMap.get(key);
            if (swordData.diamond <= 0) {
                if (mw.SystemUtil.isPIE) {
                    this.setSwordId(key);
                    Notice.showDownNotice(`御剑飞行购买成功`);
                    if (buySuccessCallback) buySuccessCallback();
                } else {
                    mw.PurchaseService.placeOrder(swordData.commodityId, 1, (status, msg) => {
                        mw.PurchaseService.getArkBalance();//刷新代币数量
                        if (status != 200) return;
                        if (buySuccessCallback) buySuccessCallback();
                    });
                }
            } else {
                this.getSwordTipsPanel.showPanel(key,
                    () => {
                        if (mw.SystemUtil.isPIE) {
                            this.setSwordId(key);
                            Notice.showDownNotice(`御剑飞行购买成功`);
                            if (buySuccessCallback) buySuccessCallback();
                            this.getSwordTipsPanel.hide();
                        } else {
                            mw.PurchaseService.placeOrder(swordData.commodityId, 1, (status, msg) => {
                                mw.PurchaseService.getArkBalance();//刷新代币数量
                                if (status != 200) return;
                                if (buySuccessCallback) buySuccessCallback();
                                this.getSwordTipsPanel.hide();
                            });
                        }
                    },
                    () => {
                        let costDiamond = this.getPlayerModuleC.getDiamond;
                        if (costDiamond >= swordData.diamond) {
                            this.getPlayerModuleC.saveDiamond(-swordData.diamond);
                            this.setSwordId(key);
                            Notice.showDownNotice(`御剑飞行购买成功`);
                            this.getSwordTipsPanel.hide();
                            if (buySuccessCallback) buySuccessCallback();
                        } else {
                            Notice.showDownNotice(`钻石不足`);
                            if (GlobalData.isOpenIAA) {
                                this.getAdTipsPanel.showRewardAd(() => {
                                    Notice.showDownNotice(`成功获得钻石+${GlobalData.addDiamondCount}`);
                                    this.getPlayerModuleC.saveDiamond(GlobalData.addDiamondCount);
                                }, `免费领取${GlobalData.addDiamondCount}颗钻石`, "取消", "免费领取");
                            } else {
                                Notice.showDownNotice(`成功获得钻石+${GlobalData.addDiamondCount}`);
                                this.getPlayerModuleC.saveDiamond(GlobalData.addDiamondCount);
                            }
                        }
                    }, null);
            }
        }
    }

    public net_deliverGoods(commodityId: string, amount: number): void {
        swordDataMap.forEach((value: SwordData, key: number) => {
            if (value.commodityId == commodityId) {
                this.setSwordId(key);
                Notice.showDownNotice(`御剑飞行购买成功`);
            }
        });
    }

    protected onEnterScene(sceneType: number): void {
        this.initSwordData();
        this.initTrigger().then(() => {
            TimeUtil.delaySecond(10).then(() => {
                if (this.usingSwordId > 0) this.addOnOffSword(true);
            });
        });
    };

    private flyIds: number[] = [];
    private swordIds: number[] = [];
    private usingSwordId: number = 0;
    private initSwordData(): void {
        this.flyIds = this.data.flyIds;
        this.swordIds = this.data.swordIds;
        this.usingSwordId = this.data.usingSwordId;

        if (this.flyIds && this.flyIds.length > 0) {
            if (this.flyIds[0] == 1) this.delFlyId();
        }
    }

    public delFlyId(): void {
        let swordId: number = 4;
        if (!this.swordIds.includes(swordId)) {
            this.swordIds.push(swordId);
        }
        if (this.usingSwordId != swordId) {
            this.usingSwordId = swordId;
        }
        this.flyIds.length = 0;
        this.server.net_delFlyId(swordId);
    }

    public setSwordId(swordId: number): void {
        if (this.swordIds.includes(swordId)) return;
        this.swordIds.push(swordId);
        this.server.net_setSwordId(swordId);
    }

    public isHasSwordId(swordId: number): boolean {
        return this.swordIds.includes(swordId);
    }

    public setUsingSwordId(swordId: number): void {
        if (this.usingSwordId == swordId) return;
        this.usingSwordId = swordId;
        this.server.net_setUsingSwordId(this.usingSwordId);
    }

    private isFlying: boolean = false;
    public addOnOffSword(on: boolean): void {
        if (on) {
            if (this.usingSwordId <= 0) {
                Notice.showDownNotice(`未装备御剑飞行`);
                this.defaultOpenBuyPanel();
                return;
            } else {
                if (this.isFlying) return;
                Notice.showDownNotice(`装备御剑飞行`);
                this.localPlayer.character.changeState(mw.CharacterStateType.Flying);
                this.server.net_useFly(this.usingSwordId);
                this.isFlying = true;
            }
        } else {
            if (!this.isFlying) return;
            Notice.showDownNotice(`卸下御剑飞行`);
            this.localPlayer.character.changeState(mw.CharacterStateType.Running);
            this.server.net_useFly(-1);
            this.isFlying = false;
        }
    }

    private isFirst: boolean = true;
    private defaultOpenBuyPanel(): void {
        console.error(`aaaaaaaaaaaaaaaaaaaaaaaaaaaaa`);
        if (this.isFirst) {
            this.isFirst = false;
            return;
        }
        this.addOpenSwordPanel();
    }

    private async initTrigger(): Promise<void> {
        mw.GameObject.asyncFindGameObjectById(swordTriggerId).then((trigger: mw.Trigger) => {
            trigger.onEnter.add((character: mw.Character) => {
                if (character.gameObjectId != this.localPlayer.character.gameObjectId) return;
                this.addOpenSwordPanel();
            });
        });
        mw.GameObject.asyncFindGameObjectById(swordWorldUIId).then((worldUI: mw.UIWidget) => {
            let levelItem = mw.UIService.create(LevelItem);
            levelItem.updateLevelTextBlock(`御剑飞行商城`);
            worldUI.setTargetUIWidget(levelItem.uiWidgetBase);
        });
        swordDataMap.forEach((swordData: SwordData) => {
            GameObject.asyncFindGameObjectById(swordData.npcId).then((character: mw.Character) => {
                character.setDescription([swordData.skinId]);
                let animation = character.loadAnimation(swordData.animationId);
                animation.loop = 0;
                animation.play();
            });
        });
    }
}


export class FlyModuleS extends ModuleS<FlyModuleC, FlyData> {
    private playerModuleS: PlayerModuleS = null;
    private get getPlayerModuleS(): PlayerModuleS {
        if (!this.playerModuleS) {
            this.playerModuleS = ModuleService.getModule(PlayerModuleS);
        }
        return this.playerModuleS;
    }

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        this.bindAction();
    }

    private bindAction(): void {
        mw.PurchaseService.onOrderDelivered.add(this.addShipOrder.bind(this));
    }

    private addShipOrder(playerId: number, orderId: string, commodityId: string, amount: number, confirmOrder: (bReceived: boolean) => void): void {
        //根据playerId和commodityId来处理购买逻辑
        this.getClient(playerId).net_deliverGoods(commodityId, amount);
        confirmOrder(true);//调用这个方法表示确认收货成功
    }

    @Decorator.noReply()
    public net_delFlyId(swordId: number): void {
        this.currentData.delFlyId(swordId);
    }

    @Decorator.noReply()
    public net_setSwordId(swordId: number): void {
        this.currentData.setSwordId(swordId);
    }

    @Decorator.noReply()
    public net_setUsingSwordId(swordId: number): void {
        this.currentData.setUsingSwordId(swordId);
    }

    @Decorator.noReply()
    public net_useFly(key: number): void {
        this.getPlayerModuleS.useFly(this.currentPlayer, key);
    }
}