import { ObjectPoolServices } from "../../../Tools/ObjectPool";
import { Utils } from "../../../Tools/utils";
import WorldRankPanel_Generate from "../../../ui-generate/module/WorldRank/WorldRankPanel_generate";
import HUDPanel from "../../HUDModule/ui/HUDPanel";
import { PlayerData_CSR, PlayerData_CSW } from "../PlayerPropData";
import { RankType } from "../WorldRankModuleC";

export class WorldRankItem {
	public worldRankItem: mw.UserWidgetPrefab;

	public mRankTextBlock: mw.TextBlock = undefined;
	public mNameTextBlock: mw.TextBlock = undefined;
	public mLvTextBlock: mw.TextBlock = undefined;

	constructor() {
		this.worldRankItem = mw.createUIByName("module/WorldRank/WorldRankItem");
		this.mRankTextBlock = this.worldRankItem.findChildByPath("RootCanvas/Canvas/mRankTextBlock") as mw.TextBlock;
		this.mNameTextBlock = this.worldRankItem.findChildByPath("RootCanvas/Canvas/mNameTextBlock") as mw.TextBlock;
		this.mLvTextBlock = this.worldRankItem.findChildByPath("RootCanvas/Canvas/mLvTextBlock") as mw.TextBlock;
	}

	/**
	 * 设置数据
	 * @param isSelf 
	 * @param rank 
	 * @param name 
	 * @param lv 
	 * @returns 
	 */
	public setData(isSelf: boolean, rank: number, name: string, lv: number): void {
		let color = (isSelf) ? new mw.LinearColor(1, 0, 1, 1) : mw.LinearColor.black;
		this.mRankTextBlock.text = rank.toString();
		this.mNameTextBlock.text = name;
		if (lv == 0) {
			this.mLvTextBlock.text = "暂无";
		} else {
			this.mLvTextBlock.text = Utils.getLvText(lv) + " 等级Lv." + lv;
		}
		this.mRankTextBlock.outlineColor = color;
		this.mNameTextBlock.outlineColor = color;
		this.mLvTextBlock.outlineColor = color;
	}



	/**
	 * 回收
	 */
	public recycle(): void {
		ObjectPoolServices.getPool(WorldRankItem).return(this);
	}
}

export class RankItem {
	public rankItem: mw.UserWidgetPrefab;

	public mRankTextBlock: mw.TextBlock = undefined;
	public mNameTextBlock: mw.TextBlock = undefined;
	public mLvTextBlock: mw.TextBlock = undefined;
	public mHeightTextBlock: mw.TextBlock = undefined;
	public mKillTextBlock: mw.TextBlock = undefined;

	constructor() {
		this.rankItem = mw.createUIByName("module/WorldRank/RankItem");
		this.mRankTextBlock = this.rankItem.findChildByPath("RootCanvas/Canvas/mRankTextBlock") as mw.TextBlock;
		this.mNameTextBlock = this.rankItem.findChildByPath("RootCanvas/Canvas/mNameTextBlock") as mw.TextBlock;
		this.mLvTextBlock = this.rankItem.findChildByPath("RootCanvas/Canvas/mLvTextBlock") as mw.TextBlock;
		this.mHeightTextBlock = this.rankItem.findChildByPath("RootCanvas/Canvas/mHeightTextBlock") as mw.TextBlock;
		this.mKillTextBlock = this.rankItem.findChildByPath("RootCanvas/Canvas/mKillTextBlock") as mw.TextBlock;
	}

	/**
	 * 设置数据
	 * @param isSelf 
	 * @param rank 
	 * @param name 
	 * @param lv 
	 * @returns 
	 */
	public setData(isSelf: boolean, rank: number, name: string, lv: number, height: number, kill: number): void {
		let color = (isSelf) ? new mw.LinearColor(1, 0, 1, 1) : mw.LinearColor.black;
		this.mRankTextBlock.text = rank.toString();
		this.mNameTextBlock.text = name;
		if (lv == 0) {
			this.mLvTextBlock.text = "暂无";
		} else {
			this.mLvTextBlock.text = lv.toString();
		}
		if (height == 0) {
			this.mHeightTextBlock.text = "暂无";
		} else {
			this.mHeightTextBlock.text = height.toString();
		}
		if (kill == 0) {
			this.mKillTextBlock.text = "暂无";
		} else {
			this.mKillTextBlock.text = kill.toString();
		}
		this.mRankTextBlock.outlineColor = color;
		this.mNameTextBlock.outlineColor = color;
		this.mLvTextBlock.outlineColor = color;
		this.mHeightTextBlock.outlineColor = color;
		this.mKillTextBlock.outlineColor = color;
	}

	/**
	 * 回收
	 */
	public recycle(): void {
		ObjectPoolServices.getPool(RankItem).return(this);
	}
}

export class WorldRankPanel extends WorldRankPanel_Generate {
	private hudPanel: HUDPanel = null;

	/**排行模式 */
	public onRankTypeAction: Action1<RankType> = new Action1<RankType>();
	private currentShowCanvas: ShowCanvasType = ShowCanvasType.None;

	protected onStart(): void {
		this.initData();
		this.bindButton();
	}

	private initData(): void {
		this.hudPanel = mw.UIService.getUI(HUDPanel);
		this.showRoomCanvas();
	}

