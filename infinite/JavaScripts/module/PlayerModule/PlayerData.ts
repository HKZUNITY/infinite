import GlobalData from "../../const/GlobalData";
import Console from "../../Tools/Console";
import { Utils } from "../../Tools/utils";

export default class PlayerData extends Subdata {
    @Decorator.persistence()
    public exp: number = 0;

    @Decorator.persistence()
    public coin: number = 0;

    @Decorator.persistence()
    public diamond: number = 0;

    @Decorator.persistence()
    public playerLv: number = 0;

    @Decorator.persistence()
    public playerHeight: number = 0;

    @Decorator.persistence()
    public playerKill: number = 0;

    protected initDefaultData(): void {
        this.exp = 0;
        this.coin = 10000;
        this.diamond = 0;

        this.playerLv = 0;
        this.playerHeight = 0;
        this.playerKill = 0;
        Console.error("AAA");
    }

    public saveCoinAndExp(coin: number, exp: number): void {
        this.saveCoin(coin, false);
        this.addExp(exp);
        this.save(true);
    }

    public saveExpAndCoin(value: number): void {
        this.saveCoin(value, false);
        this.addExp(value);
        this.save(true);
    }

    public addExp(exp: number): void {
        this.exp += exp;
        this.checkLvUp();
    }

    private checkLvUp(): void {
        let lvUpExp = this.getLvUpExp();
        if (this.exp >= lvUpExp) {
            this.exp -= lvUpExp;
            this.playerLv++;
            this.checkLvUp();
        }
    }

    public getLvUpExp(): number {
        return (this.playerLv + 1) * GlobalData.upgradeExpMultiple;
    }

    public saveCoin(value: number, isAutoSave: boolean = true): void {
        this.coin += value;
        if (isAutoSave) this.save(true);
    }

    public saveDiamond(value: number): void {
        this.diamond += value;
        this.save(true);
    }

    public refashLv(lv: number) {
        this.playerLv += lv;
        this.save(true);
    }

    public refashHeight(height: number) {
        this.playerHeight = height;
        this.save(true);
    }

    public refashKill(kill: number) {
        this.playerKill += kill;
        this.save(true);
    }

    public getHp(): number {
        return Utils.getHp(this.playerLv);
    }
}