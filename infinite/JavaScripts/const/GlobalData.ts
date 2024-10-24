import { GameConfig } from "../config/GameConfig";

export default class GlobalData {
    public static languageId: number = -1;

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

    public static worldRankCount: number = 500;
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

    public static totalBagLen: number = 157;

    public static get mpStr(): string {
        return GameConfig.Language.Text_SoulPower.Value;
    }
    public static get atkStr(): string {
        return GameConfig.Language.Text_MartialSoul.Value;
    }
    public static get weaponStr(): string {
        return GameConfig.Language.Text_MartialSoul.Value;
    }
    public static get skinStr(): string {
        return GameConfig.Language.Text_SoulMaster.Value;
    }
    public static get equipStr(): string {
        return GameConfig.Language.Text_SoulBone.Value;
    }
    public static get petStr(): string {
        return GameConfig.Language.Text_Ayakashi.Value;
    }

    public static get rarityStr1(): string {
        return GameConfig.Language.Text_Ordinary.Value;
    }
    public static get rarityStr2(): string {
        return GameConfig.Language.Text_Rare.Value;
    }
    public static get rarityStr3(): string {
        return GameConfig.Language.Text_Epic.Value;
    }
    public static get rarityStr4(): string {
        return GameConfig.Language.Text_Legend.Value;
    }

    public static upgradeExpMultiple: number = 500;
    public static monsterHurt: number = 200;
    public static attackMp: number = 1;
    public static skillCD_1: number = 60;
    public static skillMp_1: number = 100;
    public static skillLvLimit_1: number = 90;
    public static skillContinue_1: number = 20;
    public static get skillName_1(): string {
        return GameConfig.Language.Text_KillingGodDomain.Value;
    }
    public static baseSkillDamage: number = 1;
    public static skillSoundId_1: string = `307720`;
    public static skillEffectId_1: string = `113913`;
    public static skillAnimation_1: string = "284915";
    public static skillScale_1: number = 1.5;

    public static pathStrMap: Map<number, string> = new Map<number, string>(
        [
            [1, "1C38507C"],
            [2, "0120DDB3"],
            [3, "08B26B13"],
            [4, "33AD2F92"],
            [5, "098050A0"],
            [6, "0118B262"]
        ]
    );

    public static signInDays: number = 7;

    public static get gameName(): string {
        return GameConfig.Language.Text_DoushenContinent_MySoulRingUnlimitedUpgrade.Value;
    }

    public static addCoinCount: number = 2888888;
    public static addDiamondCount: number = 5;
    public static addBoneCount: number = 5;

    public static arkIcon: string = "312541";
    public static coinIcon: string = "151950";
    public static diamondIcon: string = "103220";
    public static boneIcon: string = "351119";
}