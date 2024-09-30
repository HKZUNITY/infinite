import { Notice } from "../../common/notice/Notice";
import GlobalData from "../../const/GlobalData";
import { Utils } from "../../Tools/utils";
import LotteryItem_Generate from "../../ui-generate/module/LotteryModule/LotteryItem_generate";
import LotteryPanel_Generate from "../../ui-generate/module/LotteryModule/LotteryPanel_generate";
import LotteryResultPanel_Generate from "../../ui-generate/module/LotteryModule/LotteryResultPanel_generate";
import { BagModuleC } from "../BagModule/BagModule";
import HUDModuleC from "../HUDModule/HUDModuleC";
import HUDPanel from "../HUDModule/ui/HUDPanel";
import { LevelItem } from "../LevelModule/LevelModule";
import PlayerModuleC from "../PlayerModule/PlayerModuleC";

export enum RewardType {
    None,
    Diamond,
    Lv,
    Bag
}

const lotteryDatas: Map<number, { isLimit: boolean, ratio: number[], icon: string, name: string, rewardType: RewardType, reward: number, pos: mw.Vector2, bgIcon: string }> = new Map<number, { isLimit: boolean, ratio: number[], icon: string, name: string, rewardType: RewardType, reward: number, pos: mw.Vector2, bgIcon: string }>();
lotteryDatas.set(1, { isLimit: false, ratio: [1, 500], icon: "icon_404083", name: "空奖-哈哈", rewardType: RewardType.None, reward: 1, pos: new mw.Vector2(0, 0), bgIcon: "181426" });//181426 181425 181424 181423 181420
lotteryDatas.set(2, { isLimit: false, ratio: [501, 739], icon: "icon_103221", name: "钻石", rewardType: RewardType.Diamond, reward: 1, pos: new mw.Vector2(230, 0), bgIcon: "181424" });
lotteryDatas.set(3, { isLimit: false, ratio: [740, 749], icon: "icon_103221", name: "钻石", rewardType: RewardType.Diamond, reward: 108, pos: new mw.Vector2(460, 0), bgIcon: "181423" });
lotteryDatas.set(4, { isLimit: false, ratio: [750, 750], icon: "icon_103217", name: "钻石", rewardType: RewardType.Diamond, reward: 1088, pos: new mw.Vector2(690, 0), bgIcon: "181420" });
lotteryDatas.set(5, { isLimit: false, ratio: [751, 978], icon: "icon_148883", name: "等级", rewardType: RewardType.Lv, reward: 1, pos: new mw.Vector2(690, 230), bgIcon: "181424" });
lotteryDatas.set(6, { isLimit: false, ratio: [979, 988], icon: "icon_148883", name: "等级", rewardType: RewardType.Lv, reward: 108, pos: new mw.Vector2(690, 460), bgIcon: "181423" });
lotteryDatas.set(7, { isLimit: false, ratio: [989, 989], icon: "icon_148883", name: "等级", rewardType: RewardType.Lv, reward: 1088, pos: new mw.Vector2(460, 460), bgIcon: "181420" });
lotteryDatas.set(8, { isLimit: true, ratio: [990, 995], icon: "mode_141499", name: "神级魔王", rewardType: RewardType.Bag, reward: 20058, pos: new mw.Vector2(230, 460), bgIcon: "181420" });
lotteryDatas.set(9, { isLimit: true, ratio: [996, 999], icon: "mode_142921", name: "四代火影", rewardType: RewardType.Bag, reward: 20059, pos: new mw.Vector2(0, 460), bgIcon: "181420" });
lotteryDatas.set(10, { isLimit: true, ratio: [1000, 1000], icon: "mode_163289", name: "美杜莎女王", rewardType: RewardType.Bag, reward: 20060, pos: new mw.Vector2(0, 230), bgIcon: "181420" });
const oneCostCoin: number = 2888888;
const oneCostArk: number = 2;
const tenCostCoin: number = 28888888;
const tenCostArk: number = 20;
const oneCommodityId: string = "7I6uNtkFmg00001Nx";
const tenCommodityId: string = "6tOZfQYVTV90001Ny";

