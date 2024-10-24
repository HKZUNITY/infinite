import { Notice } from "../../common/notice/Notice";
import { GameConfig } from "../../config/GameConfig";
import { Utils } from "../../Tools/utils";
import WorldTips_1_Generate from "../../ui-generate/common/WorldTips/WorldTips_1_generate";
import WorldTips_2_Generate from "../../ui-generate/common/WorldTips/WorldTips_2_generate";
import WorldTips_3_Generate from "../../ui-generate/common/WorldTips/WorldTips_3_generate";
import WorldTips_4_Generate from "../../ui-generate/common/WorldTips/WorldTips_4_generate";
import WorldTips_5_Generate from "../../ui-generate/common/WorldTips/WorldTips_5_generate";
import WorldTips_6_Generate from "../../ui-generate/common/WorldTips/WorldTips_6_generate";
import WorldTips_7_Generate from "../../ui-generate/common/WorldTips/WorldTips_7_generate";
import WorldTips_Generate from "../../ui-generate/common/WorldTips/WorldTips_generate";
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
worldUIs.set(1, { name: "机甲女", worldUIId: "0D9A6CAC", worldUIName: `Text_ClaimLimitedSkin`, npcId: "2BC98814", skinId: "163553", triggerId: "1B51B317", bagId: 20063, adsCount: 10, currentAdsCount: 0, animationIds: ["285502"], delayPlayEffects: [], effectIds: [], effectLocs: [] });
worldUIs.set(2, { name: "机甲男", worldUIId: "", worldUIName: ``, npcId: "117D39D8", skinId: "164428", triggerId: "1DF5F6A5", bagId: 20062, adsCount: 5, currentAdsCount: 0, animationIds: ["285416"], delayPlayEffects: [], effectIds: [], effectLocs: [] });
worldUIs.set(3, { name: "小舞", worldUIId: "", worldUIName: ``, npcId: "210CBFFD", skinId: "163292", triggerId: "0113105D", bagId: 20061, adsCount: 5, currentAdsCount: 0, animationIds: ["284840"], delayPlayEffects: [], effectIds: [], effectLocs: [] });
worldUIs.set(4, { name: "自动攻击男", worldUIId: "", worldUIName: ``, npcId: "21F595BD", skinId: "142399", triggerId: "0B40F8AC", bagId: 10046, adsCount: 2, currentAdsCount: 0, animationIds: ["85125", "20267"], delayPlayEffects: [350, 250], effectIds: ["168946", "168946"], effectLocs: [new mw.Vector(180, 30, 70), new mw.Vector(-90, 20, 0)] });
worldUIs.set(5, { name: "自动攻击女", worldUIId: "07D9DF79", worldUIName: `Text_ClaimAutomaticAttack`, npcId: "2F801FDC", skinId: "303702", triggerId: "3E7DEC27", bagId: 10047, adsCount: 5, currentAdsCount: 0, animationIds: ["85125", "20267"], delayPlayEffects: [350, 250], effectIds: ["168946", "168946"], effectLocs: [new mw.Vector(180, 30, 70), new mw.Vector(-90, 20, 0)] });

