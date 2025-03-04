
/** 
 * AUTHOR: 爱玩游戏的小胖子
 * TIME: 2023.07.21-21.54.50
 */

import { ColdWeapon } from "../../../Prefabs/冷兵器/Script/ColdWeapon";
import Console from "../../../Tools/Console";
import { Tween, Utils, cubicBezier } from "../../../Tools/utils";
import { Notice } from "../../../common/notice/Notice";
import GlobalData from "../../../const/GlobalData";
import HUDPanel_Generate from "../../../ui-generate/module/HUDModule/HUDPanel_generate";
import KillTipItem_Generate from "../../../ui-generate/module/HUDModule/KillTipItem_generate";
import HUDModuleC, { KillTipData, KillTipType } from "../HUDModuleC";

export default class HUDPanel extends HUDPanel_Generate {
	private hudModuleC: HUDModuleC = null;
	private get getHudModuleC(): HUDModuleC {
		if (!this.hudModuleC) {
			this.hudModuleC = ModuleService.getModule(HUDModuleC);
		}
		return this.hudModuleC;
	}

	/** 
	 * 构造UI文件成功后，在合适的时机最先初始化一次 
	 */
	protected onStart() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerMiddle;
		this.bindButtons();
		this.initUI();
		this.initRoleData();
	}

	/**绑定按钮 */
	private bindButtons(): void {
		this.mAtkButton.onClicked.clear();
		this.mShopButton.onClicked.add(() => {
			this.getHudModuleC.onOpenShopAction.call();
		});
		this.mPlayerButton.onClicked.add(() => {
			this.getHudModuleC.onOpenPlayerAction.call();
			this.hide();
		});
		this.mJumpButton.onClicked.add(() => {
			this.getHudModuleC.onJumpAction.call();
		});
		this.mSprintButton.onClicked.add(() => {
			this.getHudModuleC.onSprintAction.call();
		});
		this.mOnlineRewardButton.onClicked.add(() => {
			this.getHudModuleC.onOpenOnlineRewardAction.call();
		});
		this.mTaskButton.onClicked.add(() => {
			this.getHudModuleC.onOpenTaskAction.call();
		});
		this.mRankButton.onClicked.add(() => {
			this.getHudModuleC.onOpenRankAction.call();
		});
		this.mHomeButton.onClicked.add(() => {
			this.getHudModuleC.onHomeAction.call();
		});
		this.mAddCoinButton.onClicked.add(() => {
			this.getHudModuleC.onAddCoinAction.call();
		});
		this.mAdsButton.onClicked.add(() => {
			this.getHudModuleC.onAdsAction.call();
		});
		let isInvincible: boolean = false;
		this.mInvincibleTextBlock.text = "已关闭防御";
		this.mInvincibleButton.onClicked.add(() => {
			isInvincible = !isInvincible;
			this.mInvincibleTextBlock.text = isInvincible ? "已开启防御" : "已关闭防御";
			this.getHudModuleC.onInvincibleAction.call(isInvincible);
		});
		this.mOnlineRewardButton.normalImageGuid = "193281";
		this.mOnlineRewardButton.pressedImageGuid = "193281";
		this.mOnlineRewardButton.disableImageGuid = "193281";
		this.bindMusicButton();

		this.mClothButton.onClicked.add(async () => {
			await AvatarEditorService.asyncOpenAvatarEditorModule();
		});

		mw.AvatarEditorService.avatarServiceDelegate.add(this.addAvatarServiceDelegate.bind(this));
	}

	private addAvatarServiceDelegate(eventName: string, ...params: unknown[]): void {
		console.error(`eventName: ${eventName}`);
		switch (eventName) {
			case "AE_OnQuit":
				this.show();
				break;
			case "AE_OnOpen":
				this.hide();
				break;
		}
	}

	/**
	 * 初始化UI
	 */
	private initUI(): void {
		this.initRedPointTween();
		this.initTaskTween();
		this.initKillTipItems();
		this.initDeadCountDown();
		this.mPointImage.visibility = mw.SlateVisibility.Collapsed;
		this.mTaskPointImage.visibility = mw.SlateVisibility.Collapsed;
		Utils.setWidgetVisibility(this.mKillTipCountCanvas, mw.SlateVisibility.Collapsed);
		Utils.setWidgetVisibility(this.mKillTipTextBlock3, mw.SlateVisibility.Collapsed);
	}

	protected onShow(...params: any[]): void {
		Console.error("[HUD-onShow]");
		this.mVirtualJoystickPanel.resetJoyStick();
		this.atk(0);
	}

	protected onHide(): void {
		Console.error("[HUD-onHide]");
		this.mVirtualJoystickPanel.resetJoyStick();
		this.mAtkButton.onPressed.clear();
		this.mAtkButton.onReleased.clear();
	}

	//#region DeadCountDown
	private initDeadCountDown(): void {
		Utils.setWidgetVisibility(this.mDeadCanvas, mw.SlateVisibility.Collapsed);
	}

	private deadCountDownInterval: any = null;
	private deadCountDown: number = 3;
	public startDeadCountDown(): void {
		this.mVirtualJoystickPanel.resetJoyStick();
		Utils.setWidgetVisibility(this.mDeadCanvas, mw.SlateVisibility.SelfHitTestInvisible);
		this.deadCountDown = 3;
		this.mDeadCountDownTextBlock.text = this.deadCountDown-- + "";
		this.clearCountDownInterval();
		this.deadCountDownInterval = TimeUtil.setInterval(() => {
			this.mDeadCountDownTextBlock.text = this.deadCountDown-- + "";
			if (this.deadCountDown < 0) this.clearCountDownInterval();
		}, 1);
	}

	private clearCountDownInterval(): void {
		if (this.deadCountDownInterval) {
			TimeUtil.clearInterval(this.deadCountDownInterval);
			this.deadCountDownInterval = null;
		}
	}

	public endDeadCountDown(): void {
		Utils.setWidgetVisibility(this.mDeadCanvas, mw.SlateVisibility.Collapsed);
		this.clearCountDownInterval();
	}
	//#endregion

	//#region 击杀提示
	private initKillTipItems(): void {
		for (let i = 0; i < 4; ++i) {
			let killTipItem = UIService.create(KillTipItem);
			killTipItem.uiObject.position = new mw.Vector2(0, 37 * i);
			Utils.setWidgetVisibility(killTipItem.uiObject, mw.SlateVisibility.Collapsed);
			this.mKillTipCanvas.addChild(killTipItem.uiObject);
			this.killTipItems.push(killTipItem);
		}
	}

	private hideKillTipIntervalId: any = null;
	private killTipItems: KillTipItem[] = [];
	private killTipDatas: KillTipData[] = [];
	public killTip(killTipType: KillTipType, killerName: string, killedName: string): void {
		let killTipData: KillTipData = new KillTipData();
		killTipData.killTipType = killTipType;
		killTipData.killerName = killerName;
		killTipData.killedName = killedName;
		if (this.killTipDatas.length >= 4) {
			this.killTipDatas.shift();
		}
		this.killTipDatas.push(killTipData);
		this.updateKillTipItems();

		this.clearHideKillTipIntervalId();
		this.hideKillTipIntervalId = TimeUtil.setInterval(() => {
			if (this.killTipDatas && this.killTipDatas.length > 0) {
				this.killTipDatas.shift();
				this.updateKillTipItems();
			} else {
				this.clearHideKillTipIntervalId();
			}
		}, 5);
	}

	private clearHideKillTipIntervalId(): void {
		if (this.hideKillTipIntervalId) {
			TimeUtil.clearInterval(this.hideKillTipIntervalId);
			this.hideKillTipIntervalId = null;
		}
	}

	private updateKillTipItems(): void {
		for (let i = 0; i < this.killTipDatas.length; ++i) {
			this.killTipItems[i].setInfo(this.killTipDatas[i]);
		}
		for (let i = this.killTipDatas.length; i < 4; ++i) {
			Utils.setWidgetVisibility(this.killTipItems[i].uiObject, mw.SlateVisibility.Collapsed);
		}
	}
	//#endregion

	//#region 连杀提示
	private killTipsTimeOutId1: any = null;
	private killTipsTimeOutId2: any = null;
	public showKillTips1(killTips: string, killerName: string, killedName: string): void {
		Notice.showDownNotice("<color=#lime>" + "<size=18>" + killerName + " 击败了 " + killedName + "</size>" + "</color>"
			+ "\n" + "<color=#red>" + killTips + "</color>");
	}

	private clearKillTipsTimeOutId1(): void {
		if (this.killTipsTimeOutId1) {
			clearTimeout(this.killTipsTimeOutId1);
			this.killTipsTimeOutId1 = null;
		}
	}

	public showKillTips2(killerName: string, killedName: string, killTipType: KillTipType): void {
		if (killTipType == KillTipType.None) return;
		this.clearKillTipsTimeOutId2();
		if (killTipType == KillTipType.Killed) {
			this.mKillTipTextBlock3.text = "你已被 " + killerName + " 击败";
		} else if (killTipType == KillTipType.revenge) {
			this.mKillTipTextBlock3.text = "击败 " + killedName + " 完成复仇";
		}
		Utils.setWidgetVisibility(this.mKillTipTextBlock3, mw.SlateVisibility.SelfHitTestInvisible);
		this.killTipsTimeOutId2 = setTimeout(() => {
			Utils.setWidgetVisibility(this.mKillTipTextBlock3, mw.SlateVisibility.Collapsed);
			this.clearKillTipsTimeOutId2();
		}, 3 * 1000);
	}

	private clearKillTipsTimeOutId2(): void {
		if (this.killTipsTimeOutId2) {
			clearTimeout(this.killTipsTimeOutId2);
			this.killTipsTimeOutId2 = null;
		}
	}
	//#endregion

	//#region Role
	private initRoleData(): void {
		this.mHpProgressBar.visibility = mw.SlateVisibility.SelfHitTestInvisible;
		this.mMpProgressBar.visibility = mw.SlateVisibility.SelfHitTestInvisible;
		AccountService.fillAvatar(this.mRoleIconImage);
	}

	public updateLvExpCoin(lv: number, exp: number, coin: number, addAtk: number): void {
		this.mLvTextBlock.text = Utils.getLvText(lv) + " 等级Lv." + lv;
		this.mExpProgressBar.currentValue = exp / ((lv + 1) * 100);
		this.mExpTextBlock.text = `经验：${Math.round(exp).toFixed(0)}/${((lv + 1) * 100)}`;
		this.mCoinTextBlock.text = coin + "";
		let atk = Math.round(Utils.getAtk(lv) * addAtk);
		GlobalData.atk = atk;
		this.mAtkTextBlock.text = "攻击力：" + atk;
		ColdWeapon.getInstance().updateHitDamage(atk);
	}

	public updateAtk(lv: number, addAtk: number): void {
		let atk = Math.round(Utils.getAtk(lv) * addAtk);
		GlobalData.atk = atk;
		this.mAtkTextBlock.text = "攻击力：" + atk;
		ColdWeapon.getInstance().updateHitDamage(atk);
	}

	public updateCoin(coin: number): void {
		this.mCoinTextBlock.text = Math.round(coin).toFixed(0) + "";
	}

	public updateMp(curMp: number, maxMp: number): void {
		this.mMpProgressBar.currentValue = curMp / maxMp;
		this.mMpTextBlock.text = `斗气：${curMp}/${maxMp}`;
	}

	public updateHp(curHp: number, maxHp: number): void {
		if (curHp < 0) curHp = 0;
		GlobalData.hp = maxHp;
		if (curHp > maxHp) curHp = maxHp;
		this.mHpProgressBar.currentValue = curHp / maxHp;
		this.mHpTextBlock.text = `血量：${curHp}/${maxHp}`;

		if (this.mHpProgressBar.currentValue == 1) {
			this.endDeadCountDown();
		} else if (this.mHpProgressBar.currentValue == 0) {
			this.startDeadCountDown();
		}
	}
	//#endregion

	//#region 攻击
	private curInputIndex: number = -1;
	private atk(index: number): void {
		this.mAtkButton.onPressed.add(() => {
			if (this.getHudModuleC.getMp < 5) {
				Notice.showDownNotice(`斗气不足`);
				Notice.showDownNotice(`升级增加斗气储量`);
				return;
			}
			if (this.curInputIndex != -1) return;
			ColdWeapon.getInstance().attack(index);
			this.curInputIndex = index;
		});
		this.mAtkButton.onReleased.add(() => {
			if (this.curInputIndex != index) return;
			ColdWeapon.getInstance().endCharge(true);
			this.curInputIndex = -1;
		});
	}
	//#endregion

	//#region 背景音乐
	/**是否打开BGM */
	private isOpenBGM: boolean = true;
	/**背景音乐事件（true-打开|false-关闭） */
	public onBgmAction: Action1<boolean> = new Action1<boolean>();
	/**切换背景音乐（-1前一首|1下一首） */
	public onSwitchBgmAction: Action1<number> = new Action1<number>();
	/**初始化背景音乐按钮 */
	private bindMusicButton(): void {
		this.mMusicCanvas.visibility = mw.SlateVisibility.Collapsed;
		this.mMusicButton.onClicked.add(() => {
			if (this.mMusicCanvas.visibility == mw.SlateVisibility.SelfHitTestInvisible) return;
			Utils.openUITween(
				this.mMusicCanvas,
				() => {
					this.mMusicCanvas.visibility = mw.SlateVisibility.SelfHitTestInvisible;
				},
				null
			);
			if (this.isOpenBGM) this.startMusicTween();
		});

		this.mOnOffMusicBtn.onClicked.add(() => {
			this.isOpenBGM = !this.isOpenBGM;
			this.onBgmAction.call(this.isOpenBGM);
			let offOnIcon: string = "";
			if (this.isOpenBGM) {
				offOnIcon = GlobalData.onMusicIconGuid;
				this.startMusicTween();
			} else {
				offOnIcon = GlobalData.offMusicIconGuid;
				this.stopMusicTween();
			}
			this.mOnOffMusicBtn.normalImageGuid = offOnIcon;
			this.mOnOffMusicBtn.pressedImageGuid = offOnIcon;
			this.mOnOffMusicBtn.disableImageGuid = offOnIcon;
		});

		this.mLeftMusicBtn.onClicked.add(() => {
			this.onSwitchBgmAction.call(-1);
		});

		this.mRightMusicBtn.onClicked.add(() => {
			this.onSwitchBgmAction.call(1);
		});

		this.mCloseMusicBtn.onClicked.add(() => {
			if (this.mMusicCanvas.visibility == mw.SlateVisibility.Collapsed) return;
			Utils.closeUITween(
				this.mMusicCanvas,
				null,
				() => {
					this.mMusicCanvas.visibility = mw.SlateVisibility.Collapsed;
				}
			);
			this.stopMusicTween();
		});
		this.initJumpyImage_1();
		this.initJumpyImage_2();
	}

	/**开始Music的Tween */
	private startMusicTween(): void {
		this.jumpyImage_1_1.start();
		this.jumpyImage_2.start();
	}

	/**停止Music的Tween */
	private stopMusicTween(): void {
		this.jumpyImage_1_1.stop();
		this.jumpyImage_1_2.stop();
		this.jumpyImage_2.stop();
	}

	private jumpyImage_1_1: Tween<any> = null;
	private jumpyImage_1_2: Tween<any> = null;
	private jumpyImageTime_1: number = 1;
	private initJumpyImage_1(): void {
		this.jumpyImage_1_1 = new Tween({ y: 0.2 })
			.to({ y: 1.5 }, this.jumpyImageTime_1 * 1000)
			.onStart(() => {
				this.mJumpyImage_1.renderScale = new mw.Vector2(1, 0.2);
			})
			.onUpdate((v) => {
				this.mJumpyImage_1.renderScale = new mw.Vector2(1, v.y);
			})
			.onComplete(() => {
				this.jumpyImage_1_2.start();
			})
			.easing(cubicBezier(.65, 2.01, .27, -0.87));

		this.jumpyImage_1_2 = new Tween({ y: 1.5 })
			.to({ y: 0.2 }, this.jumpyImageTime_1 * 1000)
			.onStart(() => {
				this.mJumpyImage_1.renderScale = new mw.Vector2(1, 1.5);
			})
			.onUpdate((v) => {
				this.mJumpyImage_1.renderScale = new mw.Vector2(1, v.y);
			})
			.onComplete(() => {
				this.jumpyImage_1_1.start();
			})
			.easing(cubicBezier(.65, 2.01, .27, -0.87));
	}

	private jumpyImage_2: Tween<any> = null;
	private jumpyImageTime_2: number = 1;
	private initJumpyImage_2(): void {
		this.jumpyImage_2 = new Tween({ angle: 0 })
			.to({ angle: 360 }, this.jumpyImageTime_2 * 1000)
			.onStart(() => {
				this.mJumpyImage_2.renderTransformAngle = 0;
			})
			.onUpdate((v) => {
				this.mJumpyImage_2.renderTransformAngle = v.angle;
			})
			.onComplete(() => {
				this.mJumpyImage_2.renderTransformAngle = 0;
			})
			.repeat(Infinity);
	}
	//#endregion

	//#region 在线奖励
	private redPointTween1: mw.Tween<any> = null;
	private redPointTween2: mw.Tween<any> = null;
	private startRedPointTween(): void {
		if (this.redPointTween1) {
			this.redPointTween1.start();
		} else {
			this.initRedPointTween();
			this.redPointTween1.start();
		}
	}
	private stopRedPointTween(): void {
		if (this.redPointTween1) {
			this.redPointTween1.stop();
		}
		if (this.redPointTween2) {
			this.redPointTween2.stop();
		}
	}
	/**
	 * 初始化在线奖励红点缓动
	 */
	private initRedPointTween(): void {
		this.redPointTween1 = new mw.Tween({ value: 0.8 })
			.to({ value: 1.2 }, 0.2 * 1000)
			.onStart(() => {
				this.mPointImage.renderScale = mw.Vector2.one.multiply(0.8);
			})
			.onUpdate((v) => {
				this.mPointImage.renderScale = mw.Vector2.one.multiply(v.value);
			})
			.onComplete(() => {
				this.redPointTween2.start();
			})
			.easing(cubicBezier(0.25, 0.1, 0.25, 1));

		this.redPointTween2 = new mw.Tween({ value: 1.2 })
			.to({ value: 0.8 }, 0.2 * 1000)
			.onStart(() => {
				this.mPointImage.renderScale = mw.Vector2.one.multiply(1.2);
			})
			.onUpdate((v) => {
				this.mPointImage.renderScale = mw.Vector2.one.multiply(v.value);
			})
			.onComplete(() => {
				this.redPointTween1.start();
			})
			.easing(cubicBezier(0.25, 0.1, 0.25, 1));
	}

	/**
	 * 更新在线奖励Icon
	 * @param icon 
	 */
	public updateOnlineRewradIcon(icon: string): void {
		if (icon == "") {
			this.stopRedPointTween();
			this.mPointImage.visibility = mw.SlateVisibility.Collapsed;
			return;
		}
		this.mOnlineRewardButton.normalImageGuid = icon;
		this.mOnlineRewardButton.pressedImageGuid = icon;
		this.mOnlineRewardButton.disableImageGuid = icon;
		this.mPointImage.visibility = mw.SlateVisibility.SelfHitTestInvisible;
		this.startRedPointTween();
	}
	//#endregion

	//#region 任务
	private taskRedPointTween1: mw.Tween<any> = null;
	private taskRedPointTween2: mw.Tween<any> = null;
	public startTaskRedPointTween(): void {
		if (this.taskRedPointTween1) {
			this.taskRedPointTween1.start();
		} else {
			this.initTaskTween();
			this.taskRedPointTween1.start();
		}
		this.mTaskPointImage.visibility = mw.SlateVisibility.SelfHitTestInvisible;
	}
	public stopTaskRedPointTween(): void {
		if (this.taskRedPointTween1) {
			this.taskRedPointTween1.stop();
		}
		if (this.taskRedPointTween2) {
			this.taskRedPointTween2.stop();
		}
		this.mTaskPointImage.visibility = mw.SlateVisibility.Collapsed;
	}
	private initTaskTween(): void {
		this.taskRedPointTween1 = new mw.Tween({ value: 0.8 })
			.to({ value: 1.2 }, 0.2 * 1000)
			.onStart(() => {
				this.mTaskPointImage.renderScale = mw.Vector2.one.multiply(0.8);
			})
			.onUpdate((v) => {
				this.mTaskPointImage.renderScale = mw.Vector2.one.multiply(v.value);
			})
			.onComplete(() => {
				this.taskRedPointTween2.start();
			})
			.easing(cubicBezier(0.25, 0.1, 0.25, 1));

		this.taskRedPointTween2 = new mw.Tween({ value: 1.2 })
			.to({ value: 0.8 }, 0.2 * 1000)
			.onStart(() => {
				this.mTaskPointImage.renderScale = mw.Vector2.one.multiply(1.2);
			})
			.onUpdate((v) => {
				this.mTaskPointImage.renderScale = mw.Vector2.one.multiply(v.value);
			})
			.onComplete(() => {
				this.taskRedPointTween1.start();
			})
			.easing(cubicBezier(0.25, 0.1, 0.25, 1));
	}

	public updateHUDText(text: string): void {
		this.mOnlineRewardTextBlock.text = text;
	}

	//#endregion
	//#endregion
}

