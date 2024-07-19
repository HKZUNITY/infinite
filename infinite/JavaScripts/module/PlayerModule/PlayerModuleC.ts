import Console from "../../Tools/Console";
import { Utils } from "../../Tools/utils";
import { ExplosiveCoins } from "../../common/ExplosiveCoins";
import { FlyText } from "../../common/FlyText";
import { Notice } from "../../common/notice/Notice";
import HUDModuleC from "../HUDModule/HUDModuleC";
import PlayerData from "./PlayerData";
import PlayerModuleS from "./PlayerModuleS";

export default class PlayerModuleC extends ModuleC<PlayerModuleS, PlayerData> {
    private hudModuleC: HUDModuleC = null;

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        this.hudModuleC = ModuleService.getModule(HUDModuleC);
        InputUtil.onKeyDown(mw.Keys.NumPadSeven, () => {
            this.saveLevel(1);
        });
        InputUtil.onKeyDown(mw.Keys.NumPadEight, () => {
            this.saveHeight(1);
        });
        InputUtil.onKeyDown(mw.Keys.NumPadNine, () => {
            this.saveKill(1);
        });
    }

    protected onEnterScene(sceneType: number): void {
        this.hudModuleC.updateLvExpCoin(this.data.playerLv, this.data.exp, this.data.coin, true);
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

    public net_updateLvExpAndCoin(isAddLv: boolean, coin: number = 0): void {
        let playerLv = this.data.playerLv;
        this.hudModuleC.updateLvExpCoin(playerLv, this.data.exp, this.data.coin, isAddLv);
        if (coin > 0) Notice.showDownNotice(`获得${coin}金币`);
        if (isAddLv) Notice.showDownNotice("等级提升至 " + Utils.getLvText(playerLv) + " Lv." + playerLv);
    }

    public net_flyText(damage: number, hitPoint: mw.Vector): void {
        let fontColor: mw.LinearColor[] = Utils.randomColor();
        FlyText.instance.showFlyText("-" + damage, hitPoint, fontColor[0], fontColor[1]);
    }

    public net_updateHp(curHp: number): void {
        this.hudModuleC.updateHp(curHp);
    }

    public getCoin(): number {
        return this.data.coin;
    }

    public saveLevel(value: number): void {
        this.server.net_saveLv(value);
    }

    public saveHeight(value: number): void {
        this.server.net_saveHeight(value);
    }

    public saveKill(value: number): void {
        this.server.net_saveKill(value);
    }

    public saveCoin(value: number): void {
        this.hudModuleC.updateCoin(this.data.coin + value);
        this.server.net_saveCoin(value);
    }

    /**
     * 更新金币
     * @param value 
     */
    public net_updateCoin(value: number): void {
        this.hudModuleC.updateCoin(this.data.coin + value);
        Notice.showDownNotice("发现宝箱，获得" + value + "金币");
    }

    public saveCoinAndExp(coin: number, exp: number): void {
        this.server.net_saveCoinAndExp(coin, exp);
    }

    public isInvincible(isInvincible: boolean): void {
        this.server.net_isInvincible(isInvincible);
    }

    public net_killTip(killerUserId: string, killerName: string, killedUserId: string, killedName: string): void {
        this.hudModuleC.killTip(killerUserId, killerName, killedUserId, killedName);
    }
}