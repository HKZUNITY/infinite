/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 爱玩游戏的小胖子
 * UI: UI/module/RingSoulModule/RingSoulItem.ui
 * TIME: 2024.09.27-20.55.56
 */
 
@UIBind('UI/module/RingSoulModule/RingSoulItem.ui')
export default class RingSoulItem_Generate extends UIScript {
		private mMainCanvas_Internal: mw.Canvas
	public get mMainCanvas(): mw.Canvas {
		if(!this.mMainCanvas_Internal&&this.uiWidgetBase) {
			this.mMainCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mMainCanvas') as mw.Canvas
		}
		return this.mMainCanvas_Internal
	}
	private mCanvas_Internal: mw.Canvas
	public get mCanvas(): mw.Canvas {
		if(!this.mCanvas_Internal&&this.uiWidgetBase) {
			this.mCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mMainCanvas/BgImage/mCanvas') as mw.Canvas
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


	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		
		//按钮添加点击
		
		this.mUpButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mUpButton");
		});
		this.mUpButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mUpTextBlock)
		
	
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
 