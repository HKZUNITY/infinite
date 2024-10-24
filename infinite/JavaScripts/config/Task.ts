import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","Describe","Name","TaskType","TaskItemType","NextId","TragetNum","Coin","Exp","Diamond"],["","","Language","","","","","","",""],[1,"每日登陆游戏（{0}/{1}）","Text_DailyLoginToGames",1,1,0,1,100,100,1,1],[2,"每日在线时长8分钟（{0}/{1}）","Text_DailyOnlineMinutes",1,11,0,8,800,800,8,11,3],[3,"每日在线时长15分钟（{0}/{1}）","Text_DailyOnlineMinutes",1,12,0,15,1500,1500,15,11,4],[4,"每日在线时长25分钟（{0}/{1}）","Text_DailyOnlineMinutes",1,13,0,25,2500,2500,25,11,5],[5,"每日在线时长35分钟（{0}/{1}）","Text_DailyOnlineMinutes",1,14,0,35,3500,3555,100,11,6],[6,"每日在线时长50分钟（{0}/{1}）","Text_DailyOnlineMinutes",1,15,0,50,5000,5000,150,11,7],[7,"每日在线时长60分钟（{0}/{1}）","Text_DailyOnlineMinutes",1,16,0,60,6000,6000,200,11],[8,"每日击败1只美杜莎（{0}/{1}）","Text_DefeatMedusaEveryDay",1,21,0,1,500,500,0,21,9],[9,"每日击败3只美杜莎（{0}/{1}）","Text_DefeatMedusaEveryDay",1,22,0,3,1500,1500,1,21,10],[10,"每日击败6只美杜莎（{0}/{1}）","Text_DefeatMedusaEveryDay",1,23,0,6,3000,3000,2,21,11],[11,"每日击败10只美杜莎（{0}/{1}）","Text_DefeatMedusaEveryDay",1,24,0,10,5000,5000,3,21,12],[12,"每日击败20只美杜莎（{0}/{1}）","Text_DefeatMedusaEveryDay",1,25,0,20,10000,10000,5,21],[13,"每日击败1只蜘蛛精（{0}/{1}）","Text_DefeatSpiderSpiritsDaily",1,31,0,1,250,250,0,31,14],[14,"每日击败3只蜘蛛精（{0}/{1}）","Text_DefeatSpiderSpiritsDaily",1,32,0,3,750,750,1,31,15],[15,"每日击败6只蜘蛛精（{0}/{1}）","Text_DefeatSpiderSpiritsDaily",1,33,0,6,1500,1500,2,31,16],[16,"每日击败10只蜘蛛精（{0}/{1}）","Text_DefeatSpiderSpiritsDaily",1,34,0,10,2500,2500,3,31,17],[17,"每日击败20只蜘蛛精（{0}/{1}）","Text_DefeatSpiderSpiritsDaily",1,35,0,20,5000,5000,5,31],[18,"每日击败1只炫彩蜘蛛（{0}/{1}）","Text_DefeatDazzlingSpidersDaily",1,41,0,1,250,250,0,41,19],[19,"每日击败3只炫彩蜘蛛（{0}/{1}）","Text_DefeatDazzlingSpidersDaily",1,42,0,3,750,750,1,41,20],[20,"每日击败6只炫彩蜘蛛（{0}/{1}）","Text_DefeatDazzlingSpidersDaily",1,43,0,6,1500,1500,2,41,21],[21,"每日击败10只炫彩蜘蛛（{0}/{1}）","Text_DefeatDazzlingSpidersDaily",1,44,0,10,2500,2500,3,41,22],[22,"每日击败20只炫彩蜘蛛（{0}/{1}）","Text_DefeatDazzlingSpidersDaily",1,45,0,20,5000,5000,5,41],[23,"每日击败1只龙兽（{0}/{1}）","Text_DefeatDragonBeastsDaily",1,51,0,1,250,250,0,51,24],[24,"每日击败3只龙兽（{0}/{1}）","Text_DefeatDragonBeastsDaily",1,52,0,3,750,750,1,51,25],[25,"每日击败6只龙兽（{0}/{1}）","Text_DefeatDragonBeastsDaily",1,53,0,6,1500,1500,2,51,26],[26,"每日击败10只龙兽（{0}/{1}）","Text_DefeatDragonBeastsDaily",1,54,0,10,2500,2500,3,51,27],[27,"每日击败20只龙兽（{0}/{1}）","Text_DefeatDragonBeastsDaily",1,55,0,20,5000,5000,5,51],[28,"每日击败1只丧尸（{0}/{1}）","Text_DefeatZombiesDaily",1,61,0,1,250,250,0,61,29],[29,"每日击败3只丧尸（{0}/{1}）","Text_DefeatZombiesDaily",1,62,0,3,750,750,1,61,30],[30,"每日击败6只丧尸（{0}/{1}）","Text_DefeatZombiesDaily",1,63,0,6,1500,1500,2,61,31],[31,"每日击败10只丧尸（{0}/{1}）","Text_DefeatZombiesDaily",1,64,0,10,2500,2500,3,61,32],[32,"每日击败20只丧尸（{0}/{1}）","Text_DefeatZombiesDaily",1,65,0,20,5000,5000,5,61],[33,"每日击败1只变异布偶（{0}/{1}）","Text_DefeatMutatedPuppetsDaily",1,71,0,1,250,250,0,71,34],[34,"每日击败3只变异布偶（{0}/{1}）","Text_DefeatMutatedPuppetsDaily",1,72,0,3,750,750,1,71,35],[35,"每日击败6只变异布偶（{0}/{1}）","Text_DefeatMutatedPuppetsDaily",1,73,0,6,1500,1500,2,71,36],[36,"每日击败10只变异布偶（{0}/{1}）","Text_DefeatMutatedPuppetsDaily",1,74,0,10,2500,2500,3,71,37],[37,"每日击败20只变异布偶（{0}/{1}）","Text_DefeatMutatedPuppetsDaily",1,75,0,20,5000,5000,5,71],[38,"每日击败1名玩家（{0}/{1}）","Text_DefeatPlayersDaily",1,81,0,1,250,250,0,81,39],[39,"每日击败3名玩家（{0}/{1}）","Text_DefeatPlayersDaily",1,82,0,3,750,750,1,81,40],[40,"每日击败6名玩家（{0}/{1}）","Text_DefeatPlayersDaily",1,83,0,6,1500,1500,2,81,41],[41,"每日击败10名玩家（{0}/{1}）","Text_DefeatPlayersDaily",1,84,0,10,2500,2500,3,81,42],[42,"每日击败20名玩家（{0}/{1}）","Text_DefeatPlayersDaily",1,85,0,20,5000,5000,5,81],[43,"每日等级提升1级（{0}/{1}）","Text_DailyLevelIncreaseByLevels",1,91,0,1,250,250,0,91,44],[44,"每日等级提升3级（{0}/{1}）","Text_DailyLevelIncreaseByLevels",1,92,0,3,750,750,1,91,45],[45,"每日等级提升6级（{0}/{1}）","Text_DailyLevelIncreaseByLevels",1,93,0,6,1500,1500,2,91,46],[46,"每日等级提升10级（{0}/{1}）","Text_DailyLevelIncreaseByLevels",1,94,0,10,2500,2500,3,91,47],[47,"每日等级提升20级（{0}/{1}）","Text_DailyLevelIncreaseByLevels",1,95,0,20,5000,5000,5,91],[48,"每日捡到1个秘宝（{0}/{1}）","Text_PickUpTreasuresEveryDay",1,101,0,1,250,250,0,101,49],[49,"每日捡到3个秘宝（{0}/{1}）","Text_PickUpTreasuresEveryDay",1,102,0,3,750,750,1,101,50],[50,"每日捡到6个秘宝（{0}/{1}）","Text_PickUpTreasuresEveryDay",1,103,0,6,1500,1500,2,101,51],[51,"每日捡到10个秘宝（{0}/{1}）","Text_PickUpTreasuresEveryDay",1,104,0,10,2500,2500,3,101,52],[52,"每日捡到20个秘宝（{0}/{1}）","Text_PickUpTreasuresEveryDay",1,105,0,20,5000,5000,5,101],[53,"每日观看1次广告（{0}/{1}）","Text_WatchAdsPerDay",1,111,0,1,250,250,5,111,54],[54,"每日观看3次广告（{0}/{1}）","Text_WatchAdsPerDay",1,112,0,3,750,750,15,111,55],[55,"每日观看6次广告（{0}/{1}）","Text_WatchAdsPerDay",1,113,0,6,1500,1500,30,111,56],[56,"每日观看10次广告（{0}/{1}）","Text_WatchAdsPerDay",1,114,0,10,2500,2500,50,111,57],[57,"每日观看20次广告（{0}/{1}）","Text_WatchAdsPerDay",1,115,0,20,5000,5000,100,111],[58,"每周登录2天（{0}/{1}）","Text_LoginDaysAWeek",2,201,0,2,2000,2000,100,201,59],[59,"每周登录3天（{0}/{1}）","Text_LoginDaysAWeek",2,202,0,3,3000,3000,100,201,60],[60,"每周登录5天（{0}/{1}）","Text_LoginDaysAWeek",2,203,0,5,5000,5000,100,201,61],[61,"每周登录7天（{0}/{1}）","Text_LoginDaysAWeek",2,204,0,7,7000,7000,100,201],[62,"每周时长达到30分钟2天（{0}/{1}）","Text_UpTo30MinutesAndDaysPerWeek",2,211,0,2,200,200,100,211,63],[63,"每周时长达到30分钟3天（{0}/{1}）","Text_UpTo30MinutesAndDaysPerWeek",2,212,0,3,300,300,300,211,64],[64,"每周时长达到30分钟5天（{0}/{1}）","Text_UpTo30MinutesAndDaysPerWeek",2,213,0,5,500,500,500,211,65],[65,"每周时长达到30分钟7天（{0}/{1}）","Text_UpTo30MinutesAndDaysPerWeek",2,214,0,7,700,700,1000,211],[66,"每周击败50只美杜莎（{0}/{1}）","Text_DefeatMedusaEveryWeek",2,221,0,50,25000,25000,5,221,67],[67,"每周击败150只美杜莎（{0}/{1}）","Text_DefeatMedusaEveryWeek",2,222,0,150,75000,75000,15,221,68],[68,"每周击败300只美杜莎（{0}/{1}）","Text_DefeatMedusaEveryWeek",2,223,0,300,150000,150000,30,221,69],[69,"每周击败500只美杜莎（{0}/{1}）","Text_DefeatMedusaEveryWeek",2,224,0,500,250000,250000,50,221,70],[70,"每周击败1000只美杜莎（{0}/{1}）","Text_DefeatMedusaEveryWeek",2,225,0,1000,500000,500000,100,221],[71,"每周击败50只蜘蛛精（{0}/{1}）","Text_DefeatSpiderSpiritsEveryWeek",2,231,0,50,25000,25000,5,231,72],[72,"每周击败150只蜘蛛精（{0}/{1}）","Text_DefeatSpiderSpiritsEveryWeek",2,232,0,150,75000,75000,15,231,73],[73,"每周击败300只蜘蛛精（{0}/{1}）","Text_DefeatSpiderSpiritsEveryWeek",2,233,0,300,150000,150000,30,231,74],[74,"每周击败500只蜘蛛精（{0}/{1}）","Text_DefeatSpiderSpiritsEveryWeek",2,234,0,500,250000,250000,50,231,75],[75,"每周击败1000只蜘蛛精（{0}/{1}）","Text_DefeatSpiderSpiritsEveryWeek",2,235,0,1000,500000,500000,100,231],[76,"每周击败50只炫彩蜘蛛（{0}/{1}）","Text_DefeatDazzlingSpidersEveryWeek",2,241,0,50,25000,25000,5,241,77],[77,"每周击败150只炫彩蜘蛛（{0}/{1}）","Text_DefeatDazzlingSpidersEveryWeek",2,241,0,150,75000,75000,15,241,78],[78,"每周击败300只炫彩蜘蛛（{0}/{1}）","Text_DefeatDazzlingSpidersEveryWeek",2,241,0,300,150000,150000,30,241,79],[79,"每周击败500只炫彩蜘蛛（{0}/{1}）","Text_DefeatDazzlingSpidersEveryWeek",2,241,0,500,250000,250000,50,241,80],[80,"每周击败1000只炫彩蜘蛛（{0}/{1}）","Text_DefeatDazzlingSpidersEveryWeek",2,241,0,1000,500000,500000,100,241],[81,"每周击败50只龙兽（{0}/{1}）","Text_DefeatDragonBeastsEveryWeek",2,251,0,50,25000,25000,5,251,82],[82,"每周击败150只龙兽（{0}/{1}）","Text_DefeatDragonBeastsEveryWeek",2,252,0,150,75000,75000,15,251,83],[83,"每周击败300只龙兽（{0}/{1}）","Text_DefeatDragonBeastsEveryWeek",2,253,0,300,150000,150000,30,251,84],[84,"每周击败500只龙兽（{0}/{1}）","Text_DefeatDragonBeastsEveryWeek",2,254,0,500,250000,250000,50,251,85],[85,"每周击败1000只龙兽（{0}/{1}）","Text_DefeatDragonBeastsEveryWeek",2,255,0,1000,500000,500000,100,251],[86,"每周击败50只丧尸（{0}/{1}）","Text_DefeatZombiesEveryWeek",2,261,0,50,25000,25000,5,261,87],[87,"每周击败150只丧尸（{0}/{1}）","Text_DefeatZombiesEveryWeek",2,262,0,150,75000,75000,15,261,88],[88,"每周击败300只丧尸（{0}/{1}）","Text_DefeatZombiesEveryWeek",2,263,0,300,150000,150000,30,261,89],[89,"每周击败500只丧尸（{0}/{1}）","Text_DefeatZombiesEveryWeek",2,264,0,500,250000,250000,50,261,90],[90,"每周击败1000只丧尸（{0}/{1}）","Text_DefeatZombiesEveryWeek",2,265,0,1000,500000,500000,100,261],[91,"每周击败50只变异布偶（{0}/{1}）","Text_DefeatMutatedPuppetsEveryWeek",2,271,0,50,25000,25000,5,271,92],[92,"每周击败150只变异布偶（{0}/{1}）","Text_DefeatMutatedPuppetsEveryWeek",2,272,0,150,75000,75000,15,271,93],[93,"每周击败300只变异布偶（{0}/{1}）","Text_DefeatMutatedPuppetsEveryWeek",2,273,0,300,150000,150000,30,271,94],[94,"每周击败500只变异布偶（{0}/{1}）","Text_DefeatMutatedPuppetsEveryWeek",2,274,0,500,250000,250000,50,271,95],[95,"每周击败1000只变异布偶（{0}/{1}）","Text_DefeatMutatedPuppetsEveryWeek",2,275,0,1000,500000,500000,100,271],[96,"每周击败50名玩家（{0}/{1}）","Text_DefeatPlayersPerWeek",2,281,0,50,25000,25000,5,281,97],[97,"每周击败150名玩家（{0}/{1}）","Text_DefeatPlayersPerWeek",2,282,0,150,75000,75000,15,281,98],[98,"每周击败300名玩家（{0}/{1}）","Text_DefeatPlayersPerWeek",2,283,0,300,150000,150000,30,281,99],[99,"每周击败500名玩家（{0}/{1}）","Text_DefeatPlayersPerWeek",2,284,0,500,250000,250000,50,281,100],[100,"每周击败1000名玩家（{0}/{1}）","Text_DefeatPlayersPerWeek",2,285,0,1000,500000,500000,100,281],[101,"每周等级提升10级（{0}/{1}）","Text_UpgradeByLevelsPerWeek",2,291,0,10,2500,2500,5,291,102],[102,"每周等级提升30级（{0}/{1}）","Text_UpgradeByLevelsPerWeek",2,292,0,30,7500,7500,15,291,103],[103,"每周等级提升60级（{0}/{1}）","Text_UpgradeByLevelsPerWeek",2,293,0,60,15000,15000,30,291,104],[104,"每周等级提升100级（{0}/{1}）","Text_UpgradeByLevelsPerWeek",2,294,0,100,25000,25000,50,291,105],[105,"每周等级提升200级（{0}/{1}）","Text_UpgradeByLevelsPerWeek",2,295,0,200,50000,50000,100,291],[106,"每周捡到10个秘宝（{0}/{1}）","Text_PickUpTreasuresEveryWeek",2,301,0,10,2500,2500,5,301,107],[107,"每周捡到30个秘宝（{0}/{1}）","Text_PickUpTreasuresEveryWeek",2,302,0,30,7500,7500,15,301,108],[108,"每周捡到60个秘宝（{0}/{1}）","Text_PickUpTreasuresEveryWeek",2,303,0,60,15000,15000,30,301,109],[109,"每周捡到100个秘宝（{0}/{1}）","Text_PickUpTreasuresEveryWeek",2,304,0,100,25000,25000,50,301,110],[110,"每周捡到200个秘宝（{0}/{1}）","Text_PickUpTreasuresEveryWeek",2,305,0,200,50000,50000,100,301],[111,"每周观看10次广告（{0}/{1}）","Text_WatchAdsPerWeek",2,311,0,10,2500,2500,50,311,112],[112,"每周观看30次广告（{0}/{1}）","Text_WatchAdsPerWeek",2,312,0,30,7500,7500,150,311,113],[113,"每周观看60次广告（{0}/{1}）","Text_WatchAdsPerWeek",2,313,0,60,15000,15000,300,311,114],[114,"每周观看100次广告（{0}/{1}）","Text_WatchAdsPerWeek",2,314,0,100,25000,25000,500,311,115],[115,"每周观看200次广告（{0}/{1}）","Text_WatchAdsPerWeek",2,315,0,200,50000,50000,1000,311]];
export interface ITaskElement extends IElementBase{
 	/**任务id*/
	id:number
	/**任务名字*/
	Describe:string
	/**任务名字*/
	Name:string
	/**任务类型
1-每日任务
2-每周任务*/
	TaskType:number
	/**任务类型
1-每日登陆游戏
11每日在线时长
21-每日击败美杜莎
31-每日击败蜘蛛精
41-每日击败炫彩蜘蛛
51-每日击败龙兽
61-每日击败丧尸
71-每日击败变异布偶
81-每日击败玩家
91-每日提升级
101-每日捡到秘宝
111-每日看广告次数
201-每周登录天数
211-每周在线时长30分钟次数
221-每日击败美杜莎
231-每日击败蜘蛛精
241-每日击败炫彩蜘蛛
251-每日击败龙兽
261-每日击败丧尸
271-每日击败变异布偶
281-每日击败玩家
291-每日提升级
301-每日捡到秘宝
311-每日看广告次数*/
	TaskItemType:number
	/**下一阶段的任务ID*/
	NextId:number
	/**目标数*/
	TragetNum:number
	/**获得金币*/
	Coin:number
	/**获得玩家经验*/
	Exp:number
	/**获得钻石*/
	Diamond:number
 } 
export class TaskConfig extends ConfigBase<ITaskElement>{
	constructor(){
		super(EXCELDATA);
	}

}