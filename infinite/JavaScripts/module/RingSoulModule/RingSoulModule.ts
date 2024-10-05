import { Notice } from "../../common/notice/Notice";
import GlobalData from "../../const/GlobalData";
import { MapEx } from "../../Tools/MapEx";
import { Utils } from "../../Tools/utils";
import RingSoulItem_Generate from "../../ui-generate/module/RingSoulModule/RingSoulItem_generate";
import RingSoulItemChild_Generate from "../../ui-generate/module/RingSoulModule/RingSoulItemChild_generate";
import RingSoulPanel_Generate from "../../ui-generate/module/RingSoulModule/RingSoulPanel_generate";
import AdTipsPanel from "../AdsModule/ui/AdTipsPanel";
import HUDModuleC from "../HUDModule/HUDModuleC";
import HUDPanel from "../HUDModule/ui/HUDPanel";
import PlayerModuleC from "../PlayerModule/PlayerModuleC";

const ringSoulNames: string[] = ["十年", "百年", "千年", "万年", "十万年", "百万年", "千万年", "万万年", "亿万年"];
const figureStrs: string[] = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];
const costDiamonds: number[][] = [
    [8, 28, 38, 58, 108, 198, 298],
    [18, 38, 58, 108, 198, 298, 398],
    [28, 48, 88, 158, 298, 398, 498],
    [38, 58, 108, 198, 398, 498, 598],
    [48, 88, 158, 298, 498, 598, 698],
    [58, 108, 198, 398, 598, 698, 798],
    [88, 158, 298, 498, 698, 798, 898],
    [108, 198, 398, 598, 798, 898, 998],
    [158, 298, 498, 698, 898, 998, 1998],
    [198, 398, 598, 798, 998, 1998, 3998, 5998, 7998, 9998],
];
const upSound: string = "169179";
const ringSoulIconColors: string[] = ["#FFFFFFFF", "#FFFF00FF", "#FF00FFFF", "#000000FF", "#FF0000FF", "#00FF00FF", "#191970FF", "#FFC0CBFF", "#FFD700FF"];
const ringSoulPrefabIds: string[] = [
    "322A7FF14588209BBD4B5DAF37D38FA2",
    "F89DFCA24FEC54C1F4CFBEAB9D4FF27A",
    "6CEAFD0A4DAA30D8FB89E49C5B28CD3F",
    "C5944BA6404AC45A865163BBCC3766DD",
    "19F4724F4E312B74233E1FA76EB9EEA9",
    "0966F94E490464A517EFEB877B7C8892",
    "BD92397747C1FA1BEE9A1B83F63DE479"
]
const ringSoulPrefabIdss: string[] = [
    "7C36BC974D5F9E55375E31BA8161C366",
    "92667F8849C7C04147E532A769D4C810",
    "76F94448413EFBCDE982F6AD77A82674",
    "E441096546A41ADCE42B85979BEE09CE",
    "3944E8254E94BA46BAE85D9C37DAB6A7",
    "12901F834472C74D86A077A1D286D75E",
    "DE9A8A8140C040DE5FB2F398714DAA15",
    "E041C96443AE9102CCB9368D643C445D",
    "BC5FB63A4065EE9A2B04C98E2AA4948D"
]
const ringSoulSlots: number[] = [23, 23, 23, 23, 23, 23, 23, 23, 23, 23];
const ringSoulOffsetPoss: mw.Vector[] = [
    new mw.Vector(0, 0, 30),
    new mw.Vector(0, 0, 30),
    new mw.Vector(0, 0, 30),
    new mw.Vector(0, 0, 30),
    new mw.Vector(0, 0, 30),
    new mw.Vector(0, 0, 30),
    new mw.Vector(0, 0, 30),
    new mw.Vector(0, 0, 30),
    new mw.Vector(0, 0, 30),
    new mw.Vector(-100, 0, 320)
];
const ringSoulOffsetRots: mw.Rotation[] = [
    new mw.Rotation(0, 0, 0),
    new mw.Rotation(0, 0, 0),
    new mw.Rotation(0, 0, 0),
    new mw.Rotation(0, 0, 0),
    new mw.Rotation(0, 0, 0),
    new mw.Rotation(0, 0, 0),
    new mw.Rotation(0, 0, 0),
    new mw.Rotation(0, 0, 0),
    new mw.Rotation(0, 0, 0),
    new mw.Rotation(0, 65, 0)
];
const ringSoulOffsetScls: mw.Vector[] = [
    new mw.Vector(0.3, 0.3, 0.3),
    new mw.Vector(0.4, 0.4, 0.4),
    new mw.Vector(0.55, 0.55, 0.55),
    new mw.Vector(0.7, 0.7, 0.7),
    new mw.Vector(0.9, 0.9, 0.9),
    new mw.Vector(1.2, 1.2, 1.2),
    new mw.Vector(1.5, 1.5, 1.5),
    new mw.Vector(1.9, 1.9, 1.9),
    new mw.Vector(2.3, 2.3, 2.3),
    new mw.Vector(2.5, 2.5, 2.5)
];
const showRingSoulTweenTime: number = 0.6;
const hideRingSoulTweenTime: number = 0.5;
const showRingSoulTweenIntervalTime: number = 0.3;
const hideRingSoulTweenIntervalTime: number = 0.25;

