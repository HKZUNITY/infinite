import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","talkContent","visible"],["","",""],[1,"你好",0],[2,"今天天气真好",0],[3,"我们出去玩吧",0],[4,"来我家里玩吧",0],[5,"下雨了",0],[6,"快跑",0],[7,"跟上我",1],[8,"不要这样",1],[9,"OK",1],[10,"哈哈哈哈哈哈哈",1]];
export interface IQuickTalkElement extends IElementBase{
 	/**唯一ID*/
	ID:number
	/**快捷对话内容*/
	talkContent:string
	/**1=不显示*/
	visible:number
 } 
export class QuickTalkConfig extends ConfigBase<IQuickTalkElement>{
	constructor(){
		super(EXCELDATA);
	}

}