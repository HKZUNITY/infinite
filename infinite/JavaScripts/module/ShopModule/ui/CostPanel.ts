
/** 
 * AUTHOR: 爱玩游戏的小胖子
 * TIME: 2023.07.30-16.55.05
 */

import CostPanel_Generate from "../../../ui-generate/module/ShopModule/CostPanel_generate";
import ShopModuleC from "../ShopModuleC";

export default class CostPanel extends CostPanel_Generate {
	private shopModuleC: ShopModuleC = null;
	/** 
	 * 构造UI文件成功后，在合适的时机最先初始化一次 
	 */
	protected onStart() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerMiddle;
		this.initData();
		this.bindButtons();
	}

	private initData(): void {
		this.shopModuleC = ModuleService.getModule(ShopModuleC);
	}

	private bindButtons(): void {
		this.mSureButton.onClicked.add(() => {
			this.hide();
			this.shopModuleC.sureBuy();
		});
		this.mCancleButton.onClicked.add(() => {
			this.hide();
		});
	}

	public showAndInitData(price: number): void {
		this.mCostTextBlock.text = "确定要花费" + price + "金币\n购买此英雄套装吗？";
		this.show();
	}
}