export class RingSoulGo {
    public ringSoulIndex: number = 0;
    public go: mw.GameObject = null;

    private isInitRingSoulTween: boolean = false;
    private showRingSoulTween: mw.Tween<any> = null;
    private hideRingSoulTween: mw.Tween<any> = null;
    public initRingSoulTween(): void {
        if (!this.go) return;
        if (this.isInitRingSoulTween) {
            this.startShowRingSoul();
            return;
        }
        this.isInitRingSoulTween = true;
        let scaleValue = this.go.localTransform.scale.x;
        this.showRingSoulTween = new mw.Tween({ scale: 0 })
            .to({ scale: scaleValue }, showRingSoulTweenTime * 1000)
            .onStart(() => {
                this.go.localTransform.scale = mw.Vector.zero;
                this.go.setVisibility(true);
            })
            .onUpdate((v) => {
                this.go.localTransform.scale = new mw.Vector(v.scale, v.scale, v.scale);
            });
        this.hideRingSoulTween = new mw.Tween({ scale: scaleValue })
            .to({ scale: 0 }, hideRingSoulTweenTime * 1000)
            .onStart(() => {
                this.go.localTransform.scale = new mw.Vector(scaleValue, scaleValue, scaleValue);
            })
            .onUpdate((v) => {
                this.go.localTransform.scale = new mw.Vector(v.scale, v.scale, v.scale);
            })
            .onComplete(() => {
                this.go.setVisibility(false);
            });

        this.startShowRingSoul();
    }
    public startShowRingSoul(): void {
        if (this.showRingSoulTween) {
            this.showRingSoulTween.stop();
            this.showRingSoulTween.start();
        }
    }
    public startHideRingSoul(): void {
        if (this.hideRingSoulTween) {
            this.hideRingSoulTween.stop();
            this.hideRingSoulTween.start();
        }
    }
}

@Component
export default class RingSoul extends Script {
    @mw.Property({ replicated: true, onChanged: "initPlayer" })
    public playerId: number = 0;

    @mw.Property({ replicated: true, onChanged: "updateRingSoul" })
    public ringSoulStrs: string = "";

    @mw.Property({ replicated: true, onChanged: "updateRingSoulState" })
    public isOnRingSoul: boolean = true;

    private player: mw.Player = null;
    private get getPlayer(): mw.Player {
        if (this.player == null) {
            this.player = Player.getPlayer(this.playerId);
        }
        return this.player;
    }

    private async initPlayer(): Promise<void> {
        if (!this.player) {
            this.player = await Player.asyncGetPlayer(this.playerId);
            console.error(`playerId = ${this.playerId}"的玩家 "${this.player ? "角色初始化完成" : "角色初始化失败"}`);
        }
    }