export class LotteryItem extends LotteryItem_Generate {
    private lotteryModuleC: LotteryModuleC = null;
    private get getLotteryModuleC(): LotteryModuleC {
        if (!this.lotteryModuleC) {
            this.lotteryModuleC = ModuleService.getModule(LotteryModuleC);
        }
        return this.lotteryModuleC;
    }

    protected onStart(): void {
        this.initUI();
    }

    private initUI(): void {
        this.mHasTextBlock.text = `已拥有`;
        this.onOffUI(false);
    }

    private key: number = 0;
    public initItem(key: number): void {
        this.key = key;
        this.updateUI();
    }

    private updateUI(): void {
        let lotteryData = lotteryDatas.get(this.key);
        this.mBgImage.imageGuid = lotteryData.bgIcon;
        this.mRewardTextBlock.text = `${lotteryData.name}+${(lotteryData.rewardType == RewardType.Bag) ? 1 : lotteryData.reward}`;
        let iconStr = lotteryData.icon.split(`_`);
        if (iconStr[0] == `icon`) {
            this.mIconImage.imageGuid = iconStr[1];
        } else if (iconStr[0] == `mode`) {
            Utils.setImageByAssetIconData(this.mIconImage, iconStr[1]);
        }
        if (lotteryData.isLimit && this.getLotteryModuleC.isHas(lotteryData.reward)) {
            this.mHasCanvas.visibility = mw.SlateVisibility.SelfHitTestInvisible;
        } else {
            this.mHasCanvas.visibility = mw.SlateVisibility.Collapsed;
        }
        this.mRatioTextBlock.text = `中奖概率\n${(((lotteryData.ratio[1] - lotteryData.ratio[0] + 1) / 1000) * 100).toFixed(1)}%`;
    }

    public onOffUI(on: boolean): void {
        this.mSelectImage.visibility = on ? mw.SlateVisibility.SelfHitTestInvisible : mw.SlateVisibility.Collapsed;
    }

    public setHasCanvas(on: boolean): void {
        this.mHasCanvas.visibility = on ? mw.SlateVisibility.SelfHitTestInvisible : mw.SlateVisibility.Collapsed;
    }
}

export class LotteryPanel extends LotteryPanel_Generate {
    private lotteryModuleC: LotteryModuleC = null;
    private get getLotteryModuleC(): LotteryModuleC {
        if (!this.lotteryModuleC) {
            this.lotteryModuleC = ModuleService.getModule(LotteryModuleC);
        }
        return this.lotteryModuleC;
    }

    protected onStart(): void {
        this.initUI();
        this.bindButton();
    }

    private initUI(): void {
        this.mTitleTextBlock.text = `金币抽奖`;
        this.mIconCoinImage.imageGuid = GlobalData.coinIcon;
        this.mIconArkImage.imageGuid = GlobalData.arkIcon;
        this.mOneCoinTextBlock.text = `抽1次`;
        this.mOneArkTextBlock.text = `抽1次`;
        this.mTenCoinTextBlock.text = `抽10次`;
        this.mTenArkTextBlock.text = `抽10次`;
        this.mOneCoinTipsTextBlock.text = `消耗${oneCostCoin}金币`;
        this.mOneArkTipsTextBlock.text = `消耗${oneCostArk}派队币`;
        this.mTenCoinTipsTextBlock.text = `消耗${tenCostCoin}金币`;
        this.mTenArkTipsTextBlock.text = `消耗${tenCostArk}派队币`;
        this.mMaskImage.visibility = mw.SlateVisibility.Collapsed;
        this.initItem();
    }

    private bindButton(): void {
        this.mCloseButton.onClicked.add(this.addCloseButton.bind(this));
        this.mOneCoinButton.onClicked.add(this.addOneCoinButton.bind(this));
        this.mOneArkButton.onClicked.add(this.addOneArkButton.bind(this));
        this.mTenCoinButton.onClicked.add(this.addTenCoinButton.bind(this));
        this.mTenArkButton.onClicked.add(this.addTenArkButton.bind(this));
    }

