import { PlayerManagerExtesion, } from '../../Modified027Editor/ModifiedPlayer';
import Console from "../../Tools/Console";
import { Utils } from "../../Tools/utils";
import { Notice } from '../../common/notice/Notice';
import { GameConfig } from "../../config/GameConfig";
import { IMusicElement } from "../../config/Music";
import GlobalData from "../../const/GlobalData";
import AdTipsPanel from '../AdsModule/ui/AdTipsPanel';
import { BagModuleC } from '../BagModule/BagModule';
import { OnlineRewardModuleC } from "../OnlineRewardModule/OnlineRewardModuleC";
import PlayerModuleC from "../PlayerModule/PlayerModuleC";
import { WorldConfigData } from '../RankModule/PlayerPropData';
import { RingSoulPanel } from '../RingSoulModule/RingSoulModule';
import TaskModuleC from "../TaskModule/TaskModuleC";
import HUDModuleS from "./HUDModuleS";
import HUDPanel from "./ui/HUDPanel";

export default class HUDModuleC extends ModuleC<HUDModuleS, null> {
    private onlineRewardModuleC: OnlineRewardModuleC = null;
    private get getOnlineRewardModuleC(): OnlineRewardModuleC {
        if (!this.onlineRewardModuleC) {
            this.onlineRewardModuleC = ModuleService.getModule(OnlineRewardModuleC);
        }
        return this.onlineRewardModuleC;
    }
    private taskModuleC: TaskModuleC = null;
    private get getTaskModuleC(): TaskModuleC {
        if (!this.taskModuleC) {
            this.taskModuleC = ModuleService.getModule(TaskModuleC);
        }
        return this.taskModuleC;
    }
    private playerModuleC: PlayerModuleC = null;
    private get getPlayerModuleC(): PlayerModuleC {
        if (!this.playerModuleC) {
            this.playerModuleC = ModuleService.getModule(PlayerModuleC);
        }
        return this.playerModuleC;
    }
    private hudPanel: HUDPanel = null;
    private get getHudPanel(): HUDPanel {
        if (!this.hudPanel) {
            this.hudPanel = mw.UIService.getUI(HUDPanel);
        }
        return this.hudPanel;
    }
    private ringSoulPanel: RingSoulPanel = null;
    private get getRingSoulPanel(): RingSoulPanel {
        if (!this.ringSoulPanel) {
            this.ringSoulPanel = mw.UIService.getUI(RingSoulPanel);
        }
        return this.ringSoulPanel;
    }
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
    /**跳跃事件 */
    public onJumpAction: Action = new Action();
    /**打开HUD事件 */
    public onOpenHUDAction: Action = new Action();
    /**打开商店事件 */
    public onOpenShopAction: Action = new Action();
    /**打开捏脸换装事件 */
    public onOpenPlayerAction: Action = new Action();
    /**冲刺事件 */
    public onSprintAction: Action = new Action();
    /**巨人化事件 */
    public onPlayerScaleAction: Action1<number> = new Action1<number>();
    /**打开再将奖励 */
    public onOpenOnlineRewardAction: Action = new Action();
    /**打开任务 */
    public onOpenTaskAction: Action = new Action();
    /**打开排行榜 */
    public onOpenRankAction: Action = new Action();
    public onHomeAction: Action = new Action();
    public onAddCoinAction: Action = new Action();
    public onAddDiamondAction: Action = new Action();
    public onAdsAction: Action = new Action();
    public onInvincibleAction: Action1<boolean> = new Action1();
    public onOpenRingSoulAction: Action = new Action();
    public onOnOffRingSoulAction: Action1<boolean> = new Action1<boolean>();
    public onOpenSignInAction: Action = new Action();
    public onOpenArkAction: Action = new Action();
    public onOpenGetAction: Action = new Action();

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        this.initDatas();
        this.registerActions();
    }

    /**初始化数据 */
    private initDatas(): void {
        this.initMusicData();
    }

    /**注册事件 */
    private registerActions(): void {
        this.onOpenHUDAction.add(() => {
            this.getHudPanel.show();
        });
        this.onJumpAction.add(() => {
            this.playerJump();
        });
        this.onSprintAction.add(() => {
            this.sprint();
        });
        this.onPlayerScaleAction.add((playerScale: number) => {
            this.playerScale = playerScale;
        });
        this.onOpenOnlineRewardAction.add(() => {
            this.getOnlineRewardModuleC.onOnlineRewardsAction.call(true);
        });
        this.onHomeAction.add(() => {
            this.localPlayer.character.worldTransform.position = Utils.getWorldLocation();
        });
        this.onAddCoinAction.add(() => {
            if (GlobalData.isOpenIAA) {
                this.getAdTipsPanel.showRewardAd(() => {
                    this.getPlayerModuleC.saveCoin(10000);
                }, "免费领取10000金币", "取消", "免费领取");
            } else {
                this.getPlayerModuleC.saveCoin(10000);
            }
        });
        this.onAddDiamondAction.add(() => {
            if (GlobalData.isOpenIAA) {
                this.getAdTipsPanel.showRewardAd(() => {
                    this.getPlayerModuleC.saveDiamond(1);
                }, "免费领取1颗钻石", "取消", "免费领取");
            } else {
                this.getPlayerModuleC.saveDiamond(1);
            }
        });

        this.onAdsAction.add(() => {
            if (GlobalData.isOpenIAA) {
                this.getAdTipsPanel.showRewardAd(() => {
                    this.getPlayerModuleC.adsUpLv();
                }, "等级免费提升一级", "取消", "免费领取");
            } else {
                this.getPlayerModuleC.adsUpLv();
            }
        });

        this.onInvincibleAction.add((isInvincible: boolean) => {
            this.getPlayerModuleC.isInvincible(isInvincible);
        });

        this.registerMusicAction();

        let isOpenHUD: boolean = false;
        InputUtil.onKeyDown(mw.Keys.NumPadOne, () => {
            isOpenHUD = !isOpenHUD;
            isOpenHUD ? this.getHudPanel.show() : this.getHudPanel.hide();
            Console.error("isOpenHUD =" + isOpenHUD);
        });

        Event.addLocalListener("AttackMp", () => {
            this.isHaveMp(GlobalData.attackMp);
        });
    }

    protected onEnterScene(sceneType: number): void {
        this.getHudPanel.show();
        this.registerGlobalClickSound();
        this.delayedOperation();
    }

    protected onUpdate(dt: number): void {
        this.updateJumpTime(dt);
        this.updateMp(dt);
    }

    /**全局UI点击音效唯一标识 */
    private uiClickSoundId: string = null;
    /**注册全局点击音效 */
    private registerGlobalClickSound(): void {
        /**全局UI点击音效 */
        Event.addLocalListener("PlayButtonClick", (v: string) => {
            Console.error("[PlayButtonClick-Name] = " + v);
            if (v == "mSprintButton" || v == "mJumpButton") return;
            if (this.uiClickSoundId) {
                // Console.error("[停止上一次的点击音效]");
                SoundService.stopSound(this.uiClickSoundId);
                this.uiClickSoundId = null;
            }
            this.uiClickSoundId = SoundService.playSound(GlobalData.uiClickSoundGuid);
        });
    }

    /**延迟执行的测试用例 */
    private delayedOperation(): void {
        TimeUtil.delaySecond(3).then(() => {
            this.playBGM(0);
            if (GlobalData.isHideHeadUI) {
                this.localPlayer.character.displayName = "";
            }
        });
    }

    /**
     * 更新在线奖励Icon
     * @param icon 
     */
    public updateOnlineRewradIcon(icon: string): void {
        this.getHudPanel.updateOnlineRewradIcon(icon);
    }

    private lv: number = 0;
    public updateLvExpCoin(lv: number, exp: number, coin: number, isAddLv: boolean): void {
        this.lv = lv;
        this.getHudPanel.updateLvExpCoin(lv, exp, coin, this.getBagModuleC.getAddAtkByUsing());
        if (!isAddLv) return;
        this.maxMp = 100 + (lv * 10);
        this.currentMp = this.maxMp;
        this.getHudPanel.updateMp(this.currentMp, this.maxMp);
        let hp = Math.round(Utils.getHp(lv) * this.getBagModuleC.getAddHpByUsing());
        this.maxHp = hp;
        this.updateHp(hp);
    }

    public updateCoin(coin: number): void {
        this.getHudPanel.updateCoin(coin);
    }
    public updateDiamond(diamond: number): void {
        this.getHudPanel.updateDiamond(diamond);
        this.getRingSoulPanel.updateDiamond(diamond);
    }

    private maxHp: number = -1;
    private curHp: number = -1;
    public updateHp(curHp: number): void {
        this.curHp = curHp;
        if (this.curHp > this.maxHp) this.curHp = this.maxHp;
        this.getHudPanel.updateHp(curHp, this.maxHp);
    }

    public updateHpByUsing(addHp: number, addAtk: number): void {
        let hp = Math.round(Utils.getHp(this.lv) * addHp);
        this.maxHp = hp;
        this.getHudPanel.updateHp(this.curHp, this.maxHp);
        this.getHudPanel.updateAtk(this.lv, addAtk);
    }

    //#region 击杀提示
    public killTip(killerUserId: string, killerName: string, killedUserId: string, killedName: string): void {
        let killTipType: KillTipType = KillTipType.None;
        if (killerUserId == this.localPlayer.userId) {
            killTipType = KillTipType.Killer;
        } else if (killedUserId == this.localPlayer.userId) {
            killTipType = KillTipType.Killed;
        }
        this.getHudPanel.killTip(killTipType, killerName, killedName);
        this.killTipsSound(killerUserId, killerName, killedUserId, killedName);
    }
    //#endregion

    //#region 连杀提示
    private killCountMap: Map<string, number> = new Map<string, number>();
    private revengeUserIdMap: Set<string> = new Set<string>();
    private killTipsSound(killerUserId: string, killerName: string, killedUserId: string, killedName: string): void {
        let killTipType: KillTipType = KillTipType.None;
        if (killedUserId == this.localPlayer.userId) {
            killTipType = KillTipType.Killed;
            if (!this.revengeUserIdMap.has(killerUserId)) this.revengeUserIdMap.add(killerUserId);
            SoundService.playSound("294343", 1);
        } else if (killerUserId == this.localPlayer.userId && this.revengeUserIdMap.has(killedUserId)) {
            killTipType = KillTipType.revenge;
            this.revengeUserIdMap.delete(killedUserId);
            SoundService.playSound("294342", 1);
        }
        this.getHudPanel.showKillTips2(killerName, killedName, killTipType);

        if (this.killCountMap.has(killedUserId)) this.killCountMap.delete(killedUserId);
        let killCount: number = 0;
        if (this.killCountMap.has(killerUserId)) {
            killCount = this.killCountMap.get(killerUserId);
        }
        killCount++;
        this.killCountMap.set(killerUserId, killCount);
        if (killCount <= 1) return;

        let soundId: string = "";
        let killCountTips: string = "";
        switch (killCount) {
            case 2:
                soundId = "65877";
                killCountTips = "连续消灭2人！势不可当！";
                break;
            case 3:
                soundId = "65874";
                killCountTips = "连续消灭3人！勇冠三军！";
                break;
            case 4:
                soundId = "65873";
                killCountTips = "连续消灭4人！无人能敌！";
                break;
            case 5:
                soundId = "65881";
                killCountTips = "连续消灭5人！横扫千军！";
                break;
            case 6:
                soundId = "65871";
                killCountTips = "连续消灭6人！接近神了！";
                break;
            case 7:
                soundId = "65879";
                killCountTips = "连续消灭7人！超越神了！";
                break;
            default:
                soundId = "65879";
                killCountTips = "连续消灭" + Utils.numChangeToCN(killCount) + "人！超越神了！";
                break;
        }
        SoundService.playSound(soundId, 1);
        this.getHudPanel.showKillTips1(killCountTips, killerName, killedName);
    }
    //#endregion

    //#region 能量
    private maxMp: number = 100;
    private currentMp: number = 100;
    public get getMp(): number {
        return this.currentMp;
    }

    private isStartAddMp: boolean = false;
    private addMpTime: number = 1;
    private addMpTimer: number = 0;
    /**
     * 跟新能量
     * @param dt 
     * @returns 
     */
    private updateMp(dt: number): void {
        if (!this.isStartAddMp) return;
        this.addMpTimer += dt;
        if (this.addMpTimer >= this.addMpTime) {
            this.addMpTimer = 0;
            this.addMp(1);
        }
    }

    /**
     * 增加能量
     * @param mp 
     */
    private addMp(mp: number): void {
        this.currentMp += mp;
        Console.error("this.currentMp = " + this.currentMp);
        if (this.currentMp >= this.maxMp) {
            this.currentMp = this.maxMp;
            this.isStartAddMp = false;
            this.addMpTimer = 0;
        }
        this.getHudPanel.updateMp(this.currentMp, this.maxMp);
    }

    private isStartAddMpId: any = null;
    /**
     * 是否有能量
     * @returns 
     */
    private isHaveMp(reduceMp: number = 10): boolean {
        if (this.currentMp - reduceMp < 0) {
            this.isStartAddMp = true;
            if (this.isStartAddMpId) {
                clearTimeout(this.isStartAddMpId);
            }
            this.isStartAddMpId = null;
            return false;
        }
        this.currentMp -= reduceMp;
        this.getHudPanel.updateMp(this.currentMp, this.maxMp);
        Console.error("this.currentMp = " + this.currentMp);
        this.isStartAddMp = false;
        if (this.isStartAddMpId) {
            clearTimeout(this.isStartAddMpId);
        }
        this.isStartAddMpId = null;
        this.isStartAddMpId = setTimeout(() => {
            this.isStartAddMp = true;
        }, 5 * 1000);
        return true;
    }
    //#endregion

    //#region 巨人
    private playerScale: number = 1;

    //#region 冲刺
    private isCanSprint: boolean = true;
    private sprintAnimation: mw.Animation = null;
    private sprintClips: string[] = ["151007", "151008"];
    private sprintIndex: number = 0;

    /**
     * 冲刺
     * @returns 
     */
    private sprint(): void {
        if (!this.isCanSprint) return;
        if (!this.isHaveMp(10)) {
            Notice.showDownNotice(`${GlobalData.mpStr}不足`);
            Notice.showDownNotice(`升级增加${GlobalData.mpStr}储量`);
            return;
        }
        this.isCanSprint = false;
        if (this.sprintAnimation) this.sprintAnimation.stop();
        this.sprintAnimation = PlayerManagerExtesion.rpcPlayAnimation(this.localPlayer.character, this.sprintClips[this.sprintIndex], 1)
        this.sprintIndex = (this.sprintIndex + 1) % 2;
        this.localPlayer.character.movementEnabled = false;
        TimeUtil.delaySecond(0.1).then(() => {
            this.server.net_sprint(this.sprintIndex, this.playerScale);
        });
        TimeUtil.delaySecond(0.5).then(() => {
            this.localPlayer.character.movementEnabled = true;
            this.isCanSprint = true;
            if (this.sprintAnimation) {
                this.sprintAnimation.stop();
                this.sprintAnimation = null;
            }
        });
    }
    //#endregion

    //#region jump
    private currentJumpTime: number = 0;
    private secondJumpAniID: string = "150691";
    private grilStompingEffect: string = "132627";
    private boyStompingEffect: string = "130743";
    private landingEffects: string[] = ["89128", "89129", "89130"];
    private landingEffectId: string = "89089";
    private landingSoundId: string = "122568";
    private girlJumpSoundId: string = "101208";
    private boyJumpSoundId: string = "121734";
    private isStartTime: boolean = false;
    /**
     * 更新跳跃状态
     * @param dt 
     * @returns 
     */
    private updateJumpTime(dt: number): void {
        if (!this.isStartTime) return;
        if (!this.localPlayer.character.isJumping) {
            this.currentJumpTime = 0;
            this.isStartTime = false;

            let effectId = this.landingEffects[Utils.getRandomInteger(0, 2)];
            let startLoc = this.localPlayer.character.worldTransform.position;
            let capsuleHalfHeight = this.localPlayer.character.collisionExtent.z / 2;
            let effectOffset = new mw.Vector(startLoc.x, startLoc.y, startLoc.z - capsuleHalfHeight * this.playerScale);
            this.server.net_playLandEffectAndSound([effectId, this.landingEffectId], effectOffset, this.landingSoundId, this.playerScale);
        }
    }

    /**
     * JUmp
     * @returns 
     */
    private playerJump(): void {
        if (this.localPlayer.character.isJumping && this.currentJumpTime >= 2) return;
        this.currentJumpTime++;
        if (this.currentJumpTime == 1) {
            if (!this.isHaveMp(5)) {
                Notice.showDownNotice(`${GlobalData.mpStr}不足`);
                Notice.showDownNotice(`升级增加${GlobalData.mpStr}储量`);
                return;
            }
        }
        if (this.currentJumpTime == 2) {
            if (!this.isHaveMp(5)) {
                Notice.showDownNotice(`${GlobalData.mpStr}不足`);
                Notice.showDownNotice(`升级增加${GlobalData.mpStr}储量`);
                return;
            }
            PlayerManagerExtesion.rpcPlayAnimation(this.localPlayer.character, this.secondJumpAniID, 1)
            let stompingEffectId: string = "";
            let soundId: string = ""
            if (this.IsGirl()) {
                soundId = this.girlJumpSoundId;
                stompingEffectId = this.grilStompingEffect;
            } else {
                soundId = this.boyJumpSoundId;
                stompingEffectId = this.boyStompingEffect;
            }
            this.server.net_playStompingEffectAndSound(stompingEffectId, soundId, this.playerScale);
        }
        this.localPlayer.character.jump();
        this.isStartTime = true;
    }

    /**
     * 判断是否是女    
     * @returns 
     */
    private IsGirl(): boolean {
        let somatotype = Player.localPlayer.character.description.advance.base.characterSetting.somatotype;
        if (somatotype == mw.SomatotypeV2.AnimeFemale
            || somatotype == mw.SomatotypeV2.LowpolyAdultFemale
            || somatotype == mw.SomatotypeV2.RealisticAdultFemale
            || somatotype == mw.SomatotypeV2.CartoonyFemale) return true;
        return false;
    }
    //#endregion
    //#endregion

    //#region 背景音乐
    /**当前播放的背景音乐 */
    private currentBgmIndex: number = 1;
    /**背景音乐 */
    private bgmMusics: IMusicElement[] = [];

    /**初始化背景音乐数据 */
    private initMusicData(): void {
        this.bgmMusics = GameConfig.Music.getAllElement();
    }

    /**注册背景音乐事件 */
    private registerMusicAction(): void {
        this.getHudPanel.onBgmAction.add((isOpenBGM: boolean) => {
            if (isOpenBGM) {
                this.playBGM(0);
            }
            else {
                SoundService.stopBGM();
            }
        });
        this.getHudPanel.onSwitchBgmAction.add(this.playBGM.bind(this));
    }

    /**播放背景音乐 */
    private playBGM(bgmIndex: number): void {
        this.currentBgmIndex = this.currentBgmIndex + bgmIndex;
        if (this.currentBgmIndex > this.bgmMusics.length) {
            this.currentBgmIndex = 1;
        }
        else if (this.currentBgmIndex < 1) {
            this.currentBgmIndex = this.bgmMusics.length;
        }
        let bgmId = this.bgmMusics[this.currentBgmIndex - 1].Guid;
        SoundService.playBGM(bgmId);
        this.getHudPanel.mMusicText.text = this.bgmMusics[this.currentBgmIndex - 1].Annotation;
    }
    //#endregion

    public net_syncWorldConfigData(worldConfigDatas: WorldConfigData[]): void {
        if (!worldConfigDatas || worldConfigDatas.length == 0) return;
        Utils.setWorldConfigData(worldConfigDatas);
    }
}

export class KillTipData {
    public killTipType: KillTipType;
    public killerName: string;
    public killedName: string;
}

export enum KillTipType {
    None = 0,
    Killer = 1,
    Killed = 2,
    revenge = 3,
}