    private ringSoulMap: Map<number, RingSoulGo> = new Map<number, RingSoulGo>();
    public async updateRingSoul(): Promise<void> {
        if (!this.player) await this.initPlayer();
        if (!this.player) return;
        if (!this.ringSoulStrs || this.ringSoulStrs.length == 0) return;
        let ringSoulStrs = this.ringSoulStrs.split(`|`);
        if (!ringSoulStrs || ringSoulStrs.length == 0) return;
        for (let i = 0; i < ringSoulStrs.length; ++i) {
            if (!ringSoulStrs[i] || ringSoulStrs[i].length == 0) continue;
            let ringSoul = ringSoulStrs[i].split(`-`);
            if (!ringSoul || ringSoul.length < 2) continue;
            let key = Number(ringSoul[0]);
            let ringSoulIndex = Number(ringSoul[1]);

            let ringSoulGo: RingSoulGo = null;
            if (this.ringSoulMap.has(key)) {
                ringSoulGo = this.ringSoulMap.get(key);
                if (ringSoulGo.ringSoulIndex == ringSoulIndex) continue;
                ringSoulGo.ringSoulIndex = ringSoulIndex;
                if (ringSoulGo.go) {
                    GameObjPool.despawn(ringSoulGo.go);
                    ringSoulGo.go.setVisibility(false);
                }
            } else {
                ringSoulGo = new RingSoulGo();
                if (ringSoulGo.ringSoulIndex == ringSoulIndex) continue;
                ringSoulGo.ringSoulIndex = ringSoulIndex;
            }
            let go = await GameObjPool.asyncSpawn(
                (key != 10) ? ringSoulPrefabIds[ringSoulIndex - 1] : ringSoulPrefabIdss[ringSoulIndex - 1],
                mwext.GameObjPoolSourceType.Prefab);
            await go.asyncReady();
            this.getPlayer.character.attachToSlot(go, ringSoulSlots[key - 1]);
            go.localTransform.position = ringSoulOffsetPoss[key - 1];
            go.localTransform.rotation = ringSoulOffsetRots[key - 1];
            go.localTransform.scale = ringSoulOffsetScls[key - 1];
            ringSoulGo.go = go;
            ringSoulGo.initRingSoulTween();
            this.ringSoulMap.set(key, ringSoulGo);
        }
    }

    // public async updateRingSoulState(): Promise<void> {
    //     if (!this.ringSoulMap || this.ringSoulMap.size == 0) return;
    //     if (this.isOnRingSoul) {
    //         this.startShowRingSoulByIndex(1);
    //         for (let i = 2; i <= 10; ++i) {
    //             if (!this.ringSoulMap.has(i)) continue;
    //             let ringSoulGo = this.ringSoulMap.get(i);
    //             await new Promise<void>((resolve: () => void) => {
    //                 setTimeout(() => {
    //                     ringSoulGo.startShowRingSoul();
    //                     return resolve();
    //                 }, showRingSoulTweenIntervalTime * 1000);
    //             });
    //         }
    //     } else {
    //         this.startHideRingSoulByIndex(1);
    //         for (let i = 2; i <= 10; ++i) {
    //             if (!this.ringSoulMap.has(i)) continue;
    //             let ringSoulGo = this.ringSoulMap.get(i);
    //             await new Promise<void>((resolve: () => void) => {
    //                 setTimeout(() => {
    //                     ringSoulGo.startHideRingSoul();
    //                     return resolve();
    //                 }, hideRingSoulTweenIntervalTime * 1000);
    //             });
    //         }
    //     }
    // }

    public async updateRingSoulState(): Promise<void> {
        if (!this.ringSoulMap || this.ringSoulMap.size == 0) return;
        this.isOnRingSoul ? await this.OnRingSoul() : await this.OffRingSoul();
    }

    private async OffRingSoul(): Promise<void> {
        console.error(`关闭`)
        this.startHideRingSoulByIndex(1);
        for (let i = 2; i <= 10; ++i) {
            if (!this.ringSoulMap.has(i)) continue;
            let ringSoulGo = this.ringSoulMap.get(i);
            await new Promise<void>((resolve: () => void) => {
                setTimeout(() => {
                    ringSoulGo.startHideRingSoul();
                    return resolve();
                }, hideRingSoulTweenIntervalTime * 1000);
            });
        }
    }

