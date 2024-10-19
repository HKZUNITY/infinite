import { Notice } from "../../common/notice/Notice";
import { Utils } from "../../Tools/utils";
import AdTipsPanel from "../AdsModule/ui/AdTipsPanel";
import { BagModuleC } from "../BagModule/BagModule";
import { LevelItem } from "../LevelModule/LevelModule";

export class WorldUI {
    /** 世界UI的ID */
    worldUIId: string;
    /** 世界UI的名称 */
    worldUIName: string;
    npcId: string;
    skinId: string;
    triggerId: string;
    bagId: number;
    adsCount: number;
    currentAdsCount: number;
    animationIds: string[];
    delayPlayEffects: number[];
    effectIds: string[];
    effectLocs: mw.Vector[];
    name: string;
}

const worldUIs: Map<number, WorldUI> = new Map<number, WorldUI>();
worldUIs.set(1, { name: "机甲女", worldUIId: "0D9A6CAC", worldUIName: `领取限定皮肤`, npcId: "2BC98814", skinId: "163553", triggerId: "1B51B317", bagId: 20063, adsCount: 10, currentAdsCount: 0, animationIds: ["285502"], delayPlayEffects: [], effectIds: [], effectLocs: [] });
worldUIs.set(2, { name: "机甲男", worldUIId: "", worldUIName: ``, npcId: "117D39D8", skinId: "164428", triggerId: "1DF5F6A5", bagId: 20062, adsCount: 5, currentAdsCount: 0, animationIds: ["285416"], delayPlayEffects: [], effectIds: [], effectLocs: [] });
worldUIs.set(3, { name: "小舞", worldUIId: "", worldUIName: ``, npcId: "210CBFFD", skinId: "163292", triggerId: "0113105D", bagId: 20061, adsCount: 5, currentAdsCount: 0, animationIds: ["284840"], delayPlayEffects: [], effectIds: [], effectLocs: [] });
worldUIs.set(4, { name: "自动攻击男", worldUIId: "", worldUIName: ``, npcId: "21F595BD", skinId: "142399", triggerId: "0B40F8AC", bagId: 10046, adsCount: 2, currentAdsCount: 0, animationIds: ["85125", "20267"], delayPlayEffects: [350, 250], effectIds: ["168946", "168946"], effectLocs: [new mw.Vector(180, 30, 70), new mw.Vector(-90, 20, 0)] });
worldUIs.set(5, { name: "自动攻击女", worldUIId: "07D9DF79", worldUIName: `领取自动攻击`, npcId: "2F801FDC", skinId: "303702", triggerId: "3E7DEC27", bagId: 10047, adsCount: 5, currentAdsCount: 0, animationIds: ["85125", "20267"], delayPlayEffects: [350, 250], effectIds: ["168946", "168946"], effectLocs: [new mw.Vector(180, 30, 70), new mw.Vector(-90, 20, 0)] });
export class WorldUIModuleC extends ModuleC<WorldUIModuleS, null> {
    private adTipsPanel: AdTipsPanel = null;
    private get getAdTipsPanel(): AdTipsPanel {
        if (!this.adTipsPanel) {
            this.adTipsPanel = mw.UIService.create(AdTipsPanel);
        }
        return this.adTipsPanel
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

    }

    protected onEnterScene(sceneType: number): void {
        this.initWorldUI();
    }

