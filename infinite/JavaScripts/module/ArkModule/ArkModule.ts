import { Notice } from "../../common/notice/Notice";
import { GameConfig } from "../../config/GameConfig";
import GlobalData from "../../const/GlobalData";
import { GeneralManager } from "../../Modified027Editor/ModifiedStaticAPI";
import { MapEx } from "../../Tools/MapEx";
import { Utils } from "../../Tools/utils";
import ArkItem_Generate from "../../ui-generate/module/ArkModule/ArkItem_generate";
import ArkPanel_Generate from "../../ui-generate/module/ArkModule/ArkPanel_generate";
import GiftBagPanel_Generate from "../../ui-generate/module/ArkModule/GiftBagPanel_generate";
import LimitTimePanel_Generate from "../../ui-generate/module/ArkModule/LimitTimePanel_generate";
import HUDModuleC from "../HUDModule/HUDModuleC";
import HUDPanel from "../HUDModule/ui/HUDPanel";
import PlayerModuleC from "../PlayerModule/PlayerModuleC";

const rewardDiamond: Map<string, { isLimit: boolean, icon: string, rewardCount: number, price: number, itemPos: mw.Vector2 }> = new Map<string, { isLimit: boolean, icon: string, rewardCount: number, price: number, itemPos: mw.Vector2 }>();
rewardDiamond.set("4R8o2Ca4XZM0001M5", { isLimit: false, icon: "103215", rewardCount: 100, price: 100, itemPos: new mw.Vector2(178, 0) });
rewardDiamond.set("4kDVCA92LDZ0001M6", { isLimit: false, icon: "103217", rewardCount: 600, price: 600, itemPos: new mw.Vector2(422, 0) });
rewardDiamond.set("ASo9Gdekb5M0001M7", { isLimit: false, icon: "103218", rewardCount: 1000, price: 1000, itemPos: new mw.Vector2(750, 0) });
rewardDiamond.set("30A0419vSs50001M8", { isLimit: true, icon: "103221", rewardCount: 1000, price: 600, itemPos: new mw.Vector2(178, 320) });
rewardDiamond.set("6ye4kcgqLtk0001M9", { isLimit: true, icon: "103218", rewardCount: 3000, price: 1800, itemPos: new mw.Vector2(422, 320) });
rewardDiamond.set("2tt47nQ6Txb0001MA", { isLimit: true, icon: "103218", rewardCount: 10800, price: 6800, itemPos: new mw.Vector2(750, 320) });
const arkIcon: string = "312541";

export class ArkItem extends ArkItem_Generate {
    private arkModuleC: ArkModuleC = null;
    private get getArkModuleC(): ArkModuleC {
        if (!this.arkModuleC) {
            this.arkModuleC = ModuleService.getModule(ArkModuleC);
        }
        return this.arkModuleC;
    }

    protected onStart(): void {
        this.initTextBlock();
        this.bindButton();
    }

    private initTextBlock(): void {
        if (GlobalData.languageId == 0) {
            this.mRewardTextBlock.fontSize = 20;
            this.mDayTextBlock.fontSize = 15;
        } else {
            this.mRewardTextBlock.fontSize = 28;
            this.mDayTextBlock.fontSize = 25;
        }
    }

    private bindButton(): void {
        this.mClickButton.onClicked.add(this.addClickButton.bind(this));
    }

    private addClickButton(): void {
        this.getArkModuleC.placeOrder(this.commodityId, () => {
            if (rewardDiamond.get(this.commodityId).isLimit) {
                this.mHasCanvas.visibility = mw.SlateVisibility.SelfHitTestInvisible;
                this.mHasTextBlock.text = GameConfig.Language.Text_Soldouttoday.Value;
            }
        });
    }

    private commodityId: string = "";
    public initArkItem(commodityId: string): void {
        this.commodityId = commodityId;
        this.updateUI();
    }

