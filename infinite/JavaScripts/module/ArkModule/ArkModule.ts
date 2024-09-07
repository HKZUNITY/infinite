import { Notice } from "../../common/notice/Notice";
import { Utils } from "../../Tools/utils";
import ArkItem_Generate from "../../ui-generate/module/ArkModule/ArkItem_generate";
import ArkPanel_Generate from "../../ui-generate/module/ArkModule/ArkPanel_generate";
import GiftBagPanel_Generate from "../../ui-generate/module/ArkModule/GiftBagPanel_generate";
import HUDModuleC from "../HUDModule/HUDModuleC";
import HUDPanel from "../HUDModule/ui/HUDPanel";
import PlayerModuleC from "../PlayerModule/PlayerModuleC";

const rewardDiamond: Map<string, { icon: string, rewardCount: number, price: number, itemPos: mw.Vector2 }> = new Map<string, { icon: string, rewardCount: number, price: number, itemPos: mw.Vector2 }>();
rewardDiamond.set("6NLoNBXFml10001IF", { icon: "103215", rewardCount: 100, price: 98, itemPos: new mw.Vector2(300, 0) });
rewardDiamond.set("7yf8F2pRWKp0001IG", { icon: "103217", rewardCount: 600, price: 598, itemPos: new mw.Vector2(178, 320) });
rewardDiamond.set("5CKKkBYJLYY0001IH", { icon: "103218", rewardCount: 1000, price: 998, itemPos: new mw.Vector2(422, 320) });
rewardDiamond.set("8PjQmjn1Git0001II", { icon: "103221", rewardCount: 1088, price: 600, itemPos: new mw.Vector2(680, 70) });
const firstRewardKey: string = "8PjQmjn1Git0001II";
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
        this.bindButton();
    }

    private bindButton(): void {
        this.mClickButton.onClicked.add(this.addClickButton.bind(this));
    }

    private addClickButton(): void {
        this.getArkModuleC.placeOrder(this.commodityId, () => {
            if (this.commodityId == firstRewardKey) {
                this.mHasCanvas.visibility = mw.SlateVisibility.SelfHitTestInvisible;
                this.mHasTextBlock.text = `今日已售空`;
            }
        });
    }

    private commodityId: string = "";
    public initArkItem(commodityId: string): void {
        this.commodityId = commodityId;
        this.updateUI();
    }

    private updateUI(): void {
        if (this.commodityId == firstRewardKey) {
            this.mDayTextBlock.text = `每天限购一次`;
            if (this.getArkModuleC.isFirst) {
                this.mHasCanvas.visibility = mw.SlateVisibility.Collapsed;
            } else {
                this.mHasCanvas.visibility = mw.SlateVisibility.SelfHitTestInvisible;
                this.mHasTextBlock.text = `今日已售空`;
            }
        } else {
            this.mDayTextBlock.text = `不限购`;
            this.mHasCanvas.visibility = mw.SlateVisibility.Collapsed;
        }
        let data = rewardDiamond.get(this.commodityId);
        this.mIconImage.imageGuid = data.icon;
        this.mRewardTextBlock.text = `钻石 +${data.rewardCount}`;
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
        this.mTitleTextBlock.text = `充值钻石`;
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
            if (key == firstRewardKey) {
                arkItem.uiObject.size = arkItem.uiObject.size.multiply(1.6);
                arkItem.uiObject.renderScale = mw.Vector2.one.multiply(1.6);
            }
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
}

export class ArkData extends Subdata {
    @Decorator.persistence()
    public lastDayStr: string = "";

    public setLastDayStr(day: string): void {
        this.lastDayStr = day;
        this.save(true);
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
    }