    private async OnRingSoul(): Promise<void> {
        console.error(`打开`)
        this.startShowRingSoulByIndex(1);
        for (let i = 2; i <= 10; ++i) {
            if (!this.ringSoulMap.has(i)) continue;
            let ringSoulGo = this.ringSoulMap.get(i);
            await new Promise<void>((resolve: () => void) => {
                setTimeout(() => {
                    ringSoulGo.startShowRingSoul();
                    return resolve();
                }, showRingSoulTweenIntervalTime * 1000);
            });
        }
    }

    private startShowRingSoulByIndex(index: number): void {
        if (!this.ringSoulMap.has(index)) return;
        let ringSoulGo = this.ringSoulMap.get(index);
        ringSoulGo.startShowRingSoul();
    }

    private startHideRingSoulByIndex(index: number): void {
        if (!this.ringSoulMap.has(index)) return;
        let ringSoulGo = this.ringSoulMap.get(index);
        ringSoulGo.startHideRingSoul();
    }
}

export class RingSoulModuleC extends ModuleC<RingSoulModuleS, RingSoulData> {
    private hudModuleC: HUDModuleC = null;
    private get getHudModuleC(): HUDModuleC {
        if (!this.hudModuleC) {
            this.hudModuleC = ModuleService.getModule(HUDModuleC);
        }
        return this.hudModuleC;
    }

    private ringSoulPanel: RingSoulPanel = null;
    private get getRingSoulPanel(): RingSoulPanel {
        if (this.ringSoulPanel == null) {
            this.ringSoulPanel = mw.UIService.getUI(RingSoulPanel);
        }
        return this.ringSoulPanel;
    }

    protected onStart(): void {
        this.initRingSoulData();
        InputUtil.onKeyDown(mw.Keys.P, () => {
            // Event.dispatchToServer("RingSoul");
            this.getRingSoulPanel.show();
        });

        this.getHudModuleC.onOpenRingSoulAction.add(() => {
            this.getRingSoulPanel.show();
        });
        this.getHudModuleC.onOnOffRingSoulAction.add(this.onOffRingSoul.bind(this));
        this.ringSoulPanel = mw.UIService.getUI(RingSoulPanel);
    }

    private ringSoul: MapEx.MapExClass<number> = {};
    private initRingSoulData(): void {
        this.ringSoul = this.data.ringSoul;
        console.error(`this.ringSoul:${JSON.stringify(this.ringSoul)}`)
    }

    public getIsHasRingSoul(key: number): boolean {
        return MapEx.has(this.ringSoul, key);
    }

    public get isCanOpenRingSoul(): boolean {
        if (MapEx.count(this.ringSoul) == 0) {
            Notice.showDownNotice(`还未获取魂环`);
            return false;
        }
        return true;
    }

    public getRingSoulIndex(key: number): number {
        if (MapEx.has(this.ringSoul, key)) {
            return MapEx.get(this.ringSoul, key);
        }
        return 0;
    }

    public setRingSoulIndex(key: number, value: number): void {
        MapEx.set(this.ringSoul, key, value);
        this.server.net_setRingSoulIndex(key, value);
    }

    public onOffRingSoul(isOpenRingSoul: boolean): void {
        this.server.net_onOffRingSoul(isOpenRingSoul);
    }
}

export class RingSoulModuleS extends ModuleS<RingSoulModuleC, RingSoulData> {
    protected onStart(): void {

    }

    protected onPlayerEnterGame(player: mw.Player): void {
        this.initRingSoul(player);
    }

    private ringSoulMap: Map<number, RingSoul> = new Map<number, RingSoul>();
    private initRingSoul(player: mw.Player): void {
        let playerId = player.playerId;
        let ringSoul = player.character.addComponent(RingSoul, true);
        ringSoul.playerId = playerId;
        this.ringSoulMap.set(playerId, ringSoul);

        let ringSoulData = DataCenterS.getData(player, RingSoulData).ringSoul;
        console.error(`ringSoulData = ${JSON.stringify(ringSoulData)}`);
        if (MapEx.count(ringSoulData) > 0) {
            let ringSoulStrs: string = "";
            MapEx.forEach(ringSoulData, (key: number, value: number) => {
                ringSoulStrs += `${key}-${value}|`;
            });
            ringSoul.ringSoulStrs = ringSoulStrs;
        }
    }

