import { Notice } from "../../../common/notice/Notice";
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

		this.bindButtons();
	}

	private bindButtons(): void {
		this.mYesBtn.onClose.add(this.onClickYesButton.bind(this));
		this.mNoBtn.onClicked.add(this.onClickNoButton.bind(this));
	}

	private onClickYesButton(isSuccess: boolean): void {
		if (!isSuccess) {
			Notice.showDownNotice(`${this.mYesBtn.text}失败，请重试`);
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
	public showRewardAd(callback: () => void, contentText: string, noText: string = "取消", yesText = "领取"): void {
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
