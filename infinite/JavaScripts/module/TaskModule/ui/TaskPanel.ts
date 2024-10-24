
/** 
 * AUTHOR: 爱玩游戏的小胖子
 * TIME: 2023.09.21-23.46.02
 */

import { ObjectPoolServices } from "../../../Tools/ObjectPool";
import { Utils } from "../../../Tools/utils";
import { GameConfig } from "../../../config/GameConfig";
import { ITaskElement } from "../../../config/Task";
import GlobalData from "../../../const/GlobalData";
import TaskPanel_Generate from "../../../ui-generate/module/TaskModule/TaskPanel_generate";
import HUDPanel from "../../HUDModule/ui/HUDPanel";
import { Task, TaskItemType } from "../TaskData";
import TaskModuleC from "../TaskModuleC";

export default class TaskPanel extends TaskPanel_Generate {
	private hudPanel: HUDPanel = null;
	private get getHudPanel(): HUDPanel {
		if (!this.hudPanel) {
			this.hudPanel = mw.UIService.getUI(HUDPanel);
		}
		return this.hudPanel
	}

	protected onStart(): void {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerMiddle;
		this.bindButton();
		this.initTime();
		this.initTextBlock();
	}

	private initTextBlock(): void {
		this.mDailyTaskTitleTextBlock.text = GameConfig.Language.Text_DailyTasks.Value;
		this.mDailyTaskDoneTextBlock.text = GameConfig.Language.Text_AllTasksHaveBeenCompletedWaitingForRefresh.Value;
		this.mWeekTaskTitleTextBlock.text = GameConfig.Language.Text_WeeklyTasks.Value
		this.mWeekTaskDoneTextBlock.text = GameConfig.Language.Text_AllTasksHaveBeenCompletedWaitingForRefresh.Value;
		if (GlobalData.languageId == 0) {
			this.mDailyTaskTitleTextBlock.fontSize = 40;
			this.mWeekTaskTitleTextBlock.fontSize = 35;
			this.mDailyTimeTextBlock.fontSize = 18;
			this.mWeekTimeTextBlock.fontSize = 18;
		} else {
			this.mDailyTaskTitleTextBlock.fontSize = 50;
			this.mWeekTaskTitleTextBlock.fontSize = 50;
			this.mDailyTimeTextBlock.fontSize = 30;
			this.mWeekTimeTextBlock.fontSize = 30;
		}
	}

