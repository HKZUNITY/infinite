import { update } from "./common/notice/Tween";
import { GameConfig } from "./config/GameConfig";
import GlobalData from "./const/GlobalData";
import { ArkData, ArkModuleC, ArkModuleS } from "./module/ArkModule/ArkModule";
import { BagData, BagModuleC, BagModuleS } from "./module/BagModule/BagModule";
import { FlyData, FlyModuleC, FlyModuleS } from "./module/FlyModule/FlyModule";
import { GuideData, GuideModuleC, GuideModuleS } from "./module/GuideModule/GuideModule";
import HUDModuleC from "./module/HUDModule/HUDModuleC";
import HUDModuleS from "./module/HUDModule/HUDModuleS";
import { LevelData, LevelModuleC, LevelModuleS } from "./module/LevelModule/LevelModule";
import { LotteryModuleC, LotteryModuleS } from "./module/LotteryModule/LotteryModule";
import { NewPeopleData, NewPeopleModuleC, NewPeopleModuleS } from "./module/NewPeopleModule/NewPeopleModule";
import OnlineRewardData from "./module/OnlineRewardModule/OnlineRewardData";
import { OnlineRewardModuleC } from "./module/OnlineRewardModule/OnlineRewardModuleC";
import { OnlineRewardModuleS } from "./module/OnlineRewardModule/OnlineRewardModuleS";
import PlayerData from "./module/PlayerModule/PlayerData";
import PlayerModuleC from "./module/PlayerModule/PlayerModuleC";
import PlayerModuleS from "./module/PlayerModule/PlayerModuleS";
import { WorldRankModuleC } from "./module/RankModule/WorldRankModuleC";
import { WorldRankModuleS } from "./module/RankModule/WorldRankModuleS";
import { RingSoulData, RingSoulModuleC, RingSoulModuleS } from "./module/RingSoulModule/RingSoulModule";
import { SignInData, SignInModuleC, SignInModuleS } from "./module/SignInModule/SignInModule";
import { SoulBone, SoulBoneModuleC, SoulBoneModuleS } from "./module/SoulBoneModule/SoulBoneModule";
import { TaskData } from "./module/TaskModule/TaskData";
import TaskModuleC from "./module/TaskModule/TaskModuleC";
import TaskModuleS from "./module/TaskModule/TaskModuleS";
import { WorldUIModuleC, WorldUIModuleS } from "./module/WorldUIModule/WorldUIModule";

@Component
export default class GameLauncher extends mw.Script {
    @mw.Property({ displayName: "是否隐藏头顶UI", group: "脚本设置" })
    private isHideHeadUI: boolean = true;

    @mw.Property({ displayName: "是否开启IAA", group: "脚本设置" })
    private isOpenIAA: boolean = true;

    @mw.Property({ displayName: "是否开启截图模式", group: "脚本设置" })
    private isOpenCcreenshot: boolean = false;

    @mw.Property({ displayName: "多语言", group: "脚本设置", enumType: { "系统默认": -1, "英语": 0, "简体中文": 1, "繁体中文": 2, "日语": 3, "韩语": 4 } })
    private languageId: number = -1;

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
        GlobalData.isDebug = SystemUtil.isPIE;
        GlobalData.logLevel = Number(this.logLevel);
        GlobalData.isHideHeadUI = this.isHideHeadUI;
        GlobalData.isOpenIAA = !mw.SystemUtil.isPIE || this.isOpenIAA;
        GlobalData.isOpenCcreenshot = this.isOpenCcreenshot;
        this.onRegisterModule();
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
        ModuleService.registerModule(RingSoulModuleS, RingSoulModuleC, RingSoulData);
        ModuleService.registerModule(SignInModuleS, SignInModuleC, SignInData);
        ModuleService.registerModule(ArkModuleS, ArkModuleC, ArkData);
        ModuleService.registerModule(LevelModuleS, LevelModuleC, LevelData);
        ModuleService.registerModule(NewPeopleModuleS, NewPeopleModuleC, NewPeopleData);
        ModuleService.registerModule(LotteryModuleS, LotteryModuleC, null);
        ModuleService.registerModule(FlyModuleS, FlyModuleC, FlyData);
        ModuleService.registerModule(SoulBoneModuleS, SoulBoneModuleC, SoulBone);
        ModuleService.registerModule(WorldUIModuleS, WorldUIModuleC, null);
    }

    /**------------------------------------------- 客户端 ------------------------------------------------ */
    /**客户端的OnStart */
    private onStartC(): void {
        this.initLanguage();
    }

    private initLanguage(): void {
        let language = LocaleUtil.getDefaultLocale().toString().toLowerCase();
        console.error(`wfz - language:${language}`);

        let languageId: number = -1;
        if (mw.SystemUtil.isPIE && this.languageId >= 0) {
            languageId = this.languageId;
        } else {
            if (!!language.match("en")) {
                languageId = 0;
            } else if (!!language.match("zh")) {//简体
                languageId = 1;
            } else if (!!language.match("ja")) {
                languageId = 3;
            } else if (!!language.match("ko")) {
                languageId = 4;
            } else {//繁体
                languageId = 2;
            }
        }
        GlobalData.languageId = languageId;
        console.error(`wfz - languageId:${languageId}`);

        GameConfig.initLanguage(languageId, (key) => {
            let ele = GameConfig.Language.getElement(key);
            if (ele == null) return "unknow_" + key;
            return ele.Value;
        });

        mw.UIScript.addBehavior("lan", (ui: mw.StaleButton | mw.TextBlock) => {
            let key: string = ui.text;
            if (!key) return;
            let lan = GameConfig.Language.getElement(key);
            if (lan) ui.text = lan.Value;
        });
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