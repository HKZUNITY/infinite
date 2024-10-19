/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 爱玩游戏的小胖子
 * UI: UI/module/BagModule/BagPanel.ui
 * TIME: 2024.10.19-11.22.58
 */
 
@UIBind('UI/module/BagModule/BagPanel.ui')
export default class BagPanel_Generate extends UIScript {
		private mProgressBar_Internal: mw.ProgressBar
	public get mProgressBar(): mw.ProgressBar {
		if(!this.mProgressBar_Internal&&this.uiWidgetBase) {
			this.mProgressBar_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/BgImage/mProgressBar') as mw.ProgressBar
		}
		return this.mProgressBar_Internal
	}
	private mBarTextBlock_Internal: mw.TextBlock
	public get mBarTextBlock(): mw.TextBlock {
		if(!this.mBarTextBlock_Internal&&this.uiWidgetBase) {
			this.mBarTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/BgImage/mProgressBar/mBarTextBlock') as mw.TextBlock
		}
		return this.mBarTextBlock_Internal
	}
	private mTabCanvas_Internal: mw.Canvas
	public get mTabCanvas(): mw.Canvas {
		if(!this.mTabCanvas_Internal&&this.uiWidgetBase) {
			this.mTabCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/BgImage/TitleBgImage/mTabCanvas') as mw.Canvas
		}
		return this.mTabCanvas_Internal
	}
	private mTabContentCanvas_Internal: mw.Canvas
	public get mTabContentCanvas(): mw.Canvas {
		if(!this.mTabContentCanvas_Internal&&this.uiWidgetBase) {
			this.mTabContentCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/BgImage/TitleBgImage/mTabCanvas/mTabContentCanvas') as mw.Canvas
		}
		return this.mTabContentCanvas_Internal
	}
	private mScrollBox_Internal: mw.ScrollBox
	public get mScrollBox(): mw.ScrollBox {
		if(!this.mScrollBox_Internal&&this.uiWidgetBase) {
			this.mScrollBox_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/BgImage/mScrollBox') as mw.ScrollBox
		}
		return this.mScrollBox_Internal
	}
	private mContentCanvas_Internal: mw.Canvas
	public get mContentCanvas(): mw.Canvas {
		if(!this.mContentCanvas_Internal&&this.uiWidgetBase) {
			this.mContentCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/BgImage/mScrollBox/mContentCanvas') as mw.Canvas
		}
		return this.mContentCanvas_Internal
	}
	private mCloseButtons_Internal: mw.Button
	public get mCloseButtons(): mw.Button {
		if(!this.mCloseButtons_Internal&&this.uiWidgetBase) {
			this.mCloseButtons_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/BgImage/mCloseButtons') as mw.Button
		}
		return this.mCloseButtons_Internal
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
		
		this.mCloseButtons.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mCloseButtons");
		});
		this.mCloseButtons.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mBarTextBlock)
		
	
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
 