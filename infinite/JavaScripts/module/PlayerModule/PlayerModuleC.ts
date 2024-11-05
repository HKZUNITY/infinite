import Console from "../../Tools/Console";
import { Utils } from "../../Tools/utils";
import { ExplosiveCoins } from "../../common/ExplosiveCoins";
import { FlyText } from "../../common/FlyText";
import { Notice } from "../../common/notice/Notice";
import { GameConfig } from "../../config/GameConfig";
import GlobalData from "../../const/GlobalData";
import HUDModuleC from "../HUDModule/HUDModuleC";
import TaskModuleC from "../TaskModule/TaskModuleC";
import PlayerData from "./PlayerData";
import PlayerModuleS from "./PlayerModuleS";

export default class PlayerModuleC extends ModuleC<PlayerModuleS, PlayerData> {
    private hudModuleC: HUDModuleC = null;
    private get getHudModuleC(): HUDModuleC {
        if (!this.hudModuleC) {
            this.hudModuleC = ModuleService.getModule(HUDModuleC);
        }
        return this.hudModuleC;
    }

    private taskModuleC: TaskModuleC = null;
    private get getTaskModuleC(): TaskModuleC {
        if (!this.taskModuleC) {
            this.taskModuleC = ModuleService.getModule(TaskModuleC);
        }
        return this.taskModuleC;
    }

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        InputUtil.onKeyDown(mw.Keys.NumPadSeven, () => {
            this.adsUpLv();
        });
        // InputUtil.onKeyDown(mw.Keys.NumPadEight, () => {
        //     this.saveHeight(1);
        // });
        // InputUtil.onKeyDown(mw.Keys.NumPadNine, () => {
        //     this.saveKill(1);
        // });
        this.initAction();
    }

    private initAction(): void {
        this.getHudModuleC.onOnOffUpExpAction.add(this.addOnOffUpExp.bind(this));
        Event.addLocalListener(`SyncDiamondCount`, () => {
            Event.dispatchToLocal(`UpdateDiamondTextBlock`, this.getDiamond);
        });
        Event.addLocalListener(`SyncCoinCount`, () => {
            Event.dispatchToLocal(`UpdateCoinTextBlock`, this.getCoin());
        });
        Event.addLocalListener(`SyncBoneCount`, () => {
            Event.dispatchToLocal(`UpdateBoneTextBlock`, this.getBone);
        });
    }

    protected onEnterScene(sceneType: number): void {
        this.coin = this.data.coin;
        this.diamond = this.data.diamond;
        this.bone = this.data.bone;
        this.getHudModuleC.updateLvExpCoin(this.data.playerLv, this.data.exp, this.coin, true);
        this.getHudModuleC.updateDiamond(this.diamond);
        this.getHudModuleC.updateBone(this.bone);
        this.initDayStr();
    }

    protected onUpdate(dt: number): void {
        this.updateUpExp(dt);
    }

    public net_onPlayerAtkSelf(damage: number, hitPoint: mw.Vector): void {
        let fontColor: mw.LinearColor[] = Utils.randomColor();
        FlyText.instance.showFlyText("-" + damage, hitPoint, fontColor[0], fontColor[1]);
    }

    public net_onSelfAtkPlayer(damage: number, hitPoint: mw.Vector, isDie: boolean, maxHp: number): void {
        Console.error("net_onSelfAtkPlayer");
        let fontColor: mw.LinearColor[] = Utils.randomColor();
        FlyText.instance.showFlyText("-" + damage, hitPoint, fontColor[0], fontColor[1]);
        if (isDie) {
            ExplosiveCoins.instance.explosiveCoins(new mw.Vector(hitPoint.x, hitPoint.y, hitPoint.z / 2), maxHp / 10, Utils.getRandomInteger(5, 10));
            Notice.showDownNotice(StringUtil.format(GameConfig.Language.Text_IncreaseCoins.Value, maxHp / 10));
            Notice.showDownNotice(StringUtil.format(GameConfig.Language.Text_IncreaseExperience.Value, maxHp / 10));
        }
    }

    public async net_updateLvExpAndCoin(isAddLv: boolean, coin: number = 0): Promise<void> {
        let playerLv = this.data.playerLv;
        this.getHudModuleC.updateLvExpCoin(playerLv, this.data.exp, this.data.coin, isAddLv);
        if (this.data.coin != this.coin) this.coin = this.data.coin;
        if (coin > 0) Notice.showDownNotice(StringUtil.format(GameConfig.Language.Text_GetCoins.Value, coin));
        if (isAddLv) {
            Notice.showDownNotice(`${GameConfig.Language.Text_UpgradeLevelTo.Value} ` + await Utils.getLvText(playerLv, this.localPlayer.userId) + " Lv." + playerLv);
            this.getTaskModuleC.upLv(playerLv);
        }
    }

    public net_flyText(damage: number, hitPoint: mw.Vector): void {
        let fontColor: mw.LinearColor[] = Utils.randomColor();
        FlyText.instance.showFlyText("-" + damage, hitPoint, fontColor[0], fontColor[1]);
    }

    public net_updateHp(curHp: number): void {
        this.getHudModuleC.updateHp(curHp);
    }

    public getCoin(): number {
        return this.coin;
    }

    public get getLv(): number {
        return this.data.playerLv;
    }

    // public saveLevel(value: number): void {
    //     this.server.net_saveLv(value);
    // }

    // public saveHeight(value: number): void {
    //     this.server.net_saveHeight(value);
    // }

    // public saveKill(value: number): void {
    //     this.server.net_saveKill(value);
    // }

    private coin: number = 0;
    public saveCoin(value: number): void {
        this.coin += value;
        this.getHudModuleC.updateCoin(this.coin);
        this.server.net_saveCoin(value);
    }

    private diamond: number = 0;
    public saveDiamond(value: number): void {
        this.diamond += value;
        this.getHudModuleC.updateDiamond(this.diamond);
        this.server.net_saveDiamond(value);
    }

    public get getDiamond(): number {
        return this.diamond;
    }

    private bone: number = 0;
    public saveBone(value: number): void {
        this.bone += value;
        this.getHudModuleC.updateBone(this.bone);
        Event.dispatchToLocal(`UpdateBoneTextBlock`, this.getBone);
        this.server.net_saveBone(value);
    }

    public get getBone(): number {
        return this.bone;
    }

    public net_setBone(bone: number): void {
        Notice.showDownNotice(StringUtil.format(GameConfig.Language.Text_RewardSoulBone.Value, bone - this.bone));
        this.bone = bone;
        this.getHudModuleC.updateBone(this.bone);
        Event.dispatchToLocal(`UpdateBoneTextBlock`, this.getBone);
    }

    /**
     * 更新金币
     * @param value 
     */
    public net_updateCoin(value: number): void {
        this.getHudModuleC.updateCoin(this.data.coin + value);
        Notice.showDownNotice(StringUtil.format(GameConfig.Language.Text_GetCoins.Value, value));
    }

    public saveCoinAndExp(coin: number, exp: number): void {
        if (coin < 0 || isNaN(coin)) coin = 0;
        if (exp < 0 || isNaN(exp)) exp = 0;
        if (coin == 0 && exp == 0) return;
        if (coin > 0) this.coin += coin;
        this.server.net_saveCoinAndExp(coin, exp);
    }

    public adsUpLv(): void {
        let exp = this.getLvUpExp();
        this.saveCoinAndExp(0, exp);
    }

    public getLvUpExp(): number {
        return (this.data.playerLv + 1) * GlobalData.upgradeExpMultiple;
    }

    public upLvByCount(num: number): void {
        let lv = this.data.playerLv;
        let exp: number = 0;
        for (let i = 1; i <= num; ++i) {
            exp += this.getLvUpExpByLv(lv + i);
        }
        this.saveCoinAndExp(0, exp);
    }

    public getLvUpExpByLv(lv: number): number {
        return (lv + 1) * GlobalData.upgradeExpMultiple;
    }

    private invincible: boolean = false;
    public isInvincible(isInvincible: boolean): void {
        if (this.invincible == isInvincible) return;
        Notice.showDownNotice(isInvincible ? GameConfig.Language.Text_DefenseActivated.Value : GameConfig.Language.Text_DefenseHasBeenTurnedOff.Value);
        this.invincible = isInvincible;
        this.server.net_isInvincible(isInvincible);
    }

    public net_killTip(killerUserId: string, killerName: string, killedUserId: string, killedName: string, isKillNpc: boolean = false, isSplit: boolean = false): void {
        if (isKillNpc) {
            if (isSplit) {
                let strs = killedName.split(`-`);
                killedName = `${strs[0]}${GameConfig.Language.Text_Level.Value}${GameConfig.Language[`${strs[1]}`].Value}`
            } else {
                killedName = GameConfig.Language[`${killedName}`].Value;
            }
        }
        this.getHudModuleC.killTip(killerUserId, killerName, killedUserId, killedName);
    }

    private isOnUpExp: boolean = false;
    private addOnOffUpExp(isOn: boolean): void {
        this.isOnUpExp = isOn;
    }

    private upExpTimer: number = 0;
    private upExpTime: number = 1;
    private updateUpExp(dt: number): void {
        if (!this.isOnUpExp) return;
        this.upExpTimer += dt;
        if (this.upExpTimer < this.upExpTime) return
        this.upExpTimer = 0;
        this.upExp();
    }

    private upExp(): void {
        let exp = Math.round(this.getLvUpExp() / 60);
        this.saveCoinAndExp(0, exp);
        let fontColor: mw.LinearColor[] = Utils.randomColor();
        FlyText.instance.showFlyText(`Exp+${exp}`, this.localPlayer.character.worldTransform.position, fontColor[0], fontColor[1]);
    }

    public skill_1(): void {
        GlobalData.baseSkillDamage = 2;
        TimeUtil.delaySecond(GlobalData.skillContinue_1 + 1).then(() => {
            GlobalData.baseSkillDamage = 1;
        });
        this.server.net_skill_1();
        SoundService.playSound(GlobalData.skillSoundId_1);
    }

    private initDayStr(): void {
        if (GlobalData.languageId == 0) return;
        this.dayStr = this.data.dayStr;
        TimeUtil.delaySecond(20).then(() => {
            if (this.dayStr != Utils.getDay()) {
                this.getHudModuleC.showDayStr();
            }
        });
    }

    private dayStr: string = "";
    public setDayStr(datStr: string): void {
        this.server.net_setDayStr(datStr);
    }
}