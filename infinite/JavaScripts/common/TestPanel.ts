
/** 
 * AUTHOR: 爱玩游戏的小胖子
 * TIME: 2023.07.30-11.41.00
 */

import { ColdWeapon } from "../Prefabs/冷兵器/Script/ColdWeapon";
import { GameConfig } from "../config/GameConfig";
import TestPanel_Generate from "../ui-generate/common/TestPanel_generate";

export default class TestPanel extends TestPanel_Generate {

	/** 
	 * 构造UI文件成功后，在合适的时机最先初始化一次 
	 */
	protected onStart() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerMiddle;

		this.mButton.onClicked.add(this.changeIconUrlRequest.bind(this));
	}

	private async changeIconUrlRequest(): Promise<void> {
		// 获取输入框中输入的资源库ID
		const resGuid = this.mInputBox.text;
		// // 请求资源的ICON信息
		// await mw.assetIDChangeIconUrlRequest([resGuid]);
		// // 获得资源Icon信息
		// const res = mw.getAssetIconDataByAssetID(resGuid);
		// 通过资源信息设置 设置图片
		// this.mImage.imageGuid = resGuid;

		// mw.assetIDChangeIconUrlRequest([resGuid]).then(() => {
		// 	// 获得资源Icon信息
		// 	const res = mw.getAssetIconDataByAssetID(resGuid);

		// 	// 通过资源信息设置 设置图片
		// 	this.mImage.imageGuid = (res.assetID);
		// });

		const userInstance = ColdWeapon.getInstance();
		let w = GameConfig.ColdWeapon.getElement(Number(resGuid));
		userInstance.register(w);
	}
}
