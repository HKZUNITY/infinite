import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","name","effect","minValue","maxValue","defaultValue","changeValue","type"],["","","","","","","",""],[10100,"眼间距","EyesGap",0,1,0.5,0.05,203],[10101,"眼睛上下移动","EyesHeight",0,1,0.5,0.05,203],[10102,"眼睛角度","EyesRotation",0,1,0.5,0.05,203],[10103,"眼睛长度","EyesLength",0,1,0.5,0.05,203],[10104,"眼睛宽度","EyesWidth",0,1,0.5,0.05,203],[10105,"眼角左右移动","CanthusHorizontalPosition",0,1,0.5,0.05,203],[10106,"眼角上下移动","CanthusVerticalPosition",0,1,0.5,0.05,203],[10200,"眉间距","BrowGap",0,1,0.5,0.05,204],[10201,"眉毛上下移动","BrowHeight",0,1,0.5,0.05,204],[10202,"眉毛角度","BrowRotation",0,1,0.5,0.05,204],[10300,"鼻梁高度","NoseHeight",0,1,0.5,0.05,202],[10301,"鼻子长度","NoseProtrusion",0,1,0.5,0.05,202],[10302,"鼻子上下移动","NoseVerticalPosition",0,1,0.5,0.05,202],[10400,"嘴巴上下移动","MouthHeight",0,1,0.5,0.05,205],[10401,"嘴巴宽度","MouthWidth",0,1,0.5,0.05,205],[10402,"嘴巴弧度","MouthShape",0,1,0.5,0.05,205]];
export interface IDressProgressElement extends IElementBase{
 	/**id*/
	id:number
	/**进度条名称*/
	name:string
	/**参数表头名称*/
	effect:string
	/**最小值*/
	minValue:number
	/**最大值*/
	maxValue:number
	/**默认值*/
	defaultValue:number
	/**改变值*/
	changeValue:number
	/**类型（103=眼睛进阶，104=眉毛进阶，102=鼻子进阶，105=嘴巴进阶）*/
	type:number
 } 
export class DressProgressConfig extends ConfigBase<IDressProgressElement>{
	constructor(){
		super(EXCELDATA);
	}

}