import Console from "../../Tools/Console";
import { Notice } from "../../common/notice/Notice";
import HUDModuleC from "../HUDModule/HUDModuleC";
import PlayerData from "../PlayerModule/PlayerData";
import { PlayerData_CSR, PlayerData_CSW } from "./PlayerPropData";
import { WorldRankModuleS } from "./WorldRankModuleS";
import { WorldRankPanel } from "./ui/WorldRankPanel";

export class WorldRankModuleC extends ModuleC<WorldRankModuleS, null> {
    private hudModuleC: HUDModuleC = null;
    private playerData: PlayerData = null;
    private worldRankPanel: WorldRankPanel = null;
    /**排行类型 */
    private rankType: RankType = RankType.Lv;
    /**是否可以刷新 */
    private isRefresh: boolean = true;

    private userId: string = null;
    private get currentUserId(): string {
        if (this.userId == "" || this.userId == null) {
            this.userId = this.localPlayer.userId;
        }
        return this.userId;
    }


    protected onStart(): void {
        this.initData();
        this.bindAction();
    }

    private initData(): void {
        this.hudModuleC = ModuleService.getModule(HUDModuleC);
        this.worldRankPanel = mw.UIService.getUI(WorldRankPanel);
        this.playerData = DataCenterC.getData(PlayerData);
    }

    private bindAction(): void {
        this.hudModuleC.onOpenRankAction.add(() => {
            this.worldRankPanel.show();
        });
        this.worldRankPanel.onRankTypeAction.add((rankType: RankType) => {
            if (!this.isRefresh) {
                Notice.showDownNotice("小手别点太快哟~");
            }
            this.isRefresh = false;
            TimeUtil.delaySecond(1.5).then(() => {
                this.isRefresh = true;
            });
            this.rankType = rankType;
            this.refreshRanking();
        });

    }

    /**
     * 进入场景
     * @param sceneType 
     */
    protected onEnterScene(sceneType: number): void {
        if (this.playerData == null) this.playerData = DataCenterC.getData(PlayerData);
        let playerLv = this.playerData.playerLv;
        let playerHeight = this.playerData.playerHeight;
        let playerKill = this.playerData.playerKill;
        let nickName = mw.AccountService.getNickName();
        nickName = nickName ? nickName : "UserId:" + this.localPlayer.userId;
        this.server.net_onEnterScene(nickName, playerLv, playerHeight, playerKill);
        Event.dispatchToLocal("SyncMaxHeight", playerHeight);
    }

    // /**
    //  * 刷新等级
    //  * @param playerLv 
    //  */
    // public refreshLv(playerLv: number): void {
    //     this.server.net_refreshLv(playerLv);
    // }

    // /**
    //  * 刷新高度
    //  * @param playerHeight 
    //  */
    // public refreshHeight(playerHeight: number): void {
    //     this.server.net_refreshHeight(playerHeight);
    // }

    // /**
    //  * 刷新击杀数
    //  * @param playerKill 
    //  */
    // public refreshKill(playerKill: number): void {
    //     this.server.net_refreshKill(playerKill);
    // }

    private rankPlayerDatas_CR: PlayerData_CSR[] = [];
    private rankWorldDatas_CW: PlayerData_CSW[] = [];
    /**
     * 同步排行榜数据（服务端同步）
     * @param playerNames 
     * @param playerLvs 
     * @param worldNames 
     * @param worldLvs 
     */
    public net_syncRankData_C(playerUserIds: string[], playerNames: string[], playerLvs: number[], playerHeights: number[], playerKills: number[],
        isRefreshWorldRank: boolean, worldUserIds: string[], worldNames: string[], worldLvs: number[]): void {
        let curPlayerIndex: number = -1;
        let curPlayerWorldIndex: number = -1;
        this.rankPlayerDatas_CR.length = 0;
        for (let i = 0; i < playerNames.length; ++i) {
            this.rankPlayerDatas_CR.push(new PlayerData_CSR(playerUserIds[i], playerNames[i], playerLvs[i], playerHeights[i], playerKills[i]));
        }
        this.sortRankData_C();
        for (let i = 0; i < this.rankPlayerDatas_CR.length; ++i) {
            if (this.rankPlayerDatas_CR[i].userId == this.currentUserId) {
                curPlayerIndex = i;
            }
        }
        if (isRefreshWorldRank) {
            this.rankWorldDatas_CW.length = 0;
            for (let i = 0; i < worldNames.length; ++i) {
                this.rankWorldDatas_CW.push(new PlayerData_CSW(worldUserIds[i], worldNames[i], worldLvs[i]));
                if (worldUserIds[i] == this.currentUserId) {
                    curPlayerWorldIndex = i;
                }
            }
        }
        if (!this.worldRankPanel) {
            this.worldRankPanel = mw.UIService.getUI(WorldRankPanel);
        }
        this.worldRankPanel.refreshRankPanel(this.rankPlayerDatas_CR, curPlayerIndex, isRefreshWorldRank, this.rankWorldDatas_CW, curPlayerWorldIndex);
    }

    private refreshRanking(): void {
        let curPlayerIndex: number = -1;
        this.sortRankData_C();
        for (let i = 0; i < this.rankPlayerDatas_CR.length; ++i) {
            if (this.rankPlayerDatas_CR[i].userId == this.currentUserId) {
                curPlayerIndex = i;
            }
        }
        if (!this.worldRankPanel) {
            this.worldRankPanel = mw.UIService.getUI(WorldRankPanel);
        }
        this.worldRankPanel.refreshRankPanel(this.rankPlayerDatas_CR, curPlayerIndex, false, null, -1);
    }

    /**
     * 排序排行榜数据
     */
    private sortRankData_C(): void {
        this.rankPlayerDatas_CR.sort((a: PlayerData_CSR, b: PlayerData_CSR) => {
            switch (this.rankType) {
                case RankType.Lv:
                    return b.playerLv - a.playerLv;
                    break;
                case RankType.Height:
                    return b.playerHeight - a.playerHeight;
                    break;
                case RankType.Kill:
                    return b.playerKill - a.playerKill;
                    break;
                default:
                    break;
            }
        });
    }
}

/**排行类型 */
export enum RankType {
    Lv = 1,
    Height = 2,
    Kill = 3,
}