    protected onEnterScene(sceneType: number): void {
        this.lastDayStr = this.data.lastDayStr;
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

    public placeOrder(commodityId: string, buySuccessCallback: () => void): void {
        if (commodityId == firstRewardKey && !this.isFirst) {
            Notice.showDownNotice(`今日已售空`);
            Notice.showDownNotice(`明日再来`);
            console.error(`今日已售空`);
            return;
        }
        if (mw.SystemUtil.isPIE) {
            if (commodityId == firstRewardKey) this.setLastDayStr();
            if (buySuccessCallback) buySuccessCallback();
            let rewardCount = rewardDiamond.get(commodityId).rewardCount;
            Notice.showDownNotice(`钻石+${rewardCount}`);
            this.getPlayerModuleC.saveDiamond(rewardCount);
        } else {
            mw.PurchaseService.placeOrder(commodityId, 1, (status, msg) => {
                mw.PurchaseService.getArkBalance();//刷新代币数量
                if (status != 200) return;
                if (commodityId == firstRewardKey) this.setLastDayStr();
                if (buySuccessCallback) buySuccessCallback();
            });
        }
    }

    public net_deliverGoods(commodityId: string, amount: number): void {
        //根据commodityId和amount来处理收货逻辑
        console.error(`ArkModuleC net_deliverGoods commodityId: ${commodityId}, amount: ${amount}`);
        let rewardCount = rewardDiamond.get(commodityId).rewardCount;
        Notice.showDownNotice(`钻石+${rewardCount}`);
        this.getPlayerModuleC.saveDiamond(rewardCount);
    }

    public get isFirst(): boolean {
        return this.lastDayStr != Utils.getDay();
    }

    private lastDayStr: string = "";
    public async setLastDayStr(): Promise<void> {
        this.lastDayStr = Utils.getDay();
        this.server.net_setLastDayStr(this.lastDayStr);
    }

    private addOpenGiftBagPanel(): void {
        this.getGiftBagPanel.show();
    }

    private isCanGetGiftBag: boolean = true;
    public getGiftBag(coodStr: string): void {
        if (!this.isCanGetGiftBag) {
            Notice.showDownNotice(`冷却3秒`);
            return;
        }
        this.isCanGetGiftBag = false;
        TimeUtil.delaySecond(3).then(() => { this.isCanGetGiftBag = true; });
        if (mw.SystemUtil.isPIE) {
            Notice.showDownNotice(`领取成功`);
            // giftBagData:{"diamond":50,"lv":1} 
        } else {
            this.server.net_getGiftBag(coodStr);
        }
    }

    public net_getGiftBag(isSuccess: boolean, messageJson: string): void {
        if (isSuccess) {
            Notice.showDownNotice(`兑换成功`);
            let message = JSON.parse(messageJson);
            let giftBagData = message as GiftBagData;
            Notice.showDownNotice(`钻石+${giftBagData.diamond}`);
            this.getPlayerModuleC.saveDiamond(giftBagData.diamond);

            if (giftBagData.lv > 0) {
                Notice.showDownNotice(`等级+${giftBagData.lv}`);
                this.getPlayerModuleC.adsUpLv();
                for (let i = 1; i < giftBagData.lv; ++i) {
                    TimeUtil.delaySecond(i).then(() => {
                        this.getPlayerModuleC.adsUpLv();
                    });
                }
            }
        } else {
            Notice.showDownNotice(`礼包兑换码错误`);
            Notice.showDownNotice(`领取失败`);
        }
    }
}


export class ArkModuleS extends ModuleS<ArkModuleC, ArkData> {
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

    public net_setLastDayStr(day: string): void {
        this.currentData.setLastDayStr(day);
    }

    public net_getGiftBag(coodStr: string): void {
        console.error(`ArkModuleS net_getGiftBag coodStr: ${coodStr}`);
        let player = this.currentPlayer;
        PurchaseService.redeemGiftCode(player, coodStr, (result) => {
            this.getClient(player).net_getGiftBag((result.status == 200 || result.status == 1), result.message);
        });
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
        this.mTitleTextBlock.text = `礼包兑换`;
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
        if (!coodStr || coodStr == "") {
            Notice.showDownNotice(`请输入兑换码`);
            console.error(`请输入兑换码`);
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

export class GiftBagData {
    public diamond: number;
    public lv: number;
}