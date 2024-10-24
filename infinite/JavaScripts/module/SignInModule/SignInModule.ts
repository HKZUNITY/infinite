import { Notice } from "../../common/notice/Notice";
import { GameConfig } from "../../config/GameConfig";
import GlobalData from "../../const/GlobalData";
import { MapEx } from "../../Tools/MapEx";
import { Utils } from "../../Tools/utils";
import SignInItem_Generate from "../../ui-generate/module/SignInModule/SignInItem_generate";
import SignInPanel_Generate from "../../ui-generate/module/SignInModule/SignInPanel_generate";
import AdTipsPanel from "../AdsModule/ui/AdTipsPanel";
import HUDModuleC from "../HUDModule/HUDModuleC";
import HUDPanel from "../HUDModule/ui/HUDPanel";
import PlayerModuleC from "../PlayerModule/PlayerModuleC";

const rewardMap: Map<number, { icon: string, rewardDiamond: number, rewardLv: number }> = new Map<number, { icon: string, rewardDiamond: number, rewardLv: number }>();
rewardMap.set(1, { icon: "184592", rewardDiamond: 10, rewardLv: 1 });
rewardMap.set(2, { icon: "159364", rewardDiamond: 28, rewardLv: 1 });
rewardMap.set(3, { icon: "321689", rewardDiamond: 58, rewardLv: 2 });
rewardMap.set(4, { icon: "321690", rewardDiamond: 88, rewardLv: 2 });
rewardMap.set(5, { icon: "321691", rewardDiamond: 98, rewardLv: 2 });
rewardMap.set(6, { icon: "321692", rewardDiamond: 168, rewardLv: 3 });
rewardMap.set(7, { icon: "321693", rewardDiamond: 198, rewardLv: 5 });

export class SignInItem extends SignInItem_Generate {
    private signInModuleC: SignInModuleC = null;
    private get getSignInModuleC(): SignInModuleC {
        if (!this.signInModuleC) {
            this.signInModuleC = ModuleService.getModule(SignInModuleC);
        }
        return this.signInModuleC;
    }

    protected onStart(): void {
        this.bindButton();
        this.initTextBlock();
    }

    private initTextBlock(): void {
        if (GlobalData.languageId == 0) {
            this.mTipsTextBlock.fontSize = 15;
            this.mRewardTextBlock.fontSize = 15;
        } else {
            this.mTipsTextBlock.fontSize = 30;
            this.mRewardTextBlock.fontSize = 20;
        }
    }

    private bindButton(): void {
        this.mClickButton.onClicked.add(this.addClickButton.bind(this));
    }

    private addClickButton(): void {
        this.getSignInModuleC.tryGetReward(this.day, () => {
            this.signIn = 1;
            this.updateUI();
        });
    }

    private day: number = 0;
    private signIn: number = 0;
    public initSignInItem(day: number, signIn: number): void {
        this.day = day;
        this.signIn = signIn;
        this.updateUI();
    }

    private updateUI(): void {
        if (this.signIn == 1) {
            this.mHasCanvas.visibility = mw.SlateVisibility.SelfHitTestInvisible;
            this.mTipsTextBlock.text = GameConfig.Language.Text_ReceivedAlready.Value;
            this.mHasTextBlock.text = GameConfig.Language.Text_ReceivedAlready.Value;
            this.mTipsTextBlock.setFontColorByHex("00FFFFFF");
        } else {
            if (this.day < this.getSignInModuleC.getDay) {
                this.mHasCanvas.visibility = mw.SlateVisibility.Collapsed;
                this.mTipsTextBlock.text = GameConfig.Language.Text_SupplementarySignature.Value;
                this.mTipsTextBlock.setFontColorByHex("FF0000FF");
            } else if (this.day == this.getSignInModuleC.getDay) {
                this.mHasCanvas.visibility = mw.SlateVisibility.Collapsed;
                this.mTipsTextBlock.text = GameConfig.Language.Text_CanBeClaimed.Value;
                this.mTipsTextBlock.setFontColorByHex("FF0000FF");
            } else if (this.day > this.getSignInModuleC.getDay) {
                this.mHasCanvas.visibility = mw.SlateVisibility.Collapsed;
                this.mTipsTextBlock.text = GameConfig.Language.Text_Unclaimed.Value
                this.mTipsTextBlock.setFontColorByHex("00FFFFFF");
            }
        }
        this.mRewardTextBlock.text = StringUtil.format(GameConfig.Language.Text_DiamondGrade.Value, rewardMap.get(this.day).rewardDiamond, rewardMap.get(this.day).rewardLv);
        this.mRewardTextBlock.setFontColorByHex("FF0000FF");
        this.mIconImage.imageGuid = rewardMap.get(this.day).icon;
        this.mDayTextBlock.text = StringUtil.format(GameConfig.Language.Text_Day.Value, this.day);
    }
}

