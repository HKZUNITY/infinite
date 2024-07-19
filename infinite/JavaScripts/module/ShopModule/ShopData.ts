import Console from "../../Tools/Console";
import { Utils } from "../../Tools/utils";

export default class ShopData extends Subdata {
    @Decorator.persistence()
    public weaponSet: number[] = [];

    @Decorator.persistence()
    public useWeaponId: number = -1;

    protected initDefaultData(): void {
        this.weaponSet = [1];
        this.useWeaponId = 1;
        Console.error("ShopData-initDefaultData");
    }

    public saveWeaponSet(weaponId: number): void {
        if (this.weaponSet.includes(weaponId)) return;
        this.weaponSet.push(weaponId)
        this.save(true);
    }

    public saveUseWeaponId(useWeaponId: number): void {
        this.useWeaponId = useWeaponId;
        this.save(true);
    }
}