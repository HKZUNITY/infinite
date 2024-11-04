/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 爱玩游戏的小胖子
 * UI: UI/module/FlyModule/SwordItem.ui
 * TIME: 2024.11.04-19.49.52
 */
 
@UIBind('UI/module/FlyModule/SwordItem.ui')
export default class SwordItem_Generate extends UIScript {
		private mNameTextBlock_Internal: mw.TextBlock
	public get mNameTextBlock(): mw.TextBlock {
		if(!this.mNameTextBlock_Internal&&this.uiWidgetBase) {
			this.mNameTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/BgImage/mNameTextBlock') as mw.TextBlock
		}
		return this.mNameTextBlock_Internal
	}
	private mIconImage_Internal: mw.Image
	public get mIconImage(): mw.Image {
		if(!this.mIconImage_Internal&&this.uiWidgetBase) {
			this.mIconImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/BgImage/mIconImage') as mw.Image
		}
		return this.mIconImage_Internal
	}
	private mDiamondCanvas_Internal: mw.Canvas
	public get mDiamondCanvas(): mw.Canvas {
		if(!this.mDiamondCanvas_Internal&&this.uiWidgetBase) {
			this.mDiamondCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/BgImage/mDiamondCanvas') as mw.Canvas
		}
		return this.mDiamondCanvas_Internal
	}
	private mDiamondIconImage_Internal: mw.Image
	public get mDiamondIconImage(): mw.Image {
		if(!this.mDiamondIconImage_Internal&&this.uiWidgetBase) {
			this.mDiamondIconImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/BgImage/mDiamondCanvas/DiamondBgImage/mDiamondIconImage') as mw.Image
		}
		return this.mDiamondIconImage_Internal
	}
	private mDiamondTextBlock_Internal: mw.TextBlock
	public get mDiamondTextBlock(): mw.TextBlock {
		if(!this.mDiamondTextBlock_Internal&&this.uiWidgetBase) {
			this.mDiamondTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/BgImage/mDiamondCanvas/DiamondBgImage/mDiamondTextBlock') as mw.TextBlock
		}
		return this.mDiamondTextBlock_Internal
	}
	private mArkCanvas_Internal: mw.Canvas
	public get mArkCanvas(): mw.Canvas {
		if(!this.mArkCanvas_Internal&&this.uiWidgetBase) {
			this.mArkCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/BgImage/mArkCanvas') as mw.Canvas
		}
		return this.mArkCanvas_Internal
	}
	private mArkIconImage_Internal: mw.Image
	public get mArkIconImage(): mw.Image {
		if(!this.mArkIconImage_Internal&&this.uiWidgetBase) {
			this.mArkIconImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/BgImage/mArkCanvas/mArkIconImage') as mw.Image
		}
		return this.mArkIconImage_Internal
	}
	private mArkTextBlock_Internal: mw.TextBlock
	public get mArkTextBlock(): mw.TextBlock {
		if(!this.mArkTextBlock_Internal&&this.uiWidgetBase) {
			this.mArkTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/BgImage/mArkCanvas/mArkTextBlock') as mw.TextBlock
		}
		return this.mArkTextBlock_Internal
	}
	private mHasCanvas_Internal: mw.Canvas
	public get mHasCanvas(): mw.Canvas {
		if(!this.mHasCanvas_Internal&&this.uiWidgetBase) {
			this.mHasCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/BgImage/mHasCanvas') as mw.Canvas
		}
		return this.mHasCanvas_Internal
	}
	private mMaskImage_Internal: mw.Image
	public get mMaskImage(): mw.Image {
		if(!this.mMaskImage_Internal&&this.uiWidgetBase) {
			this.mMaskImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/BgImage/mHasCanvas/mMaskImage') as mw.Image
		}
		return this.mMaskImage_Internal
	}
	private mMaskBgImage_Internal: mw.Image
	public get mMaskBgImage(): mw.Image {
		if(!this.mMaskBgImage_Internal&&this.uiWidgetBase) {
			this.mMaskBgImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/BgImage/mHasCanvas/mMaskBgImage') as mw.Image
		}
		return this.mMaskBgImage_Internal
	}
	private mHasTextBlock_Internal: mw.TextBlock
	public get mHasTextBlock(): mw.TextBlock {
		if(!this.mHasTextBlock_Internal&&this.uiWidgetBase) {
			this.mHasTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/BgImage/mHasCanvas/mMaskBgImage/mHasTextBlock') as mw.TextBlock
		}
		return this.mHasTextBlock_Internal
	}
	private mClickButton_Internal: mw.Button
	public get mClickButton(): mw.Button {
		if(!this.mClickButton_Internal&&this.uiWidgetBase) {
			this.mClickButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/BgImage/mClickButton') as mw.Button
		}
		return this.mClickButton_Internal
	}
	private mRarityTextBlock_Internal: mw.TextBlock
	public get mRarityTextBlock(): mw.TextBlock {
		if(!this.mRarityTextBlock_Internal&&this.uiWidgetBase) {
			this.mRarityTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/BgImage/mRarityTextBlock') as mw.TextBlock
		}
		return this.mRarityTextBlock_Internal
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
		
		this.mClickButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mClickButton");
		});
		this.mClickButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mNameTextBlock)
		
	
		this.initLanguage(this.mDiamondTextBlock)
		
	
		this.initLanguage(this.mArkTextBlock)
		
	
		this.initLanguage(this.mHasTextBlock)
		
	
		this.initLanguage(this.mRarityTextBlock)
		
	
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
 