/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 爱玩游戏的小胖子
 * UI: UI/module/BagModule/BagInfoPanel.ui
 * TIME: 2024.09.30-20.30.17
 */
 
@UIBind('UI/module/BagModule/BagInfoPanel.ui')
export default class BagInfoPanel_Generate extends UIScript {
		private mIconImage_Internal: mw.Image
	public get mIconImage(): mw.Image {
		if(!this.mIconImage_Internal&&this.uiWidgetBase) {
			this.mIconImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/BgImage/mIconImage') as mw.Image
		}
		return this.mIconImage_Internal
	}
	private mTitleTextBlock_Internal: mw.TextBlock
	public get mTitleTextBlock(): mw.TextBlock {
		if(!this.mTitleTextBlock_Internal&&this.uiWidgetBase) {
			this.mTitleTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/BgImage/mTitleTextBlock') as mw.TextBlock
		}
		return this.mTitleTextBlock_Internal
	}
	private mNameTextBlock_Internal: mw.TextBlock
	public get mNameTextBlock(): mw.TextBlock {
		if(!this.mNameTextBlock_Internal&&this.uiWidgetBase) {
			this.mNameTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/BgImage/mNameTextBlock') as mw.TextBlock
		}
		return this.mNameTextBlock_Internal
	}
	private mInfoTextBlock_Internal: mw.TextBlock
	public get mInfoTextBlock(): mw.TextBlock {
		if(!this.mInfoTextBlock_Internal&&this.uiWidgetBase) {
			this.mInfoTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/BgImage/mInfoTextBlock') as mw.TextBlock
		}
		return this.mInfoTextBlock_Internal
	}
	private mUseButton_Internal: mw.Button
	public get mUseButton(): mw.Button {
		if(!this.mUseButton_Internal&&this.uiWidgetBase) {
			this.mUseButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/BgImage/Canvas/mUseButton') as mw.Button
		}
		return this.mUseButton_Internal
	}
	private mUseTextBlock_Internal: mw.TextBlock
	public get mUseTextBlock(): mw.TextBlock {
		if(!this.mUseTextBlock_Internal&&this.uiWidgetBase) {
			this.mUseTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/BgImage/Canvas/mUseButton/mUseTextBlock') as mw.TextBlock
		}
		return this.mUseTextBlock_Internal
	}
	private mPriceButton_Internal: mw.Button
	public get mPriceButton(): mw.Button {
		if(!this.mPriceButton_Internal&&this.uiWidgetBase) {
			this.mPriceButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/BgImage/Canvas/mPriceButton') as mw.Button
		}
		return this.mPriceButton_Internal
	}
	private mPreceTextBlock_Internal: mw.TextBlock
	public get mPreceTextBlock(): mw.TextBlock {
		if(!this.mPreceTextBlock_Internal&&this.uiWidgetBase) {
			this.mPreceTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/BgImage/Canvas/mPriceButton/mPreceTextBlock') as mw.TextBlock
		}
		return this.mPreceTextBlock_Internal
	}
	private mAdsButton_Internal: mw.AdsButton
	public get mAdsButton(): mw.AdsButton {
		if(!this.mAdsButton_Internal&&this.uiWidgetBase) {
			this.mAdsButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/BgImage/Canvas/mAdsButton') as mw.AdsButton
		}
		return this.mAdsButton_Internal
	}
	private mCloseButton_Internal: mw.Button
	public get mCloseButton(): mw.Button {
		if(!this.mCloseButton_Internal&&this.uiWidgetBase) {
			this.mCloseButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/BgImage/mCloseButton') as mw.Button
		}
		return this.mCloseButton_Internal
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
		
		this.mUseButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mUseButton");
		});
		this.mUseButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mPriceButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mPriceButton");
		});
		this.mPriceButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mCloseButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mCloseButton");
		});
		this.mCloseButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mTitleTextBlock)
		
	
		this.initLanguage(this.mNameTextBlock)
		
	
		this.initLanguage(this.mInfoTextBlock)
		
	
		this.initLanguage(this.mUseTextBlock)
		
	
		this.initLanguage(this.mPreceTextBlock)
		
	
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
 