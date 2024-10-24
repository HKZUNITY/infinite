import { Notice } from "../../common/notice/Notice";
import { GameConfig } from "../../config/GameConfig";
import GlobalData from "../../const/GlobalData";
import { MapEx } from "../../Tools/MapEx";
import { Utils } from "../../Tools/utils";
import NewPeopleItem_Generate from "../../ui-generate/module/NewPeopleModule/NewPeopleItem_generate";
import NewPeoplePanel_Generate from "../../ui-generate/module/NewPeopleModule/NewPeoplePanel_generate";
import { BagModuleC } from "../BagModule/BagModule";
import HUDModuleC from "../HUDModule/HUDModuleC";
import HUDPanel from "../HUDModule/ui/HUDPanel";
import { LevelItem } from "../LevelModule/LevelModule";

const newPeopleGiftDatas: Map<number, { desc: string, icon: string[], dayStr: string, name: string, bagId: number[], itemPos: mw.Vector2 }> = new Map<number, { desc: string, icon: string[], dayStr: string, name: string, bagId: number[], itemPos: mw.Vector2 }>();
newPeopleGiftDatas.set(1, { desc: "第一天", icon: ["209508", "367076"], dayStr: `Text_FirstDay`, name: `Text_GoldenHoopRodPowderUniformGirl`, bagId: [10041, 20056], itemPos: new mw.Vector2(30, 27) });
newPeopleGiftDatas.set(2, { desc: "第二天", icon: ["318640", "343523", "313464", "398484"], dayStr: `Text_TheSecondDay`, name: `HaotianHammerTangSan_GoldenHoopRodPurpleBlueSilverEmperor`, bagId: [10043, 20057, 20055, 10042], itemPos: new mw.Vector2(538, 27) });
const onlineMinutes: number = 30;

export class NewPeopleData extends Subdata {
    @Decorator.persistence()
    public isGetNewPeoples: MapEx.MapExClass<string> = {};
    @Decorator.persistence()
    public isOldPeople: boolean = false;

    public setIsGetNewPeoples(key: number, isGet: string): void {
        MapEx.set(this.isGetNewPeoples, key, isGet);
        this.save(true);
    }

    public setIsOldPeople(isOld: boolean): void {
        this.isGetNewPeoples = {};
        this.isOldPeople = isOld;
        this.save(true);
    }
}

const NewPeopleTriggerMap: Map<number, { triggers: string[], worldUIIds: string[], name: string }> = new Map<number, { triggers: string[], worldUIIds: string[], name: string }>();
NewPeopleTriggerMap.set(1, { triggers: ["08A7D30E"], worldUIIds: ["272413D6"], name: `Text_NoviceGiftPack` });
// NewPeopleTriggerMap.set(2, { triggers: null, worldUIIds: ["07D9DF79"], name: `领取自动攻击` });
// NewPeopleTriggerMap.set(3, { triggers: null, worldUIIds: ["0D9A6CAC"], name: `领取限定皮肤` });
export class NewPeopleModuleC extends ModuleC<NewPeopleModuleS, NewPeopleData> {
    private newPeoplePanel: NewPeoplePanel = null;
    private get getNewPeoplePanel(): NewPeoplePanel {
        if (!this.newPeoplePanel) {
            this.newPeoplePanel = mw.UIService.getUI(NewPeoplePanel);
        }
        return this.newPeoplePanel;
    }

    private hudModuleC: HUDModuleC = null;
    private get getHudModuleC(): HUDModuleC {
        if (!this.hudModuleC) {
            this.hudModuleC = ModuleService.getModule(HUDModuleC);
        }
        return this.hudModuleC;
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
        this.getHudModuleC.onOpenNewPeopleAction.add(this.addOpenNewPeoplePanel.bind(this));
    }

    private addOpenNewPeoplePanel(): void {
        this.getNewPeoplePanel.show();
    }

    private isGetNewPeoples: MapEx.MapExClass<string> = {};
    private isOldPeople: boolean = false;
    protected onEnterScene(sceneType: number): void {
        this.isGetNewPeoples = this.data.isGetNewPeoples;
        this.isOldPeople = this.data.isOldPeople;
        this.checkIsOldPeople();
        this.initOldPeopleData();
        this.initTrigger();
    }

    private checkIsOldPeople(): void {
        if (this.isOldPeople) return;
        if (this.isGetNewPeoples && MapEx.count(this.isGetNewPeoples) == 2) {
            let isOld = true;
            MapEx.forEach(this.isGetNewPeoples, (key: number, value: string) => {
                if (!value) isOld = false;
            });
            if (!isOld) return;
            this.isOldPeople = true;
            this.isGetNewPeoples = {};
            this.server.net_setIsOldPeople(isOld);
        }
    }

