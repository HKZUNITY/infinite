
/** 
 * AUTHOR: 爱玩游戏的小胖子
 * TIME: 2024.11.10-12.04.18
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 */

import { GameConfig } from "../../../config/GameConfig";
import GlobalData from "../../../const/GlobalData";
import { Utils } from "../../../Tools/utils";
import TitleNamePanel_Generate from "../../../ui-generate/module/HUDModule/TitleNamePanel_generate";
import HUDModuleC from "../HUDModuleC";
import HUDPanel from "./HUDPanel";

export default class TitleNamePanel extends TitleNamePanel_Generate {
	private hudPanel: HUDPanel = null;
	private get getHudPanel(): HUDPanel {
		if (!this.hudPanel) {
			this.hudPanel = mw.UIService.getUI(HUDPanel);
		}
		return this.hudPanel
	}
	/** 
	 * 构造UI文件成功后，在合适的时机最先初始化一次 
	 */
	protected onStart() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = UILayerMiddle;
		this.initUI();
		this.bindButton();
	}

	private initUI(): void {
		this.mTitleTextBlock.text = GameConfig.Language.Text_ModifyTheTitle.Value;
		this.mGetTextBlock.text = GameConfig.Language.Text_ModifyTheTitle.Value;
		this.mInputTipsTextBlock.text = StringUtil.format(GameConfig.Language.Text_TitleNameTips.Value, 170, 1000);
		this.mInputBox.hintString = GameConfig.Language.Text_PleaseEnterTheTitle.Value;
		this.mTipsTextBlock.text = GameConfig.Language.Text_RestartTheGameToTakeEffect.Value;
		if (GlobalData.languageId == 0) {
			this.mInputTipsTextBlock.fontSize = 35;
		}
	}

	private bindButton(): void {
		this.mCloseButton.onClicked.add(() => {
			this.hideTween();
		});
		this.mGetButton.onClicked.add(() => {
			let titleName = this.mInputBox.text;
			if (!titleName || titleName.length == 0) {
				console.warn(`不能为空`);
				return;
			}
			ModuleService.getModule(HUDModuleC).modifyTitleName(titleName);
		});
	}

	protected onShow(...params: any[]): void {
		this.mInputBox.text = "";
		Utils.openUITween(
			this.rootCanvas,
			() => {
				this.getHudPanel.hide();
			},
			null
		);
	}

	public hideTween(): void {
		Utils.closeUITween(
			this.rootCanvas,
			null,
			() => {
				this.hide();
				this.getHudPanel.show();
			});
	}
}
