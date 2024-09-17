import { MapEx } from "../../Tools/MapEx";
import LevelItem_Generate from "../../ui-generate/module/LevelModule/LevelItem_generate";
import LevelPanel_Generate from "../../ui-generate/module/LevelModule/LevelPanel_generate";

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

const transferMap: Map<number, { triggerIds: string[], worldUIIds: string[], targetLoc: mw.Vector, name: string }> = new Map<number, { triggerIds: string[], worldUIIds: string[], targetLoc: mw.Vector, name: string }>();
transferMap.set(1, { triggerIds: ["19DDCA11"], worldUIIds: ["34DE2A28"], targetLoc: new mw.Vector(-4065, 6446, 2000), name: "新手村" });
transferMap.set(2, { triggerIds: ["3E8FFFFB"], worldUIIds: ["361F265D"], targetLoc: new mw.Vector(-5260, -3226, 1700), name: "中级狩猎场" });
transferMap.set(3, { triggerIds: ["0CEEF058"], worldUIIds: ["18EED1DD"], targetLoc: new mw.Vector(3246, -19119, 1700), name: "高级狩猎场" });
transferMap.set(4, { triggerIds: ["1849DDD5"], worldUIIds: ["2789D9BE"], targetLoc: new mw.Vector(-9170, -9478, 400), name: "10万年魂兽" });
transferMap.set(5, { triggerIds: ["3FDFD371"], worldUIIds: ["27AE1609"], targetLoc: new mw.Vector(-9687, 9475, 4200), name: "神级狩猎场" });

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

const levelMap: Map<number, { triggers: string[], worldUIIds: string[], name: string }> = new Map<number, { triggers: string[], worldUIIds: string[], name: string }>();
levelMap.set(1, { triggers: ["0531B54C"], worldUIIds: ["081A5D07"], name: "黑悟空" });
export class LevelModuleC extends ModuleC<LevelModuleS, LevelData> {
    private levelPanel: LevelPanel = null;
    private get getLevelPanel(): LevelPanel {
        if (!this.levelPanel) {
            this.levelPanel = mw.UIService.getUI(LevelPanel);
        }
        return this.levelPanel;
    }

    protected onStart(): void {

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
        transferMap.forEach((value: { triggerIds: string[]; worldUIIds: string[]; targetLoc: mw.Vector; name: string }, key: number) => {
            value.triggerIds.forEach((triggerId: string) => {
                mw.GameObject.asyncFindGameObjectById(triggerId).then((go: mw.GameObject) => {
                    let trigger = go as mw.Trigger;
                    trigger.onEnter.add((character: mw.Character) => {
                        if (character.gameObjectId != this.localPlayer.character.gameObjectId) return;
                        this.localPlayer.character.worldTransform.position = value.targetLoc;
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
        levelMap.forEach((value: { triggers: string[]; worldUIIds: string[]; name: string; }, key: number) => {
            value.triggers.forEach((triggerId: string) => {
                mw.GameObject.asyncFindGameObjectById(triggerId).then((v: mw.GameObject) => {
                    (v as mw.Trigger).onEnter.add((char: mw.Character) => {
                        if (this.localPlayer.character.gameObjectId != char.gameObjectId) return;
                        this.server.net_startLevel(key);
                        SoundService.play3DSound("431480", this.localPlayer.character);
                    });
                });
            });
            value.worldUIIds.forEach((worldId: string) => {
                mw.GameObject.asyncFindGameObjectById(worldId).then((v: mw.GameObject) => {
                    let worldUI: mw.UIWidget = v as mw.UIWidget;
                    let levelItem = mw.UIService.create(LevelItem);
                    levelItem.updateLevelTextBlock(`${value.name}关卡`);
                    worldUI.setTargetUIWidget(levelItem.uiWidgetBase);
                });
            });
        });
    }
}

const triggerParent: string = "264D6FAD";
export class LevelModuleS extends ModuleS<LevelModuleC, LevelData> {
    protected onStart(): void {
        this.initTrigger();
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

    @Decorator.noReply()
    public net_startLevel(key: number): void {
        console.error(`wfz - key:${key}`)
        let player = this.currentPlayer;
        let trigger = this.getTrigger();
        if (!trigger) return;
        let levels = DataCenterS.getData(player, LevelData).levels;
        let level = (MapEx.has(levels, key)) ? MapEx.get(levels, key) : 1;
        player.character.worldTransform.position = trigger.worldTransform.position;
        Event.dispatchToLocal(`InitMonster`, Number(trigger.name.split(`_`)[1]), level);
        this.getClient(player).net_startLevel(key, level);
    }

    public startLevel(player: mw.Player, key: number): void {
        DataCenterS.getData(player, LevelData).addLevel(key);
        let levels = DataCenterS.getData(player, LevelData).levels;
        let level = (MapEx.has(levels, key)) ? MapEx.get(levels, key) : 1;
        this.getClient(player).net_startLevel(key, level);
    }
} 