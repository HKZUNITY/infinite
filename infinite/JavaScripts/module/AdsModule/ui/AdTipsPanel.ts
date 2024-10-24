import { Notice } from "../../../common/notice/Notice";
import { GameConfig } from "../../../config/GameConfig";
import GlobalData from "../../../const/GlobalData";
import { Utils } from "../../../Tools/utils";
import AdsTipsPanel_Generate from "../../../ui-generate/module/AdsModule/AdsTipsPanel_generate";
import TaskModuleC from "../../TaskModule/TaskModuleC";

export default class AdTipsPanel extends AdsTipsPanel_Generate {
	private taskModuleC: TaskModuleC = null;
	private get getTaskModuleC(): TaskModuleC {
		if (!this.taskModuleC) {
			this.taskModuleC = ModuleService.getModule(TaskModuleC);
		}
		return this.taskModuleC;
	}

	protected onStart(): void {
		this.canUpdate = false;
		this.layer = mw.UILayerDialog;
		this.initTextBlock();
		this.bindButtons();
	}

	private initTextBlock(): void {
		this.mTitleTxt.text = GameConfig.Language.Text_AdvertisingRewards.Value;
		if (GlobalData.languageId == 0) {
			this.mTitleTxt.fontSize = 15;
			this.mContentTxt.fontSize = 30;
		} else {
			this.mTitleTxt.fontSize = 35;
			this.mContentTxt.fontSize = 35;
		}
	}

	private bindButtons(): void {
		this.mYesBtn.onClose.add(this.onClickYesButton.bind(this));
		this.mNoBtn.onClicked.add(this.onClickNoButton.bind(this));
	}

	private onClickYesButton(isSuccess: boolean): void {
		if (!isSuccess) {
			Notice.showDownNotice(StringUtil.format(GameConfig.Language.Text_FailedPleaseTryAgain.Value, this.mYesBtn.text));
			return;
		}
		this.hideAdPanel();
		if (this.callback) {
			this.callback();
			this.getTaskModuleC.ads();
		}
	}

	private onClickNoButton(): void {
		this.hideAdPanel();
	}

	private callback: () => void = null;
	public showRewardAd(callback: () => void, contentText: string, noText: string, yesText: string): void {
		this.callback = callback;
		this.mContentTxt.text = contentText;
		this.mNoBtn.text = noText;
		this.mYesBtn.text = yesText;
		this.showAdPanel();
	}

	private showAdPanel(): void {
		if (this.visible) return;
		this.show();
	}

	public hideAdPanel(): void {
		if (!this.visible) return;
		Utils.closeUITween(
			this.rootCanvas,
			null,
			() => {
				this.hide();
			}
		);
	}

	protected onShow(...params: any[]): void {
		Utils.openUITween(
			this.rootCanvas,
			null,
			null
		);
	}
}
