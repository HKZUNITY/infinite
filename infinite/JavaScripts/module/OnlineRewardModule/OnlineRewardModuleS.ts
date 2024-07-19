import OnlineRewardData from "./OnlineRewardData";
import { OnlineRewardModuleC } from "./OnlineRewardModuleC";

export class OnlineRewardModuleS extends ModuleS<OnlineRewardModuleC, OnlineRewardData> {

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {

    }

    /**
     * 获取在线奖励数据
     * @param player 
     */
    public getServerOnlineRewardData(player: mw.Player): void {
        this.getClient(player).net_getServerOnlineRewardData();
    }

    /**
     * 重置在线奖励数据（在现状态下）
     */
    public resetOnlineReward(): void {
        this.getAllClient().net_resetOnlineReward();
    }

    /**
     * 保存在线时间
     * @param onlineMinute 
     */
    @Decorator.noReply()
    public net_saveOnlineMinute(onlineMinute: number): void {
        this.currentData.saveOnlineMinute(onlineMinute);
    }

    /**
     * 保存领取奖励的状态
     * @param index 
     * @returns 
     */
    @Decorator.noReply()
    public net_saveIsGetRewards(index: number): void {
        this.currentData.saveIsGetRewards(index);
    }
}