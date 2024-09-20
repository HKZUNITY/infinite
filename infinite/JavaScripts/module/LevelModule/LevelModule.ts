import { Notice } from "../../common/notice/Notice";
import { MapEx } from "../../Tools/MapEx";
import { Utils } from "../../Tools/utils";
import LevelItem_Generate from "../../ui-generate/module/LevelModule/LevelItem_generate";
import LevelPanel_Generate from "../../ui-generate/module/LevelModule/LevelPanel_generate";
import UpExpPanel_Generate from "../../ui-generate/module/LevelModule/UpExpPanel_generate";
import HUDModuleC from "../HUDModule/HUDModuleC";
import HUDPanel from "../HUDModule/ui/HUDPanel";
import PlayerData from "../PlayerModule/PlayerData";
import PlayerModuleC from "../PlayerModule/PlayerModuleC";

export class UpExpPanel extends UpExpPanel_Generate {
    private hudModuleC: HUDModuleC = null;
    private get getHUDModuleC(): HUDModuleC {
        if (!this.hudModuleC) {
            this.hudModuleC = ModuleService.getModule(HUDModuleC);
        }
        return this.hudModuleC;
    }

    protected onStart(): void {
        this.layer = mw.UILayerTop;
        this.initUI();
        this.bindButton();
    }

    private initUI(): void {
        this.mCancleUpExpFlipBook.pause();
    }

    private bindButton(): void {
        this.mCancleUpExpButton.onClicked.add(this.addCancleUpExpButton.bind(this));
    }

    private addCancleUpExpButton(): void {
        this.getHUDModuleC.onOnOffUpExpAction.call(false);
    }

    protected onShow(...params: any[]): void {
        this.mCancleUpExpFlipBook.resume();
    }

    protected onHide(): void {
        this.mCancleUpExpFlipBook.pause();
    }
}

export class LevelData extends Subdata {
    @Decorator.persistence()
    public levels: MapEx.MapExClass<number> = {};

    public setLevel(key: number, value: number): void {
        MapEx.set(this.levels, key, value);
        this.save(true);
    }

    public addLevel(key: number): void {
        let level: number = 1;
        if (MapEx.has(this.levels, key)) {
            level = MapEx.get(this.levels, key);
        }
        level += 1;
        MapEx.set(this.levels, key, level);
        this.save(true);
    }
}

const transferMap: Map<number, { triggerIds: string[], worldUIIds: string[], targetLoc: mw.Vector, name: string, limitLevel: number }>
    = new Map<number, { triggerIds: string[], worldUIIds: string[], targetLoc: mw.Vector, name: string, limitLevel: number }>();
transferMap.set(1, { triggerIds: ["19DDCA11"], worldUIIds: ["34DE2A28"], targetLoc: new mw.Vector(-4065, 6446, 2000), name: `级解锁\n新手村`, limitLevel: 1 });
transferMap.set(2, { triggerIds: ["3E8FFFFB"], worldUIIds: ["361F265D"], targetLoc: new mw.Vector(-5260, -3226, 1700), name: `级解锁\n中级狩猎场`, limitLevel: 18 });
transferMap.set(3, { triggerIds: ["0CEEF058"], worldUIIds: ["18EED1DD"], targetLoc: new mw.Vector(3246, -19119, 1700), name: `级解锁\n高级狩猎场`, limitLevel: 68 });
transferMap.set(4, { triggerIds: ["1849DDD5"], worldUIIds: ["2789D9BE"], targetLoc: new mw.Vector(-9170, -9478, 400), name: `级解锁\n10万年魂兽`, limitLevel: 288 });
transferMap.set(5, { triggerIds: ["3FDFD371"], worldUIIds: ["27AE1609"], targetLoc: new mw.Vector(-9687, 9475, 4200), name: `级解锁\n神级狩猎场`, limitLevel: 98 });

export class LevelPanel extends LevelPanel_Generate {
    protected onStart(): void {

    }

    public updateLevelTextBlock(key: number, level: number): void {
        this.mLevelTextBlock.text = `${level}级\n${levelMap.get(key).name}`;
        this.show();
    }
}

export class LevelItem extends LevelItem_Generate {
    protected onStart(): void {

    }

    public updateLevelTextBlock(name: string): void {
        this.mLevelTextBlock.text = `${name}`;
    }
}

