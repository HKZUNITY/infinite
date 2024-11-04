/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 爱玩游戏的小胖子
 * UI: UI/module/RingSoulModule/RingSoulPanel.ui
 * TIME: 2024.11.04-19.49.52
 */
 
@UIBind('UI/module/RingSoulModule/RingSoulPanel.ui')
export default class RingSoulPanel_Generate extends UIScript {
		private mCloseButton_Internal: mw.Button
	public get mCloseButton(): mw.Button {
		if(!this.mCloseButton_Internal&&this.uiWidgetBase) {
			this.mCloseButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCloseButton') as mw.Button
		}
		return this.mCloseButton_Internal
	}
	private mTotalRarityTextBlock_Internal: mw.TextBlock
	public get mTotalRarityTextBlock(): mw.TextBlock {
		if(!this.mTotalRarityTextBlock_Internal&&this.uiWidgetBase) {
			this.mTotalRarityTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mTotalRarityTextBlock') as mw.TextBlock
		}
		return this.mTotalRarityTextBlock_Internal
	}
	private mContentCanvas_Internal: mw.Canvas
	public get mContentCanvas(): mw.Canvas {
		if(!this.mContentCanvas_Internal&&this.uiWidgetBase) {
			this.mContentCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/ScrollBox/mContentCanvas') as mw.Canvas
		}
		return this.mContentCanvas_Internal
	}
	private mMainCanvas_Internal: mw.Canvas
	public get mMainCanvas(): mw.Canvas {
		if(!this.mMainCanvas_Internal&&this.uiWidgetBase) {
			this.mMainCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mMainCanvas') as mw.Canvas
		}
		return this.mMainCanvas_Internal
	}
	private mScrollBox_Internal: mw.ScrollBox
	public get mScrollBox(): mw.ScrollBox {
		if(!this.mScrollBox_Internal&&this.uiWidgetBase) {
			this.mScrollBox_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mMainCanvas/BgImage/mScrollBox') as mw.ScrollBox
		}
		return this.mScrollBox_Internal
	}
	private mCanvas_Internal: mw.Canvas
	public get mCanvas(): mw.Canvas {
		if(!this.mCanvas_Internal&&this.uiWidgetBase) {
			this.mCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mMainCanvas/BgImage/mScrollBox/mCanvas') as mw.Canvas
		}
		return this.mCanvas_Internal
	}
	private mUpButton_Internal: mw.Button
	public get mUpButton(): mw.Button {
		if(!this.mUpButton_Internal&&this.uiWidgetBase) {
			this.mUpButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mMainCanvas/mUpButton') as mw.Button
		}
		return this.mUpButton_Internal
	}
	private mUpTextBlock_Internal: mw.TextBlock
	public get mUpTextBlock(): mw.TextBlock {
		if(!this.mUpTextBlock_Internal&&this.uiWidgetBase) {
			this.mUpTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mMainCanvas/mUpButton/mUpTextBlock') as mw.TextBlock
		}
		return this.mUpTextBlock_Internal
	}
	private mDiamondTextBlock_Internal: mw.TextBlock
	public get mDiamondTextBlock(): mw.TextBlock {
		if(!this.mDiamondTextBlock_Internal&&this.uiWidgetBase) {
			this.mDiamondTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/DiamondCanvas/mDiamondTextBlock') as mw.TextBlock
		}
		return this.mDiamondTextBlock_Internal
	}
	private mAddDiamondButton_Internal: mw.Button
	public get mAddDiamondButton(): mw.Button {
		if(!this.mAddDiamondButton_Internal&&this.uiWidgetBase) {
			this.mAddDiamondButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/DiamondCanvas/mAddDiamondButton') as mw.Button
		}
		return this.mAddDiamondButton_Internal
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
		
	
		this.mUpButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mUpButton");
		});
		this.mUpButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mAddDiamondButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mAddDiamondButton");
		});
		this.mAddDiamondButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mTotalRarityTextBlock)
		
	
		this.initLanguage(this.mUpTextBlock)
		
	
		this.initLanguage(this.mDiamondTextBlock)
		
	
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
 