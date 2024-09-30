/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 爱玩游戏的小胖子
 * UI: UI/module/LotteryModule/LotteryPanel.ui
 * TIME: 2024.09.30-20.30.18
 */
 
@UIBind('UI/module/LotteryModule/LotteryPanel.ui')
export default class LotteryPanel_Generate extends UIScript {
		private mTitleTextBlock_Internal: mw.TextBlock
	public get mTitleTextBlock(): mw.TextBlock {
		if(!this.mTitleTextBlock_Internal&&this.uiWidgetBase) {
			this.mTitleTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/TitleBgImage/mTitleTextBlock') as mw.TextBlock
		}
		return this.mTitleTextBlock_Internal
	}
	private mCanvas_Internal: mw.Canvas
	public get mCanvas(): mw.Canvas {
		if(!this.mCanvas_Internal&&this.uiWidgetBase) {
			this.mCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/mCanvas') as mw.Canvas
		}
		return this.mCanvas_Internal
	}
	private mOneArkCanvas_Internal: mw.Canvas
	public get mOneArkCanvas(): mw.Canvas {
		if(!this.mOneArkCanvas_Internal&&this.uiWidgetBase) {
			this.mOneArkCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/mCanvas/mOneArkCanvas') as mw.Canvas
		}
		return this.mOneArkCanvas_Internal
	}
	private mOneArkButton_Internal: mw.Button
	public get mOneArkButton(): mw.Button {
		if(!this.mOneArkButton_Internal&&this.uiWidgetBase) {
			this.mOneArkButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/mCanvas/mOneArkCanvas/mOneArkButton') as mw.Button
		}
		return this.mOneArkButton_Internal
	}
	private mOneArkTextBlock_Internal: mw.TextBlock
	public get mOneArkTextBlock(): mw.TextBlock {
		if(!this.mOneArkTextBlock_Internal&&this.uiWidgetBase) {
			this.mOneArkTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/mCanvas/mOneArkCanvas/mOneArkTextBlock') as mw.TextBlock
		}
		return this.mOneArkTextBlock_Internal
	}
	private mOneArkTipsTextBlock_Internal: mw.TextBlock
	public get mOneArkTipsTextBlock(): mw.TextBlock {
		if(!this.mOneArkTipsTextBlock_Internal&&this.uiWidgetBase) {
			this.mOneArkTipsTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/mCanvas/mOneArkCanvas/mOneArkTipsTextBlock') as mw.TextBlock
		}
		return this.mOneArkTipsTextBlock_Internal
	}
	private mOneCoinCanvas_Internal: mw.Canvas
	public get mOneCoinCanvas(): mw.Canvas {
		if(!this.mOneCoinCanvas_Internal&&this.uiWidgetBase) {
			this.mOneCoinCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/mCanvas/mOneCoinCanvas') as mw.Canvas
		}
		return this.mOneCoinCanvas_Internal
	}
	private mOneCoinButton_Internal: mw.Button
	public get mOneCoinButton(): mw.Button {
		if(!this.mOneCoinButton_Internal&&this.uiWidgetBase) {
			this.mOneCoinButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/mCanvas/mOneCoinCanvas/mOneCoinButton') as mw.Button
		}
		return this.mOneCoinButton_Internal
	}
	private mOneCoinTextBlock_Internal: mw.TextBlock
	public get mOneCoinTextBlock(): mw.TextBlock {
		if(!this.mOneCoinTextBlock_Internal&&this.uiWidgetBase) {
			this.mOneCoinTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/mCanvas/mOneCoinCanvas/mOneCoinTextBlock') as mw.TextBlock
		}
		return this.mOneCoinTextBlock_Internal
	}
	private mOneCoinTipsTextBlock_Internal: mw.TextBlock
	public get mOneCoinTipsTextBlock(): mw.TextBlock {
		if(!this.mOneCoinTipsTextBlock_Internal&&this.uiWidgetBase) {
			this.mOneCoinTipsTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/mCanvas/mOneCoinCanvas/mOneCoinTipsTextBlock') as mw.TextBlock
		}
		return this.mOneCoinTipsTextBlock_Internal
	}
	private mTenArkCanvas_Internal: mw.Canvas
	public get mTenArkCanvas(): mw.Canvas {
		if(!this.mTenArkCanvas_Internal&&this.uiWidgetBase) {
			this.mTenArkCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/mCanvas/mTenArkCanvas') as mw.Canvas
		}
		return this.mTenArkCanvas_Internal
	}
	private mTenArkButton_Internal: mw.Button
	public get mTenArkButton(): mw.Button {
		if(!this.mTenArkButton_Internal&&this.uiWidgetBase) {
			this.mTenArkButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/mCanvas/mTenArkCanvas/mTenArkButton') as mw.Button
		}
		return this.mTenArkButton_Internal
	}
	private mTenArkTextBlock_Internal: mw.TextBlock
	public get mTenArkTextBlock(): mw.TextBlock {
		if(!this.mTenArkTextBlock_Internal&&this.uiWidgetBase) {
			this.mTenArkTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/mCanvas/mTenArkCanvas/mTenArkTextBlock') as mw.TextBlock
		}
		return this.mTenArkTextBlock_Internal
	}
	private mTenArkTipsTextBlock_Internal: mw.TextBlock
	public get mTenArkTipsTextBlock(): mw.TextBlock {
		if(!this.mTenArkTipsTextBlock_Internal&&this.uiWidgetBase) {
			this.mTenArkTipsTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/mCanvas/mTenArkCanvas/mTenArkTipsTextBlock') as mw.TextBlock
		}
		return this.mTenArkTipsTextBlock_Internal
	}
	private mTenCoinCanvas_Internal: mw.Canvas
	public get mTenCoinCanvas(): mw.Canvas {
		if(!this.mTenCoinCanvas_Internal&&this.uiWidgetBase) {
			this.mTenCoinCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/mCanvas/mTenCoinCanvas') as mw.Canvas
		}
		return this.mTenCoinCanvas_Internal
	}
	private mTenCoinButton_Internal: mw.Button
	public get mTenCoinButton(): mw.Button {
		if(!this.mTenCoinButton_Internal&&this.uiWidgetBase) {
			this.mTenCoinButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/mCanvas/mTenCoinCanvas/mTenCoinButton') as mw.Button
		}
		return this.mTenCoinButton_Internal
	}
	private mTenCoinTextBlock_Internal: mw.TextBlock
	public get mTenCoinTextBlock(): mw.TextBlock {
		if(!this.mTenCoinTextBlock_Internal&&this.uiWidgetBase) {
			this.mTenCoinTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/mCanvas/mTenCoinCanvas/mTenCoinTextBlock') as mw.TextBlock
		}
		return this.mTenCoinTextBlock_Internal
	}
	private mTenCoinTipsTextBlock_Internal: mw.TextBlock
	public get mTenCoinTipsTextBlock(): mw.TextBlock {
		if(!this.mTenCoinTipsTextBlock_Internal&&this.uiWidgetBase) {
			this.mTenCoinTipsTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/mCanvas/mTenCoinCanvas/mTenCoinTipsTextBlock') as mw.TextBlock
		}
		return this.mTenCoinTipsTextBlock_Internal
	}
	private mMoneyCanvas_Internal: mw.Canvas
	public get mMoneyCanvas(): mw.Canvas {
		if(!this.mMoneyCanvas_Internal&&this.uiWidgetBase) {
			this.mMoneyCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/mMoneyCanvas') as mw.Canvas
		}
		return this.mMoneyCanvas_Internal
	}
	private mIconCoinImage_Internal: mw.Image
	public get mIconCoinImage(): mw.Image {
		if(!this.mIconCoinImage_Internal&&this.uiWidgetBase) {
			this.mIconCoinImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/mMoneyCanvas/MoneyCanvas/CoinCanvas/mIconCoinImage') as mw.Image
		}
		return this.mIconCoinImage_Internal
	}
	private mCoinCountTextBlock_Internal: mw.TextBlock
	public get mCoinCountTextBlock(): mw.TextBlock {
		if(!this.mCoinCountTextBlock_Internal&&this.uiWidgetBase) {
			this.mCoinCountTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/mMoneyCanvas/MoneyCanvas/CoinCanvas/mCoinCountTextBlock') as mw.TextBlock
		}
		return this.mCoinCountTextBlock_Internal
	}
	private mIconArkImage_Internal: mw.Image
	public get mIconArkImage(): mw.Image {
		if(!this.mIconArkImage_Internal&&this.uiWidgetBase) {
			this.mIconArkImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/mMoneyCanvas/MoneyCanvas/ArkCanvas/mIconArkImage') as mw.Image
		}
		return this.mIconArkImage_Internal
	}
	private mArkCountTextBlock_Internal: mw.TextBlock
	public get mArkCountTextBlock(): mw.TextBlock {
		if(!this.mArkCountTextBlock_Internal&&this.uiWidgetBase) {
			this.mArkCountTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/mMoneyCanvas/MoneyCanvas/ArkCanvas/mArkCountTextBlock') as mw.TextBlock
		}
		return this.mArkCountTextBlock_Internal
	}
	private mMaskImage_Internal: mw.Image
	public get mMaskImage(): mw.Image {
		if(!this.mMaskImage_Internal&&this.uiWidgetBase) {
			this.mMaskImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mMaskImage') as mw.Image
		}
		return this.mMaskImage_Internal
	}
	private mCloseButton_Internal: mw.Button
	public get mCloseButton(): mw.Button {
		if(!this.mCloseButton_Internal&&this.uiWidgetBase) {
			this.mCloseButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCloseButton') as mw.Button
		}
		return this.mCloseButton_Internal
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
		
		this.mOneArkButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mOneArkButton");
		});
		this.mOneArkButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mOneCoinButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mOneCoinButton");
		});
		this.mOneCoinButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mTenArkButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mTenArkButton");
		});
		this.mTenArkButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mTenCoinButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mTenCoinButton");
		});
		this.mTenCoinButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mCloseButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mCloseButton");
		});
		this.mCloseButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mTitleTextBlock)
		
	
		this.initLanguage(this.mOneArkTextBlock)
		
	
		this.initLanguage(this.mOneArkTipsTextBlock)
		
	
		this.initLanguage(this.mOneCoinTextBlock)
		
	
		this.initLanguage(this.mOneCoinTipsTextBlock)
		
	
		this.initLanguage(this.mTenArkTextBlock)
		
	
		this.initLanguage(this.mTenArkTipsTextBlock)
		
	
		this.initLanguage(this.mTenCoinTextBlock)
		
	
		this.initLanguage(this.mTenCoinTipsTextBlock)
		
	
		this.initLanguage(this.mCoinCountTextBlock)
		
	
		this.initLanguage(this.mArkCountTextBlock)
		
	
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
 