/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 爱玩游戏的小胖子
 * UI: UI/module/WorldRank/WorldRankPanel.ui
 * TIME: 2025.03.15-11.43.48
 */
 
@UIBind('UI/module/WorldRank/WorldRankPanel.ui')
export default class WorldRankPanel_Generate extends UIScript {
		private mTitleTextBlock_Internal: mw.TextBlock
	public get mTitleTextBlock(): mw.TextBlock {
		if(!this.mTitleTextBlock_Internal&&this.uiWidgetBase) {
			this.mTitleTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/RankCanvas/mTitleTextBlock') as mw.TextBlock
		}
		return this.mTitleTextBlock_Internal
	}
	private mRoomCanvas_Internal: mw.Canvas
	public get mRoomCanvas(): mw.Canvas {
		if(!this.mRoomCanvas_Internal&&this.uiWidgetBase) {
			this.mRoomCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/RankCanvas/mRoomCanvas') as mw.Canvas
		}
		return this.mRoomCanvas_Internal
	}
	private mRoomRankTextBlock_Internal: mw.TextBlock
	public get mRoomRankTextBlock(): mw.TextBlock {
		if(!this.mRoomRankTextBlock_Internal&&this.uiWidgetBase) {
			this.mRoomRankTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/RankCanvas/mRoomCanvas/RoomCanvas/mRoomRankTextBlock') as mw.TextBlock
		}
		return this.mRoomRankTextBlock_Internal
	}
	private mRoomNameTextBlock_Internal: mw.TextBlock
	public get mRoomNameTextBlock(): mw.TextBlock {
		if(!this.mRoomNameTextBlock_Internal&&this.uiWidgetBase) {
			this.mRoomNameTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/RankCanvas/mRoomCanvas/RoomCanvas/mRoomNameTextBlock') as mw.TextBlock
		}
		return this.mRoomNameTextBlock_Internal
	}
	private mRoomLvTextBlock_Internal: mw.TextBlock
	public get mRoomLvTextBlock(): mw.TextBlock {
		if(!this.mRoomLvTextBlock_Internal&&this.uiWidgetBase) {
			this.mRoomLvTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/RankCanvas/mRoomCanvas/RoomCanvas/mRoomLvTextBlock') as mw.TextBlock
		}
		return this.mRoomLvTextBlock_Internal
	}
	private mRoomHeightTextBlock_Internal: mw.TextBlock
	public get mRoomHeightTextBlock(): mw.TextBlock {
		if(!this.mRoomHeightTextBlock_Internal&&this.uiWidgetBase) {
			this.mRoomHeightTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/RankCanvas/mRoomCanvas/RoomCanvas/mRoomHeightTextBlock') as mw.TextBlock
		}
		return this.mRoomHeightTextBlock_Internal
	}
	private mRoomKillTextBlock_Internal: mw.TextBlock
	public get mRoomKillTextBlock(): mw.TextBlock {
		if(!this.mRoomKillTextBlock_Internal&&this.uiWidgetBase) {
			this.mRoomKillTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/RankCanvas/mRoomCanvas/RoomCanvas/mRoomKillTextBlock') as mw.TextBlock
		}
		return this.mRoomKillTextBlock_Internal
	}
	private mScrollBox_Room_Internal: mw.ScrollBox
	public get mScrollBox_Room(): mw.ScrollBox {
		if(!this.mScrollBox_Room_Internal&&this.uiWidgetBase) {
			this.mScrollBox_Room_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/RankCanvas/mRoomCanvas/mScrollBox_Room') as mw.ScrollBox
		}
		return this.mScrollBox_Room_Internal
	}
	private mRoomContent_Internal: mw.Canvas
	public get mRoomContent(): mw.Canvas {
		if(!this.mRoomContent_Internal&&this.uiWidgetBase) {
			this.mRoomContent_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/RankCanvas/mRoomCanvas/mScrollBox_Room/mRoomContent') as mw.Canvas
		}
		return this.mRoomContent_Internal
	}
	private mRankLvButton_Internal: mw.Button
	public get mRankLvButton(): mw.Button {
		if(!this.mRankLvButton_Internal&&this.uiWidgetBase) {
			this.mRankLvButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/RankCanvas/mRoomCanvas/RoomRankTypeCanvas/mRankLvButton') as mw.Button
		}
		return this.mRankLvButton_Internal
	}
	private mRankLvTextBlock_Internal: mw.TextBlock
	public get mRankLvTextBlock(): mw.TextBlock {
		if(!this.mRankLvTextBlock_Internal&&this.uiWidgetBase) {
			this.mRankLvTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/RankCanvas/mRoomCanvas/RoomRankTypeCanvas/mRankLvButton/mRankLvTextBlock') as mw.TextBlock
		}
		return this.mRankLvTextBlock_Internal
	}
	private mRankHeightButton_Internal: mw.Button
	public get mRankHeightButton(): mw.Button {
		if(!this.mRankHeightButton_Internal&&this.uiWidgetBase) {
			this.mRankHeightButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/RankCanvas/mRoomCanvas/RoomRankTypeCanvas/mRankHeightButton') as mw.Button
		}
		return this.mRankHeightButton_Internal
	}
	private mRankHeightTextBlock_Internal: mw.TextBlock
	public get mRankHeightTextBlock(): mw.TextBlock {
		if(!this.mRankHeightTextBlock_Internal&&this.uiWidgetBase) {
			this.mRankHeightTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/RankCanvas/mRoomCanvas/RoomRankTypeCanvas/mRankHeightButton/mRankHeightTextBlock') as mw.TextBlock
		}
		return this.mRankHeightTextBlock_Internal
	}
	private mRankKillButton_Internal: mw.Button
	public get mRankKillButton(): mw.Button {
		if(!this.mRankKillButton_Internal&&this.uiWidgetBase) {
			this.mRankKillButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/RankCanvas/mRoomCanvas/RoomRankTypeCanvas/mRankKillButton') as mw.Button
		}
		return this.mRankKillButton_Internal
	}
	private mRankKillTextBlock_Internal: mw.TextBlock
	public get mRankKillTextBlock(): mw.TextBlock {
		if(!this.mRankKillTextBlock_Internal&&this.uiWidgetBase) {
			this.mRankKillTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/RankCanvas/mRoomCanvas/RoomRankTypeCanvas/mRankKillButton/mRankKillTextBlock') as mw.TextBlock
		}
		return this.mRankKillTextBlock_Internal
	}
	private mWorldCanvas_Internal: mw.Canvas
	public get mWorldCanvas(): mw.Canvas {
		if(!this.mWorldCanvas_Internal&&this.uiWidgetBase) {
			this.mWorldCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/RankCanvas/mWorldCanvas') as mw.Canvas
		}
		return this.mWorldCanvas_Internal
	}
	private mWorldRankTextBlock_Internal: mw.TextBlock
	public get mWorldRankTextBlock(): mw.TextBlock {
		if(!this.mWorldRankTextBlock_Internal&&this.uiWidgetBase) {
			this.mWorldRankTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/RankCanvas/mWorldCanvas/WorldCanvas/mWorldRankTextBlock') as mw.TextBlock
		}
		return this.mWorldRankTextBlock_Internal
	}
	private mWorldNameTextBlock_Internal: mw.TextBlock
	public get mWorldNameTextBlock(): mw.TextBlock {
		if(!this.mWorldNameTextBlock_Internal&&this.uiWidgetBase) {
			this.mWorldNameTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/RankCanvas/mWorldCanvas/WorldCanvas/mWorldNameTextBlock') as mw.TextBlock
		}
		return this.mWorldNameTextBlock_Internal
	}
	private mWorldLvTextBlock_Internal: mw.TextBlock
	public get mWorldLvTextBlock(): mw.TextBlock {
		if(!this.mWorldLvTextBlock_Internal&&this.uiWidgetBase) {
			this.mWorldLvTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/RankCanvas/mWorldCanvas/WorldCanvas/mWorldLvTextBlock') as mw.TextBlock
		}
		return this.mWorldLvTextBlock_Internal
	}
	private mScrollBox_World_Internal: mw.ScrollBox
	public get mScrollBox_World(): mw.ScrollBox {
		if(!this.mScrollBox_World_Internal&&this.uiWidgetBase) {
			this.mScrollBox_World_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/RankCanvas/mWorldCanvas/mScrollBox_World') as mw.ScrollBox
		}
		return this.mScrollBox_World_Internal
	}
	private mWorldContent_Internal: mw.Canvas
	public get mWorldContent(): mw.Canvas {
		if(!this.mWorldContent_Internal&&this.uiWidgetBase) {
			this.mWorldContent_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/RankCanvas/mWorldCanvas/mScrollBox_World/mWorldContent') as mw.Canvas
		}
		return this.mWorldContent_Internal
	}
	private mRankDesTextBlock_Internal: mw.TextBlock
	public get mRankDesTextBlock(): mw.TextBlock {
		if(!this.mRankDesTextBlock_Internal&&this.uiWidgetBase) {
			this.mRankDesTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/RankCanvas/RankTypeCanvas/mRankDesTextBlock') as mw.TextBlock
		}
		return this.mRankDesTextBlock_Internal
	}
	private mRoomRankButton_Internal: mw.Button
	public get mRoomRankButton(): mw.Button {
		if(!this.mRoomRankButton_Internal&&this.uiWidgetBase) {
			this.mRoomRankButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/RankCanvas/RankTypeCanvas/mRoomRankButton') as mw.Button
		}
		return this.mRoomRankButton_Internal
	}
	private mRoomTextBlock_Internal: mw.TextBlock
	public get mRoomTextBlock(): mw.TextBlock {
		if(!this.mRoomTextBlock_Internal&&this.uiWidgetBase) {
			this.mRoomTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/RankCanvas/RankTypeCanvas/mRoomRankButton/mRoomTextBlock') as mw.TextBlock
		}
		return this.mRoomTextBlock_Internal
	}
	private mWorldRankButton_Internal: mw.Button
	public get mWorldRankButton(): mw.Button {
		if(!this.mWorldRankButton_Internal&&this.uiWidgetBase) {
			this.mWorldRankButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/RankCanvas/RankTypeCanvas/mWorldRankButton') as mw.Button
		}
		return this.mWorldRankButton_Internal
	}
	private mWorldTextBlock_Internal: mw.TextBlock
	public get mWorldTextBlock(): mw.TextBlock {
		if(!this.mWorldTextBlock_Internal&&this.uiWidgetBase) {
			this.mWorldTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/RankCanvas/RankTypeCanvas/mWorldRankButton/mWorldTextBlock') as mw.TextBlock
		}
		return this.mWorldTextBlock_Internal
	}
	private mCloseButton_Internal: mw.Button
	public get mCloseButton(): mw.Button {
		if(!this.mCloseButton_Internal&&this.uiWidgetBase) {
			this.mCloseButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/RankCanvas/mCloseButton') as mw.Button
		}
		return this.mCloseButton_Internal
	}
	private mRecycleCanvas_Internal: mw.Canvas
	public get mRecycleCanvas(): mw.Canvas {
		if(!this.mRecycleCanvas_Internal&&this.uiWidgetBase) {
			this.mRecycleCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mRecycleCanvas') as mw.Canvas
		}
		return this.mRecycleCanvas_Internal
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
		
		this.mRankLvButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mRankLvButton");
		});
		this.mRankLvButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mRankHeightButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mRankHeightButton");
		});
		this.mRankHeightButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mRankKillButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mRankKillButton");
		});
		this.mRankKillButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mRoomRankButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mRoomRankButton");
		});
		this.mRoomRankButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mWorldRankButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mWorldRankButton");
		});
		this.mWorldRankButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mCloseButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mCloseButton");
		});
		this.mCloseButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mTitleTextBlock)
		
	
		this.initLanguage(this.mRoomRankTextBlock)
		
	
		this.initLanguage(this.mRoomNameTextBlock)
		
	
		this.initLanguage(this.mRoomLvTextBlock)
		
	
		this.initLanguage(this.mRoomHeightTextBlock)
		
	
		this.initLanguage(this.mRoomKillTextBlock)
		
	
		this.initLanguage(this.mRankLvTextBlock)
		
	
		this.initLanguage(this.mRankHeightTextBlock)
		
	
		this.initLanguage(this.mRankKillTextBlock)
		
	
		this.initLanguage(this.mWorldRankTextBlock)
		
	
		this.initLanguage(this.mWorldNameTextBlock)
		
	
		this.initLanguage(this.mWorldLvTextBlock)
		
	
		this.initLanguage(this.mRankDesTextBlock)
		
	
		this.initLanguage(this.mRoomTextBlock)
		
	
		this.initLanguage(this.mWorldTextBlock)
		
	
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
 