	private bindButton(): void {
		this.mCloseButton.onClicked.add(() => {
			this.hideTween();
		});
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
			});
	}

	protected onShow(...params: any[]): void {
		this.canUpdate = true;
		this.mDailyTaskBox.scrollOffset = 0;
		this.mWeekTaskBox.scrollOffset = 0;
		Utils.openUITween(
			this.rootCanvas,
			null,
			null
		);
	}

	protected onHide(): void {
		this.canUpdate = false;
	}

	private picIndex: number = 0;
	private isPic: boolean = false;
	public controllerPic(value: number): void {
		this.picIndex += value;
		if (this.picIndex > 0 && this.isPic == false) {
			this.getHudPanel.startTaskRedPointTween();
			this.isPic = true;
		} else if (this.picIndex <= 0 && this.isPic == true) {
			this.getHudPanel.stopTaskRedPointTween();
			this.isPic = false;
		}
	}

	public initTaskPanel(dailyTaskDataMap: Map<TaskItemType, Task>, weeklyTaskDataMap: Map<TaskItemType, Task>): void {
		this.initDailyTaskPanel(dailyTaskDataMap);
		this.initWeeklyTaskPanel(weeklyTaskDataMap);
	}

	private dailyTaskItemsMap: Map<TaskItemType, TaskItem> = new Map<TaskItemType, TaskItem>();
	private tmpDailyTaskItems: TaskItem[] = [];
	private initDailyTaskPanel(dailyTaskDataMap: Map<TaskItemType, Task>): void {
		this.recycleAllDailyTaskItem();
		if (dailyTaskDataMap.size == 0) return;
		this.mDailyTaskDoneTextBlock.visibility = mw.SlateVisibility.Collapsed;

		this.tmpDailyTaskItems.length = 0;
		dailyTaskDataMap.forEach((value, key) => {
			let dailyTaskItem = ObjectPoolServices.getPool(TaskItem).spawn();
			dailyTaskItem.initTaskItemData(key, value);
			if (dailyTaskItem.isGet) {
				this.mDailyTaskCanvas.addChild(dailyTaskItem.taskItem);
				dailyTaskItem.taskItem.size = new mw.Vector2(556, 94);
			} else {
				this.tmpDailyTaskItems.push(dailyTaskItem);
			}
			this.dailyTaskItemsMap.set(key, dailyTaskItem);
		});
		this.addDailyTaskCanvas();
	}

	private addDailyTaskCanvas(): void {
		if (this.tmpDailyTaskItems && this.tmpDailyTaskItems.length > 0) {
			this.tmpDailyTaskItems.forEach((value: TaskItem) => {
				this.mDailyTaskCanvas.addChild(value.taskItem);
				value.taskItem.size = new mw.Vector2(556, 94);
			});
		}
	}

	public updateTaskPanel(vipTaskType: TaskItemType, progress: number): void {
		if (this.dailyTaskItemsMap.has(vipTaskType)) {
			let dailyTaskItem = this.dailyTaskItemsMap.get(vipTaskType);
			dailyTaskItem.updateTaskItemData(progress);
			if (dailyTaskItem.isGet) {
				this.tmpDailyTaskItems.length = 0;
				this.dailyTaskItemsMap.forEach((value: TaskItem, key: TaskItemType) => {
					if (value.isGet) return;
					this.tmpDailyTaskItems.push(value);
					this.mRecycleCanvas.addChild(value.taskItem);
				});
				this.addDailyTaskCanvas();
			}
		}
		if (this.weeklyTaskItemsMap.has(vipTaskType)) {
			let weeklyTaskItem = this.weeklyTaskItemsMap.get(vipTaskType);
			weeklyTaskItem.updateTaskItemData(progress);
			if (weeklyTaskItem.isGet) {
				this.tmpweeklyTaskItems.length = 0;
				this.weeklyTaskItemsMap.forEach((value: TaskItem, key: TaskItemType) => {
					if (value.isGet) return;
					this.tmpweeklyTaskItems.push(value);
					this.mRecycleCanvas.addChild(value.taskItem);
				});
				this.addWeekTaskCanvas();
			}
		}
	}

	private weeklyTaskItemsMap: Map<TaskItemType, TaskItem> = new Map<TaskItemType, TaskItem>();
	private tmpweeklyTaskItems: TaskItem[] = [];
	private initWeeklyTaskPanel(weeklyTaskDataMap: Map<TaskItemType, Task>): void {
		this.recycleAllWeeklyTaskItem();
		if (weeklyTaskDataMap.size == 0) return;
		this.mWeekTaskDoneTextBlock.visibility = mw.SlateVisibility.Collapsed;

		this.tmpweeklyTaskItems.length = 0;
		weeklyTaskDataMap.forEach((value, key) => {
			let weeklyTaskItem = ObjectPoolServices.getPool(TaskItem).spawn();
			weeklyTaskItem.initTaskItemData(key, value);
			if (weeklyTaskItem.isGet) {
				this.mWeekTaskCanvas.addChild(weeklyTaskItem.taskItem);
				weeklyTaskItem.taskItem.size = new mw.Vector2(556, 94);
			} else {
				this.tmpweeklyTaskItems.push(weeklyTaskItem);
			}
			this.weeklyTaskItemsMap.set(key, weeklyTaskItem);
		});
		this.addWeekTaskCanvas();
	}

	private addWeekTaskCanvas(): void {
		if (this.tmpweeklyTaskItems && this.tmpweeklyTaskItems.length > 0) {
			this.tmpweeklyTaskItems.forEach((value: TaskItem) => {
				this.mWeekTaskCanvas.addChild(value.taskItem);
				value.taskItem.size = new mw.Vector2(556, 94);
			});
		}
	}

	public updateTaskCompletePanel(vipTaskType: TaskItemType): void {
		if (this.dailyTaskItemsMap.has(vipTaskType)) {
			let dailyTaskItem = this.dailyTaskItemsMap.get(vipTaskType);
			dailyTaskItem.updateTaskCompaleteItemData();
		}
		if (this.weeklyTaskItemsMap.has(vipTaskType)) {
			let weeklyTaskItem = this.weeklyTaskItemsMap.get(vipTaskType);
			weeklyTaskItem.updateTaskCompaleteItemData();
		}
	}

	public recycleTaskItem(vipTaskType: TaskItemType): void {
		if (this.dailyTaskItemsMap.has(vipTaskType)) {
			let dailyTaskItem = this.dailyTaskItemsMap.get(vipTaskType);
			dailyTaskItem.recycle();
			this.mRecycleCanvas.addChild(dailyTaskItem.taskItem);
			this.dailyTaskItemsMap.delete(vipTaskType);
			this.mDailyTaskBox.scrollOffset = 0;
			if (this.dailyTaskItemsMap.size <= 0) {
				this.mDailyTaskDoneTextBlock.visibility = mw.SlateVisibility.SelfHitTestInvisible;
			}
		}
		if (this.weeklyTaskItemsMap.has(vipTaskType)) {
			let weeklyTaskItem = this.weeklyTaskItemsMap.get(vipTaskType);
			weeklyTaskItem.recycle();
			this.mRecycleCanvas.addChild(weeklyTaskItem.taskItem);
			this.weeklyTaskItemsMap.delete(vipTaskType);
			this.mWeekTaskBox.scrollOffset = 0;
			if (this.weeklyTaskItemsMap.size <= 0) {
				this.mWeekTaskDoneTextBlock.visibility = mw.SlateVisibility.SelfHitTestInvisible;
			}
		}
	}

	private recycleAllDailyTaskItem(): void {
		if (this.dailyTaskItemsMap.size == 0) return;
		this.dailyTaskItemsMap.forEach((value, key) => {
			value.recycle();
			this.mRecycleCanvas.addChild(value.taskItem);
			this.dailyTaskItemsMap.delete(key);
		});
		this.mDailyTaskBox.scrollOffset = 0;
		this.dailyTaskItemsMap.clear();
	}

	private recycleAllWeeklyTaskItem(): void {
		if (this.weeklyTaskItemsMap.size == 0) return;
		this.weeklyTaskItemsMap.forEach((value, key) => {
			value.recycle();
			this.mRecycleCanvas.addChild(value.taskItem);
			this.weeklyTaskItemsMap.delete(key);
		});
		this.mWeekTaskBox.scrollOffset = 0;
		this.weeklyTaskItemsMap.clear();
	}

	private refreshDailyHourTime: number = 0;
	private refreshWeekHourTime: number = 0;
	private initTime(): void {
		this.hour = new Date().getHours();
		this.updateHourTime();
		this.week = 8 - Number(Utils.getWhatDay());
		this.updateWeekTime();
		this.refreshDailyHourTime = Number(GlobalData.dailyRefreshTime.split(':')[0]);
		this.refreshWeekHourTime = Number(GlobalData.weeklyRefreshTime.split(':')[0]);
	}

	private hourTimer: number = 0;
	private hourTime: number = 60;
	onUpdate(dt: number): void {
		this.hourTimer += dt;
		if (this.hourTimer >= this.hourTime) {
			let hour = new Date().getHours();
			if (hour != this.hour) {
				this.hour = hour;
				this.updateHourTime();
			}
			let week = Number(Utils.getWhatDay());
			if (week != this.week) {
				this.week = week;
				this.updateWeekTime();
			}
			this.hourTimer = 0;
		}
	}

	private hour: number = 0;
	private updateHourTime(): void {
		if (this.hour >= 0 && this.hour < this.refreshDailyHourTime) {
			this.hour = this.refreshDailyHourTime - this.hour;
		} else {
			this.hour = 24 - this.hour + this.refreshDailyHourTime;
		}
		this.mDailyTimeTextBlock.text = StringUtil.format(GameConfig.Language.Text_RemainingHours.Value, this.hour);
	}

	private week: number = 0;
	private updateWeekTime(): void {
		if (Number(Utils.getWhatDay()) == 1 && this.hour < this.refreshWeekHourTime) {
			this.mWeekTimeTextBlock.text = StringUtil.format(GameConfig.Language.Text_RemainingDays.Value, 1);
			this.week = 1;
		} else {
			this.mWeekTimeTextBlock.text = StringUtil.format(GameConfig.Language.Text_RemainingDays.Value, this.week);
		}
	}
}

