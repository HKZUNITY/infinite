/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 爱玩游戏的小胖子
 * UI: UI/module/ShopModule/ShopPanel.ui
 * TIME: 2024.10.19-11.22.58
 */
 
@UIBind('UI/module/ShopModule/ShopPanel.ui')
export default class ShopPanel_Generate extends UIScript {
		private mScrollBox_Internal: mw.ScrollBox
	public get mScrollBox(): mw.ScrollBox {
		if(!this.mScrollBox_Internal&&this.uiWidgetBase) {
			this.mScrollBox_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainCanvas/MiddleDoenCanvas/mScrollBox') as mw.ScrollBox
		}
		return this.mScrollBox_Internal
	}
	private mItemCanvas_Internal: mw.Canvas
	public get mItemCanvas(): mw.Canvas {
		if(!this.mItemCanvas_Internal&&this.uiWidgetBase) {
			this.mItemCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainCanvas/MiddleDoenCanvas/mScrollBox/mItemCanvas') as mw.Canvas
		}
		return this.mItemCanvas_Internal
	}
	private mTurnLeftButton_Internal: mw.Button
	public get mTurnLeftButton(): mw.Button {
		if(!this.mTurnLeftButton_Internal&&this.uiWidgetBase) {
			this.mTurnLeftButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainCanvas/MiddleDoenCanvas/TurnLeftCanvas/mTurnLeftButton') as mw.Button
		}
		return this.mTurnLeftButton_Internal
	}
	private mTurnRightButton_Internal: mw.Button
	public get mTurnRightButton(): mw.Button {
		if(!this.mTurnRightButton_Internal&&this.uiWidgetBase) {
			this.mTurnRightButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainCanvas/MiddleDoenCanvas/TurnRightCanvas/mTurnRightButton') as mw.Button
		}
		return this.mTurnRightButton_Internal
	}
	private mCloseButton_Internal: mw.Button
	public get mCloseButton(): mw.Button {
		if(!this.mCloseButton_Internal&&this.uiWidgetBase) {
			this.mCloseButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainCanvas/CloseCanvas/mCloseButton') as mw.Button
		}
		return this.mCloseButton_Internal
	}
	private mSaveCanvas_Internal: mw.Canvas
	public get mSaveCanvas(): mw.Canvas {
		if(!this.mSaveCanvas_Internal&&this.uiWidgetBase) {
			this.mSaveCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainCanvas/mSaveCanvas') as mw.Canvas
		}
		return this.mSaveCanvas_Internal
	}
	private mSaveButton_Internal: mw.Button
	public get mSaveButton(): mw.Button {
		if(!this.mSaveButton_Internal&&this.uiWidgetBase) {
			this.mSaveButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainCanvas/mSaveCanvas/mSaveButton') as mw.Button
		}
		return this.mSaveButton_Internal
	}
	private mSaveTextBlock_Internal: mw.TextBlock
	public get mSaveTextBlock(): mw.TextBlock {
		if(!this.mSaveTextBlock_Internal&&this.uiWidgetBase) {
			this.mSaveTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainCanvas/mSaveCanvas/mSaveTextBlock') as mw.TextBlock
		}
		return this.mSaveTextBlock_Internal
	}
	private mCoinTextBlock_Internal: mw.TextBlock
	public get mCoinTextBlock(): mw.TextBlock {
		if(!this.mCoinTextBlock_Internal&&this.uiWidgetBase) {
			this.mCoinTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainCanvas/CoinCanvas/mCoinTextBlock') as mw.TextBlock
		}
		return this.mCoinTextBlock_Internal
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
		
		this.mTurnLeftButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mTurnLeftButton");
		});
		this.mTurnLeftButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mTurnRightButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mTurnRightButton");
		});
		this.mTurnRightButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mCloseButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mCloseButton");
		});
		this.mCloseButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mSaveButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mSaveButton");
		});
		this.mSaveButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mSaveTextBlock)
		
	
		this.initLanguage(this.mCoinTextBlock)
		
	
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
 