const levelMap: Map<number, { triggers: string[], worldUIIds: string[], name: string, limitLevel: number }> = new Map<number, { triggers: string[], worldUIIds: string[], name: string, limitLevel: number }>();
levelMap.set(1, { triggers: ["0531B54C"], worldUIIds: ["081A5D07"], name: `黑悟空关卡`, limitLevel: 38 });

const arenaMap: Map<number, { triggers: string[], worldUIIds: string[], name: string, limitLevel: number, targetLoc: mw.Vector }> = new Map<number, { triggers: string[], worldUIIds: string[], name: string, limitLevel: number, targetLoc: mw.Vector }>();
arenaMap.set(1, { triggers: ["2CBAFC8A"], worldUIIds: ["063EA403"], name: `竞技场`, limitLevel: 66, targetLoc: new mw.Vector(5500, 10500, 2200) });
arenaMap.set(2, { triggers: ["31B6EFEC"], worldUIIds: ["2FFBFC31"], name: `回城`, limitLevel: 66, targetLoc: new mw.Vector(-4065, 6446, 2000) });
export class LevelModuleC extends ModuleC<LevelModuleS, LevelData> {
    private levelPanel: LevelPanel = null;
    private get getLevelPanel(): LevelPanel {
        if (!this.levelPanel) {
            this.levelPanel = mw.UIService.getUI(LevelPanel);
        }
        return this.levelPanel;
    }

    private playerModuleC: PlayerModuleC = null;
    private get getPlayerModuleC(): PlayerModuleC {
        if (!this.playerModuleC) {
            this.playerModuleC = ModuleService.getModule(PlayerModuleC);
        }
        return this.playerModuleC;
    }

    protected onStart(): void {
        this.initAction();
    }

    protected onEnterScene(sceneType: number): void {
        this.levels = this.data.levels;
        this.initTransfer();
    }

    private levels: MapEx.MapExClass<number> = {};
    public setLevel(key: number, value: number): void {
        let level = 0;
        if (MapEx.has(this.levels, key)) {
            level = MapEx.get(this.levels, key);
        }
        level += value;
        MapEx.set(this.levels, key, value);
        this.server.net_setLevel(key, value);
    }

    public getLevel(key: number): number {
        if (MapEx.has(this.levels, key)) {
            return MapEx.get(this.levels, key);
        }
        return 0;
    }

    public net_startLevel(key: number, level: number): void {
        this.getLevelPanel.updateLevelTextBlock(key, level);
    }

    public hideLevelPanel(): void {
        // this.getLevelPanel.hide();//TODO
    }

    private initTransfer(): void {
        transferMap.forEach((value: { triggerIds: string[]; worldUIIds: string[]; targetLoc: mw.Vector; name: string; limitLevel: number; }, key: number) => {
            value.triggerIds.forEach((triggerId: string) => {
                mw.GameObject.asyncFindGameObjectById(triggerId).then((go: mw.GameObject) => {
                    let trigger = go as mw.Trigger;
                    trigger.onEnter.add((character: mw.Character) => {
                        if (character.gameObjectId != this.localPlayer.character.gameObjectId) return;
                        if (this.getPlayerModuleC.getLv < value.limitLevel) {
                            Notice.showDownNotice(`请先将等级提升至${value.limitLevel}级`);
                            return;
                        }
                        this.localPlayer.character.worldTransform.position = value.targetLoc;
                    });
                });
            });
            value.worldUIIds.forEach((worldId: string) => {
                mw.GameObject.asyncFindGameObjectById(worldId).then((v: mw.GameObject) => {
                    let worldUI: mw.UIWidget = v as mw.UIWidget;
                    let levelItem = mw.UIService.create(LevelItem);
                    levelItem.updateLevelTextBlock(`${value.limitLevel}${value.name}`);
                    worldUI.setTargetUIWidget(levelItem.uiWidgetBase);
                });
            });
        });
        levelMap.forEach((value: { triggers: string[]; worldUIIds: string[]; name: string; limitLevel: number; }, key: number) => {
            value.triggers.forEach((triggerId: string) => {
                mw.GameObject.asyncFindGameObjectById(triggerId).then((v: mw.GameObject) => {
                    (v as mw.Trigger).onEnter.add((char: mw.Character) => {
                        if (this.localPlayer.character.gameObjectId != char.gameObjectId) return;
                        if (this.getPlayerModuleC.getLv < value.limitLevel) {
                            Notice.showDownNotice(`请先将等级提升至${value.limitLevel}级`);
                            return;
                        }
                        this.server.net_startLevel(key);
                        SoundService.play3DSound("431480", this.localPlayer.character);
                    });
                });
            });
            value.worldUIIds.forEach((worldId: string) => {
                mw.GameObject.asyncFindGameObjectById(worldId).then((v: mw.GameObject) => {
                    let worldUI: mw.UIWidget = v as mw.UIWidget;
                    let levelItem = mw.UIService.create(LevelItem);
                    levelItem.updateLevelTextBlock(`${value.limitLevel}级开启\n${value.name}`);
                    worldUI.setTargetUIWidget(levelItem.uiWidgetBase);
                });
            });
        });
        arenaMap.forEach((value: { triggers: string[]; worldUIIds: string[]; name: string; limitLevel: number; targetLoc: mw.Vector; }, key: number) => {
            value.triggers.forEach((triggerId: string) => {
                mw.GameObject.asyncFindGameObjectById(triggerId).then((v: mw.GameObject) => {
                    (v as mw.Trigger).onEnter.add((char: mw.Character) => {
                        if (this.localPlayer.character.gameObjectId != char.gameObjectId) return;
                        if (this.getPlayerModuleC.getLv < value.limitLevel) {
                            Notice.showDownNotice(`请先将等级提升至${value.limitLevel}级`);
                            return;
                        }
                        this.localPlayer.character.worldTransform.position = value.targetLoc;
                        Event.dispatchToLocal(`arenaState`, key);
                    });
                });
            });
            value.worldUIIds.forEach((worldId: string) => {
                mw.GameObject.asyncFindGameObjectById(worldId).then((v: mw.GameObject) => {
                    let worldUI: mw.UIWidget = v as mw.UIWidget;
                    let levelItem = mw.UIService.create(LevelItem);
                    levelItem.updateLevelTextBlock(`${value.limitLevel}级开启\n${value.name}`);
                    worldUI.setTargetUIWidget(levelItem.uiWidgetBase);
                });
            });
        });
    }

