import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["Id","Name","Value","Value_Ch","Value_Cht","Value_J","Value_K"],["","Key|ReadByName","MainLanguage","ChildLanguage","ChildLanguage","ChildLanguage","ChildLanguage"],[1,"Text_AfterStrengthening","After Strengthening","强化后","强化後","強化されます","강화된 후"],[2,"Text_StarRating","{0} Star Rating","{0}星级","{0}星級","{0}つ星","{0}성급"],[3,"Text_NeedToReachLevel","Need To Reach Level {0}","需要等级达到{0}级","需要等級達到{0}級","要求レベルが{0}レベルに達する","레벨 {0} 레벨 달성 필요"],[4,"Text_IncreaseBloodVolumeByTimes","Increase Blood Volume By {0} Times","血量提升{0}倍","血量提升{0}倍","血液量が{0}倍に上昇","혈액량 {0}배 증가"],[5,"Text_AttackPowerIncreasedByTimes","Attack Power Increased By {0} Times","攻击力提升{0}倍","攻擊力提升{0}倍","攻撃力{0}倍アップ","공격력 {0}배 증가"],[6,"Text_StrengthenSoulBones","Strengthen Soul Bones","强化魂骨","强化魂骨","魂の骨を強化する","혼골 강화"],[7,"Text_NeedToConsume","Need To Consume","需要消耗","需要消耗","消費する必要がある","필요 소비"],[8,"Text_Diamonds","Diamonds","钻石","鑽石","ダイヤモンド","다이아몬드"],[9,"Text_GoldCoins","Gold Coins","金币","金幣","金貨","금화"],[10,"Text_StrengtheningConditions","Strengthening Conditions","强化条件","强化條件","強化条件","조건을 강화하다"],[11,"Text_EnhanceTheProbabilityOfSuccess","Enhance The Probability Of Success","强化成功概率","强化成功概率","成功確率の強化","성공 확률 강화"],[12,"Text_IncreaseProbability","Increase Probability","提升概率","提升概率","かくりつを上げる","확률 증가"],[13,"Text_StartStrengthening","Start Strengthening","开始强化","開始强化","強化を開始","강화 시작"],[14,"Text_TeamCoin","Team Coin","派队币","派隊幣","派隊貨幣","파티 머니"],[15,"Text_Buy","Buy","购买","購買","購入する","구매"],[16,"Text_Or","Or","或","或","または","또는"],[17,"Text_UpProbabiliotyConetntTextBlock_0","Consume {0} Diamonds\nEnhancement Probability Increased To {1}%","消耗{0}钻石\n强化概率提升到{1}%","消耗{0}鑽石\n强化概率提升到{1}%","{0}ダイヤモンド消費\n強化確率が{1}%に向上","{0} 다이아 소모\n강화 확률을 {1}%까지 증가"],[18,"Text_UpProbabiliotyConetntTextBlock_1","Consume {0} Team Coins\nEnhance The Probability To {1}%","消耗{0}派队币\n强化概率提升到{1}%","消耗{0}派隊幣\n强化概率提升到{1}%","{0}パーティー貨幣を消費する\n強化確率が{1}%にアップ","{0} 파티 코인 소모\n강화 확률을 {1}%까지 증가"],[19,"Text_UsingDiamonds","Using Diamonds","使用钻石","使用鑽石","ダイヤモンドを使う","다이아몬드 사용"],[20,"Text_UseTeamCoins","Use Team Coins","使用派队币","使用派隊幣","ディスパッチ通貨の使用","파티 코인 사용"],[21,"Text_DiamondShortage","Diamond Shortage","钻石不足","鑽石不足","ダイヤ不足","다이아 부족"],[22,"Text_InsufficientGoldCoins","Insufficient Gold Coins","金币不足","金幣不足","金貨不足","금화 부족"]];
export interface ILanguageElement extends IElementBase{
 	/**唯一标识*/
	Id:number
	/**名字*/
	Name:string
	/**英文*/
	Value:string
 } 
export class LanguageConfig extends ConfigBase<ILanguageElement>{
	constructor(){
		super(EXCELDATA);
	}
	/**强化后*/
	get Text_AfterStrengthening():ILanguageElement{return this.getElement(1)};
	/**{0}星级*/
	get Text_StarRating():ILanguageElement{return this.getElement(2)};
	/**需要等级达到{0}级*/
	get Text_NeedToReachLevel():ILanguageElement{return this.getElement(3)};
	/**血量提升{0}倍*/
	get Text_IncreaseBloodVolumeByTimes():ILanguageElement{return this.getElement(4)};
	/**攻击力提升{0}倍*/
	get Text_AttackPowerIncreasedByTimes():ILanguageElement{return this.getElement(5)};
	/**强化魂骨*/
	get Text_StrengthenSoulBones():ILanguageElement{return this.getElement(6)};
	/**需要消耗*/
	get Text_NeedToConsume():ILanguageElement{return this.getElement(7)};
	/**钻石*/
	get Text_Diamonds():ILanguageElement{return this.getElement(8)};
	/**金币*/
	get Text_GoldCoins():ILanguageElement{return this.getElement(9)};
	/**强化条件*/
	get Text_StrengtheningConditions():ILanguageElement{return this.getElement(10)};
	/**强化成功概率*/
	get Text_EnhanceTheProbabilityOfSuccess():ILanguageElement{return this.getElement(11)};
	/**提升概率*/
	get Text_IncreaseProbability():ILanguageElement{return this.getElement(12)};
	/**开始强化*/
	get Text_StartStrengthening():ILanguageElement{return this.getElement(13)};
	/**派队币*/
	get Text_TeamCoin():ILanguageElement{return this.getElement(14)};
	/**购买*/
	get Text_Buy():ILanguageElement{return this.getElement(15)};
	/**或*/
	get Text_Or():ILanguageElement{return this.getElement(16)};
	/**消耗{0}钻石
强化概率提升到{1}%*/
	get Text_UpProbabiliotyConetntTextBlock_0():ILanguageElement{return this.getElement(17)};
	/**消耗{0}派队币
强化概率提升到{1}%*/
	get Text_UpProbabiliotyConetntTextBlock_1():ILanguageElement{return this.getElement(18)};
	/**使用钻石*/
	get Text_UsingDiamonds():ILanguageElement{return this.getElement(19)};
	/**使用派队币*/
	get Text_UseTeamCoins():ILanguageElement{return this.getElement(20)};
	/**钻石不足*/
	get Text_DiamondShortage():ILanguageElement{return this.getElement(21)};
	/**金币不足*/
	get Text_InsufficientGoldCoins():ILanguageElement{return this.getElement(22)};

}