class TaskItem {
	public taskItem: mw.UserWidgetPrefab;

	public mNameTextBlock: mw.TextBlock = undefined;
	public mCoinCanvas: mw.Canvas = undefined;
	public mCoinTextBlock: mw.TextBlock = undefined;
	public mExpCanvas: mw.Canvas = undefined;
	public mExpTextBlock: mw.TextBlock = undefined;
	public mDiamondCanvas: mw.Canvas = undefined;
	public mDiamondTextBlock: mw.TextBlock = undefined;
	public mFinishButton: mw.Button = undefined;
	public mFinishTextBlock: mw.TextBlock = undefined;
	public mUnfinishTextBlock: mw.TextBlock = undefined;

	/**生成Item */
	constructor() {
		this.taskItem = mw.createUIByName("module/TaskModule/TaskItem");

		this.mNameTextBlock = this.taskItem.findChildByPath("RootCanvas/mNameTextBlock") as mw.TextBlock;

		this.mCoinCanvas = this.taskItem.findChildByPath("RootCanvas/mCoinCanvas") as mw.Canvas;
		this.mCoinTextBlock = this.taskItem.findChildByPath("RootCanvas/mCoinCanvas/mCoinTextBlock") as mw.TextBlock;

		this.mExpCanvas = this.taskItem.findChildByPath("RootCanvas/mExpCanvas") as mw.Canvas;
		this.mExpTextBlock = this.taskItem.findChildByPath("RootCanvas/mExpCanvas/mExpTextBlock") as mw.TextBlock;

		this.mDiamondCanvas = this.taskItem.findChildByPath("RootCanvas/mDiamondCanvas") as mw.Canvas;
		this.mDiamondTextBlock = this.taskItem.findChildByPath("RootCanvas/mDiamondCanvas/mDiamondTextBlock") as mw.TextBlock;

		this.mFinishButton = this.taskItem.findChildByPath("RootCanvas/mFinishButton") as mw.Button;
		this.mFinishTextBlock = this.taskItem.findChildByPath("RootCanvas/mFinishButton/mFinishTextBlock") as mw.TextBlock;
		this.mUnfinishTextBlock = this.taskItem.findChildByPath("RootCanvas/mUnfinishTextBlock") as mw.TextBlock;

		this.mFinishButton.visibility = mw.SlateVisibility.Collapsed;
		this.mFinishButton.touchMethod = mw.ButtonTouchMethod.PreciseTap;

		this.initTextBlock();
	}