    private hudModuleC: HUDModuleC = null;
    private get getHUDModuleC(): HUDModuleC {
        if (!this.hudModuleC) {
            this.hudModuleC = ModuleService.getModule(HUDModuleC);
        }
        return this.hudModuleC;
    }
    private hudPanel: HUDPanel = null;
    private get getHudPanel(): HUDPanel {
        if (!this.hudPanel) {
            this.hudPanel = mw.UIService.getUI(HUDPanel);
        }
        return this.hudPanel
    }
    private upExpPanel: UpExpPanel = null;
    private get getUpExpPanel(): UpExpPanel {
        if (!this.upExpPanel) {
            this.upExpPanel = mw.UIService.getUI(UpExpPanel);
        }
        return this.upExpPanel;
    }

    private initAction(): void {
        this.getHUDModuleC.onOnOffUpExpAction.add(this.addOnOffUpExpAction.bind(this));
    }

    private isOnUpExp: boolean = false;
    private addOnOffUpExpAction(isOn: boolean): void {
        this.isOnUpExp = isOn;
        if (this.isOnUpExp) {
            // this.getHudPanel.hide();
            this.getUpExpPanel.show();
        } else {
            this.getUpExpPanel.hide();
            // this.getHudPanel.show();
        }
        this.server.net_onOffUpExp(this.isOnUpExp);

        // Utils.asyncDownloadAsset("61245").then(() => {
        //     let resumeDefaultAnimation = this.localPlayer.character.loadAnimation("61245");
        //     resumeDefaultAnimation.slot = AnimSlot.Upper;
        //     resumeDefaultAnimation.play();
        // });
    }
}

const triggerParent: string = "264D6FAD";

const upExpParent: string = "0A137F8B";
const upExpAnimationId: string = "280827";
const upExpEffectId: string = "142962";
const defaultUpExpRotation: mw.Rotation = new mw.Rotation(0, 0, 30);

export class LevelModuleS extends ModuleS<LevelModuleC, LevelData> {
    protected onStart(): void {
        this.initTrigger();
        this.initUpExp();
    }

    @Decorator.noReply()
    public net_setLevel(key: number, value: number): void {
        this.currentData.setLevel(key, value);
    }

    private triggers: mw.Trigger[] = [];
    private initTrigger(): void {
        mw.GameObject.asyncFindGameObjectById(triggerParent).then((value: mw.GameObject) => {
            value.getChildren().forEach((v: mw.GameObject) => {
                this.triggers.push(v as mw.Trigger);
            });
        });
    }

