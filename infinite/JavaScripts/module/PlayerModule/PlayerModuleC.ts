import Console from "../../Tools/Console";
import { Utils } from "../../Tools/utils";
import { ExplosiveCoins } from "../../common/ExplosiveCoins";
import { FlyText } from "../../common/FlyText";
import { Notice } from "../../common/notice/Notice";
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
    }

    protected onEnterScene(sceneType: number): void {
        this.coin = this.data.coin;
        this.diamond = this.data.diamond;
        this.getHudModuleC.updateLvExpCoin(this.data.playerLv, this.data.exp, this.coin, true);
        this.getHudModuleC.updateDiamond(this.diamond);
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
            Notice.showDownNotice("增加" + maxHp / 10 + "金币");
            Notice.showDownNotice("增加" + maxHp / 10 + "经验");
        }
    }

    public async net_updateLvExpAndCoin(isAddLv: boolean, coin: number = 0): Promise<void> {
        let playerLv = this.data.playerLv;
        this.getHudModuleC.updateLvExpCoin(playerLv, this.data.exp, this.data.coin, isAddLv);
        if (coin > 0) Notice.showDownNotice(`获得${coin}金币`);
        if (isAddLv) {
            Notice.showDownNotice("等级提升至 " + await Utils.getLvText(playerLv, this.localPlayer.userId) + " Lv." + playerLv);
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

    /**
     * 更新金币
     * @param value 
     */
    public net_updateCoin(value: number): void {
        this.getHudModuleC.updateCoin(this.data.coin + value);
        Notice.showDownNotice("获得" + value + "金币");
    }

    public saveCoinAndExp(coin: number, exp: number): void {
        if (coin < 0 || isNaN(coin)) coin = 0;
        if (exp < 0 || isNaN(exp)) exp = 0;
        if (coin == 0 && exp == 0) return;
        this.server.net_saveCoinAndExp(coin, exp);
    }

    public adsUpLv(): void {
        let exp = this.getLvUpExp();
        this.saveCoinAndExp(0, exp);
    }

    public getLvUpExp(): number {
        return (this.data.playerLv + 1) * GlobalData.upgradeExpMultiple;
    }

    public isInvincible(isInvincible: boolean): void {
        this.server.net_isInvincible(isInvincible);
    }

    public net_killTip(killerUserId: string, killerName: string, killedUserId: string, killedName: string): void {
        this.getHudModuleC.killTip(killerUserId, killerName, killedUserId, killedName);
    }
}