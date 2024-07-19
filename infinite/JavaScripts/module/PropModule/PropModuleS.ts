import { GeneralManager, } from '../../Modified027Editor/ModifiedStaticAPI';
import { PlayerManagerExtesion, } from '../../Modified027Editor/ModifiedPlayer';
import { PropData } from "./PropData";
import { PropModuleC } from "./PropModuleC";

export class PropModuleS extends ModuleS<PropModuleC, PropData> {

    protected onStart(): void {

    }

    //#region 巨人
    /**
     * 巨人
     * @param isGiant 是否巨人 
     */
    public net_giant(isGiant: boolean): void {
        let character = this.currentPlayer.character;
        if (isGiant) {
            this.gianting(character);
        } else {
            character.worldTransform.scale = (mw.Vector.one);
        }
    }

    /**变大动画 */
    private giantAnimationId: string = "122543";
    /**正在变大的特效 */
    private giantingEffectGuids: string[] = ["160750", "88781"];
    /**正在变大的特效缩放倍数 */
    private giantingEffectScales: number[] = [1.5, 1];
    /**变大成功的特效 */
    private giantEffectIds: string[] = ["168952", "155593"];
    /**变大成功的特效偏移 */
    private giantEffectOffsets: mw.Vector[] = [new mw.Vector(0, 0, 100), new mw.Vector(0, 0, 0)];
    /**
     * 巨人化
     * @param character 角色
     */
    private gianting(character: mw.Character): void {
        PlayerManagerExtesion.rpcPlayAnimation(character, this.giantAnimationId, 1)
        let giantingEffectIds = this.playGiantingEffects(character);
        TimeUtil.delaySecond(2).then(() => {
            this.stopGiantingEffects(giantingEffectIds);
            character.worldTransform.position = (character.worldTransform.position.add(new mw.Vector(0, 0, 500)));
            character.worldTransform.scale = (mw.Vector.one.multiply(5));
            this.playGianEffects(character);
        });
    }
    /**
     * 播放正在变大的特效
     * @param character 
     * @returns 
     */
    private playGiantingEffects(character: mw.Character): number[] {
        let giantingEffectIds: number[] = [];
        for (let i = 0; i < this.giantingEffectGuids.length; ++i) {
            giantingEffectIds.push(GeneralManager.rpcPlayEffectOnPlayer(
                this.giantingEffectGuids[i],
                character.player,
                mw.HumanoidSlotType.Root,
                0,
                mw.Vector.zero,
                mw.Rotation.zero,
                mw.Vector.one.multiply(this.giantingEffectScales[i])
            ));
        }
        return giantingEffectIds;
    }
    /**
     * 停止正在变大的特效
     * @param giantingEffectIds 
     */
    private stopGiantingEffects(giantingEffectIds: number[]): void {
        giantingEffectIds.forEach((e) => {
            EffectService.stop(e);
        });
        giantingEffectIds = [];
    }
    /**
     * 播放成功变大的特效
     * @param character 
     */
    private playGianEffects(character: mw.Character): void {
        for (let i = 0; i < this.giantEffectIds.length; ++i) {
            GeneralManager.rpcPlayEffectOnPlayer(
                this.giantEffectIds[i],
                character.player,
                mw.HumanoidSlotType.Root,
                1,
                this.giantEffectOffsets[i],
                mw.Rotation.zero,
                mw.Vector.one
            );
        }
    }
    //#endregion
}