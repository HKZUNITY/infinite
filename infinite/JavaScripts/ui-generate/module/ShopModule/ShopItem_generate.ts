/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 爱玩游戏的小胖子
 * UI: UI/module/ShopModule/ShopItem.ui
 * TIME: 2024.09.18-23.47.29
 */
 
@UIBind('UI/module/ShopModule/ShopItem.ui')
export default class ShopItem_Generate extends UIScript {
		private mCanvas_Internal: mw.Canvas
	public get mCanvas(): mw.Canvas {
		if(!this.mCanvas_Internal&&this.uiWidgetBase) {
			this.mCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas') as mw.Canvas
		}
		return this.mCanvas_Internal
	}
	private mSelectImage_Internal: mw.Image
	public get mSelectImage(): mw.Image {
		if(!this.mSelectImage_Internal&&this.uiWidgetBase) {
			this.mSelectImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mSelectImage') as mw.Image
		}
		return this.mSelectImage_Internal
	}
	private mIconImage_Internal: mw.Image
	public get mIconImage(): mw.Image {
		if(!this.mIconImage_Internal&&this.uiWidgetBase) {
			this.mIconImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mIconImage') as mw.Image
		}
		return this.mIconImage_Internal
	}
	private mClickButton_Internal: mw.Button
	public get mClickButton(): mw.Button {
		if(!this.mClickButton_Internal&&this.uiWidgetBase) {
			this.mClickButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mClickButton') as mw.Button
		}
		return this.mClickButton_Internal
	}
	private mTextBlock_Internal: mw.TextBlock
	public get mTextBlock(): mw.TextBlock {
		if(!this.mTextBlock_Internal&&this.uiWidgetBase) {
			this.mTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mTextBlock') as mw.TextBlock
		}
		return this.mTextBlock_Internal
	}
	private mTextBlock_1_Internal: mw.TextBlock
	public get mTextBlock_1(): mw.TextBlock {
		if(!this.mTextBlock_1_Internal&&this.uiWidgetBase) {
			this.mTextBlock_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/mTextBlock_1') as mw.TextBlock
		}
		return this.mTextBlock_1_Internal
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
		
		this.initLanguage(this.mTextBlock)
		
	
		this.initLanguage(this.mTextBlock_1)
		
	
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
 