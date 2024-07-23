import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","Name","Type","ColdWeaponId","AssetId","Rarity","Price","HumanoidSlotType","OffsetPos","OffsetRot","OffsetSca","AssetOffsetPos","AssetOffsetRot","AssetOffsetSca","AddHp","AddAtk"],["","","","","","","","","","","","","","","",""],[1,"斗技|皮肤|装备|宠物",0,0,null,0,0,0,null,null,null,null,null,null,0,0],[10001,null,0,0,"374506",0,0,0,null,null,null,null,null,null,0,0],[10002,null,0,0,"374506",0,0,0,null,null,null,null,null,null,0,0],[10003,null,0,0,"374506",0,0,0,null,null,null,null,null,null,0,0],[10004,null,0,0,"357562",0,0,0,null,null,null,null,null,null,0,0],[10005,null,0,0,"362534",0,0,0,null,null,null,null,null,null,0,0],[10006,null,0,0,"357571",0,0,0,null,null,null,null,null,null,0,0],[10007,null,0,0,"350959",0,0,0,null,null,null,null,null,null,0,0],[10008,null,0,0,null,0,0,0,null,null,null,null,null,null,0,0],[10009,null,0,0,"374506",0,0,0,null,null,null,null,null,null,0,0],[10010,null,0,0,"374506",1,0,0,null,null,null,null,null,null,0,0],[10011,null,0,0,null,1,0,0,null,null,null,null,null,null,0,0],[10012,null,0,0,"374506",1,0,0,null,null,null,null,null,null,0,0],[10013,null,0,0,"374506",1,0,0,null,null,null,null,null,null,0,0],[10014,null,0,0,null,1,0,0,null,null,null,null,null,null,0,0],[10015,null,0,0,"374506",1,0,0,null,null,null,null,null,null,0,0],[10016,null,0,0,"374506",1,0,0,null,null,null,null,null,null,0,0],[10017,null,0,0,null,1,0,0,null,null,null,null,null,null,0,0],[10018,null,0,0,null,1,0,0,null,null,null,null,null,null,0,0],[10019,null,0,0,null,1,0,0,null,null,null,null,null,null,0,0],[10020,null,0,0,null,2,0,0,null,null,null,null,null,null,0,0],[10021,null,0,0,null,2,0,0,null,null,null,null,null,null,0,0],[10022,null,0,0,null,2,0,0,null,null,null,null,null,null,0,0],[10023,null,0,0,null,2,0,0,null,null,null,null,null,null,0,0],[10024,null,0,0,null,2,0,0,null,null,null,null,null,null,0,0],[10025,null,0,0,null,2,0,0,null,null,null,null,null,null,0,0],[10026,null,0,0,null,2,0,0,null,null,null,null,null,null,0,0],[10027,null,0,0,null,2,0,0,null,null,null,null,null,null,0,0],[10028,null,0,0,null,2,0,0,null,null,null,null,null,null,0,0],[10029,null,0,0,null,2,0,0,null,null,null,null,null,null,0,0],[10030,null,0,0,null,3,0,0,null,null,null,null,null,null,0,0],[10031,null,0,0,null,3,0,0,null,null,null,null,null,null,0,0],[10032,null,0,0,null,3,0,0,null,null,null,null,null,null,0,0],[10033,null,0,0,null,3,0,0,null,null,null,null,null,null,0,0],[10034,null,0,0,null,3,0,0,null,null,null,null,null,null,0,0],[10035,null,0,0,null,3,0,0,null,null,null,null,null,null,0,0],[10036,null,0,0,null,3,0,0,null,null,null,null,null,null,0,0],[10037,null,0,0,null,3,0,0,null,null,null,null,null,null,0,0],[10038,null,0,0,null,3,0,0,null,null,null,null,null,null,0,0],[10039,null,0,0,null,3,0,0,null,null,null,null,null,null,0,0],[10040,null,0,0,null,3,0,0,null,null,null,null,null,null,0,0]];
export interface IBagInfoElement extends IElementBase{
 	/**undefined*/
	ID:number
	/**undefined*/
	Name:string
	/**undefined*/
	Type:number
	/**undefined*/
	ColdWeaponId:number
	/**undefined*/
	AssetId:string
	/**0-黄阶-213189
1-玄阶-213181
2-地阶-213190
3-天阶-213187*/
	Rarity:number
	/**undefined*/
	Price:number
	/**undefined*/
	HumanoidSlotType:number
	/**undefined*/
	OffsetPos:mw.Vector
	/**undefined*/
	OffsetRot:mw.Vector
	/**undefined*/
	OffsetSca:mw.Vector
	/**undefined*/
	AssetOffsetPos:mw.Vector
	/**undefined*/
	AssetOffsetRot:mw.Vector
	/**undefined*/
	AssetOffsetSca:mw.Vector
	/**undefined*/
	AddHp:number
	/**undefined*/
	AddAtk:number
 } 
export class BagInfoConfig extends ConfigBase<IBagInfoElement>{
	constructor(){
		super(EXCELDATA);
	}

}