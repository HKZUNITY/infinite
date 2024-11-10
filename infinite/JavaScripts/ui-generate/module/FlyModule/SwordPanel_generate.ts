/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 爱玩游戏的小胖子
 * UI: UI/module/FlyModule/SwordPanel.ui
 * TIME: 2024.11.10-13.05.22
 */
 
@UIBind('UI/module/FlyModule/SwordPanel.ui')
export default class SwordPanel_Generate extends UIScript {
		private mTitleTextBlock_Internal: mw.TextBlock
	public get mTitleTextBlock(): mw.TextBlock {
		if(!this.mTitleTextBlock_Internal&&this.uiWidgetBase) {
			this.mTitleTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/TitleBgImage/mTitleTextBlock') as mw.TextBlock
		}
		return this.mTitleTextBlock_Internal
	}
	private mScrollBox_Internal: mw.ScrollBox
	public get mScrollBox(): mw.ScrollBox {
		if(!this.mScrollBox_Internal&&this.uiWidgetBase) {
			this.mScrollBox_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/mScrollBox') as mw.ScrollBox
		}
		return this.mScrollBox_Internal
	}
	private mCanvas_Internal: mw.Canvas
	public get mCanvas(): mw.Canvas {
		if(!this.mCanvas_Internal&&this.uiWidgetBase) {
			this.mCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/mScrollBox/mCanvas') as mw.Canvas
		}
		return this.mCanvas_Internal
	}
	private mMoneyCanvas_Internal: mw.Canvas
	public get mMoneyCanvas(): mw.Canvas {
		if(!this.mMoneyCanvas_Internal&&this.uiWidgetBase) {
			this.mMoneyCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/mMoneyCanvas') as mw.Canvas
		}
		return this.mMoneyCanvas_Internal
	}
	private mIconDiamondImage_Internal: mw.Image
	public get mIconDiamondImage(): mw.Image {
		if(!this.mIconDiamondImage_Internal&&this.uiWidgetBase) {
			this.mIconDiamondImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/mMoneyCanvas/MoneyCanvas/DiamondCanvas/mIconDiamondImage') as mw.Image
		}
		return this.mIconDiamondImage_Internal
	}
	private mDiamondCountTextBlock_Internal: mw.TextBlock
	public get mDiamondCountTextBlock(): mw.TextBlock {
		if(!this.mDiamondCountTextBlock_Internal&&this.uiWidgetBase) {
			this.mDiamondCountTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/mMoneyCanvas/MoneyCanvas/DiamondCanvas/mDiamondCountTextBlock') as mw.TextBlock
		}
		return this.mDiamondCountTextBlock_Internal
	}
	private mIconArkImage_Internal: mw.Image
	public get mIconArkImage(): mw.Image {
		if(!this.mIconArkImage_Internal&&this.uiWidgetBase) {
			this.mIconArkImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/mMoneyCanvas/MoneyCanvas/ArkCanvas/mIconArkImage') as mw.Image
		}
		return this.mIconArkImage_Internal
	}
	private mArkCountTextBlock_Internal: mw.TextBlock
	public get mArkCountTextBlock(): mw.TextBlock {
		if(!this.mArkCountTextBlock_Internal&&this.uiWidgetBase) {
			this.mArkCountTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/mMoneyCanvas/MoneyCanvas/ArkCanvas/mArkCountTextBlock') as mw.TextBlock
		}
		return this.mArkCountTextBlock_Internal
	}
	private mTotalRarityTextBlock_Internal: mw.TextBlock
	public get mTotalRarityTextBlock(): mw.TextBlock {
		if(!this.mTotalRarityTextBlock_Internal&&this.uiWidgetBase) {
			this.mTotalRarityTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/mTotalRarityTextBlock') as mw.TextBlock
		}
		return this.mTotalRarityTextBlock_Internal
	}
	private mCloseButton_Internal: mw.Button
	public get mCloseButton(): mw.Button {
		if(!this.mCloseButton_Internal&&this.uiWidgetBase) {
			this.mCloseButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCloseButton') as mw.Button
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
		
		this.mCloseButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mCloseButton");
		});
		this.mCloseButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mTitleTextBlock)
		
	
		this.initLanguage(this.mDiamondCountTextBlock)
		
	
		this.initLanguage(this.mArkCountTextBlock)
		
	
		this.initLanguage(this.mTotalRarityTextBlock)
		
	
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
 