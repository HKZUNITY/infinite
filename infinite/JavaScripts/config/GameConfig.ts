import {ConfigBase, IElementBase} from "./ConfigBase";
import {ActionConfig} from "./Action";
import {AdsConfig} from "./Ads";
import {AssetsConfig} from "./Assets";
import {BagInfoConfig} from "./BagInfo";
import {CoinConfig} from "./Coin";
import {ColdWeaponConfig} from "./ColdWeapon";
import {ColorConfig} from "./Color";
import {DressDataConfig} from "./DressData";
import {DressProgressConfig} from "./DressProgress";
import {LanguageConfig} from "./Language";
import {MonsterInfoConfig} from "./MonsterInfo";
import {MusicConfig} from "./Music";
import {NPCConfig} from "./NPC";
import {OnlineRewardsConfig} from "./OnlineRewards";
import {QuickEmojiConfig} from "./QuickEmoji";
import {QuickTalkConfig} from "./QuickTalk";
import {TaskConfig} from "./Task";
import {TrampolineConfig} from "./Trampoline";

export class GameConfig{
	private static configMap:Map<string, ConfigBase<IElementBase>> = new Map();
	/**
	* 多语言设置
	* @param languageIndex 语言索引(-1为系统默认语言)
	* @param getLanguageFun 根据key获取语言内容的方法
	*/
	public static initLanguage(languageIndex:number, getLanguageFun:(key:string|number)=>string){
		ConfigBase.initLanguage(languageIndex, getLanguageFun);
		this.configMap.clear();
	}
	public static getConfig<T extends ConfigBase<IElementBase>>(ConfigClass: { new(): T }): T {
		if (!this.configMap.has(ConfigClass.name)) {
			this.configMap.set(ConfigClass.name, new ConfigClass());
		}
		return this.configMap.get(ConfigClass.name) as T;
	}
	public static get Action():ActionConfig{ return this.getConfig(ActionConfig) };
	public static get Ads():AdsConfig{ return this.getConfig(AdsConfig) };
	public static get Assets():AssetsConfig{ return this.getConfig(AssetsConfig) };
	public static get BagInfo():BagInfoConfig{ return this.getConfig(BagInfoConfig) };
	public static get Coin():CoinConfig{ return this.getConfig(CoinConfig) };
	public static get ColdWeapon():ColdWeaponConfig{ return this.getConfig(ColdWeaponConfig) };
	public static get Color():ColorConfig{ return this.getConfig(ColorConfig) };
	public static get DressData():DressDataConfig{ return this.getConfig(DressDataConfig) };
	public static get DressProgress():DressProgressConfig{ return this.getConfig(DressProgressConfig) };
	public static get Language():LanguageConfig{ return this.getConfig(LanguageConfig) };
	public static get MonsterInfo():MonsterInfoConfig{ return this.getConfig(MonsterInfoConfig) };
	public static get Music():MusicConfig{ return this.getConfig(MusicConfig) };
	public static get NPC():NPCConfig{ return this.getConfig(NPCConfig) };
	public static get OnlineRewards():OnlineRewardsConfig{ return this.getConfig(OnlineRewardsConfig) };
	public static get QuickEmoji():QuickEmojiConfig{ return this.getConfig(QuickEmojiConfig) };
	public static get QuickTalk():QuickTalkConfig{ return this.getConfig(QuickTalkConfig) };
	public static get Task():TaskConfig{ return this.getConfig(TaskConfig) };
	public static get Trampoline():TrampolineConfig{ return this.getConfig(TrampolineConfig) };
}