    private getTrigger(): mw.Trigger {
        let players = Player.getAllPlayers();
        for (let i = 0; i < this.triggers.length; ++i) {
            let isHas: boolean = false;
            for (let j = 0; j < players.length; ++j) {
                if (this.triggers[i].checkInArea(players[j].character)) {
                    isHas = true;
                    break;
                }
            }
            if (!isHas) {
                return this.triggers[i];
            }
        }
        return null;
    }

    private levelMap: Map<string, number> = new Map<string, number>();

    @Decorator.noReply()
    public net_startLevel(key: number): void {
        console.error(`wfz - key:${key}`)
        let player = this.currentPlayer;
        let trigger = this.getTrigger();
        if (!trigger) return;
        player.character.worldTransform.position = trigger.worldTransform.position;

        let monsterIndex: number = Number(trigger.name.split(`_`)[1]);
        let levels = DataCenterS.getData(player, LevelData).levels;
        let level = (MapEx.has(levels, key)) ? MapEx.get(levels, key) : 1;
        let lv: number = DataCenterS.getData(player, PlayerData).playerLv;

        Event.dispatchToLocal(`InitMonster`, monsterIndex, level, lv);
        this.getClient(player).net_startLevel(key, level);
        this.levelMap.set(player.userId, monsterIndex);
    }

    public startLevel(player: mw.Player, key: number): void {
        DataCenterS.getData(player, LevelData).addLevel(key);
        let levels = DataCenterS.getData(player, LevelData).levels;
        let level = (MapEx.has(levels, key)) ? MapEx.get(levels, key) : 1;
        let lv: number = DataCenterS.getData(player, PlayerData).playerLv;

        if (!this.levelMap.has(player.userId)) return;
        TimeUtil.delaySecond(2).then(() => {
            Event.dispatchToLocal(`InitMonster`, this.levelMap.get(player.userId), level, lv);
            this.getClient(player).net_startLevel(key, level);
        });
    }

    private upExpDatas: { upExpLoc: mw.Vector, userId: string, animation: mw.Animation, originalLoc: mw.Vector, upExpEffectId: number }[] = [];
    private initUpExp(): void {
        mw.GameObject.asyncFindGameObjectById(upExpParent).then((value: mw.GameObject) => {
            value.getChildren().forEach((v: mw.GameObject) => {
                let pos = v.worldTransform.position;
                this.upExpDatas.push({ upExpLoc: new mw.Vector(pos.x, pos.y, pos.z + 500), userId: null, animation: null, originalLoc: null, upExpEffectId: null });
            });
        });
    }

    private updateUpExpMap(player: mw.Player, isOn: boolean): mw.Vector {
        if (!this.upExpDatas || this.upExpDatas.length == 0) return;
        if (isOn) {
            for (let i = 0; i < this.upExpDatas.length; ++i) {
                if (this.upExpDatas[i].userId && this.upExpDatas[i].userId != "" && this.upExpDatas[i].userId != player.userId) continue;

                this.upExpDatas[i].userId = player.userId;
                this.upExpDatas[i].originalLoc = player.character.worldTransform.position;
                this.upExpDatas[i].animation = player.character.loadAnimation(upExpAnimationId);
                this.upExpDatas[i].animation.loop = 0;
                this.upExpDatas[i].animation.play();
                if (this.upExpDatas[i].upExpEffectId) EffectService.stop(this.upExpDatas[i].upExpEffectId);
                this.upExpDatas[i].upExpEffectId = EffectService.playOnGameObject(upExpEffectId, player.character, { slotType: mw.HumanoidSlotType.Root, loopCount: 0 });
                player.character.worldTransform.position = this.upExpDatas[i].upExpLoc;
                player.character.worldTransform.rotation = defaultUpExpRotation;
                break;
            }
        } else {
            for (let i = 0; i < this.upExpDatas.length; ++i) {
                if (this.upExpDatas[i].userId != player.userId) continue;

                this.upExpDatas[i].animation?.stop();
                player.character.worldTransform.position = this.upExpDatas[i].originalLoc;
                EffectService.stop(this.upExpDatas[i].upExpEffectId);
                this.upExpDatas[i].userId = null;
                this.upExpDatas[i].originalLoc = null;
                this.upExpDatas[i].animation = null;
                this.upExpDatas[i].upExpEffectId = null;
                break;
            }
        }
    }

    @Decorator.noReply()
    public net_onOffUpExp(isOn: boolean): void {
        this.updateUpExpMap(this.currentPlayer, isOn);
    }
} 