    private updateUI(): void {
        if (rewardDiamond.get(this.commodityId).isLimit) {
            this.mDayTextBlock.text = GameConfig.Language.Text_Limitedtoonepurchaseperday.Value;
            if (!this.getArkModuleC.isBuy(this.commodityId)) {
                this.mHasCanvas.visibility = mw.SlateVisibility.Collapsed;
            } else {
                this.mHasCanvas.visibility = mw.SlateVisibility.SelfHitTestInvisible;
                this.mHasTextBlock.text = GameConfig.Language.Text_Soldouttoday.Value;
            }
        } else {
            this.mDayTextBlock.text = GameConfig.Language.Text_Nopurchaserestrictions.Value;
            this.mHasCanvas.visibility = mw.SlateVisibility.Collapsed;
        }
        let data = rewardDiamond.get(this.commodityId);
        this.mIconImage.imageGuid = data.icon;
        this.mRewardTextBlock.text = `${GameConfig.Language.Text_Diamonds.Value} +${data.rewardCount}`;
        this.mTipsIconImage.imageGuid = arkIcon;
        this.mTipsTextBlock.text = `${data.price}`;
    }
}

export class ArkPanel extends ArkPanel_Generate {
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
        this.mIconArkImage.imageGuid = arkIcon;
        this.mTitleTextBlock.text = GameConfig.Language.Text_Rechargediamonds.Value;
        this.initArkItem();
    }

    private bindButton(): void {
        this.mCloseButton.onClicked.add(this.addCloseButton.bind(this));
    }

    private addCloseButton(): void {
        this.hideTween();
    }

    private arkItems: ArkItem[] = [];
    private initArkItem(): void {
        rewardDiamond.forEach((value: {
            icon: string;
            rewardCount: number;
            price: number;
            itemPos: mw.Vector2;
        }, key: string) => {
            let arkItem = mw.UIService.create(ArkItem);
            arkItem.initArkItem(key);
            this.mCanvas.addChild(arkItem.uiObject);
            arkItem.uiObject.position = value.itemPos;
            this.arkItems.push(arkItem);
        });
    }

    public updateArkTextBlock(arkCount: number): void {
        this.mArkCountTextBlock.text = `${arkCount}`;
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

    public updateUserIdTextBlock(str: string): void {
        this.mUserIdTextBlock.text = `${str ? str : `UserId`}:${Player.localPlayer.userId}`;
    }
}

export class ArkData extends Subdata {
    @Decorator.persistence()
    public lastDayStr: string = "";

    @Decorator.persistence()
    public secondDayStr: string = "";

    @Decorator.persistence()
    public isLimitStrs: MapEx.MapExClass<string> = {};

    @Decorator.persistence()
    public isGetGiftBags: MapEx.MapExClass<boolean> = {};

    public setLimitStr(key: string, day: string): void {
        MapEx.set(this.isLimitStrs, key, day);
        this.save(true);
    }

    public setGetGiftBag(key: string, isGet: boolean): void {
        MapEx.set(this.isGetGiftBags, key, isGet);
        this.save(true);
    }

    public isGetGiftBag(key: string): boolean {
        if (!this.isGetGiftBags || MapEx.count(this.isGetGiftBags) == 0) return false;
        return MapEx.has(this.isGetGiftBags, key);
    }
}

