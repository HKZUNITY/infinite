import { GeneralManager, } from '../../Modified027Editor/ModifiedStaticAPI';
import ShopData from "./ShopData";
import ShopModuleC from "./ShopModuleC";

export default class ShopModuleS extends ModuleS<ShopModuleC, ShopData> {

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {

    }

    protected onPlayerLeft(player: mw.Player): void {
        let playerId = player.playerId;
        this.playerExitGame(playerId);
    }

    //#region 翅膀
    private playerExitGame(playerId: number): void {
        if (!this.playerEffectIdMap.has(playerId)) return;
        let effectId = this.playerEffectIdMap.get(playerId);
        EffectService.stop(effectId);
        this.playerEffectIdMap.delete(effectId);
    }
    private playerEffectIdMap: Map<number, number> = new Map<number, number>();
    /**切换翅膀 */
    @Decorator.noReply()
    public net_onSwitchWing(effectId: string, effectOffset: mw.Vector, effectRot: mw.Vector, effectScale: mw.Vector): void {
        let playerEffectId: number = -1;
        if (this.playerEffectIdMap.has(this.currentPlayerId)) {
            playerEffectId = this.playerEffectIdMap.get(this.currentPlayerId);
            EffectService.stop(playerEffectId);
        }
        playerEffectId = GeneralManager.rpcPlayEffectOnPlayer(
            effectId,
            this.currentPlayer,
            mw.HumanoidSlotType.BackOrnamental,
            0,
            effectOffset,
            new mw.Rotation(effectRot),
            effectScale
        );
        this.playerEffectIdMap.set(this.currentPlayerId, playerEffectId);
    }
    //#endregion

    //#region 武器
    @Decorator.noReply()
    public net_saveWeaponSet(weaponId: number): void {
        this.currentData.saveWeaponSet(weaponId);
    }

    @Decorator.noReply()
    public net_saveUseWeaponId(useWeaponId: number): void {
        this.currentData.saveUseWeaponId(useWeaponId);
    }
    //#endregion
}