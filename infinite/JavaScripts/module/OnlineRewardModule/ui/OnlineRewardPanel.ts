
/** 
 * AUTHOR: 爱玩游戏的小胖子
 * TIME: 2023.09.20-22.36.29
 */

import Console from "../../../Tools/Console";
import { MapEx } from "../../../Tools/MapEx";
import { ObjectPoolServices } from "../../../Tools/ObjectPool";
import { Utils, cubicBezier } from "../../../Tools/utils";
import { Notice } from "../../../common/notice/Notice";
import { GameConfig } from "../../../config/GameConfig";
import { IOnlineRewardsElement } from "../../../config/OnlineRewards";
import OnlineRewardPanel_Generate from "../../../ui-generate/module/OnlineReward/OnlineRewardPanel_generate";
import HUDModuleC from "../../HUDModule/HUDModuleC";
import HUDPanel from "../../HUDModule/ui/HUDPanel";
import { OnlineRewardModuleC, OnlineRewardItemState } from "../OnlineRewardModuleC";

export class OnlineRewardPanel extends OnlineRewardPanel_Generate {
	private hudModuleC: HUDModuleC = null;
	private get getHudModuleC(): HUDModuleC {
		if (!this.hudModuleC) {
			this.hudModuleC = ModuleService.getModule(HUDModuleC);
		}
		return this.hudModuleC;
	}

	private onlineRewardsModuleC: OnlineRewardModuleC = null;
	private get getOnlineRewardsModuleC(): OnlineRewardModuleC {
		if (!this.onlineRewardsModuleC) {
			this.onlineRewardsModuleC = ModuleService.getModule(OnlineRewardModuleC);
		}
		return this.onlineRewardsModuleC;
	}

	protected onStart(): void {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerMiddle;
		this.bindButton();
		this.initTextBlock();
	}

	private initTextBlock(): void {
		this.mTitleTextBlock.text = GameConfig.Language.Text_OnlineRewards.Value;
	}

	/**
	 * 绑定按钮事件
	 */
	private bindButton(): void {
		this.mCloseButton.onClicked.add(() => {
			this.getOnlineRewardsModuleC.onOnlineRewardsAction.call(false);
		});
	}

