import { Notice } from "../../common/notice/Notice";
import { MapEx } from "../../Tools/MapEx";
import { Utils } from "../../Tools/utils";
import NewPeopleItem_Generate from "../../ui-generate/module/NewPeopleModule/NewPeopleItem_generate";
import NewPeoplePanel_Generate from "../../ui-generate/module/NewPeopleModule/NewPeoplePanel_generate";
import { BagModuleC } from "../BagModule/BagModule";
import HUDModuleC from "../HUDModule/HUDModuleC";
import HUDPanel from "../HUDModule/ui/HUDPanel";
import { LevelItem } from "../LevelModule/LevelModule";

const newPeopleGiftDatas: Map<number, { icon: string[], dayStr: string, name: string, bagId: number[], itemPos: mw.Vector2 }> = new Map<number, { icon: string[], dayStr: string, name: string, bagId: number[], itemPos: mw.Vector2 }>();
newPeopleGiftDatas.set(1, { icon: ["209508", "367076"], dayStr: "第一天", name: "金箍棒(粉)+制服女孩", bagId: [10041, 20056], itemPos: new mw.Vector2(30, 27) });
newPeopleGiftDatas.set(2, { icon: ["318640", "343523", "313464", "398484"], dayStr: "第二天", name: "昊天锤+唐三\n金箍棒(紫)+小舞姐", bagId: [10043, 20057, 20055, 10042], itemPos: new mw.Vector2(538, 27) });
const onlineMinutes: number = 30;

export class NewPeopleData extends Subdata {
    @Decorator.persistence()
    public isGetNewPeoples: MapEx.MapExClass<string> = {};

    public setIsGetNewPeoples(key: number, isGet: string): void {
        MapEx.set(this.isGetNewPeoples, key, isGet);
        this.save(true);
    }
}

const NewPeopleTriggerMap: Map<number, { triggers: string[], worldUIIds: string[], name: string }> = new Map<number, { triggers: string[], worldUIIds: string[], name: string }>();
NewPeopleTriggerMap.set(1, { triggers: ["08A7D30E"], worldUIIds: ["272413D6"], name: `新手礼包` });
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
    protected onEnterScene(sceneType: number): void {
        this.isGetNewPeoples = this.data.isGetNewPeoples;
        this.initTrigger();
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
                    Notice.showDownNotice(`在线时间不足${onlineMinutes}分钟`);
                } else {
                    Notice.showDownNotice(`领取成功`);
                    Notice.showDownNotice(`打开背包使用`);
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
                Notice.showDownNotice(`不能重复领取`);
            }
        } else {
            Notice.showDownNotice(`请第${key}天再来领取`);
        }
    }

    private initTrigger(): void {
        NewPeopleTriggerMap.forEach((value: {
            triggers: string[];
            worldUIIds: string[];
            name: string;
        }, key: number) => {
            value.triggers.forEach((triggerId: string) => {
                mw.GameObject.asyncFindGameObjectById(triggerId).then((go: mw.GameObject) => {
                    let trigger = go as mw.Trigger;
                    trigger.onEnter.add((character: mw.Character) => {
                        if (character.gameObjectId != this.localPlayer.character.gameObjectId) return;
                        this.getNewPeoplePanel.show();
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

export class NewPeopleModuleS extends ModuleS<NewPeopleModuleC, NewPeopleData> {

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {

    }

    @Decorator.noReply()
    public net_setIsGetNewPeoples(key: number, isGet: string): void {
        this.currentData.setIsGetNewPeoples(key, isGet);
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
        this.mTitleTextBlock.text = `新手礼包`;
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
    }

    private initUI(): void {
        this.mHasTextBlock.text = `已领取`;
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
        this.mDayTextBlock.text = `${newPeopleGiftData.dayStr}`;
        for (let i = 0; i < newPeopleGiftData.icon.length; ++i) {
            (this[`mIconBgImage_${i}`] as mw.Image).visibility = mw.SlateVisibility.SelfHitTestInvisible;
            Utils.setImageByAssetIconData((this[`mIconImage_${i}`] as mw.Image), newPeopleGiftData.icon[i]);
        }
        for (let i = newPeopleGiftData.icon.length; i < 4; ++i) {
            (this[`mIconBgImage_${i}`] as mw.Image).visibility = mw.SlateVisibility.Collapsed;
        }
        this.mTipsTextBlock.text = `${newPeopleGiftData.name}`;
        if (this.getNewPeopleModuleC.isGetNewPeople(this.key)) {
            this.mHasCanvas.visibility = mw.SlateVisibility.SelfHitTestInvisible;
            this.mRewardTextBlock.text = `在线${onlineMinutes}分钟(${onlineMinutes}/${onlineMinutes})`;
        } else {
            this.mHasCanvas.visibility = mw.SlateVisibility.Collapsed;
            if (this.getNewPeopleModuleC.isCanGet(this.key)) {
                Event.dispatchToLocal(`RequestNewPeopleGiftBagOnlineTime`);
            } else {
                this.mRewardTextBlock.text = `在线${onlineMinutes}分钟(${0}/${onlineMinutes})`;
            }
        }
    }

    private minutes: number = 0;
    public updateOnlineMinutesTextBlock(minutes: number): void {
        console.error(`minutes:${minutes}`);
        this.minutes = minutes;
        this.mRewardTextBlock.text = `在线${onlineMinutes}分钟(${minutes}/${onlineMinutes})`;
    }
}