/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 爱玩游戏的小胖子
 * UI: UI/module/LotteryModule/LotteryItem.ui
 * TIME: 2024.11.10-13.05.23
 */
 
@UIBind('UI/module/LotteryModule/LotteryItem.ui')
export default class LotteryItem_Generate extends UIScript {
		private mBgImage_Internal: mw.Image
	public get mBgImage(): mw.Image {
		if(!this.mBgImage_Internal&&this.uiWidgetBase) {
			this.mBgImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBgImage') as mw.Image
		}
		return this.mBgImage_Internal
	}
	private mIconImage_Internal: mw.Image
	public get mIconImage(): mw.Image {
		if(!this.mIconImage_Internal&&this.uiWidgetBase) {
			this.mIconImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBgImage/mIconImage') as mw.Image
		}
		return this.mIconImage_Internal
	}
	private mRatioTextBlock_Internal: mw.TextBlock
	public get mRatioTextBlock(): mw.TextBlock {
		if(!this.mRatioTextBlock_Internal&&this.uiWidgetBase) {
			this.mRatioTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBgImage/mRatioTextBlock') as mw.TextBlock
		}
		return this.mRatioTextBlock_Internal
	}
	private mRewardCanvas_Internal: mw.Canvas
	public get mRewardCanvas(): mw.Canvas {
		if(!this.mRewardCanvas_Internal&&this.uiWidgetBase) {
			this.mRewardCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBgImage/mRewardCanvas') as mw.Canvas
		}
		return this.mRewardCanvas_Internal
	}
	private mRewardTextBlock_Internal: mw.TextBlock
	public get mRewardTextBlock(): mw.TextBlock {
		if(!this.mRewardTextBlock_Internal&&this.uiWidgetBase) {
			this.mRewardTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBgImage/mRewardCanvas/RewardBgImage/mRewardTextBlock') as mw.TextBlock
		}
		return this.mRewardTextBlock_Internal
	}
	private mSelectImage_Internal: mw.Image
	public get mSelectImage(): mw.Image {
		if(!this.mSelectImage_Internal&&this.uiWidgetBase) {
			this.mSelectImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBgImage/mSelectImage') as mw.Image
		}
		return this.mSelectImage_Internal
	}
	private mHasCanvas_Internal: mw.Canvas
	public get mHasCanvas(): mw.Canvas {
		if(!this.mHasCanvas_Internal&&this.uiWidgetBase) {
			this.mHasCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBgImage/mHasCanvas') as mw.Canvas
		}
		return this.mHasCanvas_Internal
	}
	private mMaskImage_Internal: mw.Image
	public get mMaskImage(): mw.Image {
		if(!this.mMaskImage_Internal&&this.uiWidgetBase) {
			this.mMaskImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBgImage/mHasCanvas/mMaskImage') as mw.Image
		}
		return this.mMaskImage_Internal
	}
	private mMaskBgImage_Internal: mw.Image
	public get mMaskBgImage(): mw.Image {
		if(!this.mMaskBgImage_Internal&&this.uiWidgetBase) {
			this.mMaskBgImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBgImage/mHasCanvas/mMaskBgImage') as mw.Image
		}
		return this.mMaskBgImage_Internal
	}
	private mHasTextBlock_Internal: mw.TextBlock
	public get mHasTextBlock(): mw.TextBlock {
		if(!this.mHasTextBlock_Internal&&this.uiWidgetBase) {
			this.mHasTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBgImage/mHasCanvas/mMaskBgImage/mHasTextBlock') as mw.TextBlock
		}
		return this.mHasTextBlock_Internal
	}


	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		
		//按钮添加点击
		
		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mRatioTextBlock)
		
	
		this.initLanguage(this.mRewardTextBlock)
		
	
		this.initLanguage(this.mHasTextBlock)
		
	
		//文本多语言
		
	}
	
	/*初始化多语言*/
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }

	protected onShow(...params: any[]): void {};

	/*显示panel*/
    public show(...param): void {
		mw.UIService.showUI(this, this.layer, ...param);
	}

	/*隐藏panel*/
    public hide(): void {
		mw.UIService.hideUI(this);
	}
 }
 