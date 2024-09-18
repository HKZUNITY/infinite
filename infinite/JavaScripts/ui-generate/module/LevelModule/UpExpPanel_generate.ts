/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 爱玩游戏的小胖子
 * UI: UI/module/LevelModule/UpExpPanel.ui
 * TIME: 2024.09.18-23.47.29
 */
 
@UIBind('UI/module/LevelModule/UpExpPanel.ui')
export default class UpExpPanel_Generate extends UIScript {
		private mCancleUpExpCanvas_Internal: mw.Canvas
	public get mCancleUpExpCanvas(): mw.Canvas {
		if(!this.mCancleUpExpCanvas_Internal&&this.uiWidgetBase) {
			this.mCancleUpExpCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCancleUpExpCanvas') as mw.Canvas
		}
		return this.mCancleUpExpCanvas_Internal
	}
	private mCancleUpExpFlipBook_Internal: mw.FlipBook
	public get mCancleUpExpFlipBook(): mw.FlipBook {
		if(!this.mCancleUpExpFlipBook_Internal&&this.uiWidgetBase) {
			this.mCancleUpExpFlipBook_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCancleUpExpCanvas/CancleUpExpCanvas/mCancleUpExpFlipBook') as mw.FlipBook
		}
		return this.mCancleUpExpFlipBook_Internal
	}
	private mCancleUpExpButton_Internal: mw.Button
	public get mCancleUpExpButton(): mw.Button {
		if(!this.mCancleUpExpButton_Internal&&this.uiWidgetBase) {
			this.mCancleUpExpButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCancleUpExpCanvas/mCancleUpExpButton') as mw.Button
		}
		return this.mCancleUpExpButton_Internal
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
		
		this.mCancleUpExpButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mCancleUpExpButton");
		});
		this.mCancleUpExpButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮多语言
		
		//文本多语言
		
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mCancleUpExpCanvas/CancleUpExpCanvas/TextBlock_1") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mCancleUpExpCanvas/mCancleUpExpButton/TextBlock_2") as any);
		
	
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
 