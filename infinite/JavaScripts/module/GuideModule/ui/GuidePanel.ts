
/** 
 * AUTHOR: 穿迷彩服的鲨鱼
 * TIME: 2023.09.26-13.56.59
 */

import { GameConfig } from "../../../config/GameConfig";
import GlobalData from "../../../const/GlobalData";
import GuideUI_Generate from "../../../ui-generate/module/GuideModule/GuideUI_generate";
import HUDPanel from "../../HUDModule/ui/HUDPanel";
import { GuideModuleC } from "../GuideModule";

export default class GuidePanel extends GuideUI_Generate {
	private canClick: boolean = false;

	/**
	 * 接收空间坐标
	 */
	private outPixelPos: mw.Vector2 = new mw.Vector2(0, 0);
	/**
	 * 用于接收视口坐标
	 */
	private outViewPos: mw.Vector2 = new mw.Vector2(0, 0);
	/** 
	 * 构造UI文件成功后，在合适的时机最先初始化一次 
	 */
	protected onStart() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerMiddle;
		this.initData();
		this.bindButton();
		this.initTextBlock();
	}

	private guideModuleC: GuideModuleC = null;
	private get getGuideModuleC(): GuideModuleC {
		if (!this.guideModuleC) {
			this.guideModuleC = ModuleService.getModule(GuideModuleC);
		}
		return this.guideModuleC;
	}
	private hudPanel: HUDPanel = null;
	private get getHudPanel(): HUDPanel {
		if (!this.hudPanel) {
			this.hudPanel = mw.UIService.getUI(HUDPanel);
		}
		return this.hudPanel
	}

	private initTextBlock(): void {
		this.mContinueClickTextBlock.text = GameConfig.Language.Text_ClickAnywhereToContinue.Value;
	}

	private centPos: mw.Vector2 = mw.Vector2.zero;
	private initData(): void {
		this.centPos = new mw.Vector(this.getHudPanel.rootCanvas.size.x / 2 - this.container.size.x / 2, this.getHudPanel.rootCanvas.size.y / 2 - this.container.size.y / 2);
	}

	private bindButton(): void {
		this.button.onClicked.add(() => {
			if (this.canClick) {
				this.canClick = false;
				this.hide();
				this.getGuideModuleC.onNextStepAction.call();
			}
		});
	}

	// 实际逻辑写的地方
	guideByStep(step: number) {
		this.show();
		this.setVisibility(this.button, true)
		this.bg.visibility = mw.SlateVisibility.Collapsed;

		switch (step) {
			case 0:
				this.guide0();
				break;
			case 1:// 第一步
				this.guide1();
				break;
			case 2:// 第二步
				this.guide2();
				break;
			case 3:// 第三步
				this.guide3();
				break;
			case 4:
				this.guide4();
				break;
			case 5:
				this.guide5();
				break;
			case 6:
				this.guide6();
				break;
			case 7:
				this.guide7();
				break;
			case 8:
				this.guide8();
				break;
			case 9:
				this.guide9();
				break;
			case 10:
				this.guide10();
				break;
			case 11:
				this.guide11();
				break;
			case 12:
				this.guide12();
				break;
			case 13:
				this.guide13();
				break;
			case 14:
				this.guide14();
				break;
			case 15:
				this.guide15();
				break;
			case 16:
				this.guide16();
				break;
			case 17:
				this.guide17();
				break;
			case 18:
				this.guide18();
				break;
			case 19:
				this.guide19();
				break;
			case 20:
				this.guide20();
				break;
			case 21:
				this.guide21();
				break;
			case 22:
				this.guide22();
				break;
			case 23:
				this.guide23();
				break;
			case 24:
				this.guide24();
				break;
			case 25:
				this.guide25();
				break;
			case 26:
				this.guide26();
				break;
			case 27:
				this.guide27();
				break;
			case 28:
				this.guide28();
				break;
			// 可以继续增加无数步
			default:
				this.hide();
				break;
		}
	}
	private guide0(): void {
		this.cover(new mw.Vector2(0, 0), new mw.Vector2(0, 0),
			this.centPos, StringUtil.format(GameConfig.Language.Text_Guid_0.Value, GlobalData.gameName), 0, true)
	}

	private guide1(): void {
		mw.localToViewport(this.getHudPanel.mVirtualJoystickPanel.tickSpaceGeometry, mw.Vector2.zero, this.outPixelPos, this.outViewPos);
		this.cover(this.outViewPos, this.getHudPanel.mVirtualJoystickPanel.size,
			new mw.Vector2(900, 200), GameConfig.Language.Text_Guid_1.Value, 0, true)
	}

	private guide2(): void {
		mw.localToViewport(this.getHudPanel.mTouchPad.tickSpaceGeometry, mw.Vector2.zero, this.outPixelPos, this.outViewPos);
		this.cover(this.outViewPos, this.getHudPanel.mTouchPad.size,
			new mw.Vector2(0, 250), GameConfig.Language.Text_Guid_2.Value, 0, true)
	}

	private guide3(): void {
		mw.localToViewport(this.getHudPanel.mJumpButton.tickSpaceGeometry, mw.Vector2.zero, this.outPixelPos, this.outViewPos);
		this.cover(this.outViewPos, this.getHudPanel.mJumpButton.size,
			new mw.Vector2(700, 350), StringUtil.format(GameConfig.Language.Text_Guid_3.Value, GlobalData.mpStr), 0, true)
	}

	private guide4(): void {
		mw.localToViewport(this.getHudPanel.mFlyButton.tickSpaceGeometry, mw.Vector2.zero, this.outPixelPos, this.outViewPos);
		this.cover(this.outViewPos, this.getHudPanel.mFlyButton.size,
			new mw.Vector2(500, 550), GameConfig.Language.Text_Guid_4.Value, 0, true)
	}

	// private guide4(): void {
	// 	mw.localToViewport(this.getHudPanel.mSprintButton.tickSpaceGeometry, mw.Vector2.zero, this.outPixelPos, this.outViewPos);
	// 	this.cover(this.outViewPos, this.getHudPanel.mSprintButton.size,
	// 		new mw.Vector2(500, 550), `冲刺按钮，可以直接瞬移一段距离，会消耗${GlobalData.mpStr}。`, 0, true)
	// }

	private guide5(): void {
		mw.localToViewport(this.getHudPanel.mAtkButton.tickSpaceGeometry, mw.Vector2.zero, this.outPixelPos, this.outViewPos);
		this.cover(this.outViewPos, this.getHudPanel.mAtkButton.size,
			new mw.Vector2(400, 550), StringUtil.format(GameConfig.Language.Text_Guid_5.Value, GlobalData.mpStr), 0, true)
	}

	private guide6(): void {
		mw.localToViewport(this.getHudPanel.mAutoAtkButton.tickSpaceGeometry, mw.Vector2.zero, this.outPixelPos, this.outViewPos);
		this.cover(this.outViewPos, this.getHudPanel.mAutoAtkButton.size,
			new mw.Vector2(400, 550), GameConfig.Language.Text_Guid_6.Value, 0, true)
	}

	private guide7(): void {
		mw.localToViewport(this.getHudPanel.mOnOffRingSoulCanvas.tickSpaceGeometry, mw.Vector2.zero, this.outPixelPos, this.outViewPos);
		this.cover(this.outViewPos, this.getHudPanel.mOnOffRingSoulCanvas.size,
			new mw.Vector2(250, 550), GameConfig.Language.Text_Guid_7.Value, 0, true)
	}

	private guide8(): void {
		mw.localToViewport(this.getHudPanel.mMusicButton.tickSpaceGeometry, mw.Vector2.zero, this.outPixelPos, this.outViewPos);
		this.cover(this.outViewPos, this.getHudPanel.mMusicButton.size,
			new mw.Vector2(710, 150), GameConfig.Language.Text_Guid_8.Value, 1, true)
	}

	private guide9(): void {
		mw.localToViewport(this.getHudPanel.mHomeButton.tickSpaceGeometry, mw.Vector2.zero, this.outPixelPos, this.outViewPos);
		this.cover(this.outViewPos, this.getHudPanel.mHomeButton.size,
			new mw.Vector2(510, 150), GameConfig.Language.Text_Guid_9.Value, 1, true)
	}

	private guide10(): void {
		mw.localToViewport(this.getHudPanel.mShopButton.tickSpaceGeometry, mw.Vector2.zero, this.outPixelPos, this.outViewPos);
		this.cover(this.outViewPos, this.getHudPanel.mShopButton.size,
			new mw.Vector2(310, 150), GameConfig.Language.Text_Guid_10.Value, 1, true)
	}

	private guide11(): void {
		mw.localToViewport(this.getHudPanel.mRankButton.tickSpaceGeometry, mw.Vector2.zero, this.outPixelPos, this.outViewPos);
		this.cover(this.outViewPos, this.getHudPanel.mRankButton.size,
			new mw.Vector2(110, 150), GameConfig.Language.Text_Guid_11.Value, 1, true)
	}

	private guide12(): void {
		mw.localToViewport(this.getHudPanel.mLotteryButton.tickSpaceGeometry, mw.Vector2.zero, this.outPixelPos, this.outViewPos);
		this.cover(this.outViewPos, this.getHudPanel.mLotteryButton.size,
			new mw.Vector2(0, 150), GameConfig.Language.Text_Guid_12.Value, 1, true)
	}

	private guide13(): void {
		mw.localToViewport(this.getHudPanel.mOnlineRewardButton.tickSpaceGeometry, mw.Vector2.zero, this.outPixelPos, this.outViewPos);
		this.cover(this.outViewPos, this.getHudPanel.mOnlineRewardButton.size,
			new mw.Vector2(710, 150), GameConfig.Language.Text_Guid_13.Value, 1, true)
	}

	private guide14(): void {
		mw.localToViewport(this.getHudPanel.mTaskButton.tickSpaceGeometry, mw.Vector2.zero, this.outPixelPos, this.outViewPos);
		this.cover(this.outViewPos, this.getHudPanel.mTaskButton.size,
			new mw.Vector2(510, 150), GameConfig.Language.Text_Guid_14.Value, 1, true)
	}

	private guide15(): void {
		mw.localToViewport(this.getHudPanel.mSignInButton.tickSpaceGeometry, mw.Vector2.zero, this.outPixelPos, this.outViewPos);
		this.cover(this.outViewPos, this.getHudPanel.mSignInButton.size,
			new mw.Vector2(310, 150), GameConfig.Language.Text_Guid_15.Value, 1, true)
	}

	private guide16(): void {
		mw.localToViewport(this.getHudPanel.mAdsButton.tickSpaceGeometry, mw.Vector2.zero, this.outPixelPos, this.outViewPos);
		this.cover(this.outViewPos, this.getHudPanel.mAdsButton.size,
			new mw.Vector2(110, 150), GameConfig.Language.Text_Guid_16.Value, 1, true)
	}

	private guide17(): void {
		mw.localToViewport(this.getHudPanel.mSwordButton.tickSpaceGeometry, mw.Vector2.zero, this.outPixelPos, this.outViewPos);
		this.cover(this.outViewPos, this.getHudPanel.mSwordButton.size,
			new mw.Vector2(0, 150), GameConfig.Language.Text_Guid_17.Value, 1, true)
	}

	private guide18(): void {
		mw.localToViewport(this.getHudPanel.mArkButton.tickSpaceGeometry, mw.Vector2.zero, this.outPixelPos, this.outViewPos);
		this.cover(this.outViewPos, this.getHudPanel.mArkButton.size,
			new mw.Vector2(710, 150), GameConfig.Language.Text_Guid_18.Value, 1, true)
	}

	private guide19(): void {
		mw.localToViewport(this.getHudPanel.mGetButton.tickSpaceGeometry, mw.Vector2.zero, this.outPixelPos, this.outViewPos);
		this.cover(this.outViewPos, this.getHudPanel.mGetButton.size,
			new mw.Vector2(510, 150), GameConfig.Language.Text_Guid_19.Value, 1, true)
	}

	private guide20(): void {
		mw.localToViewport(this.getHudPanel.mNewPeopleButton.tickSpaceGeometry, mw.Vector2.zero, this.outPixelPos, this.outViewPos);
		this.cover(this.outViewPos, this.getHudPanel.mNewPeopleButton.size,
			new mw.Vector2(310, 150), GameConfig.Language.Text_Guid_20.Value, 1, true)
	}

	private guide21(): void {
		mw.localToViewport(this.getHudPanel.mRingSoulButton.tickSpaceGeometry, mw.Vector2.zero, this.outPixelPos, this.outViewPos);
		this.cover(this.outViewPos, this.getHudPanel.mRingSoulButton.size,
			new mw.Vector2(110, 150), GameConfig.Language.Text_Guid_21.Value, 1, true)
	}

	private guide22(): void {
		mw.localToViewport(this.getHudPanel.mSoulBoneButton.tickSpaceGeometry, mw.Vector2.zero, this.outPixelPos, this.outViewPos);
		this.cover(this.outViewPos, this.getHudPanel.mSoulBoneButton.size,
			new mw.Vector2(110, 150), GameConfig.Language.Text_Guid_28.Value, 1, true)
	}

	private guide23(): void {
		mw.localToViewport(this.getHudPanel.mUpExpButton.tickSpaceGeometry, mw.Vector2.zero, this.outPixelPos, this.outViewPos);
		this.cover(this.outViewPos, this.getHudPanel.mUpExpButton.size,
			new mw.Vector2(300, 350), GameConfig.Language.Text_Guid_22.Value, 1, true)
	}

	private guide24(): void {
		mw.localToViewport(this.getHudPanel.mInvincibleButton.tickSpaceGeometry, mw.Vector2.zero, this.outPixelPos, this.outViewPos);
		this.cover(this.outViewPos, this.getHudPanel.mInvincibleButton.size,
			new mw.Vector2(550, 350), GameConfig.Language.Text_Guid_23.Value, 1, true)
	}

	private guide25(): void {
		mw.localToViewport(this.getHudPanel.mRoleCanvas_G.tickSpaceGeometry, mw.Vector2.zero, this.outPixelPos, this.outViewPos);
		this.cover(this.outViewPos, this.getHudPanel.mRoleCanvas_G.size,
			new mw.Vector2(550, 350), StringUtil.format(GameConfig.Language.Text_Guid_24.Value, GlobalData.mpStr), 1, true)
	}

	private guide26(): void {
		mw.localToViewport(this.getHudPanel.mAddCoinButton.tickSpaceGeometry, mw.Vector2.zero, this.outPixelPos, this.outViewPos);
		this.cover(this.outViewPos, this.getHudPanel.mAddCoinButton.size,
			new mw.Vector2(550, 350), GameConfig.Language.Text_Guid_25.Value, 1, true)
	}

	private guide27(): void {
		mw.localToViewport(this.getHudPanel.mAddDiamondButton.tickSpaceGeometry, mw.Vector2.zero, this.outPixelPos, this.outViewPos);
		this.cover(this.outViewPos, this.getHudPanel.mAddCoinButton.size,
			new mw.Vector2(550, 350), GameConfig.Language.Text_Guid_26.Value, 1, true)
	}

	private guide28(): void {
		this.cover(new mw.Vector2(0, 0), new mw.Vector2(0, 0),
			this.centPos, GameConfig.Language.Text_Guid_27.Value, 0, true)
	}

	/**
	 * 引导覆盖方法
	 * @param position 目标UI的中心位置，用于把周围四个黑图环绕它
	 * @param size 目标UI的大小，用于把周围四个黑图环绕它
	 * @param pos 设置文本提示的显示位置
	 * @param text 文本提示的内容
	 * @param dir 箭头朝向
	 * @param bgBtnShow 背景按钮是否显示
	 */
	cover(position: mw.Vector2, size: mw.Vector2, pos: mw.Vector2, text: string, dir: number = 0, bgBtnShow: boolean = true) {
		this.setVisibility(this.button, bgBtnShow)
		this.coverUI(position, size, pos, text, dir);
	}

	coverUI(position: mw.Vector2, size: mw.Vector2, pos: mw.Vector2, text: string, dir: number = 0) {
		this.setVisibility(this.image1, true)
		this.setVisibility(this.image2, true)
		this.setVisibility(this.image3, true)
		this.setVisibility(this.image4, true)

		let screen = WindowUtil.getViewportSize();
		this.image1.position = (new mw.Vector2(0, 0));
		this.image1.size = (new mw.Vector2(position.x + size.x + 10, position.y - 10));
		this.image2.position = (new mw.Vector2(0, position.y - 10));
		this.image2.size = (new mw.Vector2(position.x - 10, screen.y - position.y + 10));
		this.image3.position = (new mw.Vector2(position.x + size.x + 10, 0));
		this.image3.size = (new mw.Vector2(screen.x - position.x - size.x - 10, position.y + size.y + 10));
		this.image4.position = (new mw.Vector2(position.x - 10, position.y + size.y + 10));
		this.image4.size = (new mw.Vector2(screen.x - position.x + 10, screen.y - position.y - size.y - 10));

		this.canClick = true;
		if (text) {
			this.setVisibility(this.container, true)
			this.container.position = pos
			this.mContentTextBlock.text = text
		} else {
			this.setVisibility(this.container, false)
		}
		if (!size.equals(mw.Vector2.zero)) {
			this.setVisibility(this.guide, true)
			if (dir == 0) {
				this.guide.renderTransformAngle = (0);
				this.guide.position = (new mw.Vector2(position.x + size.x / 2 - this.guide.size.x / 2,
					position.y - this.guide.size.y));
			} else {
				this.guide.renderTransformAngle = (180);
				this.guide.position = (new mw.Vector2(position.x + size.x / 2 - this.guide.size.x / 2,
					position.y + size.y));
			}
		} else {
			this.guide.visibility = mw.SlateVisibility.Collapsed;
		}
	}

	setVisibility<T extends mw.Widget>(ui: T, isShow: boolean, isBlock = false) {
		let visibilityType = isShow ?
			isBlock ? mw.SlateVisibility.SelfHitTestInvisible : mw.SlateVisibility.Visible
			: mw.SlateVisibility.Hidden;
		ui.visibility = (visibilityType);
	}
}
