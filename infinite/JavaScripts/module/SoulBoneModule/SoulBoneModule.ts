import { Notice } from "../../common/notice/Notice";
import { GameConfig } from "../../config/GameConfig";
import GlobalData from "../../const/GlobalData";
import { MapEx } from "../../Tools/MapEx";
import { Utils } from "../../Tools/utils";
import PartItem_Generate from "../../ui-generate/module/SoulBoneModule/PartItem_generate";
import SoulBonePanel_Generate from "../../ui-generate/module/SoulBoneModule/SoulBonePanel_generate";
import StarItem_Generate from "../../ui-generate/module/SoulBoneModule/StarItem_generate";
import UpProbabilityPanel_Generate from "../../ui-generate/module/SoulBoneModule/UpProbabilityPanel_generate";
import AdTipsPanel from "../AdsModule/ui/AdTipsPanel";
import HUDModuleC from "../HUDModule/HUDModuleC";
import HUDPanel from "../HUDModule/ui/HUDPanel";
import PlayerModuleC from "../PlayerModule/PlayerModuleC";

export class StarItem extends StarItem_Generate {
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
    }

    public setStar(isStar: boolean): void {
        this.mFgImage.visibility = isStar ? mw.SlateVisibility.SelfHitTestInvisible : mw.SlateVisibility.Collapsed;
    }
}

export class PartItem extends PartItem_Generate {
    private soulBonePanel: SoulBonePanel = null;
    private get getSoulBonePanel(): SoulBonePanel {
        if (!this.soulBonePanel) {
            this.soulBonePanel = mw.UIService.getUI(SoulBonePanel);
        }
        return this.soulBonePanel;
    }

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        this.initUI();
        this.bindButton();
    }

    private initUI(): void {
        Utils.setWidgetVisibility(this.mFgImage, mw.SlateVisibility.Collapsed);
    }

    private bindButton(): void {
        this.mClickButton.onClicked.add(this.addClickButton.bind(this));
    }

    private addClickButton(): void {
        this.getSoulBonePanel.selectPart(this.soulBoneData.id);
    }

    private soulBoneData: SoulBoneData = null;
    public setData(soulBoneData: SoulBoneData): void {
        this.soulBoneData = soulBoneData;
        this.setIcon();
        this.setName();
    }

    private setIcon(): void {
        let iconStr = this.soulBoneData.icon.split(`_`);
        if (iconStr[0] == `icon`) {
            this.mIconImage.imageGuid = iconStr[1];
        } else if (iconStr[0] == `mode`) {
            Utils.setImageByAssetIconData(this.mIconImage, iconStr[1]);
        }
    }

    private setName(): void {
        this.mNameTextBlock.text = this.soulBoneData.name;
    }

    public setSelect(isSelect: boolean): void {
        Utils.setWidgetVisibility(this.mFgImage, isSelect ? mw.SlateVisibility.SelfHitTestInvisible : mw.SlateVisibility.Collapsed);
    }
}

