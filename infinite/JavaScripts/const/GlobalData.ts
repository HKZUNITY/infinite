import { GameConfig } from "../config/GameConfig";

export default class GlobalData {
    /**log级别"None": "0", "Log": "1", "Warn": "2", "Error": "3" */
    public static logLevel: number = 0;

    /**是否隐藏头顶UI */
    public static isHideHeadUI: boolean = false;

    /**是否开启IAA */
    public static isOpenIAA: boolean = false;

    /**是否开启截图模式 */
    public static isOpenCcreenshot: boolean = false;

    /**是否开启攻击范围检测可视化 */
    public static isDebug: boolean = false;

    /**全局UI点击音效Guid */
    public static uiClickSoundGuid: string = GameConfig.Assets.getElement(1).Guid;
    /**爆炸金币特效Guid */
    public static explosiveCoinGuid: string = GameConfig.Assets.getElement(11).Guid;
    /**死亡墓碑Guid */
    public static tombstoneGuid: string = GameConfig.Assets.getElement(12).Guid;
    /**点击商店Item(限制) */
    public static isCanClickShopItem: boolean = true;
    /**On-Music-Icon */
    public static onMusicIconGuid: string = GameConfig.Assets.getElement(3).Guid;
    /**Off-Music-Icon */
    public static offMusicIconGuid: string = GameConfig.Assets.getElement(2).Guid;

    /** 每日刷新在线奖励时间格式为：时:分（0：0）*/
    public static dailyRefreshOnlineRewardTime: string = "4:0";

    /**每日刷新时间（目前是凌晨4点，格式为4:0） */
    public static dailyRefreshTime: string = "4:0";
    /**每周刷新时间（目前是每周一凌晨4点，格式为4:0） */
    public static weeklyRefreshTime: string = "4:0";
    /**NPC-Role */
    // public static npcGuidStr: string = GameConfig.Assets.getElement(19).Guid + "," + GameConfig.Assets.getElement(7).Guid;
    /**NPC-Weapon */
    // public static weaponGuidStr: string = GameConfig.Assets.getElement(20).Guid;

    /**引导线特效Guid */
    public static guideEffectGuid: string = GameConfig.Assets.getElement(21).Guid;
    /**引导目标点特效Guid */
    public static targetEffectGuid: string = GameConfig.Assets.getElement(22).Guid;

    public static atk: number = 0;
    public static hp: number = 0;

    public static totalBagLen: number = 276;

    public static mpStr: string = `斗气`;
}