export class SignInPanel extends SignInPanel_Generate {
    private hudPanel: HUDPanel = null;
    private get getHudPanel(): HUDPanel {
        if (!this.hudPanel) {
            this.hudPanel = mw.UIService.getUI(HUDPanel);
        }
        return this.hudPanel
    }
    protected onStart(): void {
        this.bindButton();
        this.initTextBlock();
    }

    private initTextBlock(): void {
        this.mTitleTextBlock.text = StringUtil.format(GameConfig.Language.Text_DayCheckIn.Value, 7);
    }

    private bindButton(): void {
        this.mCloseButton.onClicked.add(this.addCloseButton.bind(this));
    }

    private addCloseButton(): void {
        this.hideTween();
    }

    private signIn: MapEx.MapExClass<number> = {};
    public initSignInPanel(signIn: MapEx.MapExClass<number>): void {
        this.signIn = signIn;
        console.error(`signIn:${JSON.stringify(this.signIn)}`);
        this.initSignIn();
    }

    private signInItems: SignInItem[] = [];
    private initSignIn(): void {
        console.error(`initSignIn:${this.signInItems.length}`);
        if (!this.signInItems || this.signInItems.length == 0) {
            for (let i = 1; i <= GlobalData.signInDays; ++i) {
                let signInItem = mw.UIService.create(SignInItem);
                signInItem.initSignInItem(i, MapEx.get(this.signIn, i));
                this.signInItems.push(signInItem);
            }

            this.mCanvas.addChild(this.signInItems[0].uiObject);
            this.mCanvas.addChild(this.signInItems[3].uiObject);
            this.mCanvas.addChild(this.signInItems[1].uiObject);
            this.mCanvas.addChild(this.signInItems[4].uiObject);
            this.mCanvas.addChild(this.signInItems[2].uiObject);
            this.mCanvas.addChild(this.signInItems[5].uiObject);
            this.mCanvas.addChild(this.signInItems[6].uiObject);
            this.signInItems[6].uiObject.size = this.signInItems[6].uiObject.size.multiply(1.6);
            this.signInItems[6].uiObject.renderScale = mw.Vector2.one.multiply(1.6);
        } else {
            for (let i = 0; i < this.signInItems.length; ++i) {
                this.signInItems[i].initSignInItem(i + 1, MapEx.get(this.signIn, i + 1));
            }
        }
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

export class SignInData extends Subdata {
    @Decorator.persistence()
    public signIn: MapEx.MapExClass<number> = {};

    protected initDefaultData(): void {
        this.signIn = {};
        for (let i = 1; i <= GlobalData.signInDays; ++i) {
            MapEx.set(this.signIn, i, 0);
        }
        this.save(true);
    }

    public resetSignInData(): void {
        this.signIn = {};
        for (let i = 1; i <= GlobalData.signInDays; ++i) {
            MapEx.set(this.signIn, i, 0);
        }
        this.save(true);
    }

    public setSignIn(day: number): void {
        MapEx.set(this.signIn, day, 1);
        this.save(true);
    }
}

export class SignInModuleC extends ModuleC<SignInModuleS, SignInData> {
    private signInPanel: SignInPanel = null;
    private get getSignInPanel(): SignInPanel {
        if (!this.signInPanel) {
            this.signInPanel = mw.UIService.getUI(SignInPanel);
        }
        return this.signInPanel;
    }
    private hudModuleC: HUDModuleC = null;
    private get getHudModuleC(): HUDModuleC {
        if (!this.hudModuleC) {
            this.hudModuleC = ModuleService.getModule(HUDModuleC);
        }
        return this.hudModuleC;
    }
    private adsPanel: AdTipsPanel = null;
    private get getAdTipsPanel(): AdTipsPanel {
        if (!this.adsPanel) {
            this.adsPanel = mw.UIService.getUI(AdTipsPanel);
        }
        return this.adsPanel;
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
    }

    private bindAction(): void {
        this.getHudModuleC.onOpenSignInAction.add(this.addOpenSignInPanel.bind(this));
    }

    private addOpenSignInPanel(): void {
        this.getSignInPanel.show();
    }

    public get getDay(): number {
        return this.day;
    }

    private signIn: MapEx.MapExClass<number> = {};
    private day: number = 0;
    public net_syncInitSignIn(signIn: MapEx.MapExClass<number>, day: number): void {
        this.signIn = signIn;
        this.day = day;
        this.initSignInPanel();
    }

    private initSignInPanel(): void {
        this.getSignInPanel.initSignInPanel(this.signIn);
    }

    public tryGetReward(day: number, succeedCallback: () => void): void {
        if (!MapEx.has(this.signIn, day) || day < 1 || day > GlobalData.signInDays) return;
        if (MapEx.get(this.signIn, day) == 1) {
            Notice.showDownNotice(GameConfig.Language.Text_SignedIn.Value);
            return;
        }
        if (this.day > day) {
            if (GlobalData.isOpenIAA) {
                this.getAdTipsPanel.showRewardAd(() => {
                    Notice.showDownNotice(GameConfig.Language.Text_SuccessfullyObtainedTodaySReward.Value);
                    this.getReward(day, succeedCallback);
                }, StringUtil.format(GameConfig.Language.Text_FreeDayReward.Value, day)
                    , GameConfig.Language.Text_Cancel.Value
                    , GameConfig.Language.Text_FreeToReceive.Value);
            } else {
                this.getReward(day, succeedCallback);
            }
        } else if (day == this.day) {
            this.getReward(day, succeedCallback);
        } else if (this.day < day) {
            Notice.showDownNotice(GameConfig.Language.Text_TheCheckInDateHasNotYetArrived.Value);
        }
    }

    private getReward(day: number, succeedCallback: () => void): void {
        if (!MapEx.has(this.signIn, day) || day < 1 || day > GlobalData.signInDays) return;
        MapEx.set(this.signIn, day, 1);
        this.server.net_setSignIn(day);
        if (succeedCallback) succeedCallback();

        Notice.showDownNotice(GameConfig.Language.Text_SuccessfullyObtainedTodaySReward.Value);

        let diamond = rewardMap.get(day).rewardDiamond;
        if (diamond > 0) {
            this.getPlayerModuleC.saveDiamond(diamond);
        }

        let lv = rewardMap.get(day).rewardLv;
        if (lv > 0) {
            this.getPlayerModuleC.upLvByCount(lv);
        }

        Notice.showDownNotice(StringUtil.format(GameConfig.Language.Text_DiamondGrade.Value, diamond, lv));
    }
}

export class SignInModuleS extends ModuleS<SignInModuleC, SignInData> {
    protected onStart(): void {

    }

    public resetSignInData(player: mw.Player): void {
        DataCenterS.getData(player, SignInData).resetSignInData();
    }

    public syncResetSignInData(player: mw.Player): void {
        DataCenterS.getData(player, SignInData).resetSignInData();
        this.syncInitSignIn(player);
    }

    public syncInitSignIn(player: mw.Player): void {
        let signIn = DataCenterS.getData(player, SignInData).signIn;
        this.getClient(player).net_syncInitSignIn(signIn, Number(Utils.getWhatDay()));
    }

    public net_setSignIn(day: number): void {
        this.currentData.setSignIn(day);
    }
}