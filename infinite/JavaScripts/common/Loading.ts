
/** 
 * AUTHOR: 爱玩游戏的小胖子
 * TIME: 2024.08.03-12.18.21
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 */

import { GameConfig } from "../config/GameConfig";
import GlobalData from "../const/GlobalData";
import Loading_Generate from "../ui-generate/common/Loading_generate";

export default class Loading extends Loading_Generate {

	/** 
	 * 构造UI文件成功后，在合适的时机最先初始化一次 
	 */
	protected onStart() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = UILayerMiddle;
		this.initTextBlock();
	}

	private initTextBlock(): void {
		this.mTipsTextBlock.text = GameConfig.Language.Text_LoadingMapResourcesPleaseBePatient.Value;
	}

	private ids: string[] = ["170765", "108502", "74319", "381622"];

	private id: any = null;
	private index: number = 0;
	protected onShow(...params: any[]): void {
		this.index = 0;
		this.mImage.imageGuid = this.ids[this.index++];
		this.id = TimeUtil.setInterval(() => {
			if (this.index >= this.ids.length) this.index = 0;
			this.mImage.imageGuid = this.ids[this.index++];
		}, 1.5);
	}

	protected onHide(): void {
		TimeUtil.clearInterval(this.id);
	}

	public updateBar(value: number): void {
		this.mTextBlock_1.text = `${((value / 100) * 100).toFixed(0)}%`;
		this.mProgressBar.currentValue = value / 100;
	}
}
