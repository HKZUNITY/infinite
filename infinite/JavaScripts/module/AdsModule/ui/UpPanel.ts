import { Notice } from "../../../common/notice/Notice";
import { GameConfig } from "../../../config/GameConfig";
import GlobalData from "../../../const/GlobalData";
import { Utils } from "../../../Tools/utils";
import UpPanel_Generate from "../../../ui-generate/module/AdsModule/UpPanel_generate";
import TaskModuleC from "../../TaskModule/TaskModuleC";

export default class UpPanel extends UpPanel_Generate {
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
			this.mTitleTxt.fontSize = 20;
			this.mContentTxt.fontSize = 30;
			this.mContentTxt_1.fontSize = 30;
		} else {
			this.mTitleTxt.fontSize = 35;
			this.mContentTxt.fontSize = 35;
			this.mContentTxt_1.fontSize = 35;
		}
	}

	private bindButtons(): void {
		this.mYesBtn.onClose.add(this.onClickYesButton.bind(this));
		this.mUpBtn.onClicked.add(this.onClickUpButton.bind(this));
		this.mNoBtn.onClicked.add(this.onClickNoButton.bind(this));
	}

	private onClickYesButton(isSuccess: boolean): void {
		if (!isSuccess) {
			Notice.showDownNotice(StringUtil.format(GameConfig.Language.Text_FailedPleaseTryAgain.Value, this.mYesBtn.text));
			return;
		}
		if (this.yesCallback) {
			this.yesCallback();
			this.getTaskModuleC.ads();
		}
	}

	private isCanUp: boolean = true;
	private onClickUpButton(): void {
		if (!this.isCanUp) {
			Notice.showDownNotice(GameConfig.Language.Text_DontClickTooFastItWillGetStuck.Value);
			return;
		}
		this.isCanUp = false;
		TimeUtil.delaySecond(1).then(() => { this.isCanUp = true; });
		if (this.upCallback) {
			this.upCallback();
		}
	}

	private onClickNoButton(): void {
		this.hideAdPanel();
	}

	private yesCallback: () => void = null;
	private upCallback: () => void = null;
	public showRewardAd(yesCallback: () => void, upCallback: () => void, titleName: string, contentText: string, contentText_1: string, noText: string, yesText: string, upText: string): void {
		this.yesCallback = yesCallback;
		this.upCallback = upCallback;
		this.mTitleTxt.text = titleName;
		this.mContentTxt.text = contentText;
		this.mContentTxt_1.text = contentText_1;
		this.mNoBtn.text = noText;
		this.mYesBtn.text = yesText;
		this.mUpBtn.text = upText;
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