    private initWorldUI(): void {
        worldUIs.forEach((value: WorldUI, key: number) => {
            if (value.npcId && value.npcId.length > 0) {
                mw.GameObject.asyncFindGameObjectById(value.npcId).then((npcGo: mw.GameObject) => {
                    let npc = npcGo as mw.Character;
                    Utils.asyncDownloadAsset(value.skinId).then(() => {
                        npc.setDescription([value.skinId]);
                    });

                    if (!value.animationIds || value.animationIds.length == 0) return;
                    if (value.animationIds.length == 1) {
                        let npcAnimation1 = npc.loadAnimation(value.animationIds[0]);
                        npcAnimation1.loop = 0;
                        npcAnimation1.play();
                    } else if (value.animationIds.length == 2) {
                        let npcAnimation1 = npc.loadAnimation(value.animationIds[0]);
                        let npcAnimation2 = npc.loadAnimation(value.animationIds[1]);

                        npcAnimation1.onFinish.add(() => {
                            npcAnimation2.play();
                            setTimeout(() => {
                                let forward = npc.worldTransform.getForwardVector().normalized;
                                let right = npc.worldTransform.getRightVector().normalized;
                                let offsetLoc = mw.Vector.zero;
                                let offsetPos = npc.worldTransform.position.clone().add(
                                    forward.clone().multiply(offsetLoc.x).add(
                                        right.clone().multiply(offsetLoc.y)
                                    ).add(
                                        mw.Vector.up.multiply(offsetLoc.z)
                                    )
                                );

                                let offsetRot = value.effectLocs[1];
                                let offsetRotate = npc.worldTransform.getForwardVector().toRotation().clone().add(new mw.Rotation(offsetRot.x, offsetRot.y, offsetRot.z));
                                EffectService.playAtPosition(value.effectIds[1], offsetPos, { rotation: offsetRotate });
                            }, value.delayPlayEffects[1]);
                        });

                        npcAnimation2.onFinish.add(() => {
                            npcAnimation1.play();
                            setTimeout(() => {
                                let forward = npc.worldTransform.getForwardVector().normalized;
                                let right = npc.worldTransform.getRightVector().normalized;
                                let offsetLoc = mw.Vector.zero;
                                let offsetPos = npc.worldTransform.position.clone().add(
                                    forward.clone().multiply(offsetLoc.x).add(
                                        right.clone().multiply(offsetLoc.y)
                                    ).add(
                                        mw.Vector.up.multiply(offsetLoc.z)
                                    )
                                );

                                let offsetRot = value.effectLocs[0];
                                let offsetRotate = npc.worldTransform.getForwardVector().toRotation().clone().add(new mw.Rotation(offsetRot.x, offsetRot.y, offsetRot.z));

                                EffectService.playAtPosition(value.effectIds[0], offsetPos, { rotation: offsetRotate });
                            }, value.delayPlayEffects[0]);
                        });

                        npcAnimation1.play();
                        setTimeout(() => {
                            let forward = npc.worldTransform.getForwardVector().normalized;
                            let right = npc.worldTransform.getRightVector().normalized;
                            let offsetLoc = mw.Vector.zero;
                            let offsetPos = npc.worldTransform.position.clone().add(
                                forward.clone().multiply(offsetLoc.x).add(
                                    right.clone().multiply(offsetLoc.y)
                                ).add(
                                    mw.Vector.up.multiply(offsetLoc.z)
                                )
                            );

                            let offsetRot = value.effectLocs[0];
                            let offsetRotate = npc.worldTransform.getForwardVector().toRotation().clone().add(new mw.Rotation(offsetRot.x, offsetRot.y, offsetRot.z));
                            EffectService.playAtPosition(value.effectIds[0], offsetPos, { rotation: offsetRotate });
                        }, value.delayPlayEffects[0]);
                    }
                });
            }

            if (value.triggerId && value.triggerId.length > 0) {
                mw.GameObject.asyncFindGameObjectById(value.triggerId).then((triggerGo: mw.GameObject) => {
                    let trigger = triggerGo as mw.Trigger;
                    trigger.onEnter.add((character: mw.Character) => {
                        if (character.gameObjectId != this.localPlayer.character.gameObjectId) return;
                        this.nextAds(value);
                    });
                });
            }

            if (value.worldUIId && value.worldUIId.length > 0) {
                mw.GameObject.asyncFindGameObjectById(value.worldUIId).then((worldUIGo: mw.GameObject) => {
                    let worldUI: mw.UIWidget = worldUIGo as mw.UIWidget;
                    let levelItem = mw.UIService.create(LevelItem);
                    levelItem.updateLevelTextBlock(value.worldUIName);
                    worldUI.setTargetUIWidget(levelItem.uiWidgetBase);
                });
            }
        });
    }

    private nextAds(value: WorldUI): void {
        if (this.getBagModuleC.isHasBagId(value.bagId)) {
            Notice.showDownNotice(`已获得，打开背包使用`);
            return;
        }
        this.getAdTipsPanel.showRewardAd(() => {
            value.currentAdsCount++;
            if (value.currentAdsCount >= value.adsCount) {
                this.getBagModuleC.onCompleted(value.bagId);
            } else {
                TimeUtil.delaySecond(2).then(() => {
                    this.nextAds(value);
                });
            }
        }, `观看${value.adsCount - value.currentAdsCount}次广告\n免费获得`, `取消`, `领取`);
    }
}


export class WorldUIModuleS extends ModuleS<WorldUIModuleC, null> {

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {

    }

}