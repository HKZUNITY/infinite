
/** 
 * AUTHOR: 爱玩游戏的小胖子
 * TIME: 2023.07.21-21.54.50
 */

import { ColdWeapon } from "../../../Prefabs/冷兵器/Script/ColdWeapon";
import Console from "../../../Tools/Console";
import { Tween, Utils, cubicBezier } from "../../../Tools/utils";
import { Notice } from "../../../common/notice/Notice";
import { GameConfig } from "../../../config/GameConfig";
import GlobalData from "../../../const/GlobalData";
import HUDPanel_Generate from "../../../ui-generate/module/HUDModule/HUDPanel_generate";
import KillTipItem_Generate from "../../../ui-generate/module/HUDModule/KillTipItem_generate";
import { FlyModuleC } from "../../FlyModule/FlyModule";
import { RingSoulModuleC } from "../../RingSoulModule/RingSoulModule";
import HUDModuleC, { KillTipData, KillTipType } from "../HUDModuleC";

export default class HUDPanel extends HUDPanel_Generate {
	private hudModuleC: HUDModuleC = null;
	private get getHudModuleC(): HUDModuleC {
		if (!this.hudModuleC) {
			this.hudModuleC = ModuleService.getModule(HUDModuleC);
		}
		return this.hudModuleC;
	}
	private ringSoulModuleC: RingSoulModuleC = null;
	private get getRingSoulModuleC(): RingSoulModuleC {
		if (!this.ringSoulModuleC) {
			this.ringSoulModuleC = ModuleService.getModule(RingSoulModuleC);
		}
		return this.ringSoulModuleC;
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
		this.initTextBlock();
	}