const needRefreshWorldUI: string[] = ["2284425C", "05994F71"];
const needRefreshWorldUI_1: string[] = ["307CC8EF"];
const needRefreshWorldUI_2: string[] = ["1E7CB2D0"];
const needRefreshWorldUI_3: string[] = ["2EAA4C1B"];
const needRefreshWorldUI_4: string[] = ["3B4347A9"];
const needRefreshWorldUI_5: string[] = ["06FBC7BE", "13F5AF43"];
const needRefreshWorldUI_6: string[] = ["030E4F84"];
const needRefreshWorldUI_7: string[] = ["394026C7"];
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
                    levelItem.updateLevelTextBlock(GameConfig.Language[`${value.worldUIName}`].Value);
                    worldUI.setTargetUIWidget(levelItem.uiWidgetBase);
                });
            }
        });

        needRefreshWorldUI.forEach((value: string) => {
            mw.GameObject.asyncFindGameObjectById(value).then((worldUIGo: mw.GameObject) => {
                let worldUI: mw.UIWidget = worldUIGo as mw.UIWidget;
                let levelItem = mw.UIService.create(WorldTips_Generate);
                worldUI.setTargetUIWidget(levelItem.uiWidgetBase);
            });
        });
        needRefreshWorldUI_1.forEach((value: string) => {
            mw.GameObject.asyncFindGameObjectById(value).then((worldUIGo: mw.GameObject) => {
                let worldUI: mw.UIWidget = worldUIGo as mw.UIWidget;
                let levelItem = mw.UIService.create(WorldTips_1_Generate);
                worldUI.setTargetUIWidget(levelItem.uiWidgetBase);
            });
        });
        needRefreshWorldUI_2.forEach((value: string) => {
            mw.GameObject.asyncFindGameObjectById(value).then((worldUIGo: mw.GameObject) => {
                let worldUI: mw.UIWidget = worldUIGo as mw.UIWidget;
                let levelItem = mw.UIService.create(WorldTips_2_Generate);
                worldUI.setTargetUIWidget(levelItem.uiWidgetBase);
            });
        });
        needRefreshWorldUI_3.forEach((value: string) => {
            mw.GameObject.asyncFindGameObjectById(value).then((worldUIGo: mw.GameObject) => {
                let worldUI: mw.UIWidget = worldUIGo as mw.UIWidget;
                let levelItem = mw.UIService.create(WorldTips_3_Generate);
                worldUI.setTargetUIWidget(levelItem.uiWidgetBase);
            });
        });
        needRefreshWorldUI_4.forEach((value: string) => {
            mw.GameObject.asyncFindGameObjectById(value).then((worldUIGo: mw.GameObject) => {
                let worldUI: mw.UIWidget = worldUIGo as mw.UIWidget;
                let levelItem = mw.UIService.create(WorldTips_4_Generate);
                worldUI.setTargetUIWidget(levelItem.uiWidgetBase);
            });
        });
        needRefreshWorldUI_5.forEach((value: string) => {
            mw.GameObject.asyncFindGameObjectById(value).then((worldUIGo: mw.GameObject) => {
                let worldUI: mw.UIWidget = worldUIGo as mw.UIWidget;
                let levelItem = mw.UIService.create(WorldTips_5_Generate);
                worldUI.setTargetUIWidget(levelItem.uiWidgetBase);
            });
        });
        needRefreshWorldUI_6.forEach((value: string) => {
            mw.GameObject.asyncFindGameObjectById(value).then((worldUIGo: mw.GameObject) => {
                let worldUI: mw.UIWidget = worldUIGo as mw.UIWidget;
                let levelItem = mw.UIService.create(WorldTips_6_Generate);
                worldUI.setTargetUIWidget(levelItem.uiWidgetBase);
            });
        });
        needRefreshWorldUI_7.forEach((value: string) => {
            mw.GameObject.asyncFindGameObjectById(value).then((worldUIGo: mw.GameObject) => {
                let worldUI: mw.UIWidget = worldUIGo as mw.UIWidget;
                let levelItem = mw.UIService.create(WorldTips_7_Generate);
                worldUI.setTargetUIWidget(levelItem.uiWidgetBase);
            });
        });
    }

    private nextAds(value: WorldUI): void {
        if (this.getBagModuleC.isHasBagId(value.bagId)) {
            Notice.showDownNotice(GameConfig.Language.Text_ObtainedOpenTheBackpackToUse.Value);
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
        }, StringUtil.format(GameConfig.Language.Text_WatchTheAdvertisementTimesGetItForFree.Value, value.adsCount - value.currentAdsCount)
            , GameConfig.Language.Text_Cancel.Value
            , GameConfig.Language.Text_GetItForFree.Value);
    }
}


export class WorldUIModuleS extends ModuleS<WorldUIModuleC, null> {

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {

    }

}