import Console from "../../Tools/Console";
import { GameConfig } from "../../config/GameConfig";

export default class OnlineRewardData extends Subdata {
    @Decorator.persistence()
    public onlineMinute: number = 0;
    @Decorator.persistence()
    public isGetRewards: boolean[] = [];

    protected initDefaultData(): void {
        this.resetOnlineRewards();
    }

    /**
     * 保存在线时间
     * @param onlineMinute 
     */
    public saveOnlineMinute(onlineMinute: number): void {
        this.onlineMinute += onlineMinute;
        this.save(true);
    }

    /**
     * 保存领取奖励的状态
     * @param index 
     * @returns 
     */
    public saveIsGetRewards(index: number): void {
        if (index < 0 || index >= this.isGetRewards.length) return;
        this.isGetRewards[index] = true;
        this.save(true);
    }

    /**
     * 自动重置在线奖励数据
     */
    public autoResetOnlineRewards(): void {
        this.resetOnlineRewards();
        this.save(true);
        Console.error("每日重置在线奖励数据");
    }

    /**
     * 重置在线奖励数据
     */
    private resetOnlineRewards(): void {
        let rewradCount = GameConfig.OnlineRewards.getAllElement().length;
        this.isGetRewards.length = rewradCount;
        for (let i = 0; i < rewradCount; i++) {
            this.isGetRewards[i] = false;
        }
        this.onlineMinute = 0;
        Console.error("rewardCount = " + rewradCount);
    }
}