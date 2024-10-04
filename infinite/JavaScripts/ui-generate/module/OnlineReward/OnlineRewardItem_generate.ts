/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 爱玩游戏的小胖子
 * UI: UI/module/OnlineReward/OnlineRewardItem.ui
 * TIME: 2024.10.04-17.29.49
 */
 
@UIBind('UI/module/OnlineReward/OnlineRewardItem.ui')
export default class OnlineRewardItem_Generate extends UIScript {
		private mButton_Internal: mw.Button
	public get mButton(): mw.Button {
		if(!this.mButton_Internal&&this.uiWidgetBase) {
			this.mButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mButton') as mw.Button
		}
		return this.mButton_Internal
	}
	private mCoinCanvas_Internal: mw.Canvas
	public get mCoinCanvas(): mw.Canvas {
		if(!this.mCoinCanvas_Internal&&this.uiWidgetBase) {
			this.mCoinCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCoinCanvas') as mw.Canvas
		}
		return this.mCoinCanvas_Internal
	}
	private mCoinTextBlock_Internal: mw.TextBlock
	public get mCoinTextBlock(): mw.TextBlock {
		if(!this.mCoinTextBlock_Internal&&this.uiWidgetBase) {
			this.mCoinTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCoinCanvas/mCoinTextBlock') as mw.TextBlock
		}
		return this.mCoinTextBlock_Internal
	}
	private mExpCanvas_Internal: mw.Canvas
	public get mExpCanvas(): mw.Canvas {
		if(!this.mExpCanvas_Internal&&this.uiWidgetBase) {
			this.mExpCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mExpCanvas') as mw.Canvas
		}
		return this.mExpCanvas_Internal
	}
	private mExpTextBlock_Internal: mw.TextBlock
	public get mExpTextBlock(): mw.TextBlock {
		if(!this.mExpTextBlock_Internal&&this.uiWidgetBase) {
			this.mExpTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mExpCanvas/mExpTextBlock') as mw.TextBlock
		}
		return this.mExpTextBlock_Internal
	}
	private mRoleCanvas_Internal: mw.Canvas
	public get mRoleCanvas(): mw.Canvas {
		if(!this.mRoleCanvas_Internal&&this.uiWidgetBase) {
			this.mRoleCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mRoleCanvas') as mw.Canvas
		}
		return this.mRoleCanvas_Internal
	}
	private mRoleTextBlock_Internal: mw.TextBlock
	public get mRoleTextBlock(): mw.TextBlock {
		if(!this.mRoleTextBlock_Internal&&this.uiWidgetBase) {
			this.mRoleTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mRoleCanvas/mRoleTextBlock') as mw.TextBlock
		}
		return this.mRoleTextBlock_Internal
	}
	private mTimeTextBlock_Internal: mw.TextBlock
	public get mTimeTextBlock(): mw.TextBlock {
		if(!this.mTimeTextBlock_Internal&&this.uiWidgetBase) {
			this.mTimeTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mTimeTextBlock') as mw.TextBlock
		}
		return this.mTimeTextBlock_Internal
	}
	private mGetRewardTextBlock_Internal: mw.TextBlock
	public get mGetRewardTextBlock(): mw.TextBlock {
		if(!this.mGetRewardTextBlock_Internal&&this.uiWidgetBase) {
			this.mGetRewardTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mGetRewardTextBlock') as mw.TextBlock
		}
		return this.mGetRewardTextBlock_Internal
	}
	private mCanRewardTextBlock_Internal: mw.TextBlock
	public get mCanRewardTextBlock(): mw.TextBlock {
		if(!this.mCanRewardTextBlock_Internal&&this.uiWidgetBase) {
			this.mCanRewardTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanRewardTextBlock') as mw.TextBlock
		}
		return this.mCanRewardTextBlock_Internal
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
		
		this.mButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mButton");
		});
		this.mButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mCoinTextBlock)
		
	
		this.initLanguage(this.mExpTextBlock)
		
	
		this.initLanguage(this.mRoleTextBlock)
		
	
		this.initLanguage(this.mTimeTextBlock)
		
	
		this.initLanguage(this.mGetRewardTextBlock)
		
	
		this.initLanguage(this.mCanRewardTextBlock)
		
	
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
 