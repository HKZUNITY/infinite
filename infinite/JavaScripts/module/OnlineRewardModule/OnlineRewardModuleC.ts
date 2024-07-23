import Console from "../../Tools/Console";
import { Notice } from "../../common/notice/Notice";
import { GameConfig } from "../../config/GameConfig";
import PlayerModuleC from "../PlayerModule/PlayerModuleC";
import OnlineRewardData from "./OnlineRewardData";
import { OnlineRewardModuleS } from "./OnlineRewardModuleS";
import { OnlineRewardPanel } from "./ui/OnlineRewardPanel";

export class OnlineRewardModuleC extends ModuleC<OnlineRewardModuleS, OnlineRewardData> {
    private playerModuleC: PlayerModuleC = null;
    private onlineRewardsPanel: OnlineRewardPanel = undefined;
    /**打开关闭在线奖励界面 */
    public onOnlineRewardsAction: Action = new Action();

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        this.initData();
        this.registerAction();
    }

    /**
     * 初始化数据
     */
    private initData(): void {
        this.playerModuleC = ModuleService.getModule(PlayerModuleC);
        this.onlineRewardsPanel = mw.UIService.getUI(OnlineRewardPanel);
    }

    /**
     * 注册事件
     */
    private registerAction(): void {
        this.onOnlineRewardsAction.add((isOpen: boolean) => {
            console.error(`aaaaa`);
            this.isNeedUpdateItem = isOpen;
            isOpen ? this.onlineRewardsPanel.show() : this.onlineRewardsPanel.hideTween();
        });
    }

    private onlineSecond: number = 0;
    private isGetRewards: boolean[] = [];
    /**
     * 获取在线奖励数据
     */
    public net_getServerOnlineRewardData(): void {
        this.onlineSecond = this.data.onlineMinute * 60;
        this.isGetRewards = this.data.isGetRewards;
        this.isStartTimer = true;
        this.onlineRewardsPanel.initOnlineRewardItem(this.onlineSecond, this.isGetRewards);
    }

    /**
     * 重置在线奖励数据（在现状态下）
     */
    public net_resetOnlineReward(): void {
        this.onlineSecond = this.data.onlineMinute * 60;
        this.isGetRewards = this.data.isGetRewards;
        this.onlineRewardsPanel.resetOnlineRewardItem(this.onlineSecond, this.isGetRewards);
        this.secondTimer = 0;
        this.minuteTimer = 0;
        this.isStartTimer = true;
        Console.error("重置在线奖励数据（在现状态下）");
    }

    /**
     * 设置领取奖励的状态
     * @param index 
     * @returns 
     */
    public setIsGetRewards(index: number): void {
        if (index < 0 || index >= this.isGetRewards.length) return;
        this.isGetRewards[index] = true;
        this.server.net_saveIsGetRewards(index);
    }

    private isNeedUpdateItem: boolean = false;
    private isStartTimer: boolean = false;
    private secondTimer: number = 0;
    private secondTime: number = 1;
    private minuteTimer: number = 0;
    private minuteTime: number = 60;
    protected onUpdate(dt: number): void {
        if (!this.isStartTimer) return;

        this.secondTimer += dt;
        if (this.secondTimer < this.secondTime) return;

        this.secondTimer = 0;
        this.onlineSecond += this.secondTime;

        this.minuteTimer += this.secondTime;
        // if (this.isNeedUpdateItem)
        this.onlineRewardsPanel.updateNeedUpdateItems(this.onlineSecond);
        if (this.minuteTimer < this.minuteTime) return;

        this.minuteTimer = 0;
        this.server.net_saveOnlineMinute(1);
    }

    /**
     * 得到在线奖励
     * @param index 
     */
    public getOnlineRewrad(index: number): void {
        this.setIsGetRewards(index);
        let rewardCount = GameConfig.OnlineRewards.getElement(index + 1).RewardCount;
        Notice.showDownNotice("奖励金币：" + rewardCount[0]);
        Notice.showDownNotice("奖励经验：" + rewardCount[1]);
        this.playerModuleC.saveCoinAndExp(rewardCount[0], rewardCount[1]);
    }
}

export enum OnlineRewardItemState {
    /**不满足 */
    notSatisfy = 0,
    /**满足未领取 */
    satisfy = 1,
    /**已领取 */
    getReward = 2,
}