    private initOldPeopleData(): void {
        if (!this.isOldPeople) return;
        NewPeopleTriggerMap.get(1).name = `Text_ReturnGiftPackageForVeteranPlayers`;
        newPeopleGiftDatas.get(1).name = `Text_TheGoldenPrinceJkGirl`;
        newPeopleGiftDatas.get(1).icon = ["142399", "320751"];
        newPeopleGiftDatas.get(1).bagId = [20064, 20065];
        newPeopleGiftDatas.get(2).name = `Text_XiaolanGreenBlackOrangeDragon`;
        newPeopleGiftDatas.get(2).bagId = [20066, 20067, 20068, 20069];
        newPeopleGiftDatas.get(2).icon = ["216268", "216269", "216270", "212971"];
    }

    public isGetNewPeople(key: number): boolean {
        return MapEx.has(this.isGetNewPeoples, key);
    }

    public isCanGet(key: number): boolean {
        if (key == 1) return true;
        if (MapEx.has(this.isGetNewPeoples, key - 1) && MapEx.get(this.isGetNewPeoples, key - 1) != Utils.getDay()) return true;
        return false;
    }

    public setIsGetNewPeoples(key: number, isGet: string): void {
        if (MapEx.has(this.isGetNewPeoples, key) && MapEx.get(this.isGetNewPeoples, key) == isGet) return;
        MapEx.set(this.isGetNewPeoples, key, isGet);
        this.server.net_setIsGetNewPeoples(key, isGet);
    }

    public clickGetPeople(key: number, minutes: number, getComplete: () => void): void {
        if (this.isCanGet(key)) {
            if (!this.isGetNewPeople(key)) {
                if (minutes < onlineMinutes) {
                    Notice.showDownNotice(StringUtil.format(GameConfig.Language.Text_OnlineTimeIsLessThanMinutes.Value, onlineMinutes));
                } else {
                    Notice.showDownNotice(GameConfig.Language.Text_ReceivedSuccessfully.Value);
                    Notice.showDownNotice(GameConfig.Language.Text_OpenTheBackpackForUse.Value);
                    let bagIds = newPeopleGiftDatas.get(key).bagId;
                    for (let i = 0; i < bagIds.length; ++i) {
                        TimeUtil.delaySecond(i).then(() => {
                            this.getBagModuleC.setBagId(bagIds[i]);
                        });
                    }
                    this.setIsGetNewPeoples(key, Utils.getDay());
                    if (getComplete) getComplete();
                }
            } else {
                Notice.showDownNotice(GameConfig.Language.Text_CannotBeClaimedRepeatedly.Value);
            }
        } else {
            Notice.showDownNotice(StringUtil.format(GameConfig.Language.Text_PleaseComeBackToCollectOnTheThDay.Value, key));
        }
    }

    private initTrigger(): void {
        NewPeopleTriggerMap.forEach((value: {
            triggers: string[];
            worldUIIds: string[];
            name: string;
        }, key: number) => {
            if (value.triggers && value.triggers.length > 0) {
                value.triggers.forEach((triggerId: string) => {
                    mw.GameObject.asyncFindGameObjectById(triggerId).then((go: mw.GameObject) => {
                        let trigger = go as mw.Trigger;
                        trigger.onEnter.add((character: mw.Character) => {
                            if (character.gameObjectId != this.localPlayer.character.gameObjectId) return;
                            this.getNewPeoplePanel.show();
                        });
                    });
                });
            }
            value.worldUIIds.forEach((worldId: string) => {
                mw.GameObject.asyncFindGameObjectById(worldId).then((v: mw.GameObject) => {
                    let worldUI: mw.UIWidget = v as mw.UIWidget;
                    let levelItem = mw.UIService.create(LevelItem);
                    levelItem.updateLevelTextBlock(GameConfig.Language[`${value.name}`].Value);
                    worldUI.setTargetUIWidget(levelItem.uiWidgetBase);
                });
            });
        });
    }
}

export class NewPeopleModuleS extends ModuleS<NewPeopleModuleC, NewPeopleData> {

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {

    }

    @Decorator.noReply()
    public net_setIsGetNewPeoples(key: number, isGet: string): void {
        this.currentData.setIsGetNewPeoples(key, isGet);
    }

    @Decorator.noReply()
    public net_setIsOldPeople(isOld: boolean): void {
        this.currentData.setIsOldPeople(isOld);
    }
}

