import GlobalData from '../../const/GlobalData';
import { GeneralManager, } from '../../Modified027Editor/ModifiedStaticAPI';
import PlayerModuleS from "../PlayerModule/PlayerModuleS";
import { PlayerData_CSR, PlayerData_CSW } from "./PlayerPropData";
import { WorldRankModuleC } from "./WorldRankModuleC";

export class WorldRankModuleS extends ModuleS<WorldRankModuleC, null> {
    private playerModuleS: PlayerModuleS = null;
    private get getPlayerModuleS(): PlayerModuleS {
        if (!this.playerModuleS) {
            this.playerModuleS = ModuleService.getModule(PlayerModuleS);
        }
        return this.playerModuleS;
    }

    private worldDatas: PlayerData_CSW[] = [];
    protected onStart(): void {
        this.initData();
    }

    private async initData(): Promise<void> {
        this.worldDatas = (await this.getCustomdata("WorldData")) as PlayerData_CSW[];
    }

    protected onPlayerEnterGame(player: mw.Player): void {

    }

    protected onPlayerLeft(player: mw.Player): void {
        let userId = player.userId;
        if (!this.playerDataMap_SR.has(userId)) return;
        this.playerDataMap_SR.delete(userId);
        this.syncRankData_S(false);
    }

    /**房间内排行榜数据 */
    private playerDataMap_SR: Map<string, PlayerData_CSR> = new Map<string, PlayerData_CSR>();

    /**
     * 进入场景（客户端发起）
     * @param playerName 
     * @param playerLv 
     */
    @Decorator.noReply()
    public net_onEnterScene(playerName: string, playerLv: number, playerHeight: number, playerKill: number): void {
        this.getPlayerModuleS.setPlayerLifeNickName(this.currentPlayerId, playerName, playerLv);
        this.onEnterScene(playerName, playerLv, playerHeight, playerKill);
    }

    /**
     * 进入场景校对数据
     * @param playerName 
     * @param playerLv 
     */
    private async onEnterScene(playerName: string, playerLv: number, playerHeight: number, playerKill: number): Promise<void> {
        let userId = this.currentPlayer.userId;
        let playerData_S = new PlayerData_CSR(userId, playerName, playerLv, playerHeight, playerKill);
        this.playerDataMap_SR.set(userId, playerData_S);
        this.worldDatas = (await this.getCustomdata("WorldData")) as PlayerData_CSW[];
        this.syncRankData_S(true);
    }

    // /**
    //  * 刷新等级（客户端发起）
    //  * @param lv 
    //  */
    // public net_refreshLv(lv: number): void {
    //     this.refreshLv(this.currentPlayer.userId, lv);
    // }

    // /**
    //  * 刷新高度（客户端发起）
    //  * @param height 
    //  */
    // public net_refreshHeight(height: number): void {
    //     this.refreshHeight(this.currentPlayer.userId, height);
    // }

    // /**
    //  * 刷新击杀数（客户端发起）
    //  * @param kill 
    //  */
    // public net_refreshKill(kill: number): void {
    //     this.refreshKill(this.currentPlayer.userId, kill);
    // }

    /**
     * 刷新等级（服务端发起）
     * @param userId 
     * @param lv 
     */
    public refreshLv_S(userId: string, lv: number): void {
        this.refreshLv(userId, lv);
    }

    /**
     * 刷新高度（服务端发起）
     * @param userId 
     * @param height 
     */
    public refreshHeight_S(userId: string, height: number): void {
        this.refreshHeight(userId, height);
    }

    /**
     * 刷新击杀数（服务端发起）
     * @param userId 
     * @param kill 
     */
    public refreshKill_S(userId: string, kill: number): void {
        this.refreshKill(userId, kill);
    }

    /**
     * 刷新等级
     * @param userId 
     * @param lv 
     * @returns 
     */
    private async refreshLv(userId: string, lv: number): Promise<void> {
        if (!this.playerDataMap_SR.has(userId)) return;
        let playerData_S = this.playerDataMap_SR.get(userId);
        playerData_S.playerLv += lv;
        this.playerDataMap_SR.set(userId, playerData_S);
        this.worldDatas = (await this.getCustomdata("WorldData")) as PlayerData_CSW[];
        this.syncRankData_S(this.isRefreshWorldData_S(
            new PlayerData_CSW(userId, playerData_S.playerName, playerData_S.playerLv)
        ));
    }

    /**
     * 刷新高度
     * @param userId 
     * @param height 
     * @returns 
     */
    private refreshHeight(userId: string, height: number): void {
        if (!this.playerDataMap_SR.has(userId)) return;
        let playerData_S = this.playerDataMap_SR.get(userId);
        playerData_S.playerHeight = height;
        this.playerDataMap_SR.set(userId, playerData_S);
        this.syncRankData_S(false);
    }

