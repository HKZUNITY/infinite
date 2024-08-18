import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","TriggerGuid","ModelGuid"],["","",""],[1,"02EC2335","14DAF24C"],[2,"1686B162","1FF9CDFC"],[3,"1CD5126B","2D3CA1CB"]];
export interface ITrampolineElement extends IElementBase{
 	/**唯一ID*/
	id:number
	/**触发器Guid*/
	TriggerGuid:string
	/**蹦床模型Guid*/
	ModelGuid:string
 } 
export class TrampolineConfig extends ConfigBase<ITrampolineElement>{
	constructor(){
		super(EXCELDATA);
	}

}