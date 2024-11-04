/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 爱玩游戏的小胖子
 * UI: UI/module/FlyModule/SwordTipsPanel.ui
 * TIME: 2024.11.04-19.49.52
 */
 
@UIBind('UI/module/FlyModule/SwordTipsPanel.ui')
export default class SwordTipsPanel_Generate extends UIScript {
		private mCloseButton_Internal: mw.Button
	public get mCloseButton(): mw.Button {
		if(!this.mCloseButton_Internal&&this.uiWidgetBase) {
			this.mCloseButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainCanvas/BgImage/mCloseButton') as mw.Button
		}
		return this.mCloseButton_Internal
	}
	private mContentTextBlock_0_Internal: mw.TextBlock
	public get mContentTextBlock_0(): mw.TextBlock {
		if(!this.mContentTextBlock_0_Internal&&this.uiWidgetBase) {
			this.mContentTextBlock_0_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainCanvas/BgImage/mContentTextBlock_0') as mw.TextBlock
		}
		return this.mContentTextBlock_0_Internal
	}
	private mContentTextBlock_1_Internal: mw.TextBlock
	public get mContentTextBlock_1(): mw.TextBlock {
		if(!this.mContentTextBlock_1_Internal&&this.uiWidgetBase) {
			this.mContentTextBlock_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainCanvas/BgImage/mContentTextBlock_1') as mw.TextBlock
		}
		return this.mContentTextBlock_1_Internal
	}
	private mContentTextBlock_2_Internal: mw.TextBlock
	public get mContentTextBlock_2(): mw.TextBlock {
		if(!this.mContentTextBlock_2_Internal&&this.uiWidgetBase) {
			this.mContentTextBlock_2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainCanvas/BgImage/mContentTextBlock_2') as mw.TextBlock
		}
		return this.mContentTextBlock_2_Internal
	}
	private mDiamondButton_Internal: mw.Button
	public get mDiamondButton(): mw.Button {
		if(!this.mDiamondButton_Internal&&this.uiWidgetBase) {
			this.mDiamondButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainCanvas/BgImage/mDiamondButton') as mw.Button
		}
		return this.mDiamondButton_Internal
	}
	private mDiamondTextBlock_Internal: mw.TextBlock
	public get mDiamondTextBlock(): mw.TextBlock {
		if(!this.mDiamondTextBlock_Internal&&this.uiWidgetBase) {
			this.mDiamondTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainCanvas/BgImage/mDiamondButton/mDiamondTextBlock') as mw.TextBlock
		}
		return this.mDiamondTextBlock_Internal
	}
	private mArkButton_Internal: mw.Button
	public get mArkButton(): mw.Button {
		if(!this.mArkButton_Internal&&this.uiWidgetBase) {
			this.mArkButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainCanvas/BgImage/mArkButton') as mw.Button
		}
		return this.mArkButton_Internal
	}
	private mArkTextBlock_Internal: mw.TextBlock
	public get mArkTextBlock(): mw.TextBlock {
		if(!this.mArkTextBlock_Internal&&this.uiWidgetBase) {
			this.mArkTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainCanvas/BgImage/mArkButton/mArkTextBlock') as mw.TextBlock
		}
		return this.mArkTextBlock_Internal
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
		
	
		this.mDiamondButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mDiamondButton");
		});
		this.mDiamondButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mArkButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mArkButton");
		});
		this.mArkButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mContentTextBlock_0)
		
	
		this.initLanguage(this.mContentTextBlock_1)
		
	
		this.initLanguage(this.mContentTextBlock_2)
		
	
		this.initLanguage(this.mDiamondTextBlock)
		
	
		this.initLanguage(this.mArkTextBlock)
		
	
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
 