    /**
     * 刷新击杀数
     * @param userId 
     * @param kill 
     * @returns 
     */
    private refreshKill(userId: string, kill: number): void {
        if (!this.playerDataMap_SR.has(userId)) return;
        let playerData_S = this.playerDataMap_SR.get(userId);
        playerData_S.playerKill += kill;
        this.playerDataMap_SR.set(userId, playerData_S);
        this.syncRankData_S(false);
    }

    /**
     * 判断是否需要刷新世界排行榜（需要自动存）
     * @param playerData_SW 数据
     * @returns 
     */
    private isRefreshWorldData_S(playerData_SW: PlayerData_CSW): boolean {
        let isPush = false;
        let ishasDelete = false;
        let ishasData = false;
        if (this.worldDatas == null) {
            this.worldDatas = [];
        }
        if (this.worldDatas.length < GlobalData.worldRankCount) {
            if (this.worldDatas.length == 0) {
                this.worldDatas.push(playerData_SW);
                isPush = true;
            } else {
                for (let i = 0; i < this.worldDatas.length; ++i) {
                    if (this.worldDatas[i].userId != playerData_SW.userId) continue;
                    if (playerData_SW.playerLv > this.worldDatas[i].playerLv) {
                        this.worldDatas.splice(i, 1);
                        break;
                    } else {
                        ishasData = true;
                        break;
                    }
                }

                if (ishasData) return isPush;

                for (let i = 0; i < this.worldDatas.length; i++) {
                    if (playerData_SW.playerLv > this.worldDatas[i].playerLv) {
                        this.worldDatas.splice(i, 0, playerData_SW);
                        isPush = true;
                        break;
                    }
                }

                if (!isPush) {
                    this.worldDatas.push(playerData_SW);
                    isPush = true;
                }
            }
        } else {
            for (let i = 0; i < this.worldDatas.length; ++i) {
                if (this.worldDatas[i].userId != playerData_SW.userId) continue;
                if (playerData_SW.playerLv > this.worldDatas[i].playerLv) {
                    this.worldDatas.splice(i, 1);
                    ishasDelete = true;
                    break;
                } else {
                    ishasData = true;
                    break;
                }
            }

            if (ishasData) return isPush;

            for (let i = 0; i < this.worldDatas.length; i++) {
                if (playerData_SW.playerLv > this.worldDatas[i].playerLv) {
                    this.worldDatas.splice(i, 0, playerData_SW);
                    if (!ishasDelete) {
                        this.worldDatas.pop();
                    }
                    isPush = true;
                    break;
                }
            }
        }
        if (isPush) {
            this.setCustomData("WorldData", this.worldDatas);
        }
        return isPush;
    }

    /**
     * 同步排行榜数据
     * @param isRefreshWorldData 
     * @returns 
     */
    private syncRankData_S(isRefreshWorldData: boolean): void {
        if (this.playerDataMap_SR.size == 0) return;
        let playerUserIds: string[] = [];
        let playerNames: string[] = [];
        let playerLvs: number[] = [];
        let playerHeights: number[] = [];
        let playerKills: number[] = [];
        this.playerDataMap_SR.forEach((value: PlayerData_CSR, key: string) => {
            playerUserIds.push(value.userId);
            playerNames.push(value.playerName);
            playerLvs.push(value.playerLv);
            playerHeights.push(value.playerHeight);
            playerKills.push(value.playerKill);
        });
        let worldUserIds: string[] = [];
        let worldNames: string[] = [];
        let worldLvs: number[] = [];
        if (isRefreshWorldData && this.worldDatas != null) {
            for (let i = 0; i < this.worldDatas.length; i++) {
                worldUserIds.push(this.worldDatas[i].userId);
                worldNames.push(this.worldDatas[i].playerName);
                worldLvs.push(this.worldDatas[i].playerLv);
            }
        }
        this.getAllClient().net_syncRankData_C(playerUserIds, playerNames, playerLvs, playerHeights, playerKills, isRefreshWorldData, worldUserIds, worldNames, worldLvs);
    }

    public getNamesByUserId(userId1: string, userId2: string): string[] {
        if (this.playerDataMap_SR.has(userId1) && this.playerDataMap_SR.has(userId2)) {
            return [this.playerDataMap_SR.get(userId1).playerName, this.playerDataMap_SR.get(userId2).playerName];
        }
        return null;
    }

    public getNameByUserId(userId: string): string {
        if (this.playerDataMap_SR.has(userId)) {
            return this.playerDataMap_SR.get(userId).playerName;
        }
        return null;
    }

    /**
     * 获取自定义数据
     * @param key 
     * @returns 
     */
    public async getCustomdata(key: string): Promise<any> {
        let data = null;
        data = await GeneralManager.asyncRpcGetData(key);
        return data;
    }

    /**
     * 设置自定义数据
     * @param saveKey 
     * @param dataInfo 
     * @returns 
     */
    public async setCustomData(saveKey: string, dataInfo: any): Promise<boolean> {
        let code: mw.DataStorageResultCode = null;
        code = await DataStorage.asyncSetData(saveKey, dataInfo);
        return code == mw.DataStorageResultCode.Success;
    }
}