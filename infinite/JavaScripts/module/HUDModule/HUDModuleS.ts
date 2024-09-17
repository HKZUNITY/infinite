import { GeneralManager, } from '../../Modified027Editor/ModifiedStaticAPI';
import { Utils } from "../../Tools/utils";
import { WorldConfigData } from '../RankModule/PlayerPropData';
import HUDModuleC from "./HUDModuleC";

export default class HUDModuleS extends ModuleS<HUDModuleC, null> {
    protected onAwake(): void {
        // this.initWorldConfigDatas();
    }

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {

    }

    protected onPlayerEnterGame(player: mw.Player): void {
        this.syncWorldConfigData(player);
    }

    //#region 冲刺
    private sprintSound: string = "122568";
    private sprintEffects: string[] = ["89089", "128518", "89128", "89129", "89130"];
    private playerForward: mw.Vector = mw.Vector.zero;

    /**
     * 冲刺
     * @param sprintIndex 
     * @param playerScale 
     */
    @Decorator.noReply()
    public net_sprint(sprintIndex: number, playerScale: number): void {
        let startLoc = this.currentPlayer.character.worldTransform.position;
        let capsuleHalfHeight = this.currentPlayer.character.collisionExtent.z / 2;
        let offset = new mw.Vector(startLoc.x, startLoc.y, startLoc.z - capsuleHalfHeight * playerScale);
        SoundService.play3DSound(this.sprintSound, offset);
        GeneralManager.rpcPlayEffectAtLocation(
            this.sprintEffects[Utils.getRandomInteger(2, 4)],
            offset,
            1,
            mw.Rotation.zero,
            mw.Vector.one.multiply(playerScale));
        GeneralManager.rpcPlayEffectAtLocation(
            this.sprintEffects[0],
            offset,
            1,
            mw.Rotation.zero,
            mw.Vector.one.multiply(0.4 * playerScale)
        );
        GeneralManager.rpcPlayEffectOnPlayer(
            this.sprintEffects[1],
            this.currentPlayer,
            sprintIndex == 0 ? mw.HumanoidSlotType.RightFoot : mw.HumanoidSlotType.LeftFoot,
            1,
            mw.Vector.zero,
            mw.Rotation.zero,
            mw.Vector.one.multiply(playerScale)
        );
        this.playerForward = this.currentPlayer.character.worldTransform.getForwardVector();
        this.currentPlayer.character.addImpulse(this.playerForward.multiply(6000), true);
    }
    //#endregion

    //#region 跳跃
    /**
     * 播放跳跃特效音效
     * @param landingId 
     * @param effectOffset 
     * @param landingSoundId 
     * @param playerScale 
     */
    @Decorator.noReply()
    public net_playLandEffectAndSound(landingId: string[], effectOffset: mw.Vector, landingSoundId: string, playerScale: number): void {
        GeneralManager.rpcPlayEffectAtLocation(
            landingId[0]
            , effectOffset
            , 1
            , mw.Rotation.zero
            , mw.Vector.one.multiply(playerScale));
        SoundService.play3DSound(landingSoundId, effectOffset);
        GeneralManager.rpcPlayEffectAtLocation(
            landingId[1]
            , effectOffset
            , 1
            , mw.Rotation.zero
            , mw.Vector.one.multiply(0.4 * playerScale)
        );
    }

    /**
     * 播放落地特效音效
     * @param stompingEffectId 
     * @param stompingSoundId 
     * @param playerScale 
     */
    @Decorator.noReply()
    public net_playStompingEffectAndSound(stompingEffectId: string, stompingSoundId: string, playerScale: number): void {
        GeneralManager.rpcPlayEffectOnPlayer(
            stompingEffectId
            , this.currentPlayer
            , mw.HumanoidSlotType.Root
            , 1
            , mw.Vector.zero
            , mw.Rotation.zero
            , mw.Vector.one.multiply(0.5 * playerScale));
        SoundService.play3DSound(stompingSoundId, this.currentPlayer.character);
    }
    //#endregion 

    private worldConfigDatas: WorldConfigData[] = [];
    private async initWorldConfigDatas(): Promise<void> {
        this.worldConfigDatas = (await this.getCustomdata("WorldConfigData")) as WorldConfigData[];
    }

    private async syncWorldConfigData(player: mw.Player): Promise<void> {
        // if (!this.worldConfigDatas || this.worldConfigDatas.length == 0)
        await this.initWorldConfigDatas();
        this.getClient(player).net_syncWorldConfigData(this.worldConfigDatas);
    }

    public async getCustomdata(key: string): Promise<any> {
        let data = null;
        data = await GeneralManager.asyncRpcGetData(key);
        return data;
    }
}