	private bindButton(): void {
		this.mRoomRankButton.onClicked.add(() => {
			this.showRoomCanvas();
		});
		this.mWorldRankButton.onClicked.add(() => {
			this.showWorldCanvas();
		});
		this.mCloseButton.onClicked.add(() => {
			this.hideTween();
		});
		this.mRankLvButton.onClicked.add(() => {
			this.onRankTypeAction.call(RankType.Lv);
		});
		this.mRankHeightButton.onClicked.add(() => {
			this.onRankTypeAction.call(RankType.Height);
		});
		this.mRankKillButton.onClicked.add(() => {
			this.onRankTypeAction.call(RankType.Kill);
		});
	}

	private showRoomCanvas(): void {
		if (this.currentShowCanvas == ShowCanvasType.Room) return;
		this.currentShowCanvas = ShowCanvasType.Room;
		this.mRoomCanvas.visibility = mw.SlateVisibility.SelfHitTestInvisible;
		this.mWorldCanvas.visibility = mw.SlateVisibility.Collapsed;
		this.mRankDesTextBlock.text = "你所在房间内的排行榜。\n点击右侧排行模式按钮会刷新排行榜模式。";
		this.mTitleTextBlock.text = "房间排行榜";
	}

	private showWorldCanvas(): void {
		if (this.currentShowCanvas == ShowCanvasType.World) return;
		this.currentShowCanvas = ShowCanvasType.World;
		this.mRoomCanvas.visibility = mw.SlateVisibility.Collapsed;
		this.mWorldCanvas.visibility = mw.SlateVisibility.SelfHitTestInvisible;
		this.mRankDesTextBlock.text = "全服前100名\n段位 Lv.等级排行。";
		this.mTitleTextBlock.text = "全服排行榜";
	}

	protected onShow(...params: any[]): void {
		Utils.openUITween(
			this.rootCanvas,
			() => {
				this.hudPanel.hide();
			},
			null
		);
	}

	/**
	 * 隐藏缓动
	 */
	public hideTween(): void {
		Utils.closeUITween(
			this.rootCanvas,
			null,
			() => {
				this.hide();
				this.hudPanel.show();
			});
	}

	public refreshRankPanel(playerDatas_CR: PlayerData_CSR[], curPlayerIndex: number, isRefreshWorldRank: boolean, worldDatas_CW: PlayerData_CSW[], curPlayerWorldIndex: number): void {
		this.refreshRoomRankPanel(playerDatas_CR, curPlayerIndex);
		if (isRefreshWorldRank) {
			this.refreshWorldRankPanel(worldDatas_CW, curPlayerWorldIndex);
		}
	}

	public roomItems: RankItem[] = [];
	private refreshRoomRankPanel(playerDatas_CR: PlayerData_CSR[], curPlayerIndex: number): void {
		if (playerDatas_CR.length >= this.roomItems.length) {
			for (let i = 0; i < this.roomItems.length; ++i) {
				this.roomItems[i].setData((i == curPlayerIndex), i + 1, playerDatas_CR[i].playerName, playerDatas_CR[i].playerLv, playerDatas_CR[i].playerHeight, playerDatas_CR[i].playerKill);
			}
			for (let i = this.roomItems.length; i < playerDatas_CR.length; ++i) {
				let roomItem = ObjectPoolServices.getPool(RankItem).spawn();
				roomItem.setData((i == curPlayerIndex), i + 1, playerDatas_CR[i].playerName, playerDatas_CR[i].playerLv, playerDatas_CR[i].playerHeight, playerDatas_CR[i].playerKill);
				this.mRoomContent.addChild(roomItem.rankItem);
				roomItem.rankItem.size = new mw.Vector2(1200, 100);
				this.roomItems.push(roomItem);
			}
		} else {
			for (let i = 0; i < playerDatas_CR.length; ++i) {
				this.roomItems[i].setData((i == curPlayerIndex), i + 1, playerDatas_CR[i].playerName, playerDatas_CR[i].playerLv, playerDatas_CR[i].playerHeight, playerDatas_CR[i].playerKill);
			}
			for (let i = playerDatas_CR.length; i < this.roomItems.length; ++i) {
				this.roomItems[i].recycle();
				this.mRecycleCanvas.addChild(this.roomItems[i].rankItem);
			}
			this.roomItems.length = playerDatas_CR.length;
		}
	}

	private worldItems: WorldRankItem[] = [];
	private refreshWorldRankPanel(worldDatas_C: PlayerData_CSW[], curPlayerWorldIndex: number): void {
		if (worldDatas_C.length >= this.worldItems.length) {
			for (let i = 0; i < this.worldItems.length; ++i) {
				this.worldItems[i].setData((i == curPlayerWorldIndex), i + 1, worldDatas_C[i].playerName, worldDatas_C[i].playerLv);
			}
			for (let i = this.worldItems.length; i < worldDatas_C.length; ++i) {
				let worldItem = ObjectPoolServices.getPool(WorldRankItem).spawn();
				worldItem.setData((i == curPlayerWorldIndex), i + 1, worldDatas_C[i].playerName, worldDatas_C[i].playerLv);
				this.mWorldContent.addChild(worldItem.worldRankItem);
				worldItem.worldRankItem.size = new mw.Vector2(1200, 100);
				this.worldItems.push(worldItem);
			}
		} else {
			for (let i = 0; i < worldDatas_C.length; i++) {
				this.worldItems[i].setData((i == curPlayerWorldIndex), i + 1, worldDatas_C[i].playerName, worldDatas_C[i].playerLv);
			}
			for (let i = worldDatas_C.length; i < this.worldItems.length; i++) {
				this.worldItems[i].recycle();
				this.mRecycleCanvas.addChild(this.worldItems[i].worldRankItem);
			}
			this.worldItems.length = worldDatas_C.length;
		}
	}
}

export enum ShowCanvasType {
	None = 0,
	Room = 1,
	World = 2,
}