/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 爱玩游戏的小胖子
 * UI: UI/module/ShopModule/CostPanel.ui
 * TIME: 2024.10.24-19.45.28
 */
 
@UIBind('UI/module/ShopModule/CostPanel.ui')
export default class CostPanel_Generate extends UIScript {
		private mCostTextBlock_Internal: mw.TextBlock
	public get mCostTextBlock(): mw.TextBlock {
		if(!this.mCostTextBlock_Internal&&this.uiWidgetBase) {
			this.mCostTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mCostTextBlock') as mw.TextBlock
		}
		return this.mCostTextBlock_Internal
	}
	private mSureButton_Internal: mw.Button
	public get mSureButton(): mw.Button {
		if(!this.mSureButton_Internal&&this.uiWidgetBase) {
			this.mSureButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mSureButton') as mw.Button
		}
		return this.mSureButton_Internal
	}
	private mCancleButton_Internal: mw.Button
	public get mCancleButton(): mw.Button {
		if(!this.mCancleButton_Internal&&this.uiWidgetBase) {
			this.mCancleButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mCancleButton') as mw.Button
		}
		return this.mCancleButton_Internal
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
		
		this.mSureButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mSureButton");
		});
		this.mSureButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mCancleButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mCancleButton");
		});
		this.mCancleButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mCostTextBlock)
		
	
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/mSureButton/TextBlock_1") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/mCancleButton/TextBlock_1") as any);
		
	
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
 