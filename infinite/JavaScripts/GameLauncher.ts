import { update } from "./common/notice/Tween";
import GlobalData from "./const/GlobalData";
import { BagData, BagModuleC, BagModuleS } from "./module/BagModule/BagModule";
import { GuideData, GuideModuleC, GuideModuleS } from "./module/GuideModule/GuideModule";
import HUDModuleC from "./module/HUDModule/HUDModuleC";
import HUDModuleS from "./module/HUDModule/HUDModuleS";
import OnlineRewardData from "./module/OnlineRewardModule/OnlineRewardData";
import { OnlineRewardModuleC } from "./module/OnlineRewardModule/OnlineRewardModuleC";
import { OnlineRewardModuleS } from "./module/OnlineRewardModule/OnlineRewardModuleS";
import PlayerData from "./module/PlayerModule/PlayerData";
import PlayerModuleC from "./module/PlayerModule/PlayerModuleC";
import PlayerModuleS from "./module/PlayerModule/PlayerModuleS";
import { WorldRankModuleC } from "./module/RankModule/WorldRankModuleC";
import { WorldRankModuleS } from "./module/RankModule/WorldRankModuleS";
import { TaskData } from "./module/TaskModule/TaskData";
import TaskModuleC from "./module/TaskModule/TaskModuleC";
import TaskModuleS from "./module/TaskModule/TaskModuleS";

@Component
export default class GameLauncher extends mw.Script {
    @mw.Property({ displayName: "是否隐藏头顶UI", group: "脚本设置" })
    private isHideHeadUI: boolean = true;

    @mw.Property({ displayName: "是否开启IAA", group: "脚本设置" })
    private isOpenIAA: boolean = true;

    @mw.Property({ displayName: "是否开启截图模式", group: "脚本设置" })
    private isOpenCcreenshot: boolean = false;

    @mw.Property({ displayName: "Log级别", group: "脚本设置", selectOptions: { "None": "0", "Log": "1", "Warn": "2", "Error": "3" } })
    private logLevel: string = "0";


    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        this.onStartCS();
        if (mw.SystemUtil.isClient()) {
            this.onStartC();
        } else if (mw.SystemUtil.isServer()) {
            this.onStartS();
        }
    }

    /**客户端服务端的onStart */
    private onStartCS(): void {
        this.useUpdate = true;
        this.onRegisterModule();
        GlobalData.isDebug = SystemUtil.isPIE;
        GlobalData.logLevel = Number(this.logLevel);
        GlobalData.isHideHeadUI = this.isHideHeadUI;
        GlobalData.isOpenIAA = !mw.SystemUtil.isPIE || this.isOpenIAA;
        GlobalData.isOpenCcreenshot = this.isOpenCcreenshot;
    }

    /**
     * 周期函数 每帧执行
     * 此函数执行需要将this.useUpdate赋值为true
     * @param dt 当前帧与上一帧的延迟 / 秒
     */
    protected onUpdate(dt: number): void {
        update();
        mw.TweenUtil.TWEEN.update();
        if (mw.SystemUtil.isClient()) {
            this.onUpdateC(dt);
        } else if (mw.SystemUtil.isServer()) {
            this.onUpdateS(dt);
        }
    }

    /**注册模块 */
    private onRegisterModule(): void {
        ModuleService.registerModule(HUDModuleS, HUDModuleC, null);
        ModuleService.registerModule(BagModuleS, BagModuleC, BagData);
        ModuleService.registerModule(PlayerModuleS, PlayerModuleC, PlayerData);
        ModuleService.registerModule(TaskModuleS, TaskModuleC, TaskData);
        ModuleService.registerModule(GuideModuleS, GuideModuleC, GuideData);
        ModuleService.registerModule(WorldRankModuleS, WorldRankModuleC, null);
        ModuleService.registerModule(OnlineRewardModuleS, OnlineRewardModuleC, OnlineRewardData);
    }

    /**------------------------------------------- 客户端 ------------------------------------------------ */
    /**客户端的OnStart */
    private onStartC(): void {

    }

    /**客户端的update */
    private onUpdateC(dt: number): void {

    }

    /**------------------------------------------- 客户端 ------------------------------------------------ */

    /**------------------------------------------- 服务端 ------------------------------------------------ */
    /**服务端的OnStart */
    private onStartS(): void {
        DataStorage.setTemporaryStorage(SystemUtil.isPIE);
    }

    /**服务端的update */
    private onUpdateS(dt: number): void {

    }
    /**------------------------------------------- 服务端 ------------------------------------------------ */
}