    public net_setRingSoulIndex(key: number, value: number): void {
        let playerId = this.currentPlayerId;
        this.currentData.setRingSoulIndex(key, value);
        if (!this.ringSoulMap.has(playerId)) return;
        let ringSoul = this.ringSoulMap.get(playerId);
        ringSoul.ringSoulStrs = `${key}-${value}`;
    }

    public net_onOffRingSoul(isOpenRingSoul: boolean): void {
        let playerId = this.currentPlayerId;
        if (!this.ringSoulMap.has(playerId)) return;
        let ringSoul = this.ringSoulMap.get(playerId);
        ringSoul.isOnRingSoul = isOpenRingSoul;
    }
}

export class RingSoulData extends Subdata {
    @Decorator.persistence()
    public ringSoul: MapEx.MapExClass<number> = {};

    public setRingSoulIndex(key: number, value: number): void {
        MapEx.set(this.ringSoul, key, value);
        this.save(true);
    }
}

export class RingSoulPanel extends RingSoulPanel_Generate {
    private ringSoulModuleC: RingSoulModuleC = null;
    private get getRingSoulModuleC(): RingSoulModuleC {
        if (!this.ringSoulModuleC) {
            this.ringSoulModuleC = ModuleService.getModule(RingSoulModuleC);
        }
        return this.ringSoulModuleC;
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
    private hudPanel: HUDPanel = null;
    private get getHudPanel(): HUDPanel {
        if (!this.hudPanel) {
            this.hudPanel = mw.UIService.getUI(HUDPanel);
        }
        return this.hudPanel;
    }
    private hudModuleC: HUDModuleC = null;
    private get getHudModuleC(): HUDModuleC {
        if (!this.hudModuleC) {
            this.hudModuleC = ModuleService.getModule(HUDModuleC);
        }
        return this.hudModuleC;
    }

    protected onStart(): void {
        this.initUI();
        this.bindButton();
    }

    private ringSoulItems: RingSoulItem[] = [];
    private initUI(): void {
        for (let i = 1; i <= 9; ++i) {
            let ringSoulItem = mw.UIService.create(RingSoulItem);
            ringSoulItem.setRingSoulItemData(i);
            this.ringSoulItems.push(ringSoulItem);
            this.mContentCanvas.addChild(ringSoulItem.uiObject);
        }

        this.setRingSoulItemData(10);
    }

    private ringSoulPage: number = 0;
    private ringSoulIndex: number = 0;
    private ringSoulItemChilds: RingSoulItemChild[] = [];
    public setRingSoulItemData(ringSoulPage: number): void {
        this.ringSoulPage = ringSoulPage;
        this.ringSoulIndex = this.getRingSoulModuleC.getRingSoulIndex(this.ringSoulPage);
        for (let i = 1; i <= 9; ++i) {
            let ringSoulItemChild = mw.UIService.create(RingSoulItemChild);
            ringSoulItemChild.setRingSoulItemChildData(i, this.ringSoulIndex, ringSoulPage);
            this.ringSoulItemChilds.push(ringSoulItemChild);
            this.mCanvas.addChild(ringSoulItemChild.uiObject);
        }
    }

    private bindButton(): void {
        this.mCloseButton.onClicked.add(this.addCloseButton.bind(this));
        this.mUpButton.onClicked.add(this.addUpButton.bind(this));
        this.mAddDiamondButton.onClicked.add(() => {
            this.getHudModuleC.onAddDiamondAction.call();
        });
    }

    private addCloseButton(): void {
        this.hideTween();
    }

    private addUpButton(): void {
        if (this.ringSoulPage <= 0) {
            Notice.showDownNotice(`联系作者修复`);
            return;
        }

        if (this.ringSoulItemChilds.length <= this.ringSoulIndex) {
            Notice.showDownNotice(`已满级`)
            return;
        }

        let lv = this.getPlayerModuleC.getLv;
        if (lv < this.ringSoulPage * 10) {
            Notice.showDownNotice(`等级不足`);
            return;
        }

        let diamond = this.getPlayerModuleC.getDiamond;
        console.error(`costDiamonds[this.ringSoulIndex ]:${costDiamonds[this.ringSoulPage - 1][this.ringSoulIndex]}`);
        if (diamond >= costDiamonds[this.ringSoulPage - 1][this.ringSoulIndex]) {
            this.getPlayerModuleC.saveDiamond(-costDiamonds[this.ringSoulPage - 1][this.ringSoulIndex]);
            this.ringSoulIndex++;
            this.getRingSoulModuleC.setRingSoulIndex(this.ringSoulPage, this.ringSoulIndex);
            this.ringSoulItemChilds[this.ringSoulIndex - 1].setRingSoulItemChildDataByIndex(this.ringSoulIndex);
            SoundService.playSound(upSound);
            Notice.showDownNotice(`锻造成功`);
        } else {
            if (GlobalData.isOpenIAA) {
                this.getAdTipsPanel.showRewardAd(() => {
                    this.getPlayerModuleC.saveDiamond(GlobalData.addDiamondCount);
                    Notice.showDownNotice(`成功获得钻石 +${GlobalData.addDiamondCount}`);
                }, `免费领取${GlobalData.addDiamondCount}颗钻石`, "取消", "免费领取");
            } else {
                this.getPlayerModuleC.saveDiamond(GlobalData.addDiamondCount);
            }
        }
    }

    public updateDiamond(diamond: number): void {
        this.mDiamondTextBlock.text = `${diamond}`;
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

export class RingSoulItem extends RingSoulItem_Generate {
    private ringSoulModuleC: RingSoulModuleC = null;
    private get getRingSoulModuleC(): RingSoulModuleC {
        if (!this.ringSoulModuleC) {
            this.ringSoulModuleC = ModuleService.getModule(RingSoulModuleC);
        }
        return this.ringSoulModuleC;
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

    protected onStart(): void {
        this.bindButton();
    }

    private bindButton(): void {
        this.mUpButton.onClicked.add(this.addUpButton.bind(this));
        Event.addLocalListener("First", () => {
            if (this.ringSoulPage == 1 && this.ringSoulIndex == 0) {
                this.ringSoulIndex++;
                this.getRingSoulModuleC.setRingSoulIndex(this.ringSoulPage, this.ringSoulIndex);
                this.ringSoulItemChilds[this.ringSoulIndex - 1].setRingSoulItemChildDataByIndex(this.ringSoulIndex);
                SoundService.playSound(upSound);
                Notice.showDownNotice(`恭喜你完成新手引导`);
                Notice.showDownNotice(`奖励第一魂环 十年魂环`);
            }
        });
    }

    private addUpButton(): void {
        if (this.ringSoulPage <= 0) {
            Notice.showDownNotice(`联系作者修复`);
            return;
        }

        if (this.ringSoulItemChilds.length <= this.ringSoulIndex) {
            Notice.showDownNotice(`已满级`)
            return;
        }

        let lv = this.getPlayerModuleC.getLv;
        if (lv < this.ringSoulPage * 10) {
            Notice.showDownNotice(`等级不足`);
            return;
        }

        let diamond = this.getPlayerModuleC.getDiamond;
        console.error(`costDiamonds[this.ringSoulIndex]:${costDiamonds[this.ringSoulPage - 1][this.ringSoulIndex]}`);
        if (diamond >= costDiamonds[this.ringSoulPage - 1][this.ringSoulIndex]) {
            this.getPlayerModuleC.saveDiamond(-costDiamonds[this.ringSoulPage - 1][this.ringSoulIndex]);
            this.ringSoulIndex++;
            this.getRingSoulModuleC.setRingSoulIndex(this.ringSoulPage, this.ringSoulIndex);
            this.ringSoulItemChilds[this.ringSoulIndex - 1].setRingSoulItemChildDataByIndex(this.ringSoulIndex);
            SoundService.playSound(upSound);
            Notice.showDownNotice(`锻造成功`);
        } else {
            if (GlobalData.isOpenIAA) {
                this.getAdTipsPanel.showRewardAd(() => {
                    Notice.showDownNotice(`成功获得钻石 +${GlobalData.addDiamondCount}`);
                    this.getPlayerModuleC.saveDiamond(GlobalData.addDiamondCount);
                }, `免费领取${GlobalData.addDiamondCount}颗钻石`, "取消", "免费领取");
            } else {
                this.getPlayerModuleC.saveDiamond(GlobalData.addDiamondCount);
            }
        }
    }

    private ringSoulPage: number = 0;
    private ringSoulIndex: number = 0;
    private ringSoulItemChilds: RingSoulItemChild[] = [];
    public setRingSoulItemData(ringSoulPage: number): void {
        this.ringSoulPage = ringSoulPage;
        this.ringSoulIndex = this.getRingSoulModuleC.getRingSoulIndex(this.ringSoulPage);
        for (let i = 1; i <= 7; ++i) {
            let ringSoulItemChild = mw.UIService.create(RingSoulItemChild);
            ringSoulItemChild.setRingSoulItemChildData(i, this.ringSoulIndex, ringSoulPage);
            this.ringSoulItemChilds.push(ringSoulItemChild);
            this.mCanvas.addChild(ringSoulItemChild.uiObject);
        }
    }
}

export class RingSoulItemChild extends RingSoulItemChild_Generate {
    private playerModuleC: PlayerModuleC = null;
    private get getPlayerModuleC(): PlayerModuleC {
        if (!this.playerModuleC) {
            this.playerModuleC = ModuleService.getModule(PlayerModuleC);
        }
        return this.playerModuleC;
    }

    protected onStart(): void {

    }

    private isHas: boolean = false;
    private ringSoulIndex: number = 0;
    private ringSoulIndex_Self: number = 0;
    private ringSoulPage: number = 0;
    public setRingSoulItemChildData(ringSoulIndex: number, ringSoulIndex_Self: number, ringSoulPage: number): void {
        this.ringSoulPage = ringSoulPage;
        this.ringSoulIndex_Self = ringSoulIndex_Self;
        this.ringSoulIndex = ringSoulIndex;
        // console.error(`ringSoulIndex:${ringSoulIndex} this.ringSoulIndex_Self:${this.ringSoulIndex_Self}`)
        this.isHas = ringSoulIndex <= this.ringSoulIndex_Self;
        this.mIconImage.setImageColorByHex(ringSoulIconColors[this.ringSoulIndex - 1]);
        this.updateUI();
    }

    private updateUI(): void {
        let lv = this.getPlayerModuleC.getLv;
        this.mNameTextBlock.text = `第${figureStrs[this.ringSoulPage - 1]}魂环\n${ringSoulNames[this.ringSoulIndex - 1]}魂环`;
        if (this.isHas) {
            this.mHasTextBlock.visibility = mw.SlateVisibility.Collapsed;
            this.mCostTextBlock.visibility = mw.SlateVisibility.Collapsed;
            this.mUpTextBlock.visibility = mw.SlateVisibility.Collapsed;
        } else {
            this.mHasTextBlock.visibility = mw.SlateVisibility.SelfHitTestInvisible;
            this.mCostTextBlock.visibility = mw.SlateVisibility.SelfHitTestInvisible;
            this.mUpTextBlock.visibility = mw.SlateVisibility.SelfHitTestInvisible;
            this.mHasTextBlock.text = (lv >= this.ringSoulPage * 10) ? `级可解锁` : `${this.ringSoulPage * 10}级可解锁`;
            this.mCostTextBlock.text = `需要消耗\n<color=#00FFFF><size=30>${costDiamonds[this.ringSoulPage - 1][this.ringSoulIndex - 1]}</size></color><size=15>钻石</size>`;
        }
    }

    public setRingSoulItemChildDataByIndex(ringSoulIndex_Self: number): void {
        this.ringSoulIndex_Self = ringSoulIndex_Self;
        this.isHas = this.ringSoulIndex <= this.ringSoulIndex_Self;
        this.updateUI();
    }
}