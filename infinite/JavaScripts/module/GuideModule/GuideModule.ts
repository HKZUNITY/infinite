import { GeneralManager, } from '../../Modified027Editor/ModifiedStaticAPI';
import { Utils } from "../../Tools/utils";
import { Notice } from "../../common/notice/Notice";
import GlobalData from "../../const/GlobalData";
import { BagInfoPanel, BagModuleC } from '../BagModule/BagModule';
import GuidePanel from "./ui/GuidePanel";

export class GuideData extends Subdata {
    @Decorator.persistence()
    public isFirst: boolean = true;

    protected initDefaultData(): void {
        this.isFirst = true;
    }

    /**
     * 完成新手引导
     */
    public onCompleted(): void {
        this.isFirst = false;
        this.save(true);
    }
}

export class GuideModuleC extends ModuleC<GuideModuleS, GuideData> {
    private guidePanel: GuidePanel = null;
    private get getGuidePanel(): GuidePanel {
        if (!this.guidePanel) {
            this.guidePanel = mw.UIService.getUI(GuidePanel);
        }
        return this.guidePanel
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
    private totalStep: number = 27;
    private curStep: number = -1;
    public onNextStepAction: Action = new Action();

    public startFirst(): void {
        if (this.data.isFirst) {
            this.onNextStepAction.add(() => {
                this.curStep++;
                if (this.curStep > this.totalStep) {
                    if (!this.data.isFirst) return;
                    this.onCompleted();
                    return;
                }
                this.getGuidePanel.guideByStep(this.curStep);
            });
            this.onNextStepAction.call();
        } else {
            this.find();
        }
    }

    /**引导目标点特效ID */
    // private targetGuideEffectId: number = null;
    /**引导间隔标识 */
    private guideIntervalId: number = null;
    /**引导线特效ID */
    private guideEffectIds: number[] = [];
    /**记录上一次玩家的坐标 */
    private prePlayerLoc: mw.Vector = mw.Vector.zero;

    /**开始引导 */
    public startGuide(targetLoc: mw.Vector, onComplete: () => void = null): void {
        if (!targetLoc) return;

        // if (this.targetGuideEffectId) {
        //     EffectService.stop(this.targetGuideEffectId);
        //     this.targetGuideEffectId = null;
        // }

        // this.targetGuideEffectId = GeneralManager.rpcPlayEffectAtLocation(GlobalData.targetEffectGuid,
        //     targetLoc, 0, mw.Rotation.zero, mw.Vector.one.multiply(5));

        if (this.guideIntervalId) {
            TimeUtil.clearInterval(this.guideIntervalId);
            this.guideIntervalId = null;
        }

        this.guideIntervalId = TimeUtil.setInterval(() => {
            let playerLoc = this.localPlayer.character.worldTransform.position;
            if (Math.abs(playerLoc.x - this.prePlayerLoc.x) < 0.1 && Math.abs(playerLoc.y - this.prePlayerLoc.y) < 0.1 && Math.abs(playerLoc.z - this.prePlayerLoc.z) < 0.1) return;
            this.prePlayerLoc = playerLoc;

            let distance = mw.Vector.distance(playerLoc, targetLoc);
            if (distance <= 100) {
                TimeUtil.clearInterval(this.guideIntervalId);
                this.guideIntervalId = null;
                // if (this.targetGuideEffectId) {
                //     EffectService.stop(this.targetGuideEffectId);
                //     this.targetGuideEffectId = null;
                // }
                if (this.guideEffectIds.length != 0) {
                    this.guideEffectIds.forEach((effectId: number) => {
                        EffectService.stop(effectId);
                    });
                    this.guideEffectIds.length = 0;
                }
                Notice.showDownNotice("已到达目标点附近");
                if (onComplete) onComplete();
                return;
            }

            let pointNum = Math.floor(distance / 100);
            let locs = Utils.getCurvePointsInNum([playerLoc, targetLoc], pointNum);
            if (pointNum > 35) {
                pointNum = 35;
            }

            if (this.guideEffectIds.length == 0) {
                for (let i = 1; i < pointNum; ++i) {
                    let effectId = GeneralManager.rpcPlayEffectAtLocation(
                        GlobalData.guideEffectGuid,
                        new mw.Vector(locs[i].x, locs[i].y, locs[i].z - 85),
                        0,
                        mw.Rotation.zero,
                        mw.Vector.one.multiply(2));
                    this.guideEffectIds.push(effectId);
                }
            }
            else {
                if (this.guideEffectIds.length == pointNum) {
                    for (let i = 1; i < pointNum; ++i) {
                        EffectService.getEffectById(this.guideEffectIds[i - 1]).then((effect) => {
                            effect.worldTransform.position = (new mw.Vector(locs[i].x, locs[i].y, locs[i].z - 85));
                        });
                    }
                    EffectService.stop(this.guideEffectIds[pointNum - 1]);
                    this.guideEffectIds.length = pointNum - 1;
                }
                else if (this.guideEffectIds.length < pointNum) {
                    for (let i = 0; i < this.guideEffectIds.length; ++i) {
                        EffectService.getEffectById(this.guideEffectIds[i]).then((effect) => {
                            effect.worldTransform.position = (new mw.Vector(locs[i + 1].x, locs[i + 1].y, locs[i + 1].z - 85));
                        });
                    }
                    for (let i = this.guideEffectIds.length; i < pointNum - 1; ++i) {
                        let effectId = GeneralManager.rpcPlayEffectAtLocation(
                            GlobalData.guideEffectGuid,
                            new mw.Vector(locs[i + 1].x, locs[i + 1].y, locs[i + 1].z - 85),
                            0,
                            mw.Rotation.zero,
                            mw.Vector.one.multiply(2));
                        this.guideEffectIds.push(effectId);
                    }
                }
                else if (this.guideEffectIds.length > pointNum) {
                    for (let i = 0; i < pointNum; ++i) {
                        EffectService.getEffectById(this.guideEffectIds[i]).then((effect) => {
                            if (!locs[i + 1]) return;
                            effect.worldTransform.position = (new mw.Vector(locs[i + 1].x, locs[i + 1].y, locs[i + 1].z - 85));
                        });
                    }
                    for (let i = pointNum; i < this.guideEffectIds.length; ++i) {
                        EffectService.stop(this.guideEffectIds[i]);
                    }
                    this.guideEffectIds.length = pointNum;
                }
            }
        }, 0.1);
    }

    /**完成新手引导 */
    public onCompleted(): void {
        this.server.net_onCompleted();
        this.getBagModuleC.onCompleted(20061);
        this.find();
    }

    public find(): void {
        if (!this.getBagModuleC.isHasBagId(10001)) {
            this.startGuide(this.getBagModuleC.getBagObVec(10001), () => {
                if (!this.getBagModuleC.isHasBagId(10037)) {
                    this.startGuide(this.getBagModuleC.getBagObVec(10037), () => {
                        if (!this.getBagModuleC.isHasBagId(20023)) {
                            this.startGuide(this.getBagModuleC.getBagObVec(20023), () => {
                                if (!this.getBagModuleC.isHasBagId(30001)) {
                                    this.startGuide(this.getBagModuleC.getBagObVec(30001), () => {
                                        if (!this.getBagModuleC.isHasBagId(20053)) {
                                            this.startGuide(this.getBagModuleC.getBagObVec(20053), () => {
                                                this.first();
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        } else {
            if (!this.getBagModuleC.isHasBagId(10037)) {
                this.startGuide(this.getBagModuleC.getBagObVec(10037), () => {
                    if (!this.getBagModuleC.isHasBagId(20023)) {
                        this.startGuide(this.getBagModuleC.getBagObVec(20023), () => {
                            if (!this.getBagModuleC.isHasBagId(30001)) {
                                this.startGuide(this.getBagModuleC.getBagObVec(30001), () => {
                                    if (!this.getBagModuleC.isHasBagId(20053)) {
                                        this.startGuide(this.getBagModuleC.getBagObVec(20053), () => {
                                            this.first();
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            } else {
                if (!this.getBagModuleC.isHasBagId(20023)) {
                    this.startGuide(this.getBagModuleC.getBagObVec(20023), () => {
                        if (!this.getBagModuleC.isHasBagId(30001)) {
                            this.startGuide(this.getBagModuleC.getBagObVec(30001), () => {
                                if (!this.getBagModuleC.isHasBagId(20053)) {
                                    this.startGuide(this.getBagModuleC.getBagObVec(20053), () => {
                                        this.first();
                                    });
                                }
                            });
                        }
                    });
                } else {
                    if (!this.getBagModuleC.isHasBagId(30001)) {
                        this.startGuide(this.getBagModuleC.getBagObVec(30001), () => {
                            if (!this.getBagModuleC.isHasBagId(20053)) {
                                this.startGuide(this.getBagModuleC.getBagObVec(20053), () => {
                                    this.first();
                                });
                            }
                        });
                    } else {
                        if (!this.getBagModuleC.isHasBagId(20053)) {
                            this.startGuide(this.getBagModuleC.getBagObVec(20053), () => {
                                this.first();
                            });
                        }
                    }
                }
            }
        }
    }

    public first(): void {
        TimeUtil.delaySecond(5).then(() => {
            if (mw.UIService.getUI(BagInfoPanel, false).visible) mw.UIService.hide(BagInfoPanel);
            Event.dispatchToLocal("First");
            TimeUtil.delaySecond(5).then(() => {
                this.getGuidePanel.guideByStep(21);
                this.localPlayer.character.worldTransform.position = Utils.getWorldLocation();
                Notice.showDownNotice(`返回新手村`);
                Notice.showDownNotice(`正式开启你的副本吧`);
            });
        });
    }
}

export class GuideModuleS extends ModuleS<GuideModuleC, GuideData> {

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {

    }

    /**
     * 完成新手引导
     */
    @Decorator.noReply()
    public net_onCompleted(): void {
        this.currentData.onCompleted();
    }
}