export class SoulBonePanel extends SoulBonePanel_Generate {
    private soulBoneModuleC: SoulBoneModuleC = null;
    private get getSoulBoneModuleC(): SoulBoneModuleC {
        if (!this.soulBoneModuleC) {
            this.soulBoneModuleC = ModuleService.getModule(SoulBoneModuleC);
        }
        return this.soulBoneModuleC;
    }
    private hudPanel: HUDPanel = null;
    private get getHudPanel(): HUDPanel {
        if (!this.hudPanel) {
            this.hudPanel = mw.UIService.getUI(HUDPanel);
        }
        return this.hudPanel
    }

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        this.initUI();
        this.bindButton();
        this.initTextBlock();
        this.initIconImage();
    }

    private initIconImage(): void {
        this.mIconCoinImage.imageGuid = GlobalData.coinIcon;
        this.mIconDiamondImage.imageGuid = GlobalData.diamondIcon;
        this.mIconArkImage.imageGuid = GlobalData.arkIcon;
    }

    private partItems: PartItem[] = [];
    private initUI(): void {
        soulBoneMap.forEach((value: SoulBoneData, key: number) => {
            let partItem: PartItem = mw.UIService.create(PartItem);
            partItem.setData(value);
            this.partItems.push(partItem);
            this.mPartListCanvas.addChild(partItem.uiObject);
        });
        this.selectPart(0);
    }

    private initTextBlock(): void {
        this.mTitleTextBlock.text = GameConfig.Language.Text_StrengthenSoulBones.Value;

        let afterStrengthening = GameConfig.Language.Text_AfterStrengthening.Value;
        this.mHpTipsTextBlock.text = afterStrengthening;
        this.mAtkTipsTextBlock.text = afterStrengthening;

        this.mNeedTitleTextBlock.text = GameConfig.Language.Text_StrengtheningConditions.Value;
        this.mNeedDiamondTipsTextBlock.text = GameConfig.Language.Text_NeedToConsume.Value;
        this.mNeedCoinTextBlock.text = GameConfig.Language.Text_NeedToConsume.Value;

        this.mUpProbabilityTextBlock.text = GameConfig.Language.Text_IncreaseProbability.Value;
        this.mStrengthenTextBlock.text = GameConfig.Language.Text_StartStrengthening.Value;
    }

    private bindButton(): void {
        this.mCloseButton.onClicked.add(this.addCloseButton.bind(this));
        this.mUpProbabilityButton.onClicked.add(this.addUpProbabilityButton.bind(this));
        this.mStrengthenButton.onClicked.add(this.addStrengthenButton.bind(this));
    }

    private addCloseButton(): void {
        this.hideTween();
    }

    public updateCoinTextBlock(count: number): void {
        this.mCoinCountTextBlock.text = `${Utils.integerUnitConversionStr(count)}`;
    }

    public updateArkTextBlock(arkCount: number): void {
        this.mArkCountTextBlock.text = `${arkCount}`;
    }

    public updateDiamondTextBlock(count: number): void {
        this.mDiamondCountTextBlock.text = `${Utils.integerUnitConversionStr(count)}`;
    }

    private currentSelectPartId: number = -1;
    private currentSoulBoneData: SoulBoneData = null;
    public selectPart(partId: number): void {
        if (this.currentSelectPartId >= 0) this.partItems[this.currentSelectPartId].setSelect(false);
        this.currentSelectPartId = partId;
        this.currentSoulBoneData = soulBoneMap.get(partId);
        this.partItems[partId].setSelect(true);
        this.refreshContentUI();
    }

    private soulBoneLv: number = 0;
    private refreshContentUI(): void {
        this.soulBoneLv = this.getSoulBoneModuleC.getSoulBoneLv(this.currentSelectPartId);
        this.setHeadInfo();
        this.setPropertyInfo();
    }

    private setHeadInfo(): void {
        let iconStr = soulBoneMap.get(this.currentSelectPartId).icon.split(`_`);
        if (iconStr[0] == `icon`) {
            this.mIconImage.imageGuid = iconStr[1];
        } else if (iconStr[0] == `mode`) {
            Utils.setImageByAssetIconData(this.mIconImage, iconStr[1]);
        }
        this.mNameTextBlock.text = StringUtil.format(GameConfig.Language.Text_StarRating.Value, this.soulBoneLv);
        this.setStars();
    }

    private starItems: StarItem[] = [];
    private setStars(): void {
        if (!this.starItems || this.starItems.length == 0) {
            this.starItems = [];
            for (let i = 0; i < maxStarLv; ++i) {
                let starItem: StarItem = mw.UIService.create(StarItem);
                this.starItems.push(starItem);
                this.mStarCanvas.addChild(starItem.uiObject);
            }
        }
        for (let i = 0; i < this.soulBoneLv; ++i) {
            this.starItems[i].setStar(true);
        }
        for (let i = this.soulBoneLv; i < maxStarLv; ++i) {
            this.starItems[i].setStar(false);
        }
    }

    private setPropertyInfo(): void {
        this.setPropertyArrowVisibility();
    }

    private setPropertyArrowVisibility(): void {
        if (this.soulBoneLv == maxStarLv) {
            this.mHasMaxLvTextBlock.visibility = mw.SlateVisibility.SelfHitTestInvisible;
            this.mHpArrowImage.visibility = mw.SlateVisibility.Collapsed;
            this.mAtkArrowImage.visibility = mw.SlateVisibility.Collapsed;
            this.mNeedInfoCanvas.visibility = mw.SlateVisibility.Collapsed;
            this.mStrengthenCanvas.visibility = mw.SlateVisibility.Collapsed;
        } else {
            this.mHasMaxLvTextBlock.visibility = mw.SlateVisibility.Collapsed;
            this.mHpArrowImage.visibility = mw.SlateVisibility.SelfHitTestInvisible;
            this.mAtkArrowImage.visibility = mw.SlateVisibility.SelfHitTestInvisible;
            this.mNeedInfoCanvas.visibility = mw.SlateVisibility.SelfHitTestInvisible;
            this.mStrengthenCanvas.visibility = mw.SlateVisibility.SelfHitTestInvisible;
            this.setHpPropertyInfo();
            this.setAtkPropertyInfo();
            this.setNeedInfo();
            this.setStrengthenButtonState();
        }
    }

    private setHpPropertyInfo(): void {
        let currentHpMultiple = 1 + (this.soulBoneLv * upStarOffsetValue);
        let nextHpMultiple = 1 + ((this.soulBoneLv + 1) * upStarOffsetValue);
        this.mHpTextBlock.text = StringUtil.format(GameConfig.Language.Text_IncreaseBloodVolumeByTimes.Value, currentHpMultiple);
        this.mHpedTextBlock.text = StringUtil.format(GameConfig.Language.Text_IncreaseBloodVolumeByTimes.Value, nextHpMultiple);
    }

    private setAtkPropertyInfo(): void {
        let currentAtkMultiple = 1 + (this.soulBoneLv * upStarOffsetValue);
        let nextAtkMultiple = 1 + ((this.soulBoneLv + 1) * upStarOffsetValue);
        this.mAtkTextBlock.text = StringUtil.format(GameConfig.Language.Text_AttackPowerIncreasedByTimes.Value, currentAtkMultiple);
        this.mAtkedTextBlock.text = StringUtil.format(GameConfig.Language.Text_AttackPowerIncreasedByTimes.Value, nextAtkMultiple);
    }

    private setNeedInfo(): void {
        this.setNeedLv();
        this.setNeedDiamondCost();
        this.setNeedCoinCost();
    }

    private setNeedLv(): void {
        let limitLv = this.currentSoulBoneData.limitLv;
        this.mNeedLvCountTextBlock.text = `${StringUtil.format(GameConfig.Language.Text_NeedToReachLevel.Value, limitLv)}(${limitLv}/${this.getSoulBoneModuleC.getLevel})`;
    }

    private setNeedDiamondCost(): void {
        let diamond = this.currentSoulBoneData.diamonds[this.soulBoneLv];
        this.mNeedDiamondCountTextBlock.text = `${diamond}/${this.getSoulBoneModuleC.getDiamond}`;
    }

    private setNeedCoinCost(): void {
        let coin = this.currentSoulBoneData.coins[this.soulBoneLv];
        this.mNeedCoinCountTextBlock.text = `${coin}/${this.getSoulBoneModuleC.getCoin}`;
    }

    private setStrengthenButtonState(): void {
        this.mProbabilityTextBlock.text = `${GameConfig.Language.Text_EnhanceTheProbabilityOfSuccess}:${this.getSoulBoneModuleC.getProbability}%`;
    }

    private addUpProbabilityButton(): void {
        this.getSoulBoneModuleC.upProbability(() => {
            this.setStrengthenButtonState();
        });
    }

    private addStrengthenButton(): void {
        if (this.currentSoulBoneData.limitLv > this.getSoulBoneModuleC.getLevel) {
            Notice.showDownNotice(StringUtil.format(GameConfig.Language.Text_NeedToReachLevel.Value, this.currentSoulBoneData.limitLv));
            return;
        }
        let costCoin = this.currentSoulBoneData.coins[this.soulBoneLv];
        if (costCoin > this.getSoulBoneModuleC.getCoin) {
            Notice.showDownNotice(GameConfig.Language.Text_InsufficientGoldCoins.Value);
            return;
        }
        let costDiamond = this.currentSoulBoneData.diamonds[this.soulBoneLv];
        if (this.currentSoulBoneData.diamonds[this.soulBoneLv] > this.getSoulBoneModuleC.getDiamond) {
            Notice.showDownNotice(GameConfig.Language.Text_DiamondShortage.Value);
            return;
        }
        this.getSoulBoneModuleC.strengthen(() => {
            this.refreshContentUI();
        }, this.currentSelectPartId, costCoin, costDiamond);
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

export class UpProbabilityPanel extends UpProbabilityPanel_Generate {
    protected onStart(): void {
        this.initUI();
        this.bindButton();
    }

    private initUI(): void {
        this.mContentTextBlock_2.text = GameConfig.Language.Text_Or.Value;
        this.mDiamondTextBlock.text = GameConfig.Language.Text_UsingDiamonds.Value;
        this.mArkTextBlock.text = GameConfig.Language.Text_UseTeamCoins.Value;
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

    private isCanClickArkButton: boolean = true;
    private addArkButton(): void {
        if (!this.isCanClickArkButton) return;
        this.isCanClickArkButton = false;
        TimeUtil.delaySecond(3).then(() => { this.isCanClickArkButton = true; });
        if (this.arkCallBack) this.arkCallBack();
    }

    private addDiamondButton(): void {
        if (this.diamondCallBack) this.diamondCallBack();
    }

    private arkCallBack: () => void = null;
    private diamondCallBack: () => void = null;
    private closeCallBack: () => void = null;
    public showPanel(arkCallBack: () => void, diamondCallBack: () => void, closeCallBack: () => void, diamondProbility: number, arkProbility: number): void {
        this.isCanClickArkButton = true;
        this.arkCallBack = arkCallBack;
        this.diamondCallBack = diamondCallBack;
        this.closeCallBack = closeCallBack;
        this.mContentTextBlock_0.text = StringUtil.format(GameConfig.Language.Text_UpProbabiliotyConetntTextBlock_0.Value, costDiamondUpProbability, diamondProbility);
        this.mContentTextBlock_1.text = StringUtil.format(GameConfig.Language.Text_UpProbabiliotyConetntTextBlock_1.Value, costArkUpProbability, arkProbility);
        this.show();
    }
}

export class SoulBone extends Subdata {
    @Decorator.persistence()
    public soulBoneLvs: MapEx.MapExClass<number> = {};

    @Decorator.persistence()
    public probability: number = 50;

    public setSoulBoneLv(partId: number, lv: number): void {
        if (MapEx.has(this.soulBoneLvs, partId)) {
            let oldLv = MapEx.get(this.soulBoneLvs, partId);
            MapEx.set(this.soulBoneLvs, partId, Math.round(oldLv + lv));
        } else {
            MapEx.set(this.soulBoneLvs, partId, Math.round(lv));
        }
        this.save(true);
    }

    public getSoulBoneLv(partId: number): number {
        if (MapEx.has(this.soulBoneLvs, partId)) {
            return MapEx.get(this.soulBoneLvs, partId);
        } else {
            return 0;
        }
    }

    public setProbability(probability: number): void {
        this.probability = probability;
        this.save(true);
    }
}

export class SoulBoneData {
    public id: number;
    public name: string;
    public icon: string;
    public limitLv: number;
    public coins: number[];
    public diamonds: number[];
}

export const soulBoneMap: Map<number, SoulBoneData> = new Map<number, SoulBoneData>();
soulBoneMap.set(0, { id: 0, name: "", icon: "450608", limitLv: 1, coins: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], diamonds: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1] });
soulBoneMap.set(1, { id: 0, name: "", icon: "450611", limitLv: 1, coins: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], diamonds: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1] });
soulBoneMap.set(2, { id: 0, name: "", icon: "450595", limitLv: 1, coins: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], diamonds: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1] });
soulBoneMap.set(3, { id: 0, name: "", icon: "450603", limitLv: 1, coins: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], diamonds: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1] });
soulBoneMap.set(4, { id: 0, name: "", icon: "450597", limitLv: 1, coins: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], diamonds: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1] });
soulBoneMap.set(5, { id: 0, name: "", icon: "450610", limitLv: 1, coins: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], diamonds: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1] });
soulBoneMap.set(6, { id: 0, name: "", icon: "450602", limitLv: 1, coins: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], diamonds: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1] });