    private addOneCoinButton(): void {
        this.getLotteryModuleC.oneCoinLottery();
    }

    private addOneArkButton(): void {
        this.getLotteryModuleC.oneArkLottery();
    }

    private addTenCoinButton(): void {
        this.getLotteryModuleC.tenCoinLottery();
    }

    private addTenArkButton(): void {
        this.getLotteryModuleC.tenArkLottery();
    }

    private addCloseButton(): void {
        this.hideTween();
    }

    private lotteryItems: LotteryItem[] = [];
    private initItem(): void {
        lotteryDatas.forEach((value: {
            isLimit: boolean;
            ratio: number[];
            icon: string;
            name: string;
            rewardType: RewardType;
            reward: number;
            pos: mw.Vector2;
            bgIcon: string;
        }, key: number) => {
            let lotteryItem = mw.UIService.create(LotteryItem);
            lotteryItem.initItem(key);
            this.mCanvas.addChild(lotteryItem.uiObject);
            lotteryItem.uiObject.position = value.pos;
            this.lotteryItems.push(lotteryItem);
        });
    }

    public updateCoinTextBlock(count: number): void {
        this.mCoinCountTextBlock.text = Utils.integerUnitConversionStr(count);
    }

    public updateArkTextBlock(arkCount: number): void {
        this.mArkCountTextBlock.text = `${arkCount}`;
    }

    public updateItemHasState(key: number): void {
        if (this.lotteryItems.length <= key) {
            this.lotteryItems[key - 1].setHasCanvas(true);
        }
    }

    private oneIndex: number = 0;
    private onePeriod: number = 0;
    public startOneLottery(key: number, complete: () => void): void {
        this.mMaskImage.visibility = mw.SlateVisibility.Visible;
        this.oneIndex = 0;
        this.onePeriod = 0;

        let first = TimeUtil.setInterval(() => {
            if (this.oneIndex >= 10) {
                this.oneIndex = 0;
                this.onePeriod++;
                if (this.onePeriod >= 4) {
                    SoundService.playSound("120847");
                    this.updateItemSelectState(this.oneIndex++);
                    TimeUtil.clearInterval(first);
                    if (key == 1) {
                        if (complete) complete();
                        this.mMaskImage.visibility = mw.SlateVisibility.Collapsed;
                    } else {
                        let second = TimeUtil.setInterval(() => {
                            if (this.oneIndex >= key) {
                                TimeUtil.clearInterval(second);
                                if (complete) complete();
                                this.mMaskImage.visibility = mw.SlateVisibility.Collapsed;
                            } else {
                                this.updateItemSelectState(this.oneIndex++);
                                SoundService.playSound("120847");
                            }
                        }, 0.3);
                    }
                    return;
                }
            }

            SoundService.playSound("120847");
            this.updateItemSelectState(this.oneIndex++);
        }, 0.1);
    }

