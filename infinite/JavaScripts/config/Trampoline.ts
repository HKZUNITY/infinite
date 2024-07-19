import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","TriggerGuid","ModelGuid"],["","",""],[1,"346518AF","117BDA33"],[2,"1FE69987","322A379A"]];
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