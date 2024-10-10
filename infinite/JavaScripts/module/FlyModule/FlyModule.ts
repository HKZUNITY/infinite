import { Notice } from "../../common/notice/Notice";
import GlobalData from "../../const/GlobalData";
import { Utils } from "../../Tools/utils";
import SwordItem_Generate from "../../ui-generate/module/FlyModule/SwordItem_generate";
import SwordPanel_Generate from "../../ui-generate/module/FlyModule/SwordPanel_generate";
import SwordTipsPanel_Generate from "../../ui-generate/module/FlyModule/SwordTipsPanel_generate";
import AdTipsPanel from "../AdsModule/ui/AdTipsPanel";
import { BagModuleC, BagModuleS } from "../BagModule/BagModule";
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

    private isCanContinueClick: boolean = true;
    private addClickButton(): void {
        if (!this.isCanContinueClick) {
            Notice.showDownNotice(`3秒冷却`);
            return;
        }
        this.isCanContinueClick = false;
        TimeUtil.delaySecond(3).then(() => {
            this.isCanContinueClick = true;
        });
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

        this.mRarityTextBlock.text = `血量提升${1 + swordData.hpRarity}倍\n攻击力提升${1 + swordData.atkRarity}倍`;
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

    public updateRarityTextBlock(hpRarity: number, atkRarity: number): void {
        this.mTotalRarityTextBlock.text = `御剑飞行总加成\n血量提升${1 + hpRarity}倍\n攻击力提升${1 + atkRarity}倍`;
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

    public get getHpRarity(): number {
        if (!this.swordIds || this.swordIds.length == 0) return 0;
        let hpRarity: number = 0;
        this.swordIds.forEach((swordId: number) => {
            hpRarity += swordDataMap.get(swordId).hpRarity;
        });
        return Number(hpRarity.toFixed(1));
    }

    public get getAtkRarity(): number {
        if (!this.swordIds || this.swordIds.length == 0) return 0;
        let atkRarity: number = 0;
        this.swordIds.forEach((swordId: number) => {
            atkRarity += swordDataMap.get(swordId).atkRarity;
        });
        return atkRarity;
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
    public hpRarity: number = 0;
    public atkRarity: number = 0;

    public isCharacter: boolean;
}

const swordTriggerId: string = "0D77F0C2";
const swordWorldUIId: string = "21930ABA";
export const swordDataMap: Map<number, SwordData> = new Map<number, SwordData>();
swordDataMap.set(1, { id: 1, name: "御剑_智弑者", icon: "mode_31724", diamond: 2800, ark: 600, commodityId: "37zTtTSg2c60001PE", npcId: "3C256CEA", skinId: "268ED77E4D6DFFFD309A05BA9BE0A309", animationId: "285774", swordPrefabId: "9F82AAFB4DE4AFC4ADB866A11D838D73", hpRarity: 0.1, atkRarity: 0.1, isCharacter: false });
swordDataMap.set(4, { id: 4, name: "御剑_黄金剑", icon: "mode_218730", diamond: -1, ark: 3000, commodityId: "ARlkmT3Usqb0001PH", npcId: "", skinId: "0B11729440BFEE070D9B1F9BF3C27D6E", animationId: "285774", swordPrefabId: "CDA48366471D1E2820A362823CC0E991", hpRarity: 0.3, atkRarity: 0.3, isCharacter: false });
swordDataMap.set(2, { id: 2, name: "御剑_冰钻剑", icon: "mode_31712", diamond: 30000, ark: 1500, commodityId: "Ac8BwTjIqya0001PF", npcId: "3776969F", skinId: "BDFB169745A51FDCFCC95F930B93FF06", animationId: "285774", swordPrefabId: "1F1C60AE4477C35E7A866B9B1EC115B0", hpRarity: 0.2, atkRarity: 0.2, isCharacter: false });
swordDataMap.set(5, { id: 5, name: "御剑_恶魔剑", icon: "mode_122956", diamond: -1, ark: 5000, commodityId: "AiOAFX4FHqP0001PI", npcId: "", skinId: "65980CA14CDB69DA3768E692D62B2EA5", animationId: "285774", swordPrefabId: "8916A58D484FBB70C4AC53883A1B4CA5", hpRarity: 0.5, atkRarity: 0.5, isCharacter: false });
swordDataMap.set(3, { id: 3, name: "御剑_断狂剑", icon: "mode_269895", diamond: 50000, ark: 2500, commodityId: "5RQ4kLNvse30001PG", npcId: "2D50E787", skinId: "C1052B3F48E85F92B636938767F2C051", animationId: "285774", swordPrefabId: "8124134E4CBF3FA72E07A7B4EEFCF00D", hpRarity: 0.3, atkRarity: 0.2, isCharacter: false });
swordDataMap.set(6, { id: 6, name: "御剑_飞行器", icon: "mode_87017", diamond: -1, ark: 6800, commodityId: "4uaXGuU0QS20001PJ", npcId: "0CA13464", skinId: "23BB2A944F3CE285BBCD3084FB10A724", animationId: "285774", swordPrefabId: "22D90B924C59CC74C1EFFD9784B19249", hpRarity: 0.7, atkRarity: 0.6, isCharacter: false });
swordDataMap.set(7, { id: 7, name: "御剑_飞镖", icon: "mode_20925", diamond: -1, ark: 100, commodityId: "25qyjRc49QC0001Py", npcId: "", skinId: "", animationId: "285774", swordPrefabId: "0C9D159B4A075406380DB88269CD789A", hpRarity: 0.1, atkRarity: 0, isCharacter: false });
swordDataMap.set(8, { id: 8, name: "御剑_小单车", icon: "mode_31526", diamond: -1, ark: 3000, commodityId: "5FvNd2bs82z0001Pz", npcId: "373123C7", skinId: "F6A887214D21780BC36A41B26307265B", animationId: "285057", swordPrefabId: "9715225D4634C394F69BA0BD6F420451", hpRarity: 0.3, atkRarity: 0.3, isCharacter: false });
swordDataMap.set(9, { id: 9, name: "御剑_反正很帅", icon: "mode_151412", diamond: -1, ark: 600, commodityId: "5HMpNdwFrJr0001Q0", npcId: "", skinId: "", animationId: "284772", swordPrefabId: "938C2259434A97CA393C8199DD80D274", hpRarity: 0.1, atkRarity: 0.1, isCharacter: false });
swordDataMap.set(10, { id: 10, name: "御剑_滑板", icon: "mode_172322", diamond: -1, ark: 300, commodityId: "2n1J8tM5rtL0001Q2", npcId: "0F6CADC5", skinId: "CDB4F61044BF45F91E8E91AB9E1C706B", animationId: "285774", swordPrefabId: "739C4F7545D25E898D93F89BF0AC4B8A", hpRarity: 0.1, atkRarity: 0.1, isCharacter: false });
swordDataMap.set(11, { id: 11, name: "御剑_小绿龙", icon: "mode_247654", diamond: -1, ark: 1000, commodityId: "7zMYBoBixh80001Q3", npcId: "", skinId: "", animationId: "285781", swordPrefabId: "01728B2A4C9722493B4703BEBA7E4CF2", hpRarity: 0.2, atkRarity: 0.1, isCharacter: true });
swordDataMap.set(12, { id: 12, name: "御剑_小蓝龙", icon: "mode_248837", diamond: -1, ark: 1000, commodityId: "AJrYTJFqjFR0001Q4", npcId: "", skinId: "", animationId: "285781", swordPrefabId: "48A6F6E348AAACD86C9269B780CF3BE8", hpRarity: 0.2, atkRarity: 0.1, isCharacter: true });
swordDataMap.set(13, { id: 13, name: "御剑_小火龙", icon: "mode_248730", diamond: -1, ark: 1000, commodityId: "7gMCn89dVTb0001Q5", npcId: "0E9E1B46", skinId: "F5B67E80465D850BAD46A09F62FB6B87", animationId: "285781", swordPrefabId: "14AF817A43500A7102A057A2D52ECAD8", hpRarity: 0.2, atkRarity: 0.1, isCharacter: true });

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

    private bagModuleC: BagModuleC = null;
    private get getBagModuleC(): BagModuleC {
        if (!this.bagModuleC) {
            this.bagModuleC = ModuleService.getModule(BagModuleC);
        }
        return this.bagModuleC;
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
        Event.dispatchToLocal(`SyncDiamondCount`);
        this.getSwordPanel.updateRarityTextBlock(this.getHpRarity, this.getAtkRarity);
    }

    private addArkUpdate(amount: number): void {
        //刷新逻辑，amount为当前代币数量
        console.error(`ArkModuleC addArkUpdate amount: ${amount}`);
        this.getSwordPanel.updateArkTextBlock(amount);
    }

    public clickSwordItem(key: number, buySuccessCallback: () => void): void {
        if (this.isHasSwordId(key)) {
            this.setUsingSwordId(key);
            this.getSwordPanel.hideTween();
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
        this.getBagModuleC.updateHpByUsing();
        this.getSwordPanel.updateRarityTextBlock(this.getHpRarity, this.getAtkRarity);
    }

    public isHasSwordId(swordId: number): boolean {
        return this.swordIds.includes(swordId);
    }

    public get getHpRarity(): number {
        if (!this.swordIds || this.swordIds.length == 0) return 0;
        let hpRarity: number = 0;
        this.swordIds.forEach((swordId: number) => {
            hpRarity += swordDataMap.get(swordId).hpRarity;
        });
        return Number(hpRarity.toFixed(1));
    }

    public get getAtkRarity(): number {
        if (!this.swordIds || this.swordIds.length == 0) return 0;
        let atkRarity: number = 0;
        this.swordIds.forEach((swordId: number) => {
            atkRarity += swordDataMap.get(swordId).atkRarity;
        });
        return Number(atkRarity.toFixed(1));
    }

    public setUsingSwordId(swordId: number): void {
        if (this.usingSwordId == swordId) return;
        this.usingSwordId = swordId;
        this.server.net_setUsingSwordId(this.usingSwordId);

        Notice.showDownNotice(`装备御剑飞行`);
        this.localPlayer.character.changeState(mw.CharacterStateType.Flying);
        this.server.net_useFly(this.usingSwordId);
        this.isFlying = true;
    }

    private isFlying: boolean = false;
    public addOnOffSword(on: boolean): void {
        if (on) {
            if (this.usingSwordId <= 0) {
                Notice.showDownNotice(`未装备御剑飞行`);
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
            if (!swordData.npcId || swordData.npcId == "") return;
            GameObject.asyncFindGameObjectById(swordData.npcId).then((character: mw.Character) => {
                character.setDescription([swordData.skinId]);
                let animation = character.loadAnimation(swordData.animationId);
                animation.loop = 0;
                animation.play();
                if (swordData.id == 13) {
                    let flyCharacter = character.getChildByName("小火龙") as mw.Character;
                    flyCharacter.setCollision(mw.PropertyStatus.Off, true);
                    character.attachToSlot(flyCharacter, mw.HumanoidSlotType.Root);
                    flyCharacter.localTransform.scale = mw.Vector.one.multiply(4);
                    flyCharacter.localTransform.position = new mw.Vector(12, 0, 30);
                    flyCharacter.localTransform.rotation = mw.Rotation.zero;
                    Utils.asyncDownloadAsset(`160628`).then(() => {
                        let flyCharacterAnimation = flyCharacter.loadAnimation(`160628`);//TODO-小龙动画
                        flyCharacterAnimation.loop = 0;
                        flyCharacterAnimation.play();
                    });
                }
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

    private bagModuleS: BagModuleS = null;
    private get getBagModuleS(): BagModuleS {
        if (!this.bagModuleS) {
            this.bagModuleS = ModuleService.getModule(BagModuleS);
        }
        return this.bagModuleS;
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
        let player = this.currentPlayer;
        this.currentData.setSwordId(swordId);
        this.getBagModuleS.updateHpByUsing(player);
    }

    public getRarity(player: mw.Player): number {
        return DataCenterS.getData(player, FlyData).getHpRarity;
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