    public startTenLottery(key: number[], complete: () => void): void {
        this.mMaskImage.visibility = mw.SlateVisibility.Visible;

        let time: number = 0;
        let indexs: number[] = Utils.getRandomArr([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 5);
        for (let i = 0; i < this.lotteryItems.length; ++i) {
            if (indexs.includes(i)) {
                this.lotteryItems[i].onOffUI(true);
            } else {
                this.lotteryItems[i].onOffUI(false);
            }
        }
        SoundService.playSound("137566");
        let first = TimeUtil.setInterval(() => {
            let indexs: number[] = Utils.getRandomArr([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 5);
            for (let i = 0; i < this.lotteryItems.length; ++i) {
                if (indexs.includes(i)) {
                    this.lotteryItems[i].onOffUI(true);
                } else {
                    this.lotteryItems[i].onOffUI(false);
                }
            }
            SoundService.playSound("137566");
            time += 0.3;
            if (time >= 5) {
                TimeUtil.clearInterval(first);
                SoundService.playSound("137566");
                for (let i = 0; i < this.lotteryItems.length; ++i) {
                    if (key.includes((i + 1))) {
                        this.lotteryItems[i].onOffUI(true);
                    } else {
                        this.lotteryItems[i].onOffUI(false);
                    }
                }
                if (complete) complete();
                this.mMaskImage.visibility = mw.SlateVisibility.Collapsed;
            }
        }, 0.3);
    }

    private preIndex: number = -1;
    private updateItemSelectState(index: number): void {
        if (this.preIndex >= 0) this.lotteryItems[this.preIndex].onOffUI(false);
        this.preIndex = index;
        this.lotteryItems[this.preIndex].onOffUI(true);
    }

    private hudPanel: HUDPanel = null;
    private get getHudPanel(): HUDPanel {
        if (!this.hudPanel) {
            this.hudPanel = mw.UIService.getUI(HUDPanel);
        }
        return this.hudPanel
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

export class LotteryResultPanel extends LotteryResultPanel_Generate {
    protected onStart(): void {
        this.layer = mw.UILayerMiddle;
        this.bindButton();
    }

    private bindButton(): void {
        this.mCloseButton.onClicked.add(this.addCloseButton.bind(this));
    }

    private addCloseButton(): void {
        this.hide();
    }

    public showPanel(keys: number[]): void {
        for (let i = 0; i < keys.length; ++i) {
            (this[`mTextBlock_${i}`] as mw.TextBlock).text = `${lotteryDatas.get(keys[i]).name} +${lotteryDatas.get(keys[i]).reward}`;
            (this[`mImage_${i}`] as mw.Image).visibility = mw.SlateVisibility.SelfHitTestInvisible;
        }
        for (let i = keys.length; i < 10; ++i) {
            (this[`mImage_${i}`] as mw.Image).visibility = mw.SlateVisibility.Collapsed;
        }
        this.mContentCanvas.position = mw.Vector2.zero;
        this.show();
    }
}

const lotteryTriggerMap: Map<number, { triggers: string[], worldUIIds: string[], name: string }> = new Map<number, { triggers: string[], worldUIIds: string[], name: string }>();
lotteryTriggerMap.set(1, { triggers: ["1784616E"], worldUIIds: ["0D23C019"], name: `金币抽奖` });
export class LotteryModuleC extends ModuleC<LotteryModuleS, null> {
    private lotteryPanel: LotteryPanel = null;
    private get getLotteryPanel(): LotteryPanel {
        if (!this.lotteryPanel) {
            this.lotteryPanel = mw.UIService.getUI(LotteryPanel);
        }
        return this.lotteryPanel;
    }

    private lotteryResultPanel: LotteryResultPanel = null;
    private get getLotteryResultPanel(): LotteryResultPanel {
        if (!this.lotteryResultPanel) {
            this.lotteryResultPanel = mw.UIService.getUI(LotteryResultPanel);
        }
        return this.lotteryResultPanel;
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

    private bagModuleC: BagModuleC = null;
    private get getBagModuleC(): BagModuleC {
        if (!this.bagModuleC) {
            this.bagModuleC = ModuleService.getModule(BagModuleC);
        }
        return this.bagModuleC;
    }

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        this.initUI();
        this.initAction();
    }

    protected onEnterScene(sceneType: number): void {
        this.initTrigger();
    }

    private initUI(): void {
        this.lotteryResultPanel = mw.UIService.getUI(LotteryResultPanel);
    }

    private initAction(): void {
        Event.addLocalListener(`UpdateCoinTextBlock`, this.addUpdateCoinTextBlock.bind(this));
        mw.PurchaseService.onArkBalanceUpdated.add(this.addArkUpdate.bind(this));
        this.getHudModuleC.onOpenLotteryAction.add(this.addOpenLotteryPanel.bind(this));
    }

    private addOpenLotteryPanel(): void {
        this.getLotteryPanel.show();
    }

    private addUpdateCoinTextBlock(count: number): void {
        this.getLotteryPanel.updateCoinTextBlock(count);
    }

    private addArkUpdate(amount: number): void {
        //刷新逻辑，amount为当前代币数量
        console.error(`ArkModuleC addArkUpdate amount: ${amount}`);
        this.getLotteryPanel.updateArkTextBlock(amount);
    }

    public oneCoinLottery(): void {
        let coin = this.getPlayerModuleC.getCoin();
        if (coin >= oneCostCoin) {
            this.getPlayerModuleC.saveCoin(-oneCostCoin);
            this.calculateOneLottery();
        } else {
            Notice.showDownNotice(`金币不足`);
            if (mw.SystemUtil.isPIE) {
                this.calculateOneLottery();
            } else {
                mw.PurchaseService.placeOrder(oneCommodityId, 1, (status, msg) => {
                    mw.PurchaseService.getArkBalance();//刷新代币数量
                });
            }
        }
    }

    public oneArkLottery(): void {
        if (mw.SystemUtil.isPIE) {
            this.calculateOneLottery();
        } else {
            mw.PurchaseService.placeOrder(oneCommodityId, 1, (status, msg) => {
                mw.PurchaseService.getArkBalance();//刷新代币数量
            });
        }
    }

    public tenCoinLottery(): void {
        let coin = this.getPlayerModuleC.getCoin();
        if (coin >= tenCostCoin) {
            this.getPlayerModuleC.saveCoin(-tenCostCoin);
            this.calculateTenLottery();
        } else {
            Notice.showDownNotice(`金币不足`);
            if (mw.SystemUtil.isPIE) {
                this.calculateTenLottery();
            } else {
                mw.PurchaseService.placeOrder(tenCommodityId, 1, (status, msg) => {
                    mw.PurchaseService.getArkBalance();//刷新代币数量
                });
            }
        }
    }

    public tenArkLottery(): void {
        if (mw.SystemUtil.isPIE) {
            this.calculateTenLottery();
        } else {
            mw.PurchaseService.placeOrder(tenCommodityId, 1, (status, msg) => {
                mw.PurchaseService.getArkBalance();//刷新代币数量
            });
        }
    }


    public net_deliverGoods(commodityId: string, amount: number): void {
        if (commodityId == oneCommodityId) {
            this.calculateOneLottery();
        } else if (commodityId == tenCommodityId) {
            this.calculateTenLottery();
        }
    }

    private calculateOneLottery(): void {
        let calculateKey = this.calculateKey();
        while ((lotteryDatas.get(calculateKey).isLimit) && this.isHas(lotteryDatas.get(calculateKey).reward)) {
            calculateKey = this.calculateKey();
        }
        let diamond: number = 0;
        let lv: number = 0;
        let bagIds: number[] = [];
        switch (lotteryDatas.get(calculateKey).rewardType) {
            case RewardType.None:
                break;
            case RewardType.Diamond:
                diamond = lotteryDatas.get(calculateKey).reward;
                break;
            case RewardType.Lv:
                lv = lotteryDatas.get(calculateKey).reward;
                break;
            case RewardType.Bag:
                let bagId = lotteryDatas.get(calculateKey).reward;
                bagIds.push(bagId);
                break;
        }
        this.getLotteryPanel.startOneLottery(calculateKey, () => {
            this.saveLottery(diamond, lv, bagIds);
            this.getLotteryResultPanel.showPanel([calculateKey]);
            TimeUtil.delaySecond(0.1).then(() => {
                this.getLotteryResultPanel.showPanel([calculateKey]);
            });
            if (lotteryDatas.get(calculateKey).isLimit) this.getLotteryPanel.updateItemHasState(calculateKey);
            Notice.showDownNotice(`恭喜中奖`);
        });
    }

    private calculateTenLottery(): void {
        let diamond: number = 0;
        let lv: number = 0;
        let bagIds: number[] = [];
        let calculateKeys: number[] = [];

        for (let i = 0; i < 10; ++i) {
            let calculateKey = this.calculateKey();
            while ((lotteryDatas.get(calculateKey).isLimit) &&
                (this.isHas(lotteryDatas.get(calculateKey).reward) || bagIds.includes(lotteryDatas.get(calculateKey).reward))) {
                calculateKey = this.calculateKey();
            }
            calculateKeys.push(calculateKey);
            switch (lotteryDatas.get(calculateKey).rewardType) {
                case RewardType.None:
                    break;
                case RewardType.Diamond:
                    diamond += lotteryDatas.get(calculateKey).reward;
                    break;
                case RewardType.Lv:
                    lv += lotteryDatas.get(calculateKey).reward;
                    break;
                case RewardType.Bag:
                    let bagId = lotteryDatas.get(calculateKey).reward;
                    bagIds.push(bagId);
                    break;
            }
        }
        this.getLotteryPanel.startTenLottery(calculateKeys, () => {
            this.saveLottery(diamond, lv, bagIds);
            this.getLotteryResultPanel.showPanel(calculateKeys);
            TimeUtil.delaySecond(0.1).then(() => {
                this.getLotteryResultPanel.showPanel(calculateKeys);
            });
            calculateKeys.forEach((key: number) => {
                if (lotteryDatas.get(key).isLimit) this.getLotteryPanel.updateItemHasState(key);
            });
            Notice.showDownNotice(`恭喜中奖`);
        });
    }

    private calculateKey(): number {
        let calculateValue = Utils.getRandomInteger(1, 1000);
        let calculateKey: number = 1;
        lotteryDatas.forEach((value: {
            isLimit: boolean;
            ratio: number[];
            icon: string;
            name: string;
            rewardType: RewardType;
            reward: number;
            pos: mw.Vector2;
            bgIcon: string;
        }, key: number) => {
            if (calculateValue >= value.ratio[0] && calculateValue <= value.ratio[1]) {
                calculateKey = key;
            }
        });
        return calculateKey;
    }

    private saveLottery(diamond: number, lv: number, bagIds: number[]): void {
        if (diamond > 0) {
            Notice.showDownNotice(`获得${diamond}钻石`);
            this.getPlayerModuleC.saveDiamond(diamond);
        }

        if (lv > 0) {
            this.getPlayerModuleC.upLvByCount(lv);
            Notice.showDownNotice(`等级+${lv}`);
        }

        if (bagIds && bagIds.length > 0) {
            for (let i = 0; i < bagIds.length; ++i) {
                this.getBagModuleC.setBagId(bagIds[i]);
            }
            Notice.showDownNotice(`打开背包使用`);
        }
    }

    public isHas(key: number): boolean {
        return this.getBagModuleC.isHasBagId(key);
    }

    private initTrigger(): void {
        lotteryTriggerMap.forEach((value: {
            triggers: string[];
            worldUIIds: string[];
            name: string;
        }, key: number) => {
            value.triggers.forEach((triggerId: string) => {
                mw.GameObject.asyncFindGameObjectById(triggerId).then((go: mw.GameObject) => {
                    let trigger = go as mw.Trigger;
                    trigger.onEnter.add((character: mw.Character) => {
                        if (character.gameObjectId != this.localPlayer.character.gameObjectId) return;
                        this.getLotteryPanel.show();
                    });
                });
            });
            value.worldUIIds.forEach((worldId: string) => {
                mw.GameObject.asyncFindGameObjectById(worldId).then((v: mw.GameObject) => {
                    let worldUI: mw.UIWidget = v as mw.UIWidget;
                    let levelItem = mw.UIService.create(LevelItem);
                    levelItem.updateLevelTextBlock(value.name);
                    worldUI.setTargetUIWidget(levelItem.uiWidgetBase);
                });
            });
        });
    }
}

export class LotteryModuleS extends ModuleS<LotteryModuleC, null> {

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
}