const maxStarLv: number = 10;
const upStarOffsetValue: number = 0.05;

const costDiamondUpProbability: number = 100;
const costArkUpProbability: number = 100;
const upProbabilityByArkCommodityId: string = "";
export class SoulBoneModuleC extends ModuleC<SoulBoneModuleS, SoulBone> {
    private upProbabilityPanel: UpProbabilityPanel = null;
    private get getUpProbabilityPanel(): UpProbabilityPanel {
        if (!this.upProbabilityPanel) {
            this.upProbabilityPanel = mw.UIService.getUI(UpProbabilityPanel);
        }
        return this.upProbabilityPanel;
    }
    private soulBonePanel: SoulBonePanel = null;
    private get getSoulBonePanel(): SoulBonePanel {
        if (!this.soulBonePanel) {
            this.soulBonePanel = mw.UIService.getUI(SoulBonePanel);
        }
        return this.soulBonePanel;
    }
    private hudModuleC: HUDModuleC = null;
    private get getHudModuleC(): HUDModuleC {
        if (!this.hudModuleC) {
            this.hudModuleC = ModuleService.getModule(HUDModuleC);
        }
        return this.hudModuleC;
    }
    private playerModuleC: PlayerModuleC = null;
    private get getPlayerModuleC(): PlayerModuleC {
        if (!this.playerModuleC) {
            this.playerModuleC = ModuleService.getModule(PlayerModuleC);
        }
        return this.playerModuleC;
    }

