import { Notice } from "../../../common/notice/Notice";
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

		this.bindButtons();
	}

	private bindButtons(): void {
		this.mYesBtn.onClose.add(this.onClickYesButton.bind(this));
		this.mUpBtn.onClicked.add(this.onClickUpButton.bind(this));
		this.mNoBtn.onClicked.add(this.onClickNoButton.bind(this));
	}

	private onClickYesButton(isSuccess: boolean): void {
		if (!isSuccess) {
			Notice.showDownNotice(`${this.mYesBtn.text}失败，请重试`);
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
			Notice.showDownNotice(`别点太快、会卡哦`);
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
	public showRewardAd(yesCallback: () => void, upCallback: () => void, titleName: string, contentText: string, contentText_1: string, noText: string = "取消", yesText: string = "领取", upText: string = "升级"): void {
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
