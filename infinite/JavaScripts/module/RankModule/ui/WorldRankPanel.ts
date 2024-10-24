import { GameConfig } from "../../../config/GameConfig";
import GlobalData from "../../../const/GlobalData";
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
	public async setData(isSelf: boolean, rank: number, name: string, lv: number, userId: string): Promise<void> {
		let color = (isSelf) ? new mw.LinearColor(1, 0, 1, 1) : mw.LinearColor.black;
		this.mRankTextBlock.text = rank.toString();
		this.mNameTextBlock.text = name;
		if (lv == 0) {
			this.mLvTextBlock.text = GameConfig.Language.Text_CurrentlyUnavailable.Value;
		} else {
			this.mLvTextBlock.text = await Utils.getLvText(lv, userId);
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
	public async setData(isSelf: boolean, rank: number, name: string, lv: number, height: number, kill: number, userId: string): Promise<void> {
		let color = (isSelf) ? new mw.LinearColor(1, 0, 1, 1) : mw.LinearColor.black;
		this.mRankTextBlock.text = rank.toString();
		this.mNameTextBlock.text = name;
		if (lv == 0) {
			this.mLvTextBlock.text = GameConfig.Language.Text_CurrentlyUnavailable.Value;
		} else {
			this.mLvTextBlock.text = await Utils.getLvText(lv, userId);
		}
		if (height == 0) {
			this.mHeightTextBlock.text = GameConfig.Language.Text_CurrentlyUnavailable.Value;
		} else {
			this.mHeightTextBlock.text = height.toString();
		}
		if (kill == 0) {
			this.mKillTextBlock.text = GameConfig.Language.Text_CurrentlyUnavailable.Value;
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
	private get getHudPanel(): HUDPanel {
		if (!this.hudPanel) {
			this.hudPanel = mw.UIService.getUI(HUDPanel);
		}
		return this.hudPanel;
	}

	/**排行模式 */
	public onRankTypeAction: Action1<RankType> = new Action1<RankType>();
	private currentShowCanvas: ShowCanvasType = ShowCanvasType.None;

	protected onStart(): void {
		this.initData();
		this.bindButton();
		this.initTextBlock();
	}

	private initTextBlock(): void {
		this.mRoomRankTextBlock.text = GameConfig.Language.Text_Ranking.Value;
		this.mRoomNameTextBlock.text = GameConfig.Language.Text_Name.Value;
		this.mRoomLvTextBlock.text = GameConfig.Language.Text_Grade.Value;
		this.mRoomHeightTextBlock.text = GameConfig.Language.Text_Height.Value;
		this.mRoomKillTextBlock.text = GameConfig.Language.Text_Kill.Value;

		this.mRankLvTextBlock.text = GameConfig.Language.Text_LevelMode.Value;
		this.mRankHeightTextBlock.text = GameConfig.Language.Text_HeightMode.Value;
		this.mRankKillTextBlock.text = GameConfig.Language.Text_KillMode.Value;

		this.mWorldRankTextBlock.text = GameConfig.Language.Text_Ranking.Value;
		this.mWorldNameTextBlock.text = GameConfig.Language.Text_Name.Value;
		this.mWorldLvTextBlock.text = GameConfig.Language.Text_Grade.Value;

		this.mRoomTextBlock.text = GameConfig.Language.Text_SwitchRoomLeaderboard.Value;
		this.mWorldTextBlock.text = GameConfig.Language.Text_SwitchToTheFullServerRankingList.Value;

		if (GlobalData.languageId == 0) {
			this.mRoomRankTextBlock.fontSize = 35;
			this.mRoomNameTextBlock.fontSize = 35;
			this.mRoomLvTextBlock.fontSize = 35;
			this.mRoomHeightTextBlock.fontSize = 35;
			this.mRoomKillTextBlock.fontSize = 35;

			this.mRankLvTextBlock.fontSize = 25;
			this.mRankHeightTextBlock.fontSize = 25;
			this.mRankKillTextBlock.fontSize = 25;

			this.mWorldRankTextBlock.fontSize = 35;
			this.mWorldNameTextBlock.fontSize = 35;
			this.mWorldLvTextBlock.fontSize = 35;

			this.mRoomTextBlock.fontSize = 15;
			this.mWorldTextBlock.fontSize = 15;

			this.mTitleTextBlock.fontSize = 30;
		} else {
			this.mRoomRankTextBlock.fontSize = 60;
			this.mRoomNameTextBlock.fontSize = 60;
			this.mRoomLvTextBlock.fontSize = 60;
			this.mRoomHeightTextBlock.fontSize = 60;
			this.mRoomKillTextBlock.fontSize = 60;

			this.mRankLvTextBlock.fontSize = 35;
			this.mRankHeightTextBlock.fontSize = 35;
			this.mRankKillTextBlock.fontSize = 35;

			this.mWorldRankTextBlock.fontSize = 60;
			this.mWorldNameTextBlock.fontSize = 60;
			this.mWorldLvTextBlock.fontSize = 60;

			this.mRoomTextBlock.fontSize = 25;
			this.mWorldTextBlock.fontSize = 25;

			this.mTitleTextBlock.fontSize = 80;
		}
	}

	private initData(): void {
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
		this.mRankDesTextBlock.text = GameConfig.Language.Text_TheRankingListInYourRoom.Value;
		this.mTitleTextBlock.text = GameConfig.Language.Text_RoomRanking.Value;
	}

	private showWorldCanvas(): void {
		if (this.currentShowCanvas == ShowCanvasType.World) return;
		this.currentShowCanvas = ShowCanvasType.World;
		this.mRoomCanvas.visibility = mw.SlateVisibility.Collapsed;
		this.mWorldCanvas.visibility = mw.SlateVisibility.SelfHitTestInvisible;
		this.mRankDesTextBlock.text = StringUtil.format(GameConfig.Language.Text_TopInTheEntireServer.Value, GlobalData.worldRankCount);
		this.mTitleTextBlock.text = GameConfig.Language.Text_FullServerRankingList.Value;
	}

	protected onShow(...params: any[]): void {
		Utils.openUITween(
			this.rootCanvas,
			() => {
				this.getHudPanel.hide();
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
				this.getHudPanel.show();
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
				this.roomItems[i].setData((i == curPlayerIndex), i + 1, playerDatas_CR[i].playerName, playerDatas_CR[i].playerLv, playerDatas_CR[i].playerHeight, playerDatas_CR[i].playerKill, playerDatas_CR[i].userId);
			}
			for (let i = this.roomItems.length; i < playerDatas_CR.length; ++i) {
				let roomItem = ObjectPoolServices.getPool(RankItem).spawn();
				roomItem.setData((i == curPlayerIndex), i + 1, playerDatas_CR[i].playerName, playerDatas_CR[i].playerLv, playerDatas_CR[i].playerHeight, playerDatas_CR[i].playerKill, playerDatas_CR[i].userId);
				this.mRoomContent.addChild(roomItem.rankItem);
				roomItem.rankItem.size = new mw.Vector2(1200, 100);
				this.roomItems.push(roomItem);
			}
		} else {
			for (let i = 0; i < playerDatas_CR.length; ++i) {
				this.roomItems[i].setData((i == curPlayerIndex), i + 1, playerDatas_CR[i].playerName, playerDatas_CR[i].playerLv, playerDatas_CR[i].playerHeight, playerDatas_CR[i].playerKill, playerDatas_CR[i].userId);
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
				this.worldItems[i].setData((i == curPlayerWorldIndex), i + 1, worldDatas_C[i].playerName, worldDatas_C[i].playerLv, worldDatas_C[i].userId);
			}
			for (let i = this.worldItems.length; i < worldDatas_C.length; ++i) {
				let worldItem = ObjectPoolServices.getPool(WorldRankItem).spawn();
				worldItem.setData((i == curPlayerWorldIndex), i + 1, worldDatas_C[i].playerName, worldDatas_C[i].playerLv, worldDatas_C[i].userId);
				this.mWorldContent.addChild(worldItem.worldRankItem);
				worldItem.worldRankItem.size = new mw.Vector2(1200, 100);
				this.worldItems.push(worldItem);
			}
		} else {
			for (let i = 0; i < worldDatas_C.length; i++) {
				this.worldItems[i].setData((i == curPlayerWorldIndex), i + 1, worldDatas_C[i].playerName, worldDatas_C[i].playerLv, worldDatas_C[i].userId);
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