    private adTipsPanel: AdTipsPanel = null;
    private get getAdTipsPanel(): AdTipsPanel {
        if (!this.adTipsPanel) {
            this.adTipsPanel = mw.UIService.create(AdTipsPanel);
        }
        return this.adTipsPanel
    }

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        this.bindAction();
    }

    private bindAction(): void {
        this.getHudModuleC.onOpenSoulBoneAction.add(this.onOpenSoulBonePanel.bind(this));
        mw.PurchaseService.onArkBalanceUpdated.add(this.addArkUpdate.bind(this));
        Event.addLocalListener(`UpdateDiamondTextBlock`, this.addUpdateDiamondTextBlock.bind(this));
        Event.addLocalListener(`UpdateCoinTextBlock`, this.addUpdateCoinTextBlock.bind(this));
    }

    private addArkUpdate(amount: number): void {
        //刷新逻辑，amount为当前代币数量
        console.error(`ArkModuleC addArkUpdate amount: ${amount}`);
        this.getSoulBonePanel.updateArkTextBlock(amount);
    }

    private addUpdateDiamondTextBlock(count: number): void {
        this.getSoulBonePanel.updateDiamondTextBlock(count);
    }

    private addUpdateCoinTextBlock(count: number): void {
        this.getSoulBonePanel.updateCoinTextBlock(count);
    }

    private onOpenSoulBonePanel(): void {
        this.getSoulBonePanel.show();
        mw.PurchaseService.getArkBalance(); // 触发代币余额刷新。接收更新的值要用mw.PurchaseService.onArkBalanceUpdated
        Event.dispatchToLocal(`SyncDiamondCount`);
        Event.dispatchToLocal(`SyncCoinCount`);
    }

    protected onEnterScene(sceneType: number): void {
        this.initSoulBoneData();
    }

    private soulBoneLvs: MapEx.MapExClass<number> = {};
    private probability: number = 0;
    private initSoulBoneData(): void {
        this.soulBoneLvs = this.data.soulBoneLvs;
        this.probability = this.data.probability;
        if (this.probability < 50) this.setProbability(50);
    }

    public getSoulBoneLv(partId: number): number {
        if (MapEx.has(this.soulBoneLvs, partId)) {
            return MapEx.get(this.soulBoneLvs, partId);
        } else {
            return 0;
        }
    }

    public setSoulBoneLv(partId: number, lv: number): void {
        if (MapEx.has(this.soulBoneLvs, partId)) {
            let oldLv = MapEx.get(this.soulBoneLvs, partId);
            MapEx.set(this.soulBoneLvs, partId, Math.round(oldLv + lv));
        } else {
            MapEx.set(this.soulBoneLvs, partId, Math.round(lv));
        }
        this.server.net_setSoulBoneLv(partId, lv);
    }

    public get getTotalUpStarOffsetValue(): number {
        if (!this.soulBoneLvs || MapEx.count(this.soulBoneLvs) == 0) return 0;
        let totalUpStarOffsetValue = 0;
        MapEx.forEach(this.soulBoneLvs, (key: number, value: number) => {
            totalUpStarOffsetValue += (value * upStarOffsetValue);
        });
        return totalUpStarOffsetValue;
    }

    public get getLevel(): number {
        return this.getPlayerModuleC.getLv;
    }

    public get getDiamond(): number {
        return this.getPlayerModuleC.getDiamond;
    }
    public setDiamond(diamond: number): void {
        this.getPlayerModuleC.saveDiamond(diamond);
    }

    public get getCoin(): number {
        return this.getPlayerModuleC.getCoin();
    }
    public setCoin(coin: number): void {
        this.getPlayerModuleC.saveCoin(coin);
    }

    public get getProbability(): number {
        return Math.round(this.probability);
    }

    public setProbability(probability: number): void {
        this.probability = probability;
        this.server.net_setProbability(probability);
    }

    private upProbabilitySuccessCallBack: () => void = null;
    public upProbability(callBack: () => void): void {
        if (this.probability >= 100) {
            Notice.showDownNotice(`${GameConfig.Language.Text_EnhanceTheProbabilityOfSuccess.Value}${100}%`)
            return;
        }
        this.upProbabilitySuccessCallBack = callBack;

        this.getUpProbabilityPanel.showPanel(() => {
            mw.PurchaseService.placeOrder(upProbabilityByArkCommodityId, 1, (status, msg) => {
                mw.PurchaseService.getArkBalance();//刷新代币数量
                if (status != 200) return;
                if (this.upProbabilitySuccessCallBack) this.upProbabilitySuccessCallBack();
            });
        }, () => {
            if (this.getDiamond >= costDiamondUpProbability) {
                this.setDiamond(-costDiamondUpProbability);
                this.setProbability(this.probability + 10);
                if (this.upProbabilitySuccessCallBack) this.upProbabilitySuccessCallBack();
            } else {
                Notice.showDownNotice(GameConfig.Language.Text_DiamondShortage.Value);
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
        }, () => {

        }, this.probability + 10, 100);
    }

    public net_deliverGoods(commodityId: string, amount: number): void {
        if (commodityId == upProbabilityByArkCommodityId) {
            this.setProbability(100);
            if (this.upProbabilitySuccessCallBack) this.upProbabilitySuccessCallBack();
        }
    }

    private strengthenSuccessCallBack: () => void = null;
    public strengthen(callBack: () => void, selectPartId: number, costCoin: number, costDiamond: number): void {
        this.strengthenSuccessCallBack = callBack;
        this.setCoin(-costCoin);
        this.setDiamond(-costDiamond);
        this.setSoulBoneLv(selectPartId, 1);
        if (this.strengthenSuccessCallBack) this.strengthenSuccessCallBack();
    }
}

export class SoulBoneModuleS extends ModuleS<SoulBoneModuleC, SoulBone> {

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
    public net_setProbability(probability: number): void {
        this.currentData.setProbability(probability);
    }

    @Decorator.noReply()
    public net_setSoulBoneLv(partId: number, lv: number): void {
        this.currentData.setSoulBoneLv(partId, lv);
    }
}