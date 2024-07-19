import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","emojiGuid","effectGuid"],["","",""],[1,"112164","151051"],[2,"112165","151047"],[3,"112166","151052"],[4,"112167","151054"],[5,"112168","151055"],[6,"112169","151049"],[7,"112170","151056"],[8,"112171","151050"],[9,"112172","151048"],[10,"112173","151058"],[11,"112174","151059"],[12,"112175","151057"]];
export interface IQuickEmojiElement extends IElementBase{
 	/**唯一ID*/
	ID:number
	/**表情iconGuid*/
	emojiGuid:string
	/**表情特效Guid*/
	effectGuid:string
 } 
export class QuickEmojiConfig extends ConfigBase<IQuickEmojiElement>{
	constructor(){
		super(EXCELDATA);
	}

}