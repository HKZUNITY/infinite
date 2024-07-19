import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","rightWeaponGuid","leftWeaponGuid","Role","Trigger","StandbyAnimation","EffectId","EffectOffset","EffectRot","EffectScale","Del"],["","","","","","","","","","",""],[23,"118148",null,"0B9B67E3","141155A8","117391","42805",new mw.Vector(0,0,0),new mw.Vector(0,0,90),new mw.Vector(1,1,1),"洛基"],[24,"103061",null,"0361F303","0A373643","117391","145912",new mw.Vector(0,0,10),new mw.Vector(0,0,90),new mw.Vector(1,1,1),"太阳神"],[25,"122956","122956","3CB274AB","1ED4D8AB","117403","42828",new mw.Vector(0,0,0),new mw.Vector(0,0,90),new mw.Vector(1,1,1),"宇智波斑"],[26,"122949",null,"2BCDEFA2","18C0C30C","111095","145907",new mw.Vector(0,0,0),new mw.Vector(0,0,90),new mw.Vector(2,2,2),"纳米机甲女性"],[27,"122952","122952","20861A49","2EB504BE","121951","136966",new mw.Vector(0,0,0),new mw.Vector(0,0,180),new mw.Vector(1,1,1),"死侍"],[28,"122946","122946","1D9A227F","15F97EBF","121951","145913",new mw.Vector(0,0,0),new mw.Vector(0,0,90),new mw.Vector(1.5,1.5,1.5),"火山哨兵"],[29,"103061",null,"1C2BE8C3","24E360D0","111092","42816",new mw.Vector(0,0,0),new mw.Vector(0,0,90),new mw.Vector(1,1,1),"绯红女巫"],[30,null,null,"055D7698","191ADBD2","117391","42804",new mw.Vector(0,0,0),new mw.Vector(0,0,90),new mw.Vector(1,1,1),"钢铁侠"],[31,"118147","118147","0C09B42E","0BCB5B51","125369","42818",new mw.Vector(0,0,0),new mw.Vector(0,0,90),new mw.Vector(1,1,1),"雷神"],[32,null,null,"348ADA73","095A39A5","125369","42804",new mw.Vector(0,0,0),new mw.Vector(0,0,90),new mw.Vector(1,1,1),"蜘蛛侠"],[33,null,null,"242B8A53","1CCE1F42","121608","42804",new mw.Vector(0,0,0),new mw.Vector(0,0,90),new mw.Vector(1,1,1),"金刚狼"],[34,null,null,"1FB6BD6C","21329C84","121610","42805",new mw.Vector(0,0,0),new mw.Vector(0,0,90),new mw.Vector(1,1,1),"女浩克"],[35,null,null,"155CF7C6","1CB84342","121610","42805",new mw.Vector(0,0,0),new mw.Vector(0,0,90),new mw.Vector(1,1,1),"绿巨人"],[36,null,null,"0DC6258B","2207E660","117391","42804",new mw.Vector(0,0,0),new mw.Vector(0,0,90),new mw.Vector(1,1,1),"天神"],[37,null,null,"39D6B1B5","03B7A929","108371","42818",new mw.Vector(0,0,0),new mw.Vector(0,0,90),new mw.Vector(1,1,1),"机甲少女"],[38,null,null,"20CC1A24","370CFBD6","117340","42816",new mw.Vector(0,0,0),new mw.Vector(0,0,90),new mw.Vector(1,1,1),"雏田"],[39,null,null,"16167C89","1A8B6BB6","122541","42804",new mw.Vector(0,0,0),new mw.Vector(0,0,90),new mw.Vector(1,1,1),"路飞"],[40,null,null,"23526A84","160D5877","125369","42818",new mw.Vector(0,0,0),new mw.Vector(0,0,90),new mw.Vector(1,1,1),"佐助"]];
export interface IAdsElement extends IElementBase{
 	/**id*/
	id:number
	/**右手装备*/
	rightWeaponGuid:string
	/**左手装备*/
	leftWeaponGuid:string
	/**角色*/
	Role:string
	/**触发器*/
	Trigger:string
	/**待机动画*/
	StandbyAnimation:string
	/**特效id*/
	EffectId:string
	/**特效偏移*/
	EffectOffset:mw.Vector
	/**特效旋转*/
	EffectRot:mw.Vector
	/**特效缩放*/
	EffectScale:mw.Vector
	/**注释*/
	Del:string
 } 
export class AdsConfig extends ConfigBase<IAdsElement>{
	constructor(){
		super(EXCELDATA);
	}

}