	private initTextBlock(): void {
		this.mFinishTextBlock.text = GameConfig.Language.Text_ClaimRewards.Value;
		this.mUnfinishTextBlock.text = GameConfig.Language.Text_HangInTheAir.Value;
		if (GlobalData.languageId == 0) {
			this.mNameTextBlock.fontSize = 12;
			this.mFinishTextBlock.fontSize = 15;
			this.mUnfinishTextBlock.fontSize = 15;
		} else {
			this.mNameTextBlock.fontSize = 20;
			this.mFinishTextBlock.fontSize = 24;
			this.mUnfinishTextBlock.fontSize = 24;
		}
	}

	public vipTaskType: TaskItemType = TaskItemType.None;
	public task: Task = null;
	private vIPTaskElement: ITaskElement = null;
	/**填充item数据 */
	public initTaskItemData(vipTaskType: TaskItemType, task: Task): void {
		this.vipTaskType = vipTaskType;
		this.task = task;
		this.vIPTaskElement = GameConfig.Task.getElement(this.task.taskId);
		if (task.isGetReward) {
			this.isShowFinishBtn(false);
			this.mUnfinishTextBlock.visibility = mw.SlateVisibility.Collapsed;
		} else {
			let isShow = task.progress >= this.vIPTaskElement.TragetNum;
			this.isShowFinishBtn(isShow);
			if (isShow) {
				mw.UIService.getUI(TaskPanel).controllerPic(1);
			}
		}
		setTimeout(() => {
			this.mNameTextBlock.text = StringUtil.format(this.vIPTaskElement.Name, this.task.progress, this.vIPTaskElement.TragetNum, this.vIPTaskElement.TragetNum);
		}, 1000);
		this.mCoinTextBlock.text = this.vIPTaskElement.Coin.toString();
		this.mExpTextBlock.text = this.vIPTaskElement.Exp.toString();
		this.mDiamondTextBlock.text = this.vIPTaskElement.Diamond.toString();
		if (this.vIPTaskElement.Exp == 0 || this.vIPTaskElement.Exp == null) {
			this.mExpCanvas.visibility = mw.SlateVisibility.Collapsed;
		}
		if (this.vIPTaskElement.Diamond == 0 || this.vIPTaskElement.Diamond == null) {
			this.mDiamondCanvas.visibility = mw.SlateVisibility.Collapsed;
		}
		this.mFinishButton.onClicked.add(() => {
			Event.dispatchToLocal("PlayButtonClick");
			ModuleService.getModule(TaskModuleC).onTaskRewardAction.call(this.vipTaskType, this.task.taskId);
			mw.UIService.getUI(TaskPanel).controllerPic(-1);
		});
	}