export class NewPeoplePanel extends NewPeoplePanel_Generate {
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
        this.mTitleTextBlock.text = GameConfig.Language.Text_NoviceGiftPack.Value;
        this.mTipsTextBlock.text = GameConfig.Language.Text_OpenTheBackpackAndUseItAfterReceivingIt.Value;
        this.initItem();
    }

    private bindButton(): void {
        this.mCloseButton.onClicked.add(this.addCloseButton.bind(this));
    }

    private addCloseButton(): void {
        this.hideTween();
    }

    private newPeopleItems: NewPeopleItem[] = [];
    private initItem(): void {
        newPeopleGiftDatas.forEach((value: {
            icon: string[];
            dayStr: string;
            name: string;
            bagId: number[];
            itemPos: mw.Vector2;
        }, key: number) => {
            let newPeopleItem = mw.UIService.create(NewPeopleItem);
            newPeopleItem.initItem(key);
            this.mCanvas.addChild(newPeopleItem.uiObject);
            newPeopleItem.uiObject.position = value.itemPos;
            this.newPeopleItems.push(newPeopleItem);
        });
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

export class NewPeopleItem extends NewPeopleItem_Generate {
    private newPeopleModuleC: NewPeopleModuleC = null;
    private get getNewPeopleModuleC(): NewPeopleModuleC {
        if (!this.newPeopleModuleC) {
            this.newPeopleModuleC = ModuleService.getModule(NewPeopleModuleC);
        }
        return this.newPeopleModuleC;
    }

    protected onStart(): void {
        this.initUI();
        this.bindButton();
        this.initTextBlock();
    }

    private initTextBlock(): void {
        if (GlobalData.languageId == 0) {
            this.mTipsTextBlock.fontSize = 12;
        } else {
            this.mTipsTextBlock.fontSize = 25;
        }
    }

    private initUI(): void {
        this.mHasTextBlock.text = GameConfig.Language.Text_ReceivedAlready.Value;
        this.updateOnlineMinutesTextBlock(0);
    }

    private bindButton(): void {
        this.mClickButton.onClicked.add(this.addClickButton.bind(this));
        Event.addLocalListener(`UpdateNewPeopleGiftBagOnlineTime`, (time: number) => {
            console.error(`time:${time}`);
            if (this.getNewPeopleModuleC.isCanGet(this.key)) {
                this.updateOnlineMinutesTextBlock(time);
            }
        });
    }

    private addClickButton(): void {
        this.getNewPeopleModuleC.clickGetPeople(this.key, this.minutes, () => {
            this.mHasCanvas.visibility = mw.SlateVisibility.SelfHitTestInvisible;
        });
    }

    private key: number = -1;
    public initItem(key: number): void {
        this.key = key;
        this.updateUI();
    }

    private updateUI(): void {
        let newPeopleGiftData = newPeopleGiftDatas.get(this.key);
        this.mDayTextBlock.text = GameConfig.Language[`${newPeopleGiftData.dayStr}`].Value;
        for (let i = 0; i < newPeopleGiftData.icon.length; ++i) {
            (this[`mIconBgImage_${i}`] as mw.Image).visibility = mw.SlateVisibility.SelfHitTestInvisible;
            Utils.setImageByAssetIconData((this[`mIconImage_${i}`] as mw.Image), newPeopleGiftData.icon[i]);
        }
        for (let i = newPeopleGiftData.icon.length; i < 4; ++i) {
            (this[`mIconBgImage_${i}`] as mw.Image).visibility = mw.SlateVisibility.Collapsed;
        }
        this.mTipsTextBlock.text = GameConfig.Language[`${newPeopleGiftData.name}`].Value;
        if (this.getNewPeopleModuleC.isGetNewPeople(this.key)) {
            this.mHasCanvas.visibility = mw.SlateVisibility.SelfHitTestInvisible;
            this.mRewardTextBlock.text = StringUtil.format(GameConfig.Language.Text_OnlineMinutes.Value, onlineMinutes, onlineMinutes, onlineMinutes);
        } else {
            this.mHasCanvas.visibility = mw.SlateVisibility.Collapsed;
            if (this.getNewPeopleModuleC.isCanGet(this.key)) {
                Event.dispatchToLocal(`RequestNewPeopleGiftBagOnlineTime`);
            } else {
                this.mRewardTextBlock.text = StringUtil.format(GameConfig.Language.Text_OnlineMinutes.Value, onlineMinutes, 0, onlineMinutes);
            }
        }
    }

    private minutes: number = 0;
    public updateOnlineMinutesTextBlock(minutes: number): void {
        console.error(`minutes:${minutes}`);
        this.minutes = minutes;
        this.mRewardTextBlock.text = StringUtil.format(GameConfig.Language.Text_OnlineMinutes.Value, onlineMinutes, minutes, onlineMinutes);
    }
}