import { Notice } from "../../../common/notice/Notice";
import { Utils } from "../../../Tools/utils";
import AdsTipsPanel_Generate from "../../../ui-generate/module/AdsModule/AdsTipsPanel_generate";

export default class AdTipsPanel extends AdsTipsPanel_Generate {
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
		if (this.callback) this.callback();
	}

	private onClickNoButton(): void {
		this.hideAdPanel();
	}

	private callback: () => void = null;
	public showRewardAd(callback: () => void, contentText: string, noText: string = "取消", yesText = "领取", isAuto: boolean = true): void {
		this.callback = callback;
		this.mContentTxt.text = contentText;
		this.mNoBtn.text = noText;
		this.mYesBtn.text = yesText;
		this.showAdPanel();
	}

	public showAdPanel(): void {
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
