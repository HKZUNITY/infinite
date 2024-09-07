
/** 
 * AUTHOR: 穿迷彩服的鲨鱼
 * TIME: 2023.09.26-13.56.59
 */

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
			// 可以继续增加无数步
			default:
				this.hide();
				break;
		}
	}
	private guide0(): void {
		this.cover(new mw.Vector2(0, 0), new mw.Vector2(0, 0),
			this.centPos, `欢迎来到\n${GlobalData.gameName}\n我来给你介绍一下所有按钮操作吧。`, 0, true)
	}

	private guide1(): void {
		mw.localToViewport(this.getHudPanel.mVirtualJoystickPanel.tickSpaceGeometry, mw.Vector2.zero, this.outPixelPos, this.outViewPos);
		this.cover(this.outViewPos, this.getHudPanel.mVirtualJoystickPanel.size,
			new mw.Vector2(900, 200), "移动按钮，点击后拖拽可以控制角色移动。", 0, true)
	}

	private guide2(): void {
		mw.localToViewport(this.getHudPanel.mTouchPad.tickSpaceGeometry, mw.Vector2.zero, this.outPixelPos, this.outViewPos);
		this.cover(this.outViewPos, this.getHudPanel.mTouchPad.size,
			new mw.Vector2(0, 250), "视角移动区域，点击拖动这里可以控制屏幕视角。", 0, true)
	}

	private guide3(): void {
		mw.localToViewport(this.getHudPanel.mJumpButton.tickSpaceGeometry, mw.Vector2.zero, this.outPixelPos, this.outViewPos);
		this.cover(this.outViewPos, this.getHudPanel.mJumpButton.size,
			new mw.Vector2(700, 350), `跳跃按钮，连续点击会进行二段跳，会消耗${GlobalData.mpStr}。`, 0, true)
	}

	private guide4(): void {
		mw.localToViewport(this.getHudPanel.mSprintButton.tickSpaceGeometry, mw.Vector2.zero, this.outPixelPos, this.outViewPos);
		this.cover(this.outViewPos, this.getHudPanel.mSprintButton.size,
			new mw.Vector2(500, 550), `冲刺按钮，可以直接瞬移一段距离，会消耗${GlobalData.mpStr}。`, 0, true)
	}

	private guide5(): void {
		mw.localToViewport(this.getHudPanel.mAtkButton.tickSpaceGeometry, mw.Vector2.zero, this.outPixelPos, this.outViewPos);
		this.cover(this.outViewPos, this.getHudPanel.mAtkButton.size,
			new mw.Vector2(400, 550), `攻击按钮，连续点击可释放炫酷的连招，会消耗${GlobalData.mpStr}。`, 0, true)
	}

	private guide6(): void {
		mw.localToViewport(this.getHudPanel.mOnOffRingSoulCanvas.tickSpaceGeometry, mw.Vector2.zero, this.outPixelPos, this.outViewPos);
		this.cover(this.outViewPos, this.getHudPanel.mOnOffRingSoulCanvas.size,
			new mw.Vector2(400, 550), `开启魂环按钮，可展示魂环。`, 0, true)
	}

	private guide7(): void {
		mw.localToViewport(this.getHudPanel.mMusicButton.tickSpaceGeometry, mw.Vector2.zero, this.outPixelPos, this.outViewPos);
		this.cover(this.outViewPos, this.getHudPanel.mMusicButton.size,
			new mw.Vector2(710, 150), "背景音乐按钮，打开可更换背景音乐以及开关背景音乐。", 1, true)
	}

	private guide8(): void {
		mw.localToViewport(this.getHudPanel.mHomeButton.tickSpaceGeometry, mw.Vector2.zero, this.outPixelPos, this.outViewPos);
		this.cover(this.outViewPos, this.getHudPanel.mHomeButton.size,
			new mw.Vector2(510, 150), "点我回家按钮，当你被卡在地图中无法移动时可以点击我试试哦。", 1, true)
	}

	private guide9(): void {
		mw.localToViewport(this.getHudPanel.mShopButton.tickSpaceGeometry, mw.Vector2.zero, this.outPixelPos, this.outViewPos);
		this.cover(this.outViewPos, this.getHudPanel.mShopButton.size,
			new mw.Vector2(310, 150), "背包按钮，提升等级最快的办法就是在地图中寻找武魂、职业、魂骨、宠物。", 1, true)
	}

	private guide10(): void {
		mw.localToViewport(this.getHudPanel.mRankButton.tickSpaceGeometry, mw.Vector2.zero, this.outPixelPos, this.outViewPos);
		this.cover(this.outViewPos, this.getHudPanel.mRankButton.size,
			new mw.Vector2(110, 150), "排行榜按钮，打开可以进行查看房间内排行榜和世界排行榜，快来查看你在斗罗大陆的排名是多少吧。", 1, true)
	}

	private guide11(): void {
		mw.localToViewport(this.getHudPanel.mOnlineRewardButton.tickSpaceGeometry, mw.Vector2.zero, this.outPixelPos, this.outViewPos);
		this.cover(this.outViewPos, this.getHudPanel.mOnlineRewardButton.size,
			new mw.Vector2(710, 150), "在线奖励按钮，可以领取大量金币和经验来快速提升等级，在线10分钟即可快速升级到封号斗罗。", 1, true)
	}

	private guide12(): void {
		mw.localToViewport(this.getHudPanel.mTaskButton.tickSpaceGeometry, mw.Vector2.zero, this.outPixelPos, this.outViewPos);
		this.cover(this.outViewPos, this.getHudPanel.mTaskButton.size,
			new mw.Vector2(510, 150), "任务按钮，完成任务可以领取大量金币和经验来快速提升等级，马上就可升级到神级。", 1, true)
	}

	private guide13(): void {
		mw.localToViewport(this.getHudPanel.mSignInButton.tickSpaceGeometry, mw.Vector2.zero, this.outPixelPos, this.outViewPos);
		this.cover(this.outViewPos, this.getHudPanel.mSignInButton.size,
			new mw.Vector2(310, 150), "签到按钮，登录游戏签到领取大量钻石和等级。", 1, true)
	}

	private guide14(): void {
		mw.localToViewport(this.getHudPanel.mAdsButton.tickSpaceGeometry, mw.Vector2.zero, this.outPixelPos, this.outViewPos);
		this.cover(this.outViewPos, this.getHudPanel.mAdsButton.size,
			new mw.Vector2(110, 150), "福利多多，最快提升等级的办法，无限升级，成为神级的捷径。", 1, true)
	}

	private guide15(): void {
		mw.localToViewport(this.getHudPanel.mArkButton.tickSpaceGeometry, mw.Vector2.zero, this.outPixelPos, this.outViewPos);
		this.cover(this.outViewPos, this.getHudPanel.mArkButton.size,
			new mw.Vector2(710, 150), "充值钻石，可充值大量钻石快速提升魂环年限、最快达到百万年级别。", 1, true)
	}

	private guide16(): void {
		mw.localToViewport(this.getHudPanel.mGetButton.tickSpaceGeometry, mw.Vector2.zero, this.outPixelPos, this.outViewPos);
		this.cover(this.outViewPos, this.getHudPanel.mGetButton.size,
			new mw.Vector2(510, 150), "兑换奖励，领取兑换码兑换奖励，钻石+等级。", 1, true)
	}

	private guide17(): void {
		mw.localToViewport(this.getHudPanel.mRingSoulButton.tickSpaceGeometry, mw.Vector2.zero, this.outPixelPos, this.outViewPos);
		this.cover(this.outViewPos, this.getHudPanel.mOnlineRewardButton.size,
			new mw.Vector2(310, 150), "锻造魂环按钮，可以锻造魂环，使自己的魂环都达到十万年级别，第十环可以达到百万年级别", 1, true)
	}

	private guide18(): void {
		mw.localToViewport(this.getHudPanel.mInvincibleButton.tickSpaceGeometry, mw.Vector2.zero, this.outPixelPos, this.outViewPos);
		this.cover(this.outViewPos, this.getHudPanel.mInvincibleButton.size,
			new mw.Vector2(550, 350), "开启防御，不会被队友误伤。", 1, true)
	}

	private guide19(): void {
		mw.localToViewport(this.getHudPanel.mRoleCanvas_G.tickSpaceGeometry, mw.Vector2.zero, this.outPixelPos, this.outViewPos);
		this.cover(this.outViewPos, this.getHudPanel.mRoleCanvas_G.size,
			new mw.Vector2(550, 350), `角色属性，血量、${GlobalData.mpStr}，攻击力会随等级提升而提升。`, 1, true)
	}

	private guide20(): void {
		mw.localToViewport(this.getHudPanel.mAddCoinButton.tickSpaceGeometry, mw.Vector2.zero, this.outPixelPos, this.outViewPos);
		this.cover(this.outViewPos, this.getHudPanel.mAddCoinButton.size,
			new mw.Vector2(550, 350), "可快速增加金币直接购买武魂、魂骨。", 1, true)
	}

	private guide21(): void {
		mw.localToViewport(this.getHudPanel.mAddDiamondButton.tickSpaceGeometry, mw.Vector2.zero, this.outPixelPos, this.outViewPos);
		this.cover(this.outViewPos, this.getHudPanel.mAddCoinButton.size,
			new mw.Vector2(550, 350), "可快速增加钻石锻造魂环。", 1, true)
	}

	private guide22(): void {
		this.cover(new mw.Vector2(0, 0), new mw.Vector2(0, 0),
			this.centPos, "介绍完毕，欢迎游戏圈留言。跟我路标走，带你去找武魂、魂骨。", 0, true)
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
			this.text.text = text
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
