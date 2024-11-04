/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 爱玩游戏的小胖子
 * UI: UI/common/WorldTips/WorldTips_5.ui
 * TIME: 2024.11.04-19.49.51
 */
 
@UIBind('UI/common/WorldTips/WorldTips_5.ui')
export default class WorldTips_5_Generate extends UIScript {
		private mTextBlock_Internal: mw.TextBlock
	public get mTextBlock(): mw.TextBlock {
		if(!this.mTextBlock_Internal&&this.uiWidgetBase) {
			this.mTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mTextBlock') as mw.TextBlock
		}
		return this.mTextBlock_Internal
	}
	private mTextBlock_1_Internal: mw.TextBlock
	public get mTextBlock_1(): mw.TextBlock {
		if(!this.mTextBlock_1_Internal&&this.uiWidgetBase) {
			this.mTextBlock_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mTextBlock_1') as mw.TextBlock
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
 