	public isGet: boolean = false;
	public isShowFinishBtn(isShow: boolean): void {
		this.isGet = isShow;
		if (isShow) {
			if (this.mFinishButton.visibility != mw.SlateVisibility.Visible) {
				this.mFinishButton.visibility = mw.SlateVisibility.Visible;
			}
			if (this.mUnfinishTextBlock.visibility != mw.SlateVisibility.Collapsed) {
				this.mUnfinishTextBlock.visibility = mw.SlateVisibility.Collapsed;
			}
		} else {
			if (this.mFinishButton.visibility != mw.SlateVisibility.Collapsed) {
				this.mFinishButton.visibility = mw.SlateVisibility.Collapsed;
			}
			if (this.mUnfinishTextBlock.visibility != mw.SlateVisibility.SelfHitTestInvisible) {
				this.mUnfinishTextBlock.visibility = mw.SlateVisibility.SelfHitTestInvisible;
			}
		}
	}

	public updateTaskItemData(progress: number): void {
		let tragetNum = this.vIPTaskElement.TragetNum;
		this.task.progress = progress;
		this.mNameTextBlock.text = StringUtil.format(this.vIPTaskElement.Name, progress, tragetNum);
		if (progress >= tragetNum) {
			if (this.mFinishButton.visibility != mw.SlateVisibility.Visible) {
				mw.UIService.getUI(TaskPanel).controllerPic(1);
			}
			this.isShowFinishBtn(true);
		}
	}

	public updateTaskCompaleteItemData(): void {
		let nextId = this.vIPTaskElement.NextId;
		if (nextId != 0) {
			this.task.taskId = nextId;
			// this.task.progress = 0;
			this.task.isGetReward = false;

			this.vIPTaskElement = GameConfig.Task.getElement(nextId);
			this.mNameTextBlock.text = StringUtil.format(this.vIPTaskElement.Name, this.task.progress, this.vIPTaskElement.TragetNum);
			this.mCoinTextBlock.text = this.vIPTaskElement.Coin.toString();
			this.mExpTextBlock.text = this.vIPTaskElement.Exp.toString();
			if (this.task.progress >= this.vIPTaskElement.TragetNum) {
				this.isShowFinishBtn(true);
				mw.UIService.getUI(TaskPanel).controllerPic(1);
				return;
			}
		} else {
			this.mUnfinishTextBlock.visibility = mw.SlateVisibility.Collapsed;
			this.task.isGetReward = true;
			mw.UIService.getUI(TaskPanel).recycleTaskItem(this.vipTaskType);
			return;
		}
		this.isShowFinishBtn(false);
	}

	/**回收 */
	public recycle(): void {
		ObjectPoolServices.getPool(TaskItem).return(this);
	}
}