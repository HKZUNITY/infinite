import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","Trigger"],["",""],[1,"31C74B45"],[2,"1C8239C4"],[3,"364BACB8"],[4,"2852C170"],[5,"256775C1"],[6,"33906784"],[7,"33906784"],[8,"06EA29D4"],[9,"3632B26C"],[10,"0BDB9B69"],[11,"26DCD312"],[12,"2EF31BDE"],[13,"260DF16D"],[14,"072B90C4"],[15,"3BA34E3A"],[16,"2B517DC3"],[17,"32E70AAC"],[18,"051F01E3"],[19,"103ED656"],[20,"18FE991B"],[21,"3E774F57"],[22,"30660E1E"],[23,"31B520C6"],[24,"34D2C862"],[25,"1E00AB5F"],[26,"296BE274"],[27,"3F75C46D"],[28,"113CB47A"],[29,"120FD6FA"],[30,"30153F08"],[31,"37197334"],[32,"3406A226"],[33,"263A1821"],[34,"3778D193"],[35,"0D712684"],[36,"2DADCA4E"],[37,"2B7FDE80"],[38,"28576BC5"],[39,"31450F51"],[40,"2D1538C8"],[41,"03B0A46A"],[42,"0D225B82"],[43,"292A156C"],[44,"07F8E5AC"],[45,"1144C7F4"],[46,"374443F2"]];
export interface ICoinElement extends IElementBase{
 	/**唯一ID*/
	ID:number
	/**触发器*/
	Trigger:string
 } 
export class CoinConfig extends ConfigBase<ICoinElement>{
	constructor(){
		super(EXCELDATA);
	}

}