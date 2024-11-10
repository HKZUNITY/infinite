/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 爱玩游戏的小胖子
 * UI: UI/module/RingSoulModule/RingSoulItemChild.ui
 * TIME: 2024.11.10-13.05.22
 */
 
@UIBind('UI/module/RingSoulModule/RingSoulItemChild.ui')
export default class RingSoulItemChild_Generate extends UIScript {
		private mCanvas_Internal: mw.Canvas
	public get mCanvas(): mw.Canvas {
		if(!this.mCanvas_Internal&&this.uiWidgetBase) {
			this.mCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas') as mw.Canvas
		}
		return this.mCanvas_Internal
	}
	private mArrowsCanvas_Internal: mw.Canvas
	public get mArrowsCanvas(): mw.Canvas {
		if(!this.mArrowsCanvas_Internal&&this.uiWidgetBase) {
			this.mArrowsCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mArrowsCanvas') as mw.Canvas
		}
		return this.mArrowsCanvas_Internal
	}
	private mArrowsImage_Internal: mw.Image
	public get mArrowsImage(): mw.Image {
		if(!this.mArrowsImage_Internal&&this.uiWidgetBase) {
			this.mArrowsImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mArrowsCanvas/mArrowsImage') as mw.Image
		}
		return this.mArrowsImage_Internal
	}
	private mCostTextBlock_Internal: mw.TextBlock
	public get mCostTextBlock(): mw.TextBlock {
		if(!this.mCostTextBlock_Internal&&this.uiWidgetBase) {
			this.mCostTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mArrowsCanvas/mCostTextBlock') as mw.TextBlock
		}
		return this.mCostTextBlock_Internal
	}
	private mUpTextBlock_Internal: mw.TextBlock
	public get mUpTextBlock(): mw.TextBlock {
		if(!this.mUpTextBlock_Internal&&this.uiWidgetBase) {
			this.mUpTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mArrowsCanvas/mUpTextBlock') as mw.TextBlock
		}
		return this.mUpTextBlock_Internal
	}
	private mIconCanvas_Internal: mw.Canvas
	public get mIconCanvas(): mw.Canvas {
		if(!this.mIconCanvas_Internal&&this.uiWidgetBase) {
			this.mIconCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mIconCanvas') as mw.Canvas
		}
		return this.mIconCanvas_Internal
	}
	private mIconImage_Internal: mw.Image
	public get mIconImage(): mw.Image {
		if(!this.mIconImage_Internal&&this.uiWidgetBase) {
			this.mIconImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mIconCanvas/mIconImage') as mw.Image
		}
		return this.mIconImage_Internal
	}
	private mNameTextBlock_Internal: mw.TextBlock
	public get mNameTextBlock(): mw.TextBlock {
		if(!this.mNameTextBlock_Internal&&this.uiWidgetBase) {
			this.mNameTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mIconCanvas/mNameTextBlock') as mw.TextBlock
		}
		return this.mNameTextBlock_Internal
	}
	private mHasTextBlock_Internal: mw.TextBlock
	public get mHasTextBlock(): mw.TextBlock {
		if(!this.mHasTextBlock_Internal&&this.uiWidgetBase) {
			this.mHasTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mIconCanvas/mHasTextBlock') as mw.TextBlock
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
		
		this.initLanguage(this.mCostTextBlock)
		
	
		this.initLanguage(this.mUpTextBlock)
		
	
		this.initLanguage(this.mNameTextBlock)
		
	
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
 