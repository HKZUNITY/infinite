/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 爱玩游戏的小胖子
 * UI: UI/module/LevelModule/LevelItem.ui
 * TIME: 2024.09.28-02.16.45
 */
 
@UIBind('UI/module/LevelModule/LevelItem.ui')
export default class LevelItem_Generate extends UIScript {
		private mLevelTextBlock_Internal: mw.TextBlock
	public get mLevelTextBlock(): mw.TextBlock {
		if(!this.mLevelTextBlock_Internal&&this.uiWidgetBase) {
			this.mLevelTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mLevelTextBlock') as mw.TextBlock
		}
		return this.mLevelTextBlock_Internal
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
		
		this.initLanguage(this.mLevelTextBlock)
		
	
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
 