	protected onShow(...params: any[]): void {
		this.openNeedTweenItems(true);
		Console.error("this.rootCanvas.position = " + this.rootCanvas.position);
		Utils.openUITween(
			this.rootCanvas,
			null,
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
			});
	}

	protected onHide(): void {
		this.openNeedTweenItems(false);
	}
	private onlineRewardsElements: IOnlineRewardsElement[] = [];
	/**所有的item */
	private onlineRewardItems: OnlineRewardItem[] = [];
	/**
	 * 初始化在线奖励Item
	 * @param itemCount 
	 */
	public initOnlineRewardItem(onlineSecond: number, isGetRewards: boolean[]): void {
		this.onlineRewardsElements = GameConfig.OnlineRewards.getAllElement();
		for (let i = 0; i < this.onlineRewardsElements.length; ++i) {
			let onlineRewardItem = ObjectPoolServices.getPool(OnlineRewardItem).spawn();
			let onlineRewardItemState: OnlineRewardItemState = OnlineRewardItemState.notSatisfy;
			let onlineRewardsElement = this.onlineRewardsElements[i];
			let needTime = onlineRewardsElement.OnlineTime;
			let needUpdate: boolean = false;
			let needTween: boolean = false;
			if (isGetRewards[i]) {
				onlineRewardItemState = OnlineRewardItemState.getReward;
			} else {
				if (onlineSecond >= needTime * 60) {
					onlineRewardItemState = OnlineRewardItemState.satisfy;
					needTween = true;
				} else {
					onlineRewardItemState = OnlineRewardItemState.notSatisfy;
					needUpdate = true;
				}
			}
			onlineRewardItem.setData(i, onlineRewardsElement.OnlineTime, onlineRewardItemState,
				onlineRewardsElement.RewardCount, onlineRewardsElement.Icon);
			this.mCanvas.addChild(onlineRewardItem.onlineRewardItem);
			onlineRewardItem.onlineRewardItem.size = new mw.Vector2(200, 200);
			this.onlineRewardItems.push(onlineRewardItem);
			if (needUpdate) MapEx.set(this.needUpdateItems, i, onlineRewardItem);
			if (needTween) this.addNeedTweenItem(i, onlineRewardItem);
		}
	}

	/**
	 * 一直在线的玩家重置数据
	 * @param onlineSecond 
	 * @param isGetRewards 
	 */
	public resetOnlineRewardItem(onlineSecond: number, isGetRewards: boolean[]): void {
		this.needUpdateItems = {};
		for (let i = 0; i < this.onlineRewardItems.length; ++i) {
			let onlineRewardItem = this.onlineRewardItems[i];
			let onlineRewardItemState: OnlineRewardItemState = OnlineRewardItemState.notSatisfy;
			let onlineRewardsElement = this.onlineRewardsElements[i];
			let needTime = onlineRewardsElement.OnlineTime;
			let needUpdate: boolean = false;
			if (isGetRewards[i]) {
				onlineRewardItemState = OnlineRewardItemState.getReward;
			} else {
				if (onlineSecond >= needTime * 60) {
					onlineRewardItemState = OnlineRewardItemState.satisfy;
				} else {
					onlineRewardItemState = OnlineRewardItemState.notSatisfy;
					needUpdate = true;
				}
			}
			onlineRewardItem.setData(i, needTime, onlineRewardItemState,
				onlineRewardsElement.RewardCount, onlineRewardsElement.Icon);
			if (needUpdate) MapEx.set(this.needUpdateItems, i, onlineRewardItem);
		}
	}

	/**需要更新的Items */
	private needUpdateItems: MapEx.MapExClass<OnlineRewardItem> = {};
	/**
	 * 更新需要更新的Item
	 * @param onlineSecond 
	 */
	public updateNeedUpdateItems(onlineSecond: number): void {
		if (MapEx.count(this.needUpdateItems) == 0) return;
		let isCanUpdateHUD: boolean = true;
		MapEx.forEach(this.needUpdateItems, (key: number, value: OnlineRewardItem) => {
			value.updateTime(onlineSecond, isCanUpdateHUD);
			isCanUpdateHUD = false;
		});
	}

	/**
	 * 删除需要更新的Item
	 * @param index 
	 */
	public deleteNeedUpdateItem(index: number): void {
		if (MapEx.has(this.needUpdateItems, index)) {
			this.addNeedTweenItem(index, MapEx.get(this.needUpdateItems, index));
			MapEx.del(this.needUpdateItems, index);
		}
	}

	/**需要缓动的Item */
	private needTweenItems: MapEx.MapExClass<OnlineRewardItem> = {};

	/**
	 * 开启|关闭需要缓动的Item
	 */
	public openNeedTweenItems(isOpen: boolean): void {
		Console.error("MapEx.count(this.needTweenItems) = " + MapEx.count(this.needTweenItems));
		MapEx.forEach(this.needTweenItems, (key: number, value: OnlineRewardItem) => {
			isOpen ? value.startTween() : value.stopTween();
		});
	}

	/**
	 * 添加需要缓动的Item
	 * @param index 
	 * @param onlineRewardItem 
	 */
	public addNeedTweenItem(index: number, onlineRewardItem: OnlineRewardItem): void {
		MapEx.set(this.needTweenItems, index, onlineRewardItem);
		this.getHudModuleC.updateOnlineRewradIcon(this.getOnlineRewradIcon());
	}

	/**
	 * 得到当前需要显示的Icon
	 * @returns 
	 */
	private getOnlineRewradIcon(): string {
		if (MapEx.count(this.needTweenItems) == 0) return "";
		for (let i = this.onlineRewardsElements.length - 1; i >= 0; --i) {
			if (MapEx.has(this.needTweenItems, i)) {
				return this.onlineRewardsElements[i].Icon;
			}
		}
		return "";
	}

	/**
	 * 删除需要缓动的Item
	 * @param index 
	 */
	public deleteNeedTweenItem(index: number): void {
		if (MapEx.has(this.needTweenItems, index)) {
			MapEx.get(this.needTweenItems, index).stopTween();
			MapEx.del(this.needTweenItems, index);
			this.getHudModuleC.updateOnlineRewradIcon(this.getOnlineRewradIcon());
		}
	}
}

export class OnlineRewardItem {
	public onlineRewardItem: mw.UserWidgetPrefab;

	public mButton: mw.Button = undefined;
	public mTimeTextBlock: mw.TextBlock = undefined;
	public mGetRewardTextBlock: mw.TextBlock = undefined;
	public mCanRewardTextBlock: mw.TextBlock = undefined;
	public mCoinCanvas: mw.Canvas = undefined;
	public mCoinTextBlock: mw.TextBlock = undefined;
	public mExpCanvas: mw.Canvas = undefined;
	public mExpTextBlock: mw.TextBlock = undefined;
	public mRoleCanvas: mw.Canvas = undefined;
	public mRoleTextBlock: mw.TextBlock = undefined;

