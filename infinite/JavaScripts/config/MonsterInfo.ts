import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","Des","PathStr","Idles","Moves","Die","Attacks","AttackTimePoints","AttackOffsets","AttackLengths","AttackSizes","Damages","EffectIds","EffectPosOffsets","EffectRotOffsets","EffectScales"],["","","","","","","","","","","","","","","",""],[1,"蛇女","2ED2DEEA",["318618"],["318617"],"318619",["318616"],[0.35],[new mw.Vector(0,50,0)],[300],[new mw.Vector(50,50,100)],[100],["125704"],[new mw.Vector(0,80,50)],[new mw.Vector(0,0,-90)],[new mw.Vector(1,0.8,1)]],[2,"蜘蛛","2ED2DEEA",["336664","336668"],["336669"],"336816",["336673","336670","336672"],[0.35,0.35,0.35],[new mw.Vector(0,50,0),new mw.Vector(0,50,0),new mw.Vector(0,50,0)],[300,300,300],[new mw.Vector(50,50,100),new mw.Vector(50,50,100),new mw.Vector(50,50,100)],[100,100,100],["125704","125704","125704"],[new mw.Vector(0,80,50),new mw.Vector(0,80,50),new mw.Vector(0,80,50)],[new mw.Vector(0,0,-90),new mw.Vector(0,0,-90),new mw.Vector(0,0,-90)],[new mw.Vector(1,0.8,1),new mw.Vector(1,0.8,1),new mw.Vector(1,0.8,1)]],[3,"蜘蛛精","2ED2DEEA",["336664","336668"],["338467"],"338468",["338464","338466"],[0.35,0.35],[new mw.Vector(0,50,0),new mw.Vector(0,50,0)],[300,300],[new mw.Vector(50,50,100),new mw.Vector(50,50,100)],[100,100],["125704","125704"],[new mw.Vector(0,80,50),new mw.Vector(0,80,50)],[new mw.Vector(0,0,-90),new mw.Vector(0,0,-90)],[new mw.Vector(1,0.8,1),new mw.Vector(1,0.8,1)]],[4,"龙","2ED2DEEA",["160627","250400","250399","160627"],["160628"],"-1",["250094","250095"],[0.35,0.35],[new mw.Vector(0,50,0),new mw.Vector(0,50,0)],[300,300],[new mw.Vector(50,50,100),new mw.Vector(50,50,100)],[100,100],["125704","125704"],[new mw.Vector(0,80,50),new mw.Vector(0,80,50)],[new mw.Vector(0,0,-90),new mw.Vector(0,0,-90)],[new mw.Vector(1,0.8,1),new mw.Vector(1,0.8,1)]],[5,"丧尸","2ED2DEEA",["284991","268599"],["285740","269161","285826"],"285139",["285210"],[0.35],[new mw.Vector(0,50,0)],[300],[new mw.Vector(50,50,100)],[100],["125704"],[new mw.Vector(0,80,50)],[new mw.Vector(0,0,-90)],[new mw.Vector(1,0.8,1)]],[6,"角色","2ED2DEEA",["285445"],["285336","285372","280652","280671","280723","284685","280699","280780",""],"281693",["219129","280916","280914"],[0.35,0.35,0.35],[new mw.Vector(0,50,0),new mw.Vector(0,50,0),new mw.Vector(0,50,0)],[300,300,300],[new mw.Vector(50,50,100),new mw.Vector(50,50,100),new mw.Vector(50,50,100)],[100,100,100],["125704","125704","125704"],[new mw.Vector(0,80,50),new mw.Vector(0,80,50),new mw.Vector(0,80,50)],[new mw.Vector(0,0,-90),new mw.Vector(0,0,-90),new mw.Vector(0,0,-90)],[new mw.Vector(1,0.8,1),new mw.Vector(1,0.8,1),new mw.Vector(1,0.8,1)]]];
export interface IMonsterInfoElement extends IElementBase{
 	/**undefined*/
	ID:number
	/**undefined*/
	Des:string
	/**undefined*/
	PathStr:string
	/**undefined*/
	Idles:Array<string>
	/**undefined*/
	Moves:Array<string>
	/**undefined*/
	Die:string
	/**undefined*/
	Attacks:Array<string>
	/**undefined*/
	AttackTimePoints:Array<number>
	/**undefined*/
	AttackOffsets:mw.Vector[]
	/**undefined*/
	AttackLengths:Array<number>
	/**undefined*/
	AttackSizes:mw.Vector[]
	/**undefined*/
	Damages:Array<number>
	/**undefined*/
	EffectIds:Array<string>
	/**undefined*/
	EffectPosOffsets:mw.Vector[]
	/**undefined*/
	EffectRotOffsets:mw.Vector[]
	/**undefined*/
	EffectScales:mw.Vector[]
 } 
export class MonsterInfoConfig extends ConfigBase<IMonsterInfoElement>{
	constructor(){
		super(EXCELDATA);
	}

}