export class ArkModuleC extends ModuleC<ArkModuleS, ArkData> {
    private arkPanel: ArkPanel = null;
    private get getArkPanel(): ArkPanel {
        if (!this.arkPanel) {
            this.arkPanel = UIService.getUI(ArkPanel);
        }
        return this.arkPanel;
    }
    private giftBagPanel: GiftBagPanel = null;
    private get getGiftBagPanel(): GiftBagPanel {
        if (!this.giftBagPanel) {
            this.giftBagPanel = mw.UIService.getUI(GiftBagPanel);
        }
        return this.giftBagPanel;
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

    private limitTimePanel: LimitTimePanel = null;
    private get getLimitTimePanel(): LimitTimePanel {
        if (!this.limitTimePanel) {
            this.limitTimePanel = UIService.getUI(LimitTimePanel);
        }
        return this.limitTimePanel;
    }

    protected onStart(): void {
        this.bindAction();
        InputUtil.onKeyDown(mw.Keys.P, () => {
            this.getArkPanel.show();
        });
        InputUtil.onKeyDown(mw.Keys.O, () => {
            this.getGiftBagPanel.show();
        });
    }

    private bindAction(): void {
        mw.PurchaseService.onArkBalanceUpdated.add(this.addArkUpdate.bind(this));
        this.getHudModuleC.onOpenArkAction.add(this.addOpenArkPanel.bind(this));
        this.getHudModuleC.onOpenGetAction.add(this.addOpenGiftBagPanel.bind(this));
        this.getHudModuleC.onOpenLimitTimeAction.add(() => {
            this.getLimitTimePanel.show();
        });
    }

    protected onEnterScene(sceneType: number): void {
        this.isLimitStrs = this.data.isLimitStrs;
    }

    private addArkUpdate(amount: number): void {
        //刷新逻辑，amount为当前代币数量
        console.error(`ArkModuleC addArkUpdate amount: ${amount}`);
        this.getArkPanel.updateArkTextBlock(amount);
    }

    private addOpenArkPanel(): void {
        this.getArkPanel.show();
        mw.PurchaseService.getArkBalance(); // 触发代币余额刷新。接收更新的值要用mw.PurchaseService.onArkBalanceUpdated
    }

    private isCanContinueClick: boolean = true;
    public placeOrder(commodityId: string, buySuccessCallback: () => void): void {
        if (rewardDiamond.get(commodityId).isLimit && this.isBuy(commodityId)) {
            Notice.showDownNotice(GameConfig.Language.Text_SoldouttodayPleaseReplaceWithOtherProductsToPurchase.Value);
            return;
        }
        if (!this.isCanContinueClick) {
            Notice.showDownNotice(StringUtil.format(GameConfig.Language.Text_CoolForSeconds.Value, 3));
            return;
        }
        this.isCanContinueClick = false;
        TimeUtil.delaySecond(3).then(() => {
            this.isCanContinueClick = true;
        });
        if (mw.SystemUtil.isPIE) {
            if (rewardDiamond.get(commodityId).isLimit) this.setLimitStr(commodityId);
            if (buySuccessCallback) buySuccessCallback();
            let rewardCount = rewardDiamond.get(commodityId).rewardCount;
            Notice.showDownNotice(`${GameConfig.Language.Text_Diamonds.Value}+${rewardCount}`);
            this.getPlayerModuleC.saveDiamond(rewardCount);
        } else {
            mw.PurchaseService.placeOrder(commodityId, 1, (status, msg) => {
                mw.PurchaseService.getArkBalance();//刷新代币数量
                if (status != 200) return;
                if (rewardDiamond.get(commodityId).isLimit) this.setLimitStr(commodityId);
                if (buySuccessCallback) buySuccessCallback();
            });
        }
    }

    public net_deliverGoods(commodityId: string, amount: number): void {
        if (commodityId == "ATUscb1seFW0001eB") {
            this.getPlayerModuleC.saveDiamond(68888);
            this.getPlayerModuleC.saveCoin(68888);
            this.getPlayerModuleC.saveBone(888888888888);
            Notice.showDownNotice(`${GameConfig.Language.Text_Diamonds.Value}+${68888}`);
            Notice.showDownNotice(`${GameConfig.Language.Text_SoulBone.Value}+${68888}`);
            Notice.showDownNotice(`${GameConfig.Language.Text_GoldCoins.Value}+${888888888888}`);
            return;
        }
        //根据commodityId和amount来处理收货逻辑
        console.error(`ArkModuleC net_deliverGoods commodityId: ${commodityId}, amount: ${amount}`);
        let rewardCount = rewardDiamond.get(commodityId).rewardCount;
        Notice.showDownNotice(`${GameConfig.Language.Text_Diamonds.Value}+${rewardCount}`);
        this.getPlayerModuleC.saveDiamond(rewardCount);
    }

    public isBuy(key: string): boolean {
        if (MapEx.has(this.isLimitStrs, key)) {
            return MapEx.get(this.isLimitStrs, key) == Utils.getDay();
        }
        return false;
    }

    private isLimitStrs: MapEx.MapExClass<string> = {};
    public setLimitStr(key: string): void {
        let lastDayStr = Utils.getDay();
        MapEx.set(this.isLimitStrs, key, lastDayStr);
        this.server.net_setLimitStr(key, lastDayStr);
    }

    private addOpenGiftBagPanel(): void {
        this.getGiftBagPanel.show();
    }

    private isCanGetGiftBag: boolean = true;
    public getGiftBag(coodStr: string): void {
        if (!this.isCanGetGiftBag) {
            Notice.showDownNotice(StringUtil.format(GameConfig.Language.Text_CoolForSeconds.Value, 3));
            return;
        }
        this.isCanGetGiftBag = false;
        TimeUtil.delaySecond(3).then(() => { this.isCanGetGiftBag = true; });
        this.server.net_getGiftBag(coodStr);
    }

    public net_getGiftBag(giftBagCood: GiftBagCood, messageJson: string): void {
        if (giftBagCood == GiftBagCood.Success) {
            Notice.showDownNotice(GameConfig.Language.Text_ExchangeSuccessful.Value);
            let message = JSON.parse(messageJson);
            let giftBagData = message as GiftBagData;

            if (giftBagData?.diamond && giftBagData?.diamond > 0) {
                Notice.showDownNotice(`${GameConfig.Language.Text_Diamonds.Value}+${giftBagData.diamond}`);
                this.getPlayerModuleC.saveDiamond(giftBagData.diamond);
            }

            if (giftBagData?.lv && giftBagData?.lv > 0) {
                Notice.showDownNotice(`${GameConfig.Language.Text_Grade.Value}+${giftBagData.lv}`);
                this.getPlayerModuleC.upLvByCount(giftBagData.lv);
            }
        } else if (giftBagCood == GiftBagCood.Fail) {
            Notice.showDownNotice(GameConfig.Language.Text_GiftPackRedemptionCodeError.Value);
            Notice.showDownNotice(GameConfig.Language.Text_CollectionFailed.Value);
        } else if (giftBagCood == GiftBagCood.Exchanged) {
            Notice.showDownNotice(GameConfig.Language.Text_AlreadyredeemedNoNeedToRedeemAgain.Value);
        }
    }

    public net_syncArkStr(str: string): void {
        this.getArkPanel.updateUserIdTextBlock(str);
    }

    public limitTime(): void {
        mw.PurchaseService.placeOrder("ATUscb1seFW0001eB", 1, (status, msg) => {
            mw.PurchaseService.getArkBalance();//刷新代币数量
            if (status != 200) return;
        });
    }

    public useDiamond(): void {
        this.getPlayerModuleC.useDiamond();
    }
}

export class ArkModuleS extends ModuleS<ArkModuleC, ArkData> {
    protected onStart(): void {
        this.bindAction();
    }