	/**生成Item */
	constructor() {
		this.onlineRewardItem = mw.createUIByName("module/OnlineReward/OnlineRewardItem");

		this.mButton = this.onlineRewardItem.findChildByPath("RootCanvas/mButton") as mw.Button;
		this.mTimeTextBlock = this.onlineRewardItem.findChildByPath("RootCanvas/mTimeTextBlock") as mw.TextBlock;

		this.mGetRewardTextBlock = this.onlineRewardItem.findChildByPath("RootCanvas/mGetRewardTextBlock") as mw.TextBlock;
		this.mCanRewardTextBlock = this.onlineRewardItem.findChildByPath("RootCanvas/mCanRewardTextBlock") as mw.TextBlock;

		this.mCoinCanvas = this.onlineRewardItem.findChildByPath("RootCanvas/mCoinCanvas") as mw.Canvas;
		this.mCoinTextBlock = this.onlineRewardItem.findChildByPath("RootCanvas/mCoinCanvas/mCoinTextBlock") as mw.TextBlock;

		this.mExpCanvas = this.onlineRewardItem.findChildByPath("RootCanvas/mExpCanvas") as mw.Canvas;
		this.mExpTextBlock = this.onlineRewardItem.findChildByPath("RootCanvas/mExpCanvas/mExpTextBlock") as mw.TextBlock;

		this.mRoleCanvas = this.onlineRewardItem.findChildByPath("RootCanvas/mRoleCanvas") as mw.Canvas;
		this.mRoleTextBlock = this.onlineRewardItem.findChildByPath("RootCanvas/mRoleCanvas/mRoleTextBlock") as mw.TextBlock;

		this.initTextBlock();
	}

	private initTextBlock(): void {
		this.mCanRewardTextBlock.text = GameConfig.Language.Text_CanBeClaimed.Value;
		this.mGetRewardTextBlock.text = GameConfig.Language.Text_ReceivedAlready.Value;
	}

	private hudPanel: HUDPanel = null;
	private get getHUDPanel(): HUDPanel {
		if (this.hudPanel == null) {
			this.hudPanel = mw.UIService.getUI(HUDPanel);
		}
		return this.hudPanel;
	}
	private index: number = 0;
	private needTime: number = 0;
	private onlineRewardItemState: OnlineRewardItemState = OnlineRewardItemState.notSatisfy;
	private rewardCounts: number[] = [];
	private icon: string = "";

	/**
	 * 设置数据
	 */
	public setData(index: number, needTime: number, onlineRewardItemState: OnlineRewardItemState, rewardCounts: number[], icon: string): void {
		this.index = index;
		this.needTime = needTime * 60;
		this.onlineRewardItemState = onlineRewardItemState;
		this.rewardCounts = rewardCounts;
		this.icon = icon;
		this.initItemStateTextBlock();
		this.bindButton();
		this.initRewardTextBlock();
		this.initTween();
	}

	/**
	 * 初始化Item状态文本
	 */
	private initItemStateTextBlock(): void {
		switch (this.onlineRewardItemState) {
			case OnlineRewardItemState.notSatisfy:
				this.mGetRewardTextBlock.visibility = mw.SlateVisibility.Collapsed;
				this.mCanRewardTextBlock.visibility = mw.SlateVisibility.Collapsed;
				this.mTimeTextBlock.visibility = mw.SlateVisibility.SelfHitTestInvisible;
				this.mButton.normalImageColor = mw.LinearColor.white;
				this.mTimeTextBlock.text = "00:00:00";
				break;
			case OnlineRewardItemState.satisfy:
				this.mGetRewardTextBlock.visibility = mw.SlateVisibility.Collapsed;
				this.mCanRewardTextBlock.visibility = mw.SlateVisibility.SelfHitTestInvisible;
				this.mTimeTextBlock.visibility = mw.SlateVisibility.Collapsed;
				this.mButton.normalImageColor = mw.LinearColor.white;
				break;
			case OnlineRewardItemState.getReward:
				this.onClickButtonUpdateUI();
				break;
			default:
				break;
		}
	}

	/**
	 * 绑定按钮事件
	 */
	private bindButton(): void {
		this.mButton.onClicked.clear();
		this.mButton.onClicked.add(() => {
			Event.dispatchToLocal("PlayButtonClick");
			switch (this.onlineRewardItemState) {
				case OnlineRewardItemState.notSatisfy:
					Notice.showDownNotice(GameConfig.Language.Text_InsufficientOnlineTime.Value);
					break;
				case OnlineRewardItemState.satisfy:
					this.onlineRewardItemState = OnlineRewardItemState.getReward;
					ModuleService.getModule(OnlineRewardModuleC).getOnlineRewrad(this.index);
					mw.UIService.getUI(OnlineRewardPanel).deleteNeedTweenItem(this.index);
					this.onClickButtonUpdateUI();
					Notice.showDownNotice(GameConfig.Language.Text_ClaimRewards.Value);
					break;
				case OnlineRewardItemState.getReward:
					Notice.showDownNotice(GameConfig.Language.Text_ReceivedReward.Value);
					break;
				default:
					break;
			}
		});
		this.mButton.normalImageGuid = this.icon;
		this.mButton.pressedImageGuid = this.icon;
		this.mButton.disableImageGuid = this.icon;
		this.mButton.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	}

