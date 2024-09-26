/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 爱玩游戏的小胖子
 * UI: UI/module/ShopModule/NPCHead.ui
 * TIME: 2024.09.26-20.32.32
 */
 
@UIBind('UI/module/ShopModule/NPCHead.ui')
export default class NPCHead_Generate extends UIScript {
		private mFreeCanvas_Internal: mw.Canvas
	public get mFreeCanvas(): mw.Canvas {
		if(!this.mFreeCanvas_Internal&&this.uiWidgetBase) {
			this.mFreeCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mFreeCanvas') as mw.Canvas
		}
		return this.mFreeCanvas_Internal
	}
	private mFreeText_Internal: mw.TextBlock
	public get mFreeText(): mw.TextBlock {
		if(!this.mFreeText_Internal&&this.uiWidgetBase) {
			this.mFreeText_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mFreeCanvas/mFreeText') as mw.TextBlock
		}
		return this.mFreeText_Internal
	}
	private mCoinCanvas_Internal: mw.Canvas
	public get mCoinCanvas(): mw.Canvas {
		if(!this.mCoinCanvas_Internal&&this.uiWidgetBase) {
			this.mCoinCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mCoinCanvas') as mw.Canvas
		}
		return this.mCoinCanvas_Internal
	}
	private mCoinImage_Internal: mw.Image
	public get mCoinImage(): mw.Image {
		if(!this.mCoinImage_Internal&&this.uiWidgetBase) {
			this.mCoinImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mCoinCanvas/mCoinImage') as mw.Image
		}
		return this.mCoinImage_Internal
	}
	private mCoinImage_1_Internal: mw.Image
	public get mCoinImage_1(): mw.Image {
		if(!this.mCoinImage_1_Internal&&this.uiWidgetBase) {
			this.mCoinImage_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mCoinCanvas/mCoinImage_1') as mw.Image
		}
		return this.mCoinImage_1_Internal
	}
	private mCoinText_Internal: mw.TextBlock
	public get mCoinText(): mw.TextBlock {
		if(!this.mCoinText_Internal&&this.uiWidgetBase) {
			this.mCoinText_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mCoinCanvas/mCoinText') as mw.TextBlock
		}
		return this.mCoinText_Internal
	}
	private mAdsCanvas_Internal: mw.Canvas
	public get mAdsCanvas(): mw.Canvas {
		if(!this.mAdsCanvas_Internal&&this.uiWidgetBase) {
			this.mAdsCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mAdsCanvas') as mw.Canvas
		}
		return this.mAdsCanvas_Internal
	}
	private mAdsText_Internal: mw.TextBlock
	public get mAdsText(): mw.TextBlock {
		if(!this.mAdsText_Internal&&this.uiWidgetBase) {
			this.mAdsText_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mAdsCanvas/mAdsText') as mw.TextBlock
		}
		return this.mAdsText_Internal
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
		
		this.initLanguage(this.mFreeText)
		
	
		this.initLanguage(this.mCoinText)
		
	
		this.initLanguage(this.mAdsText)
		
	
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
 