    protected onPlayerEnterGame(player: mw.Player): void {
        this.syncArkStr(player);
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
    public net_setLimitStr(key: string, day: string): void {
        this.currentData.setLimitStr(key, day);
    }

    @Decorator.noReply()
    public net_getGiftBag(coodStr: string): void {
        // console.error(`ArkModuleS net_getGiftBag coodStr: ${coodStr}`);
        let player = this.currentPlayer;
        if (coodStr.length == 6) {
            let isGetGiftBag = DataCenterS.getData(player, ArkData).isGetGiftBag(coodStr);
            if (isGetGiftBag) {
                this.getClient(player).net_getGiftBag(GiftBagCood.Exchanged, null);
            } else {
                this.getCustomdata("WorldGiftBag").then((value: any) => {
                    if (!value) {
                        this.getClient(player).net_getGiftBag(GiftBagCood.Fail, null);
                        return;
                    }
                    let giftBagDatas: GiftBagData[] = value as GiftBagData[];
                    // console.error(`giftBagDatas:${JSON.stringify(giftBagDatas)}`);
                    let giftBagData: GiftBagData = null;
                    for (let i = 0; i < giftBagDatas.length; ++i) {
                        if (giftBagDatas[i].coodStr == coodStr) {
                            giftBagData = giftBagDatas[i];
                            break;
                        }
                    }
                    if (giftBagData) {
                        DataCenterS.getData(player, ArkData).setGetGiftBag(coodStr, true);
                        this.getClient(player).net_getGiftBag(GiftBagCood.Success, JSON.stringify(giftBagData));
                    } else {
                        this.getClient(player).net_getGiftBag(GiftBagCood.Fail, null);
                    }
                });
            }
        } else {
            PurchaseService.redeemGiftCode(player, coodStr, (result) => {
                this.getClient(player).net_getGiftBag(((result.status == 200 || result.status == 1) ? GiftBagCood.Success : GiftBagCood.Fail), result.message);
            });
        }
    }

    private async syncArkStr(player: mw.Player): Promise<void> {
        let str: string = await this.getCustomdata("WorldArkStr");
        this.getClient(player).net_syncArkStr(str);
    }

    public async getCustomdata(key: string): Promise<any> {
        let data = null;
        data = await GeneralManager.asyncRpcGetData(key);
        return data;
    }
}

export class GiftBagPanel extends GiftBagPanel_Generate {
    private hudPanel: HUDPanel = null;
    private get getHudPanel(): HUDPanel {
        if (!this.hudPanel) {
            this.hudPanel = mw.UIService.getUI(HUDPanel);
        }
        return this.hudPanel
    }
    private arkModuleC: ArkModuleC = null;
    private get getArkModuleC(): ArkModuleC {
        if (!this.arkModuleC) {
            this.arkModuleC = ModuleService.getModule(ArkModuleC);
        }
        return this.arkModuleC;
    }