	/**
	 * 初始化奖励文本
	 */
	private initRewardTextBlock(): void {
		if (this.rewardCounts[0] == 0) {
			this.mCoinCanvas.visibility = mw.SlateVisibility.Collapsed;
		} else {
			this.mCoinCanvas.visibility = mw.SlateVisibility.SelfHitTestInvisible;
			this.mCoinTextBlock.text = "×" + this.rewardCounts[0];
		}
		if (this.rewardCounts[1] == 0) {
			this.mExpCanvas.visibility = mw.SlateVisibility.Collapsed;
		} else {
			this.mExpCanvas.visibility = mw.SlateVisibility.SelfHitTestInvisible;
			this.mExpTextBlock.text = "×" + this.rewardCounts[1];
		}
		// if (this.rewardCounts[2] == 0) {
		// this.mRoleCanvas.visibility = mw.SlateVisibility.Collapsed;
		// } else {
		// this.mRoleCanvas.visibility = mw.SlateVisibility.SelfHitTestInvisible;
		// this.mRoleTextBlock.text = "随机1" + this.rewardCounts[2] + "个\n永久套装";
		// }
		this.mRoleCanvas.visibility = mw.SlateVisibility.Collapsed;
	}

	/**
	* 点击按钮更新UI
	*/
	private onClickButtonUpdateUI(): void {
		this.mCanRewardTextBlock.visibility = mw.SlateVisibility.Collapsed;
		this.mGetRewardTextBlock.visibility = mw.SlateVisibility.SelfHitTestInvisible;
		this.mButton.normalImageColor = mw.LinearColor.gray;
		this.mTimeTextBlock.visibility = mw.SlateVisibility.SelfHitTestInvisible;
		this.mTimeTextBlock.text = "00:00:00";
	}

	/**
	 * 更新时间
	 * @param onlineSecond 
	 */
	public updateTime(onlineSecond: number, isCanUpdateHUD: boolean): void {
		let timeLeft = this.needTime - onlineSecond;
		if (timeLeft <= 0) {
			this.mTimeTextBlock.visibility = mw.SlateVisibility.Collapsed;
			this.mCanRewardTextBlock.visibility = mw.SlateVisibility.SelfHitTestInvisible;
			this.onlineRewardItemState = OnlineRewardItemState.satisfy;
			mw.UIService.getUI(OnlineRewardPanel).deleteNeedUpdateItem(this.index);
			this.startTween();
			return;
		}
		let hour = Math.floor(timeLeft / 3600);
		let minute = Math.floor((timeLeft - hour * 3600) / 60);
		let second = Math.floor(timeLeft - hour * 3600 - minute * 60);
		this.mTimeTextBlock.text =
			(hour >= 10 ? hour : "0" + hour) + ":" +
			(minute >= 10 ? minute : "0" + minute) + ":" +
			(second >= 10 ? second : "0" + second);
		if (isCanUpdateHUD) this.getHUDPanel.updateHUDText(this.mTimeTextBlock.text);
	}

	private tween1: mw.Tween<any> = null;
	private tween2: mw.Tween<any> = null;

	/**
	 * 开始缓动
	 */
	public startTween(): void {
		if (this.tween1) {
			this.tween1.start();
		}
	}

	/**
	 * 停止缓动
	 */
	public stopTween(): void {
		if (this.tween1) {
			this.tween1.stop();
		}
		if (this.tween2) {
			this.tween2.stop();
		}
	}

	/**
	 * 初始化缓动
	 */
	private initTween(): void {
		if (this.tween1 != null) return;
		this.tween1 = new mw.Tween({ renderOpacity: 1 })
			.to({ renderOpacity: 0.3 }, 0.5 * 1000)
			.onUpdate((v) => {
				this.mCanRewardTextBlock.renderOpacity = v.renderOpacity;
			})
			.onComplete(() => {
				this.tween2.start();
			})
			.easing(cubicBezier(.18, .72, .28, .77));
		if (this.tween2 != null) return;
		this.tween2 = new mw.Tween({ renderOpacity: 0.3 })
			.to({ renderOpacity: 1 }, 0.5 * 1000)
			.onUpdate((v) => {
				this.mCanRewardTextBlock.renderOpacity = v.renderOpacity;
			})
			.onComplete(() => {
				this.tween1.start();
			})
			.easing(cubicBezier(.18, .72, .28, .77));
	}

	public recycle(): void {
		ObjectPoolServices.getPool(OnlineRewardItem).return(this);
	}
}