export class KillTipItem extends KillTipItem_Generate {
	protected onAwake(): void {

	}

	public setInfo(killTipDatas: KillTipData): void {
		this.mKillerTextBlock.text = killTipDatas.killerName;
		this.mKilledTextBlock.text = killTipDatas.killedName;
		switch (killTipDatas.killTipType) {
			case KillTipType.None:
				this.mKillerTextBlock.fontColor = mw.LinearColor.white;
				this.mKillerTextBlock.shadowColor = mw.LinearColor.white;
				this.mKilledTextBlock.fontColor = mw.LinearColor.white;
				this.mKilledTextBlock.shadowColor = mw.LinearColor.white;
				break;
			case KillTipType.Killer:
				this.mKillerTextBlock.fontColor = mw.LinearColor.yellow;
				this.mKillerTextBlock.shadowColor = mw.LinearColor.red;
				this.mKilledTextBlock.fontColor = mw.LinearColor.white;
				this.mKilledTextBlock.shadowColor = mw.LinearColor.white;
				break;
			case KillTipType.Killed:
				this.mKillerTextBlock.fontColor = mw.LinearColor.white;
				this.mKillerTextBlock.shadowColor = mw.LinearColor.white;
				this.mKilledTextBlock.fontColor = mw.LinearColor.yellow;
				this.mKilledTextBlock.shadowColor = mw.LinearColor.red;
				break;
			default:
				break;
		}
		Utils.setWidgetVisibility(this.uiObject, mw.SlateVisibility.SelfHitTestInvisible);
		setTimeout(() => {
			this.mBgImage.size = new mw.Vector2(this.mMainCanvas.size.x + 20, this.mMainCanvas.size.y);
		}, 1);
	}
}