    protected onStart(): void {
        this.initUI();
        this.bindButton();
    }

    private initUI(): void {
        this.mTitleTextBlock.text = GameConfig.Language.Text_GiftPackExchange.Value;
        this.mInputTipsTextBlock.text = GameConfig.Language.Text_PleaseEnterTheRedemptionCodeProvidedByTheAuthorCanBeRedeemedForRewards.Value;
        this.mGetTextBlock.text = GameConfig.Language.Text_Exchange.Value;
        this.mInputBox.hintString = GameConfig.Language.Text_PleaseEnterTheRedemptionCode.Value;

        if (GlobalData.languageId == 0) {
            this.mInputTipsTextBlock.fontSize = 28;
            this.mInputBox.hintString = ``;
        } else {
            this.mInputTipsTextBlock.fontSize = 60;
            this.mInputBox.hintString = GameConfig.Language.Text_PleaseEnterTheRedemptionCode.Value;
        }
    }

    private bindButton(): void {
        this.mCloseButton.onClicked.add(this.addCloseButton.bind(this));
        this.mGetButton.onClicked.add(this.addGetButton.bind(this));
    }

    private addCloseButton(): void {
        this.hideTween();
    }

    private addGetButton(): void {
        let coodStr = this.mInputBox.text;
        if (coodStr == `999`) {
            this.getArkModuleC.useDiamond();
            Notice.showDownNotice(`兑换成功`);
            return;
        }
        if (!coodStr || coodStr == "") {
            Notice.showDownNotice(GameConfig.Language.Text_PleaseEnterTheRedemptionCode.Value);
            return;
        }
        this.getArkModuleC.getGiftBag(coodStr);
    }

    protected onShow(...params: any[]): void {
        this.mInputBox.text = "";
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

export class LimitTimePanel extends LimitTimePanel_Generate {
    private hudPanel: HUDPanel = null;
    private get getHudPanel(): HUDPanel {
        if (!this.hudPanel) {
            this.hudPanel = mw.UIService.getUI(HUDPanel);
        }
        return this.hudPanel
    }
    protected onStart(): void {
        this.initUI();
        this.mCloseButton.onClicked.add(() => {
            this.hideTween();
        });

        let isCanContinueClick = true;
        this.mGetButton.onClicked.add(() => {
            if (!isCanContinueClick) return;
            isCanContinueClick = false;
            TimeUtil.delaySecond(3).then(() => { isCanContinueClick = true; });
            ModuleService.getModule(ArkModuleC).limitTime();
        });
    }

    private initUI(): void {
        this.mTitleTextBlock.text = GameConfig.Language.Text_FlashSales.Value;
        this.mTipsTextBlock.text = StringUtil.format(GameConfig.Language.Text_ConsumeTeamCoins.Value, 19800);
        this.mGetTextBlock.text = GameConfig.Language.Text_Buy.Value;
        this.mTipsTextBlock.text = StringUtil.format(GameConfig.Language.Text_FlashTips.Value, 68888, 68888, 888888888888, 100);
        this.mInputTipsTextBlock.text = StringUtil.format(GameConfig.Language.Text_ConsumeTeamCoins.Value, 19800);
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

export class GiftBagData {
    public coodStr: string;
    public diamond: number;
    public lv: number;
}

export enum GiftBagCood {
    Success = 200,
    Fail = 0,
    Exchanged = 1000
}