/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 爱玩游戏的小胖子
 * UI: UI/module/GuideModule/GuideUI.ui
 * TIME: 2024.09.18-23.47.29
 */
 
@UIBind('UI/module/GuideModule/GuideUI.ui')
export default class GuideUI_Generate extends UIScript {
		private image1_Internal: mw.Image
	public get image1(): mw.Image {
		if(!this.image1_Internal&&this.uiWidgetBase) {
			this.image1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/image1') as mw.Image
		}
		return this.image1_Internal
	}
	private image2_Internal: mw.Image
	public get image2(): mw.Image {
		if(!this.image2_Internal&&this.uiWidgetBase) {
			this.image2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/image2') as mw.Image
		}
		return this.image2_Internal
	}
	private image3_Internal: mw.Image
	public get image3(): mw.Image {
		if(!this.image3_Internal&&this.uiWidgetBase) {
			this.image3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/image3') as mw.Image
		}
		return this.image3_Internal
	}
	private image4_Internal: mw.Image
	public get image4(): mw.Image {
		if(!this.image4_Internal&&this.uiWidgetBase) {
			this.image4_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/image4') as mw.Image
		}
		return this.image4_Internal
	}
	private container_Internal: mw.Canvas
	public get container(): mw.Canvas {
		if(!this.container_Internal&&this.uiWidgetBase) {
			this.container_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/container') as mw.Canvas
		}
		return this.container_Internal
	}
	private image_Internal: mw.Image
	public get image(): mw.Image {
		if(!this.image_Internal&&this.uiWidgetBase) {
			this.image_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/container/image') as mw.Image
		}
		return this.image_Internal
	}
	private text_Internal: mw.TextBlock
	public get text(): mw.TextBlock {
		if(!this.text_Internal&&this.uiWidgetBase) {
			this.text_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/container/text') as mw.TextBlock
		}
		return this.text_Internal
	}
	private guide_Internal: mw.Image
	public get guide(): mw.Image {
		if(!this.guide_Internal&&this.uiWidgetBase) {
			this.guide_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/guide') as mw.Image
		}
		return this.guide_Internal
	}
	private button_Internal: mw.StaleButton
	public get button(): mw.StaleButton {
		if(!this.button_Internal&&this.uiWidgetBase) {
			this.button_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/button') as mw.StaleButton
		}
		return this.button_Internal
	}
	private bg_Internal: mw.Image
	public get bg(): mw.Image {
		if(!this.bg_Internal&&this.uiWidgetBase) {
			this.bg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/bg') as mw.Image
		}
		return this.bg_Internal
	}


	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		
		this.button.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "button");
		});
		this.initLanguage(this.button);
		this.button.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮添加点击
		
		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.text)
		
	
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/container/TextBlock") as any);
		
	
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
 