	private initTextBlock(): void {
		this.mFlyTextBlock.text = GameConfig.Language.Text_SwordFlying.Value;
		this.mAutoAtkTextBlock.text = GameConfig.Language.Text_AutomaticAttack.Value;
		this.mMusicTextBlock.text = GameConfig.Language.Text_BackgroundMusic.Value;
		this.mHomeTextBlock.text = GameConfig.Language.Text_ClickOnMeToGoHome.Value;
		this.mShopTextBlock.text = GameConfig.Language.Text_Knapsack.Value;
		this.mRankTextBlock.text = GameConfig.Language.Text_RankingList.Value;
		this.mLotteryTextBlock.text = GameConfig.Language.Text_GoldCoinLottery.Value;
		this.mTaskTextBlock.text = GameConfig.Language.Text_CollectingTasks.Value;
		this.mSignInTextBlock.text = GameConfig.Language.Text_SignIn.Value;
		this.mAdsTextBlock.text = GameConfig.Language.Text_FreeUpgrade_Simoleness.Value;
		this.mArkTextBlock.text = GameConfig.Language.Text_RechargeDiamonds.Value;
		this.mGetTextBlock.text = GameConfig.Language.Text_ExchangeRewards.Value;
		this.mRingSoulTextBlock.text = GameConfig.Language.Text_ForgeSoulRings.Value;
		this.mNewPeopleTextBlock.text = GameConfig.Language.Text_NoviceGiftPack.Value;
		this.mSwordTextBlock.text = GameConfig.Language.Text_SwordFlying.Value;
		this.mSoulBoneTextBlock.text = GameConfig.Language.Text_ForgeSoulBones.Value;
		this.mTipsInvincibleTextBlock.text = GameConfig.Language.Text_DoYouWantToActivateTeammateAccidentalInjury.Value;
		this.mUpExpTextBlock.text = GameConfig.Language.Text_EnableAfk.Value;

		if (GlobalData.languageId == 0) {
			this.mTipsInvincibleTextBlock.fontSize = 10;
			this.mInvincibleTextBlock.fontSize = 15;
			this.mShopTextBlock.fontSize = 18;
			this.mArkTextBlock.fontSize = 18;
			this.mGetTextBlock.fontSize = 18;
		} else {
			this.mTipsInvincibleTextBlock.fontSize = 18;
			this.mInvincibleTextBlock.fontSize = 25;
			this.mShopTextBlock.fontSize = 20;
			this.mArkTextBlock.fontSize = 20;
			this.mGetTextBlock.fontSize = 20;
		}
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
			this.getHudModuleC.onOnOffFlyAction.call(false);
			this.isOpenAuto = false;
			this.getHudModuleC.onOpenAutoAtkAction.call(null, this.isOpenAuto);
		});
		this.mSprintButton.onClicked.add(() => {
			this.getHudModuleC.onSprintAction.call();
			this.getHudModuleC.onOnOffFlyAction.call(false);
			this.isOpenAuto = false;
			this.getHudModuleC.onOpenAutoAtkAction.call(null, this.isOpenAuto);
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
		this.mAddDiamondButton.onClicked.add(() => {
			this.getHudModuleC.onAddDiamondAction.call();
		});
		this.mAddBoneButton.onClicked.add(() => {
			this.getHudModuleC.onAddBoneAction.call();
		});
		this.mAdsButton.onClicked.add(() => {
			this.getHudModuleC.onAdsAction.call();
		});
		this.mUpLvButton.onClicked.add(() => {
			this.getHudModuleC.onAdsAction.call();
		});
		this.mRingSoulButton.onClicked.add(() => {
			this.getHudModuleC.onOpenRingSoulAction.call();
		});
		let isInvincible: boolean = false;
		this.mInvincibleTextBlock.text = GameConfig.Language.Text_DefenseHasBeenTurnedOff.Value;
		this.mInvincibleButton.onClicked.add(() => {
			isInvincible = !isInvincible;
			this.mInvincibleTextBlock.text = isInvincible ? GameConfig.Language.Text_DefenseActivated.Value : GameConfig.Language.Text_DefenseHasBeenTurnedOff.Value;
			this.getHudModuleC.onInvincibleAction.call(isInvincible);
		});
		this.mOnlineRewardButton.normalImageGuid = "193281";
		this.mOnlineRewardButton.pressedImageGuid = "193281";
		this.mOnlineRewardButton.disableImageGuid = "193281";
		this.bindMusicButton();

		let isOpenRingSoul: boolean = true;
		this.mOnOffRingSoulTextBlock.text = isOpenRingSoul ? GameConfig.Language.Text_PutItAway.Value : GameConfig.Language.Text_Open.Value;
		this.mOnOffRingSoulButton.onClicked.add(() => {
			if (!this.getRingSoulModuleC.isCanOpenRingSoul) return;
			if (!this.isCanOnRingSoul) {
				Notice.showDownNotice(StringUtil.format(GameConfig.Language.Text_CoolForSeconds.Value, 5));
				return;
			}
			this.isCanOnRingSoul = false;
			TimeUtil.delaySecond(5).then(() => {
				this.isCanOnRingSoul = true;
			});
			isOpenRingSoul = !isOpenRingSoul;
			this.mOnOffRingSoulTextBlock.text = isOpenRingSoul ? GameConfig.Language.Text_PutItAway.Value : GameConfig.Language.Text_Open.Value;
			this.getHudModuleC.onOnOffRingSoulAction.call(isOpenRingSoul);
		});
		this.mArkButton.onClicked.add(() => {
			this.getHudModuleC.onOpenArkAction.call();
		});
		this.mSignInButton.onClicked.add(() => {
			this.getHudModuleC.onOpenSignInAction.call();
		});
		this.mGetButton.onClicked.add(() => {
			this.getHudModuleC.onOpenGetAction.call();
		});
		this.mUpExpButton.onClicked.add(() => {
			this.getHudModuleC.onOnOffUpExpAction.call(true);
			this.getHudModuleC.onOnOffFlyAction.call(false);
			this.isOpenAuto = false;
			this.getHudModuleC.onOpenAutoAtkAction.call(null, this.isOpenAuto);
		});
		this.mNewPeopleButton.onClicked.add(() => {
			this.getHudModuleC.onOpenNewPeopleAction.call();
		});
		this.mLotteryButton.onClicked.add(() => {
			this.getHudModuleC.onOpenLotteryAction.call();
		});
		this.mFlyButton.onClicked.add(() => {
			this.isOpenAuto = false;
			this.getHudModuleC.onOpenAutoAtkAction.call(null, this.isOpenAuto);
			this.getHudModuleC.onOnOffFlyAction.call(true);
		});
		this.mSwordButton.onClicked.add(() => {
			this.getHudModuleC.onOpenSwordAction.call();
		});
		this.mSoulBoneButton.onClicked.add(() => {
			this.getHudModuleC.onOpenSoulBoneAction.call();
		});
		this.initSkill_1();
		this.initAutoAtk();
	}

	public updateInvincibleCanvasState(visibility: boolean): void {
		Utils.setWidgetVisibility(this.mInvincibleCanvas, visibility ? mw.SlateVisibility.SelfHitTestInvisible : mw.SlateVisibility.Collapsed);
		this.mInvincibleTextBlock.text = visibility ? GameConfig.Language.Text_DefenseActivated.Value : GameConfig.Language.Text_DefenseHasBeenTurnedOff.Value;
	}

	private isCanOnRingSoul: boolean = true;

	/**
	 * 初始化UI
	 */
	private initUI(): void {
		this.initRedPointTween();
		this.initTaskTween();
		this.initRedPointTween_RingSou();
		this.initRedPointTween_SoulBone();
		this.initRedPointTween_SignIn();
		this.initRedPointTween_Ark();
		this.initRedPointTween_NewPeople();
		this.initRedPointTween_Lottery();
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
			if (this.deadCountDown < 0) {
				this.clearCountDownInterval();
				this.endDeadCountDown();
			}
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
		Notice.showDownNotice("<color=#lime>" + "<size=18>" + killerName + ` ${GameConfig.Language.Text_Defeated.Value} ` + killedName + "</size>" + "</color>"
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
			this.mKillTipTextBlock3.text = StringUtil.format(GameConfig.Language.Text_YouHaveBeenDefeatedBy.Value, killerName);
		} else if (killTipType == KillTipType.revenge) {
			this.mKillTipTextBlock3.text = StringUtil.format(GameConfig.Language.Text_DefeatToCompleteRevenge.Value, killedName);
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

	public async updateLvExpCoin(lv: number, exp: number, coin: number, addAtk: number): Promise<void> {
		this.mLvTextBlock.text = `${GameConfig.Language.Text_Grade_MaoHao.Value}${await Utils.getLvText(lv, Player.localPlayer.userId)}`;
		this.mExpProgressBar.currentValue = exp / ((lv + 1) * GlobalData.upgradeExpMultiple);
		this.mExpTextBlock.text = `${GameConfig.Language.Text_Experience.Value}${Math.round(exp).toFixed(0)}/${((lv + 1) * GlobalData.upgradeExpMultiple)}`;
		this.mCoinTextBlock.text = `${Utils.integerUnitConversionStr(Math.round(coin))}`
		Event.dispatchToLocal(`UpdateCoinTextBlock`, coin);
		let atk = Math.round(Utils.getAtk(lv) * addAtk);
		GlobalData.atk = atk;
		this.mAtkTextBlock.text = `${GameConfig.Language.Text_Aggressivity.Value}${atk}`;
		ColdWeapon.getInstance().updateHitDamage(atk);

		if (!this.isUnlockSkill_1) {
			if (lv >= GlobalData.skillLvLimit_1) {
				this.isUnlockSkill_1 = true;
				this.mSkillCDTextBlock_1.fontSize = 50;
				this.mSkillCDTextBlock_1.text = ``;
			} else {
				this.mSkillCDTextBlock_1.fontSize = 25;
				this.mSkillCDTextBlock_1.text = `${GlobalData.skillLvLimit_1}${GameConfig.Language.Text_LevelUnlock.Value}`;
			}
		}
	}

	public updateAtk(lv: number, addAtk: number): void {
		let atk = Math.round(Utils.getAtk(lv) * addAtk);
		GlobalData.atk = atk;
		this.mAtkTextBlock.text = `${GameConfig.Language.Text_Aggressivity.Value}${atk}`;
		ColdWeapon.getInstance().updateHitDamage(atk);
	}

	public updateBone(bone: number): void {
		this.mBoneextBlock.text = `${bone}`;
	}

	public updateCoin(coin: number): void {
		this.mCoinTextBlock.text = `${Utils.integerUnitConversionStr(Math.round(coin))}`;
		Event.dispatchToLocal(`UpdateCoinTextBlock`, coin);
	}

	public updateDiamond(diamond: number): void {
		this.mDiamondTextBlock.text = `${diamond}`;
		Event.dispatchToLocal(`UpdateDiamondTextBlock`, diamond);
	}

	public updateMp(curMp: number, maxMp: number): void {
		this.mMpProgressBar.currentValue = curMp / maxMp;
		this.mMpTextBlock.text = `${GlobalData.mpStr}：${curMp}/${maxMp}`;
	}

	public updateHp(curHp: number, maxHp: number): void {
		if (curHp < 0) curHp = 0;
		GlobalData.hp = maxHp;
		if (curHp > maxHp) curHp = maxHp;
		this.mHpProgressBar.currentValue = curHp / maxHp;
		this.mHpTextBlock.text = `${GameConfig.Language.Text_BloodVolume.Value}${curHp}/${maxHp}`;

		if (this.mHpProgressBar.currentValue == 1) {
			this.endDeadCountDown();
			// this.getHudModuleC.onOnOffFlyAction.call(true);
		} else if (this.mHpProgressBar.currentValue == 0) {
			this.startDeadCountDown();
			this.getHudModuleC.onOnOffFlyAction.call(false);
			this.isOpenAuto = false;
			this.getHudModuleC.onOpenAutoAtkAction.call(null, this.isOpenAuto);
		}
	}
	//#endregion

	//#region 攻击
	private curInputIndex: number = -1;
	private atk(index: number): void {
		this.mAtkButton.onPressed.add(() => {
			if (this.getHudModuleC.getMp < 5) {
				Notice.showDownNotice(`${GlobalData.mpStr}${GameConfig.Language.Text_Insufficient.Value}`);
				Notice.showDownNotice(StringUtil.format(GameConfig.Language.Text_UpgradeToIncreaseReserves.Value, GlobalData.mpStr));
				return;
			}
			if (this.curInputIndex != -1) return;
			this.getHudModuleC.onOnOffFlyAction.call(false);
			this.isOpenAuto = false;
			this.getHudModuleC.onOpenAutoAtkAction.call(null, this.isOpenAuto);
			ColdWeapon.getInstance().attack(index);
			this.curInputIndex = index;
		});
		this.mAtkButton.onReleased.add(() => {
			if (this.curInputIndex != index) return;
			ColdWeapon.getInstance().endCharge(true);
			this.curInputIndex = -1;
		});
	}

	private isUnlockSkill_1: boolean = false;
	private skillIsCanAtk_1: boolean = true;
	private initSkill_1(): void {
		this.mSkillTextBlock_1.text = `<size=20>${GlobalData.skillName_1}</size>\n<size=10>${GlobalData.skillContinue_1}${GameConfig.Language.Text_DoubleTheAttackPowerWithinSeconds.Value}</size>`;
		this.mSkillMaskButton_1.fanShapedValue = 1;
		this.mSkillMaskButton_1.clickedDelegate.add(() => {
			Event.dispatchToLocal("PlayButtonClick", this.mSkillMaskButton_1.name);
			if (!this.isUnlockSkill_1) {
				Notice.showDownNotice(`${GlobalData.skillLvLimit_1}${GameConfig.Language.Text_LevelOpen.Value}${GlobalData.skillName_1}`);
				return;
			}
			if (!this.skillIsCanAtk_1) {
				Notice.showDownNotice(GameConfig.Language.Text_TheSkillsAreNotReadyYet.Value);
				return;
			}
			this.getHudModuleC.onSkillAction.call((isCakAtk: boolean) => {
				if (!isCakAtk) return;
				this.getHudModuleC.onOnOffFlyAction.call(false);
				new Tween({ fanShapedValue: 0 })
					.to({ fanShapedValue: 1 }, GlobalData.skillCD_1 * 1000)
					.onStart(() => {
						this.mSkillMaskButton_1.fanShapedValue = 0;
						this.skillIsCanAtk_1 = false;
						this.mSkillCDTextBlock_1.text = `${GlobalData.skillCD_1}`;
					})
					.onUpdate((v) => {
						this.mSkillMaskButton_1.fanShapedValue = v.fanShapedValue;
						this.mSkillCDTextBlock_1.text = `${(GlobalData.skillCD_1 * (1 - v.fanShapedValue)).toFixed(0)}`;
					})
					.onComplete(() => {
						this.mSkillMaskButton_1.fanShapedValue = 1;
						this.skillIsCanAtk_1 = true;
						this.mSkillCDTextBlock_1.text = ``;
					})
					.start();
			});
		});
	}

	private isOpenAuto: boolean = false;
	private initAutoAtk(): void {
		this.mAutoAtkButton.onClicked.add(() => {
			this.getHudModuleC.onOpenAutoAtkAction.call((isCanOpen: boolean) => {
				this.isOpenAuto = isCanOpen;
			}, !this.isOpenAuto);
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

	//#region RingSoul
	private redPointTween1_RingSou: mw.Tween<any> = null;
	private redPointTween2_RingSou: mw.Tween<any> = null;

	private initRedPointTween_RingSou(): void {
		this.redPointTween1_RingSou = new mw.Tween({ value: 0.8 })
			.to({ value: 1.2 }, 0.2 * 1000)
			.onStart(() => {
				this.mRingSoulPointImage.renderScale = mw.Vector2.one.multiply(0.8);
			})
			.onUpdate((v) => {
				this.mRingSoulPointImage.renderScale = mw.Vector2.one.multiply(v.value);
			})
			.onComplete(() => {
				this.redPointTween2_RingSou.start();
			})
			.easing(cubicBezier(0.25, 0.1, 0.25, 1));

		this.redPointTween2_RingSou = new mw.Tween({ value: 1.2 })
			.to({ value: 0.8 }, 0.2 * 1000)
			.onStart(() => {
				this.mRingSoulPointImage.renderScale = mw.Vector2.one.multiply(1.2);
			})
			.onUpdate((v) => {
				this.mRingSoulPointImage.renderScale = mw.Vector2.one.multiply(v.value);
			})
			.onComplete(() => {
				this.redPointTween1_RingSou.start();
			})
			.easing(cubicBezier(0.25, 0.1, 0.25, 1));

		this.redPointTween1_RingSou.start();

		let onOffRingSoulTween1 = new mw.Tween({ angle: 0 })
			.to({ angle: 360 }, 2 * 1000)
			.onUpdate((v) => {
				this.mOnOffRingSoulButton.renderTransformAngle = v.angle;
			})
			.onComplete(() => {
				onOffRingSoulTween2.start();
			});

		let onOffRingSoulTween2 = new mw.Tween({ angle: 0 })
			.to({ angle: 360 }, 2 * 1000)
			.onUpdate((v) => {
				this.mOnOffRingSoulButton.renderTransformAngle = v.angle;
			})
			.onComplete(() => {
				onOffRingSoulTween1.start();
			});

		onOffRingSoulTween1.start();
	}
	//#endregion

	//#region SoulBone
	private redPointTween1_SoulBone: mw.Tween<any> = null;
	private redPointTween2_SoulBone: mw.Tween<any> = null;

	private initRedPointTween_SoulBone(): void {
		this.redPointTween1_SoulBone = new mw.Tween({ value: 0.8 })
			.to({ value: 1.2 }, 0.2 * 1000)
			.onStart(() => {
				this.mSoulBonePointImage.renderScale = mw.Vector2.one.multiply(0.8);
			})
			.onUpdate((v) => {
				this.mSoulBonePointImage.renderScale = mw.Vector2.one.multiply(v.value);
			})
			.onComplete(() => {
				this.redPointTween2_SoulBone.start();
			})
			.easing(cubicBezier(0.25, 0.1, 0.25, 1));

		this.redPointTween2_SoulBone = new mw.Tween({ value: 1.2 })
			.to({ value: 0.8 }, 0.2 * 1000)
			.onStart(() => {
				this.mSoulBonePointImage.renderScale = mw.Vector2.one.multiply(1.2);
			})
			.onUpdate((v) => {
				this.mSoulBonePointImage.renderScale = mw.Vector2.one.multiply(v.value);
			})
			.onComplete(() => {
				this.redPointTween1_SoulBone.start();
			})
			.easing(cubicBezier(0.25, 0.1, 0.25, 1));

		this.redPointTween1_SoulBone.start();
	}
	//#endregion

	//#region SignIn
	private redPointTween1_SignIn: mw.Tween<any> = null;
	private redPointTween2_SignIn: mw.Tween<any> = null;

	private initRedPointTween_SignIn(): void {
		this.redPointTween1_SignIn = new mw.Tween({ value: 0.8 })
			.to({ value: 1.2 }, 0.2 * 1000)
			.onStart(() => {
				this.mSignInImage.renderScale = mw.Vector2.one.multiply(0.8);
			})
			.onUpdate((v) => {
				this.mSignInImage.renderScale = mw.Vector2.one.multiply(v.value);
			})
			.onComplete(() => {
				this.redPointTween2_SignIn.start();
			})
			.easing(cubicBezier(0.25, 0.1, 0.25, 1));

		this.redPointTween2_SignIn = new mw.Tween({ value: 1.2 })
			.to({ value: 0.8 }, 0.2 * 1000)
			.onStart(() => {
				this.mSignInImage.renderScale = mw.Vector2.one.multiply(1.2);
			})
			.onUpdate((v) => {
				this.mSignInImage.renderScale = mw.Vector2.one.multiply(v.value);
			})
			.onComplete(() => {
				this.redPointTween1_SignIn.start();
			})
			.easing(cubicBezier(0.25, 0.1, 0.25, 1));

		this.redPointTween1_SignIn.start();
	}
	//#endregion

	//#region Ark
	private redPointTween1_Ark: mw.Tween<any> = null;
	private redPointTween2_Ark: mw.Tween<any> = null;

	private initRedPointTween_Ark(): void {
		this.redPointTween1_Ark = new mw.Tween({ value: 0.8 })
			.to({ value: 1.2 }, 0.2 * 1000)
			.onStart(() => {
				this.mArkImage.renderScale = mw.Vector2.one.multiply(0.8);
			})
			.onUpdate((v) => {
				this.mArkImage.renderScale = mw.Vector2.one.multiply(v.value);
			})
			.onComplete(() => {
				this.redPointTween2_Ark.start();
			})
			.easing(cubicBezier(0.25, 0.1, 0.25, 1));

		this.redPointTween2_Ark = new mw.Tween({ value: 1.2 })
			.to({ value: 0.8 }, 0.2 * 1000)
			.onStart(() => {
				this.mArkImage.renderScale = mw.Vector2.one.multiply(1.2);
			})
			.onUpdate((v) => {
				this.mArkImage.renderScale = mw.Vector2.one.multiply(v.value);
			})
			.onComplete(() => {
				this.redPointTween1_Ark.start();
			})
			.easing(cubicBezier(0.25, 0.1, 0.25, 1));

		this.redPointTween1_Ark.start();
	}
	//#endregion

	//#region NewPeople
	private redPointTween1_NewPeople: mw.Tween<any> = null;
	private redPointTween2_NewPeople: mw.Tween<any> = null;

	private initRedPointTween_NewPeople(): void {
		this.redPointTween1_NewPeople = new mw.Tween({ value: 0.8 })
			.to({ value: 1.2 }, 0.2 * 1000)
			.onStart(() => {
				this.mNewPeoplePointImage.renderScale = mw.Vector2.one.multiply(0.8);
			})
			.onUpdate((v) => {
				this.mNewPeoplePointImage.renderScale = mw.Vector2.one.multiply(v.value);
			})
			.onComplete(() => {
				this.redPointTween2_NewPeople.start();
			})
			.easing(cubicBezier(0.25, 0.1, 0.25, 1));

		this.redPointTween2_NewPeople = new mw.Tween({ value: 1.2 })
			.to({ value: 0.8 }, 0.2 * 1000)
			.onStart(() => {
				this.mNewPeoplePointImage.renderScale = mw.Vector2.one.multiply(1.2);
			})
			.onUpdate((v) => {
				this.mNewPeoplePointImage.renderScale = mw.Vector2.one.multiply(v.value);
			})
			.onComplete(() => {
				this.redPointTween1_NewPeople.start();
			})
			.easing(cubicBezier(0.25, 0.1, 0.25, 1));

		this.redPointTween1_NewPeople.start();
	}
	//#endregion

	//#region Lottery
	private redPointTween1_Lottery: mw.Tween<any> = null;
	private redPointTween2_Lottery: mw.Tween<any> = null;

	private initRedPointTween_Lottery(): void {
		this.redPointTween1_Lottery = new mw.Tween({ value: 0.8 })
			.to({ value: 1.2 }, 0.2 * 1000)
			.onStart(() => {
				this.mLotteryPointImage.renderScale = mw.Vector2.one.multiply(0.8);
			})
			.onUpdate((v) => {
				this.mLotteryPointImage.renderScale = mw.Vector2.one.multiply(v.value);
			})
			.onComplete(() => {
				this.redPointTween2_Lottery.start();
			})
			.easing(cubicBezier(0.25, 0.1, 0.25, 1));

		this.redPointTween2_Lottery = new mw.Tween({ value: 1.2 })
			.to({ value: 0.8 }, 0.2 * 1000)
			.onStart(() => {
				this.mLotteryPointImage.renderScale = mw.Vector2.one.multiply(1.2);
			})
			.onUpdate((v) => {
				this.mLotteryPointImage.renderScale = mw.Vector2.one.multiply(v.value);
			})
			.onComplete(() => {
				this.redPointTween1_Lottery.start();
			})
			.easing(cubicBezier(0.25, 0.1, 0.25, 1));

		this.redPointTween1_Lottery.start();
	}
	//#endregion
	//#endregion

	private dayStrTime: number = 0;
	public showDayStr(): void {
		Utils.setWidgetVisibility(this.mDayStrCanvas, mw.SlateVisibility.SelfHitTestInvisible);
		Event.addLocalListener(`UpdateNewPeopleGiftBagOnlineTime`, (time: number) => {
			this.dayStrTime = time;
			this.mDayStrTimeTextBlock.text = `在线${this.dayStrTime}/30分钟免费领取`;
		});
		Event.dispatchToLocal(`RequestNewPeopleGiftBagOnlineTime`);
		this.mDayStrButton.onClicked.add(() => {
			if (this.dayStrTime < 30) {
				Notice.showDownNotice(`在线时间不足30分钟`);
				return;
			}
			this.getHudModuleC.getDayStr();
			Utils.setWidgetVisibility(this.mDayStrCanvas, mw.SlateVisibility.Collapsed);
		});
	}
}

export class KillTipItem extends KillTipItem_Generate {
	protected onAwake(): void {
		this.initTextBlock();
	}

	private initTextBlock(): void {
		this.mKillTextBlock.text = ` ${GameConfig.Language.Text_Defeated.Value} `
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