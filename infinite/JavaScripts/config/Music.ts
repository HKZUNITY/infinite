import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","Guid","Annotation","Desc"],["","","Language",""],[1,"268224","Text_Music_1","开放世界"],[2,"118698","Text_Music_2","STAY"],[3,"118699","Text_Music_3","bad guy"],[4,"117222","Text_Music_4","我会活下去"],[5,"118697","Text_Music_5","Let Me Love You"],[6,"118700","Text_Music_6","Running up That Hill"],[7,"118701","Text_Music_7","Love To Hate Me"],[8,"118702","Text_Music_8","TOMBOY"],[9,"118703","Text_Music_9","Shut Down"],[10,"118704","Text_Music_10","Celestial"],[11,"118712","Text_Music_11","As It Was"],[12,"118706","Text_Music_12","Good Morning"],[13,"118707","Text_Music_13","Alone"],[14,"118709","Text_Music_14","Chanderiler"],[15,"118711","Text_Music_15","Don't Wanna Know"],[16,"118716","Text_Music_16","Mood"],[17,"117220","Text_Music_17","金轮"],[18,"128884","Text_Music_18","不知道叫啥"],[19,"128888","Text_Music_19","也不知道叫啥"]];
export interface IMusicElement extends IElementBase{
 	/**唯一ID*/
	id:number
	/**GUID*/
	Guid:string
	/**注释*/
	Annotation:string
	/**注释*/
	Desc:string
 } 
export class MusicConfig extends ConfigBase<IMusicElement>{
	constructor(){
		super(EXCELDATA);
	}

}