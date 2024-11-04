/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 爱玩游戏的小胖子
 * UI: UI/module/HUDModule/HUDPanel.ui
 * TIME: 2024.11.04-19.49.52
 */
 
@UIBind('UI/module/HUDModule/HUDPanel.ui')
export default class HUDPanel_Generate extends UIScript {
		private mVirtualJoystickPanel_Internal: mw.VirtualJoystickPanel
	public get mVirtualJoystickPanel(): mw.VirtualJoystickPanel {
		if(!this.mVirtualJoystickPanel_Internal&&this.uiWidgetBase) {
			this.mVirtualJoystickPanel_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainCanvas/ContrrollerCanvas/mVirtualJoystickPanel') as mw.VirtualJoystickPanel
		}
		return this.mVirtualJoystickPanel_Internal
	}
	private mTouchPad_Internal: mw.TouchPad
	public get mTouchPad(): mw.TouchPad {
		if(!this.mTouchPad_Internal&&this.uiWidgetBase) {
			this.mTouchPad_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainCanvas/ContrrollerCanvas/mTouchPad') as mw.TouchPad
		}
		return this.mTouchPad_Internal
	}
	private mAtkCanvas_Internal: mw.Canvas
	public get mAtkCanvas(): mw.Canvas {
		if(!this.mAtkCanvas_Internal&&this.uiWidgetBase) {
			this.mAtkCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainCanvas/mAtkCanvas') as mw.Canvas
		}
		return this.mAtkCanvas_Internal
	}
	private mAtkButton_Internal: mw.Button
	public get mAtkButton(): mw.Button {
		if(!this.mAtkButton_Internal&&this.uiWidgetBase) {
			this.mAtkButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainCanvas/mAtkCanvas/mAtkButton') as mw.Button
		}
		return this.mAtkButton_Internal
	}
	private mJumpCanvas_Internal: mw.Canvas
	public get mJumpCanvas(): mw.Canvas {
		if(!this.mJumpCanvas_Internal&&this.uiWidgetBase) {
			this.mJumpCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainCanvas/mJumpCanvas') as mw.Canvas
		}
		return this.mJumpCanvas_Internal
	}
	private mJumpButton_Internal: mw.Button
	public get mJumpButton(): mw.Button {
		if(!this.mJumpButton_Internal&&this.uiWidgetBase) {
			this.mJumpButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainCanvas/mJumpCanvas/mJumpButton') as mw.Button
		}
		return this.mJumpButton_Internal
	}
	private mSprintCanvas_Internal: mw.Canvas
	public get mSprintCanvas(): mw.Canvas {
		if(!this.mSprintCanvas_Internal&&this.uiWidgetBase) {
			this.mSprintCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainCanvas/mSprintCanvas') as mw.Canvas
		}
		return this.mSprintCanvas_Internal
	}
	private mSprintButton_Internal: mw.Button
	public get mSprintButton(): mw.Button {
		if(!this.mSprintButton_Internal&&this.uiWidgetBase) {
			this.mSprintButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainCanvas/mSprintCanvas/mSprintButton') as mw.Button
		}
		return this.mSprintButton_Internal
	}
	private mOnOffRingSoulCanvas_Internal: mw.Canvas
	public get mOnOffRingSoulCanvas(): mw.Canvas {
		if(!this.mOnOffRingSoulCanvas_Internal&&this.uiWidgetBase) {
			this.mOnOffRingSoulCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainCanvas/mOnOffRingSoulCanvas') as mw.Canvas
		}
		return this.mOnOffRingSoulCanvas_Internal
	}
	private mOnOffRingSoulButton_Internal: mw.Button
	public get mOnOffRingSoulButton(): mw.Button {
		if(!this.mOnOffRingSoulButton_Internal&&this.uiWidgetBase) {
			this.mOnOffRingSoulButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainCanvas/mOnOffRingSoulCanvas/mOnOffRingSoulButton') as mw.Button
		}
		return this.mOnOffRingSoulButton_Internal
	}
	private mOnOffRingSoulTextBlock_Internal: mw.TextBlock
	public get mOnOffRingSoulTextBlock(): mw.TextBlock {
		if(!this.mOnOffRingSoulTextBlock_Internal&&this.uiWidgetBase) {
			this.mOnOffRingSoulTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainCanvas/mOnOffRingSoulCanvas/mOnOffRingSoulTextBlock') as mw.TextBlock
		}
		return this.mOnOffRingSoulTextBlock_Internal
	}
	private mFlyCanvas_Internal: mw.Canvas
	public get mFlyCanvas(): mw.Canvas {
		if(!this.mFlyCanvas_Internal&&this.uiWidgetBase) {
			this.mFlyCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainCanvas/mFlyCanvas') as mw.Canvas
		}
		return this.mFlyCanvas_Internal
	}
	private mFlyButton_Internal: mw.Button
	public get mFlyButton(): mw.Button {
		if(!this.mFlyButton_Internal&&this.uiWidgetBase) {
			this.mFlyButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainCanvas/mFlyCanvas/mFlyButton') as mw.Button
		}
		return this.mFlyButton_Internal
	}
	private mFlyTextBlock_Internal: mw.TextBlock
	public get mFlyTextBlock(): mw.TextBlock {
		if(!this.mFlyTextBlock_Internal&&this.uiWidgetBase) {
			this.mFlyTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainCanvas/mFlyCanvas/mFlyTextBlock') as mw.TextBlock
		}
		return this.mFlyTextBlock_Internal
	}
	private mSkillCanvas_1_Internal: mw.Canvas
	public get mSkillCanvas_1(): mw.Canvas {
		if(!this.mSkillCanvas_1_Internal&&this.uiWidgetBase) {
			this.mSkillCanvas_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainCanvas/mSkillCanvas_1') as mw.Canvas
		}
		return this.mSkillCanvas_1_Internal
	}
	private mSkillMaskButton_1_Internal: mw.MaskButton
	public get mSkillMaskButton_1(): mw.MaskButton {
		if(!this.mSkillMaskButton_1_Internal&&this.uiWidgetBase) {
			this.mSkillMaskButton_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainCanvas/mSkillCanvas_1/mSkillMaskButton_1') as mw.MaskButton
		}
		return this.mSkillMaskButton_1_Internal
	}
	private mSkillTextBlock_1_Internal: mw.TextBlock
	public get mSkillTextBlock_1(): mw.TextBlock {
		if(!this.mSkillTextBlock_1_Internal&&this.uiWidgetBase) {
			this.mSkillTextBlock_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainCanvas/mSkillCanvas_1/mSkillTextBlock_1') as mw.TextBlock
		}
		return this.mSkillTextBlock_1_Internal
	}
	private mSkillCDTextBlock_1_Internal: mw.TextBlock
	public get mSkillCDTextBlock_1(): mw.TextBlock {
		if(!this.mSkillCDTextBlock_1_Internal&&this.uiWidgetBase) {
			this.mSkillCDTextBlock_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainCanvas/mSkillCanvas_1/mSkillCDTextBlock_1') as mw.TextBlock
		}
		return this.mSkillCDTextBlock_1_Internal
	}
	private mAutoAtkCanvas_Internal: mw.Canvas
	public get mAutoAtkCanvas(): mw.Canvas {
		if(!this.mAutoAtkCanvas_Internal&&this.uiWidgetBase) {
			this.mAutoAtkCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainCanvas/mAutoAtkCanvas') as mw.Canvas
		}
		return this.mAutoAtkCanvas_Internal
	}
	private mAutoAtkButton_Internal: mw.Button
	public get mAutoAtkButton(): mw.Button {
		if(!this.mAutoAtkButton_Internal&&this.uiWidgetBase) {
			this.mAutoAtkButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainCanvas/mAutoAtkCanvas/mAutoAtkButton') as mw.Button
		}
		return this.mAutoAtkButton_Internal
	}
	private mAutoAtkTextBlock_Internal: mw.TextBlock
	public get mAutoAtkTextBlock(): mw.TextBlock {
		if(!this.mAutoAtkTextBlock_Internal&&this.uiWidgetBase) {
			this.mAutoAtkTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainCanvas/mAutoAtkCanvas/mAutoAtkTextBlock') as mw.TextBlock
		}
		return this.mAutoAtkTextBlock_Internal
	}
	private mPlayerButton_Internal: mw.Button
	public get mPlayerButton(): mw.Button {
		if(!this.mPlayerButton_Internal&&this.uiWidgetBase) {
			this.mPlayerButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/RightTopCanvas/PlayerCanvas/mPlayerButton') as mw.Button
		}
		return this.mPlayerButton_Internal
	}
	private mPlayerTextBlock_Internal: mw.TextBlock
	public get mPlayerTextBlock(): mw.TextBlock {
		if(!this.mPlayerTextBlock_Internal&&this.uiWidgetBase) {
			this.mPlayerTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/RightTopCanvas/PlayerCanvas/mPlayerTextBlock') as mw.TextBlock
		}
		return this.mPlayerTextBlock_Internal
	}
	private mMusicButton_Internal: mw.Button
	public get mMusicButton(): mw.Button {
		if(!this.mMusicButton_Internal&&this.uiWidgetBase) {
			this.mMusicButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/RightTopCanvas/MusicCanvas/mMusicButton') as mw.Button
		}
		return this.mMusicButton_Internal
	}
	private mMusicTextBlock_Internal: mw.TextBlock
	public get mMusicTextBlock(): mw.TextBlock {
		if(!this.mMusicTextBlock_Internal&&this.uiWidgetBase) {
			this.mMusicTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/RightTopCanvas/MusicCanvas/mMusicTextBlock') as mw.TextBlock
		}
		return this.mMusicTextBlock_Internal
	}
	private mHomeButton_Internal: mw.Button
	public get mHomeButton(): mw.Button {
		if(!this.mHomeButton_Internal&&this.uiWidgetBase) {
			this.mHomeButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/RightTopCanvas/HomeCanvas/mHomeButton') as mw.Button
		}
		return this.mHomeButton_Internal
	}
	private mHomeTextBlock_Internal: mw.TextBlock
	public get mHomeTextBlock(): mw.TextBlock {
		if(!this.mHomeTextBlock_Internal&&this.uiWidgetBase) {
			this.mHomeTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/RightTopCanvas/HomeCanvas/mHomeTextBlock') as mw.TextBlock
		}
		return this.mHomeTextBlock_Internal
	}
	private mShopButton_Internal: mw.Button
	public get mShopButton(): mw.Button {
		if(!this.mShopButton_Internal&&this.uiWidgetBase) {
			this.mShopButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/RightTopCanvas/ShopCanvas/mShopButton') as mw.Button
		}
		return this.mShopButton_Internal
	}
	private mShopTextBlock_Internal: mw.TextBlock
	public get mShopTextBlock(): mw.TextBlock {
		if(!this.mShopTextBlock_Internal&&this.uiWidgetBase) {
			this.mShopTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/RightTopCanvas/ShopCanvas/mShopTextBlock') as mw.TextBlock
		}
		return this.mShopTextBlock_Internal
	}
	private mRankButton_Internal: mw.Button
	public get mRankButton(): mw.Button {
		if(!this.mRankButton_Internal&&this.uiWidgetBase) {
			this.mRankButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/RightTopCanvas/RankCanvas/mRankButton') as mw.Button
		}
		return this.mRankButton_Internal
	}
	private mRankTextBlock_Internal: mw.TextBlock
	public get mRankTextBlock(): mw.TextBlock {
		if(!this.mRankTextBlock_Internal&&this.uiWidgetBase) {
			this.mRankTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/RightTopCanvas/RankCanvas/mRankTextBlock') as mw.TextBlock
		}
		return this.mRankTextBlock_Internal
	}
	private mLotteryButton_Internal: mw.Button
	public get mLotteryButton(): mw.Button {
		if(!this.mLotteryButton_Internal&&this.uiWidgetBase) {
			this.mLotteryButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/RightTopCanvas/LotteryCanvas/mLotteryButton') as mw.Button
		}
		return this.mLotteryButton_Internal
	}
	private mLotteryTextBlock_Internal: mw.TextBlock
	public get mLotteryTextBlock(): mw.TextBlock {
		if(!this.mLotteryTextBlock_Internal&&this.uiWidgetBase) {
			this.mLotteryTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/RightTopCanvas/LotteryCanvas/mLotteryTextBlock') as mw.TextBlock
		}
		return this.mLotteryTextBlock_Internal
	}
	private mLotteryPointImage_Internal: mw.Image
	public get mLotteryPointImage(): mw.Image {
		if(!this.mLotteryPointImage_Internal&&this.uiWidgetBase) {
			this.mLotteryPointImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/RightTopCanvas/LotteryCanvas/mLotteryPointImage') as mw.Image
		}
		return this.mLotteryPointImage_Internal
	}
	private mOnlineRewardButton_Internal: mw.Button
	public get mOnlineRewardButton(): mw.Button {
		if(!this.mOnlineRewardButton_Internal&&this.uiWidgetBase) {
			this.mOnlineRewardButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/RightTopCanvas/OnlineRewardCanvas/mOnlineRewardButton') as mw.Button
		}
		return this.mOnlineRewardButton_Internal
	}
	private mOnlineRewardTextBlock_Internal: mw.TextBlock
	public get mOnlineRewardTextBlock(): mw.TextBlock {
		if(!this.mOnlineRewardTextBlock_Internal&&this.uiWidgetBase) {
			this.mOnlineRewardTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/RightTopCanvas/OnlineRewardCanvas/mOnlineRewardTextBlock') as mw.TextBlock
		}
		return this.mOnlineRewardTextBlock_Internal
	}
	private mPointImage_Internal: mw.Image
	public get mPointImage(): mw.Image {
		if(!this.mPointImage_Internal&&this.uiWidgetBase) {
			this.mPointImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/RightTopCanvas/OnlineRewardCanvas/mPointImage') as mw.Image
		}
		return this.mPointImage_Internal
	}
	private mTaskButton_Internal: mw.Button
	public get mTaskButton(): mw.Button {
		if(!this.mTaskButton_Internal&&this.uiWidgetBase) {
			this.mTaskButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/RightTopCanvas/TaskCanvas/mTaskButton') as mw.Button
		}
		return this.mTaskButton_Internal
	}
	private mTaskTextBlock_Internal: mw.TextBlock
	public get mTaskTextBlock(): mw.TextBlock {
		if(!this.mTaskTextBlock_Internal&&this.uiWidgetBase) {
			this.mTaskTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/RightTopCanvas/TaskCanvas/mTaskTextBlock') as mw.TextBlock
		}
		return this.mTaskTextBlock_Internal
	}
	private mTaskPointImage_Internal: mw.Image
	public get mTaskPointImage(): mw.Image {
		if(!this.mTaskPointImage_Internal&&this.uiWidgetBase) {
			this.mTaskPointImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/RightTopCanvas/TaskCanvas/mTaskPointImage') as mw.Image
		}
		return this.mTaskPointImage_Internal
	}
	private mSignInButton_Internal: mw.Button
	public get mSignInButton(): mw.Button {
		if(!this.mSignInButton_Internal&&this.uiWidgetBase) {
			this.mSignInButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/RightTopCanvas/SignInCanvas/mSignInButton') as mw.Button
		}
		return this.mSignInButton_Internal
	}
	private mSignInTextBlock_Internal: mw.TextBlock
	public get mSignInTextBlock(): mw.TextBlock {
		if(!this.mSignInTextBlock_Internal&&this.uiWidgetBase) {
			this.mSignInTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/RightTopCanvas/SignInCanvas/mSignInTextBlock') as mw.TextBlock
		}
		return this.mSignInTextBlock_Internal
	}
	private mSignInImage_Internal: mw.Image
	public get mSignInImage(): mw.Image {
		if(!this.mSignInImage_Internal&&this.uiWidgetBase) {
			this.mSignInImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/RightTopCanvas/SignInCanvas/mSignInImage') as mw.Image
		}
		return this.mSignInImage_Internal
	}
	private mAdsButton_Internal: mw.Button
	public get mAdsButton(): mw.Button {
		if(!this.mAdsButton_Internal&&this.uiWidgetBase) {
			this.mAdsButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/RightTopCanvas/AdsCanvas/mAdsButton') as mw.Button
		}
		return this.mAdsButton_Internal
	}
	private mAdsTextBlock_Internal: mw.TextBlock
	public get mAdsTextBlock(): mw.TextBlock {
		if(!this.mAdsTextBlock_Internal&&this.uiWidgetBase) {
			this.mAdsTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/RightTopCanvas/AdsCanvas/mAdsTextBlock') as mw.TextBlock
		}
		return this.mAdsTextBlock_Internal
	}
	private mArkButton_Internal: mw.Button
	public get mArkButton(): mw.Button {
		if(!this.mArkButton_Internal&&this.uiWidgetBase) {
			this.mArkButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/RightTopCanvas/ArkCanvas/mArkButton') as mw.Button
		}
		return this.mArkButton_Internal
	}
	private mArkTextBlock_Internal: mw.TextBlock
	public get mArkTextBlock(): mw.TextBlock {
		if(!this.mArkTextBlock_Internal&&this.uiWidgetBase) {
			this.mArkTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/RightTopCanvas/ArkCanvas/mArkTextBlock') as mw.TextBlock
		}
		return this.mArkTextBlock_Internal
	}
	private mArkImage_Internal: mw.Image
	public get mArkImage(): mw.Image {
		if(!this.mArkImage_Internal&&this.uiWidgetBase) {
			this.mArkImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/RightTopCanvas/ArkCanvas/mArkImage') as mw.Image
		}
		return this.mArkImage_Internal
	}
	private mGetButton_Internal: mw.Button
	public get mGetButton(): mw.Button {
		if(!this.mGetButton_Internal&&this.uiWidgetBase) {
			this.mGetButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/RightTopCanvas/GetCanvas/mGetButton') as mw.Button
		}
		return this.mGetButton_Internal
	}
	private mGetTextBlock_Internal: mw.TextBlock
	public get mGetTextBlock(): mw.TextBlock {
		if(!this.mGetTextBlock_Internal&&this.uiWidgetBase) {
			this.mGetTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/RightTopCanvas/GetCanvas/mGetTextBlock') as mw.TextBlock
		}
		return this.mGetTextBlock_Internal
	}
	private mRingSoulButton_Internal: mw.Button
	public get mRingSoulButton(): mw.Button {
		if(!this.mRingSoulButton_Internal&&this.uiWidgetBase) {
			this.mRingSoulButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/RightTopCanvas/RingSoulCanvas/mRingSoulButton') as mw.Button
		}
		return this.mRingSoulButton_Internal
	}
	private mRingSoulTextBlock_Internal: mw.TextBlock
	public get mRingSoulTextBlock(): mw.TextBlock {
		if(!this.mRingSoulTextBlock_Internal&&this.uiWidgetBase) {
			this.mRingSoulTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/RightTopCanvas/RingSoulCanvas/mRingSoulTextBlock') as mw.TextBlock
		}
		return this.mRingSoulTextBlock_Internal
	}
	private mRingSoulPointImage_Internal: mw.Image
	public get mRingSoulPointImage(): mw.Image {
		if(!this.mRingSoulPointImage_Internal&&this.uiWidgetBase) {
			this.mRingSoulPointImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/RightTopCanvas/RingSoulCanvas/mRingSoulPointImage') as mw.Image
		}
		return this.mRingSoulPointImage_Internal
	}
	private mNewPeopleButton_Internal: mw.Button
	public get mNewPeopleButton(): mw.Button {
		if(!this.mNewPeopleButton_Internal&&this.uiWidgetBase) {
			this.mNewPeopleButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/RightTopCanvas/NewPeopleCanvas/mNewPeopleButton') as mw.Button
		}
		return this.mNewPeopleButton_Internal
	}
	private mNewPeopleTextBlock_Internal: mw.TextBlock
	public get mNewPeopleTextBlock(): mw.TextBlock {
		if(!this.mNewPeopleTextBlock_Internal&&this.uiWidgetBase) {
			this.mNewPeopleTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/RightTopCanvas/NewPeopleCanvas/mNewPeopleTextBlock') as mw.TextBlock
		}
		return this.mNewPeopleTextBlock_Internal
	}
	private mNewPeoplePointImage_Internal: mw.Image
	public get mNewPeoplePointImage(): mw.Image {
		if(!this.mNewPeoplePointImage_Internal&&this.uiWidgetBase) {
			this.mNewPeoplePointImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/RightTopCanvas/NewPeopleCanvas/mNewPeoplePointImage') as mw.Image
		}
		return this.mNewPeoplePointImage_Internal
	}
	private mSwordButton_Internal: mw.Button
	public get mSwordButton(): mw.Button {
		if(!this.mSwordButton_Internal&&this.uiWidgetBase) {
			this.mSwordButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/RightTopCanvas/SwordCanvas/mSwordButton') as mw.Button
		}
		return this.mSwordButton_Internal
	}
	private mSwordTextBlock_Internal: mw.TextBlock
	public get mSwordTextBlock(): mw.TextBlock {
		if(!this.mSwordTextBlock_Internal&&this.uiWidgetBase) {
			this.mSwordTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/RightTopCanvas/SwordCanvas/mSwordTextBlock') as mw.TextBlock
		}
		return this.mSwordTextBlock_Internal
	}
	private mSoulBoneButton_Internal: mw.Button
	public get mSoulBoneButton(): mw.Button {
		if(!this.mSoulBoneButton_Internal&&this.uiWidgetBase) {
			this.mSoulBoneButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/RightTopCanvas/SoulBoneCanvas/mSoulBoneButton') as mw.Button
		}
		return this.mSoulBoneButton_Internal
	}
	private mSoulBoneTextBlock_Internal: mw.TextBlock
	public get mSoulBoneTextBlock(): mw.TextBlock {
		if(!this.mSoulBoneTextBlock_Internal&&this.uiWidgetBase) {
			this.mSoulBoneTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/RightTopCanvas/SoulBoneCanvas/mSoulBoneTextBlock') as mw.TextBlock
		}
		return this.mSoulBoneTextBlock_Internal
	}
	private mSoulBonePointImage_Internal: mw.Image
	public get mSoulBonePointImage(): mw.Image {
		if(!this.mSoulBonePointImage_Internal&&this.uiWidgetBase) {
			this.mSoulBonePointImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/RightTopCanvas/SoulBoneCanvas/mSoulBonePointImage') as mw.Image
		}
		return this.mSoulBonePointImage_Internal
	}
	private mMusicCanvas_Internal: mw.Canvas
	public get mMusicCanvas(): mw.Canvas {
		if(!this.mMusicCanvas_Internal&&this.uiWidgetBase) {
			this.mMusicCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mMusicCanvas') as mw.Canvas
		}
		return this.mMusicCanvas_Internal
	}
	private mCloseMusicBtn_Internal: mw.Button
	public get mCloseMusicBtn(): mw.Button {
		if(!this.mCloseMusicBtn_Internal&&this.uiWidgetBase) {
			this.mCloseMusicBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mMusicCanvas/mCloseMusicBtn') as mw.Button
		}
		return this.mCloseMusicBtn_Internal
	}
	private mJumpyImage_1_Internal: mw.Image
	public get mJumpyImage_1(): mw.Image {
		if(!this.mJumpyImage_1_Internal&&this.uiWidgetBase) {
			this.mJumpyImage_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mMusicCanvas/Canvas/mJumpyImage_1') as mw.Image
		}
		return this.mJumpyImage_1_Internal
	}
	private mMusicText_Internal: mw.TextBlock
	public get mMusicText(): mw.TextBlock {
		if(!this.mMusicText_Internal&&this.uiWidgetBase) {
			this.mMusicText_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mMusicCanvas/Canvas/mMusicText') as mw.TextBlock
		}
		return this.mMusicText_Internal
	}
	private mLeftMusicBtn_Internal: mw.Button
	public get mLeftMusicBtn(): mw.Button {
		if(!this.mLeftMusicBtn_Internal&&this.uiWidgetBase) {
			this.mLeftMusicBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mMusicCanvas/Canvas/mLeftMusicBtn') as mw.Button
		}
		return this.mLeftMusicBtn_Internal
	}
	private mOnOffMusicBtn_Internal: mw.Button
	public get mOnOffMusicBtn(): mw.Button {
		if(!this.mOnOffMusicBtn_Internal&&this.uiWidgetBase) {
			this.mOnOffMusicBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mMusicCanvas/Canvas/mOnOffMusicBtn') as mw.Button
		}
		return this.mOnOffMusicBtn_Internal
	}
	private mRightMusicBtn_Internal: mw.Button
	public get mRightMusicBtn(): mw.Button {
		if(!this.mRightMusicBtn_Internal&&this.uiWidgetBase) {
			this.mRightMusicBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mMusicCanvas/Canvas/mRightMusicBtn') as mw.Button
		}
		return this.mRightMusicBtn_Internal
	}
	private mJumpyImage_2_Internal: mw.Image
	public get mJumpyImage_2(): mw.Image {
		if(!this.mJumpyImage_2_Internal&&this.uiWidgetBase) {
			this.mJumpyImage_2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mMusicCanvas/Canvas/mJumpyImage_2') as mw.Image
		}
		return this.mJumpyImage_2_Internal
	}
	private mRoleCanvas_G_Internal: mw.Canvas
	public get mRoleCanvas_G(): mw.Canvas {
		if(!this.mRoleCanvas_G_Internal&&this.uiWidgetBase) {
			this.mRoleCanvas_G_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mRoleCanvas_G') as mw.Canvas
		}
		return this.mRoleCanvas_G_Internal
	}
	private mRoleCanvas_Internal: mw.Canvas
	public get mRoleCanvas(): mw.Canvas {
		if(!this.mRoleCanvas_Internal&&this.uiWidgetBase) {
			this.mRoleCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mRoleCanvas_G/mRoleCanvas') as mw.Canvas
		}
		return this.mRoleCanvas_Internal
	}
	private mRoleIconImage_Internal: mw.Image
	public get mRoleIconImage(): mw.Image {
		if(!this.mRoleIconImage_Internal&&this.uiWidgetBase) {
			this.mRoleIconImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mRoleCanvas_G/mRoleCanvas/mRoleIconImage') as mw.Image
		}
		return this.mRoleIconImage_Internal
	}
	private mAtkTextBlock_Internal: mw.TextBlock
	public get mAtkTextBlock(): mw.TextBlock {
		if(!this.mAtkTextBlock_Internal&&this.uiWidgetBase) {
			this.mAtkTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mRoleCanvas_G/mAtkTextBlock') as mw.TextBlock
		}
		return this.mAtkTextBlock_Internal
	}
	private mLvTextBlock_Internal: mw.TextBlock
	public get mLvTextBlock(): mw.TextBlock {
		if(!this.mLvTextBlock_Internal&&this.uiWidgetBase) {
			this.mLvTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mRoleCanvas_G/mLvTextBlock') as mw.TextBlock
		}
		return this.mLvTextBlock_Internal
	}
	private mHpCanvas_Internal: mw.Canvas
	public get mHpCanvas(): mw.Canvas {
		if(!this.mHpCanvas_Internal&&this.uiWidgetBase) {
			this.mHpCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mRoleCanvas_G/mHpCanvas') as mw.Canvas
		}
		return this.mHpCanvas_Internal
	}
	private mHpProgressBar_Internal: mw.ProgressBar
	public get mHpProgressBar(): mw.ProgressBar {
		if(!this.mHpProgressBar_Internal&&this.uiWidgetBase) {
			this.mHpProgressBar_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mRoleCanvas_G/mHpCanvas/mHpProgressBar') as mw.ProgressBar
		}
		return this.mHpProgressBar_Internal
	}
	private mHpTextBlock_Internal: mw.TextBlock
	public get mHpTextBlock(): mw.TextBlock {
		if(!this.mHpTextBlock_Internal&&this.uiWidgetBase) {
			this.mHpTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mRoleCanvas_G/mHpCanvas/mHpTextBlock') as mw.TextBlock
		}
		return this.mHpTextBlock_Internal
	}
	private mMpCanvas_Internal: mw.Canvas
	public get mMpCanvas(): mw.Canvas {
		if(!this.mMpCanvas_Internal&&this.uiWidgetBase) {
			this.mMpCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mRoleCanvas_G/mMpCanvas') as mw.Canvas
		}
		return this.mMpCanvas_Internal
	}
	private mMpProgressBar_Internal: mw.ProgressBar
	public get mMpProgressBar(): mw.ProgressBar {
		if(!this.mMpProgressBar_Internal&&this.uiWidgetBase) {
			this.mMpProgressBar_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mRoleCanvas_G/mMpCanvas/mMpProgressBar') as mw.ProgressBar
		}
		return this.mMpProgressBar_Internal
	}
	private mMpTextBlock_Internal: mw.TextBlock
	public get mMpTextBlock(): mw.TextBlock {
		if(!this.mMpTextBlock_Internal&&this.uiWidgetBase) {
			this.mMpTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mRoleCanvas_G/mMpCanvas/mMpTextBlock') as mw.TextBlock
		}
		return this.mMpTextBlock_Internal
	}
	private mExpProgressBar_Internal: mw.ProgressBar
	public get mExpProgressBar(): mw.ProgressBar {
		if(!this.mExpProgressBar_Internal&&this.uiWidgetBase) {
			this.mExpProgressBar_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mRoleCanvas_G/ExpCanvas/mExpProgressBar') as mw.ProgressBar
		}
		return this.mExpProgressBar_Internal
	}
	private mExpTextBlock_Internal: mw.TextBlock
	public get mExpTextBlock(): mw.TextBlock {
		if(!this.mExpTextBlock_Internal&&this.uiWidgetBase) {
			this.mExpTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mRoleCanvas_G/ExpCanvas/mExpTextBlock') as mw.TextBlock
		}
		return this.mExpTextBlock_Internal
	}
	private mInvincibleCanvas_Internal: mw.Canvas
	public get mInvincibleCanvas(): mw.Canvas {
		if(!this.mInvincibleCanvas_Internal&&this.uiWidgetBase) {
			this.mInvincibleCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mRoleCanvas_G/mInvincibleCanvas') as mw.Canvas
		}
		return this.mInvincibleCanvas_Internal
	}
	private mInvincibleButton_Internal: mw.Button
	public get mInvincibleButton(): mw.Button {
		if(!this.mInvincibleButton_Internal&&this.uiWidgetBase) {
			this.mInvincibleButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mRoleCanvas_G/mInvincibleCanvas/mInvincibleButton') as mw.Button
		}
		return this.mInvincibleButton_Internal
	}
	private mTipsInvincibleTextBlock_Internal: mw.TextBlock
	public get mTipsInvincibleTextBlock(): mw.TextBlock {
		if(!this.mTipsInvincibleTextBlock_Internal&&this.uiWidgetBase) {
			this.mTipsInvincibleTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mRoleCanvas_G/mInvincibleCanvas/mTipsInvincibleTextBlock') as mw.TextBlock
		}
		return this.mTipsInvincibleTextBlock_Internal
	}
	private mInvincibleTextBlock_Internal: mw.TextBlock
	public get mInvincibleTextBlock(): mw.TextBlock {
		if(!this.mInvincibleTextBlock_Internal&&this.uiWidgetBase) {
			this.mInvincibleTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mRoleCanvas_G/mInvincibleCanvas/mInvincibleTextBlock') as mw.TextBlock
		}
		return this.mInvincibleTextBlock_Internal
	}
	private mUpLvButton_Internal: mw.Button
	public get mUpLvButton(): mw.Button {
		if(!this.mUpLvButton_Internal&&this.uiWidgetBase) {
			this.mUpLvButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mRoleCanvas_G/mUpLvButton') as mw.Button
		}
		return this.mUpLvButton_Internal
	}
	private mUpExpTextBlock_Internal: mw.TextBlock
	public get mUpExpTextBlock(): mw.TextBlock {
		if(!this.mUpExpTextBlock_Internal&&this.uiWidgetBase) {
			this.mUpExpTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mRoleCanvas_G/UpExpCanvas/mUpExpTextBlock') as mw.TextBlock
		}
		return this.mUpExpTextBlock_Internal
	}
	private mUpExpFlipBook_Internal: mw.FlipBook
	public get mUpExpFlipBook(): mw.FlipBook {
		if(!this.mUpExpFlipBook_Internal&&this.uiWidgetBase) {
			this.mUpExpFlipBook_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mRoleCanvas_G/UpExpCanvas/mUpExpFlipBook') as mw.FlipBook
		}
		return this.mUpExpFlipBook_Internal
	}
	private mUpExpButton_Internal: mw.Button
	public get mUpExpButton(): mw.Button {
		if(!this.mUpExpButton_Internal&&this.uiWidgetBase) {
			this.mUpExpButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mRoleCanvas_G/UpExpCanvas/mUpExpButton') as mw.Button
		}
		return this.mUpExpButton_Internal
	}
	private mBoneextBlock_Internal: mw.TextBlock
	public get mBoneextBlock(): mw.TextBlock {
		if(!this.mBoneextBlock_Internal&&this.uiWidgetBase) {
			this.mBoneextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MiddleTopCanvas/BoneCanvas/mBoneextBlock') as mw.TextBlock
		}
		return this.mBoneextBlock_Internal
	}
	private mAddBoneButton_Internal: mw.Button
	public get mAddBoneButton(): mw.Button {
		if(!this.mAddBoneButton_Internal&&this.uiWidgetBase) {
			this.mAddBoneButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MiddleTopCanvas/BoneCanvas/mAddBoneButton') as mw.Button
		}
		return this.mAddBoneButton_Internal
	}
	private mCoinTextBlock_Internal: mw.TextBlock
	public get mCoinTextBlock(): mw.TextBlock {
		if(!this.mCoinTextBlock_Internal&&this.uiWidgetBase) {
			this.mCoinTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MiddleTopCanvas/CoinCanvas/mCoinTextBlock') as mw.TextBlock
		}
		return this.mCoinTextBlock_Internal
	}
	private mAddCoinButton_Internal: mw.Button
	public get mAddCoinButton(): mw.Button {
		if(!this.mAddCoinButton_Internal&&this.uiWidgetBase) {
			this.mAddCoinButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MiddleTopCanvas/CoinCanvas/mAddCoinButton') as mw.Button
		}
		return this.mAddCoinButton_Internal
	}
	private mDiamondTextBlock_Internal: mw.TextBlock
	public get mDiamondTextBlock(): mw.TextBlock {
		if(!this.mDiamondTextBlock_Internal&&this.uiWidgetBase) {
			this.mDiamondTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MiddleTopCanvas/DiamondCanvas/mDiamondTextBlock') as mw.TextBlock
		}
		return this.mDiamondTextBlock_Internal
	}
	private mAddDiamondButton_Internal: mw.Button
	public get mAddDiamondButton(): mw.Button {
		if(!this.mAddDiamondButton_Internal&&this.uiWidgetBase) {
			this.mAddDiamondButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MiddleTopCanvas/DiamondCanvas/mAddDiamondButton') as mw.Button
		}
		return this.mAddDiamondButton_Internal
	}
	private mDayStrCanvas_Internal: mw.Canvas
	public get mDayStrCanvas(): mw.Canvas {
		if(!this.mDayStrCanvas_Internal&&this.uiWidgetBase) {
			this.mDayStrCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mDayStrCanvas') as mw.Canvas
		}
		return this.mDayStrCanvas_Internal
	}
	private mDayStr1Canvas_Internal: mw.Canvas
	public get mDayStr1Canvas(): mw.Canvas {
		if(!this.mDayStr1Canvas_Internal&&this.uiWidgetBase) {
			this.mDayStr1Canvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mDayStrCanvas/mDayStr1Canvas') as mw.Canvas
		}
		return this.mDayStr1Canvas_Internal
	}
	private mDayStr1IconImage_Internal: mw.Image
	public get mDayStr1IconImage(): mw.Image {
		if(!this.mDayStr1IconImage_Internal&&this.uiWidgetBase) {
			this.mDayStr1IconImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mDayStrCanvas/mDayStr1Canvas/mDayStr1IconImage') as mw.Image
		}
		return this.mDayStr1IconImage_Internal
	}
	private mDayStr1TextBlock_Internal: mw.TextBlock
	public get mDayStr1TextBlock(): mw.TextBlock {
		if(!this.mDayStr1TextBlock_Internal&&this.uiWidgetBase) {
			this.mDayStr1TextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mDayStrCanvas/mDayStr1Canvas/mDayStr1TextBlock') as mw.TextBlock
		}
		return this.mDayStr1TextBlock_Internal
	}
	private mDayStr2Canvas_Internal: mw.Canvas
	public get mDayStr2Canvas(): mw.Canvas {
		if(!this.mDayStr2Canvas_Internal&&this.uiWidgetBase) {
			this.mDayStr2Canvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mDayStrCanvas/mDayStr2Canvas') as mw.Canvas
		}
		return this.mDayStr2Canvas_Internal
	}
	private mDayStr2IconImage_Internal: mw.Image
	public get mDayStr2IconImage(): mw.Image {
		if(!this.mDayStr2IconImage_Internal&&this.uiWidgetBase) {
			this.mDayStr2IconImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mDayStrCanvas/mDayStr2Canvas/mDayStr2IconImage') as mw.Image
		}
		return this.mDayStr2IconImage_Internal
	}
	private mDayStr2TextBlock_Internal: mw.TextBlock
	public get mDayStr2TextBlock(): mw.TextBlock {
		if(!this.mDayStr2TextBlock_Internal&&this.uiWidgetBase) {
			this.mDayStr2TextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mDayStrCanvas/mDayStr2Canvas/mDayStr2TextBlock') as mw.TextBlock
		}
		return this.mDayStr2TextBlock_Internal
	}
	private mDayStrButton_Internal: mw.Button
	public get mDayStrButton(): mw.Button {
		if(!this.mDayStrButton_Internal&&this.uiWidgetBase) {
			this.mDayStrButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mDayStrCanvas/mDayStrButton') as mw.Button
		}
		return this.mDayStrButton_Internal
	}
	private mDayStrTimeTextBlock_Internal: mw.TextBlock
	public get mDayStrTimeTextBlock(): mw.TextBlock {
		if(!this.mDayStrTimeTextBlock_Internal&&this.uiWidgetBase) {
			this.mDayStrTimeTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mDayStrCanvas/mDayStrButton/mDayStrTimeTextBlock') as mw.TextBlock
		}
		return this.mDayStrTimeTextBlock_Internal
	}
	private mKillTipCanvas_Internal: mw.Canvas
	public get mKillTipCanvas(): mw.Canvas {
		if(!this.mKillTipCanvas_Internal&&this.uiWidgetBase) {
			this.mKillTipCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mKillTipCanvas') as mw.Canvas
		}
		return this.mKillTipCanvas_Internal
	}
	private mKillTipCountCanvas_Internal: mw.Canvas
	public get mKillTipCountCanvas(): mw.Canvas {
		if(!this.mKillTipCountCanvas_Internal&&this.uiWidgetBase) {
			this.mKillTipCountCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/KillStreakCanvas/mKillTipCountCanvas') as mw.Canvas
		}
		return this.mKillTipCountCanvas_Internal
	}
	private mKillTipTextBlock1_Internal: mw.TextBlock
	public get mKillTipTextBlock1(): mw.TextBlock {
		if(!this.mKillTipTextBlock1_Internal&&this.uiWidgetBase) {
			this.mKillTipTextBlock1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/KillStreakCanvas/mKillTipCountCanvas/mKillTipTextBlock1') as mw.TextBlock
		}
		return this.mKillTipTextBlock1_Internal
	}
	private mKillTipTextBlock2_Internal: mw.TextBlock
	public get mKillTipTextBlock2(): mw.TextBlock {
		if(!this.mKillTipTextBlock2_Internal&&this.uiWidgetBase) {
			this.mKillTipTextBlock2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/KillStreakCanvas/mKillTipCountCanvas/mKillTipTextBlock2') as mw.TextBlock
		}
		return this.mKillTipTextBlock2_Internal
	}
	private mKillTipTextBlock3_Internal: mw.TextBlock
	public get mKillTipTextBlock3(): mw.TextBlock {
		if(!this.mKillTipTextBlock3_Internal&&this.uiWidgetBase) {
			this.mKillTipTextBlock3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/KillStreakCanvas/mKillTipTextBlock3') as mw.TextBlock
		}
		return this.mKillTipTextBlock3_Internal
	}
	private mDeadCanvas_Internal: mw.Canvas
	public get mDeadCanvas(): mw.Canvas {
		if(!this.mDeadCanvas_Internal&&this.uiWidgetBase) {
			this.mDeadCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mDeadCanvas') as mw.Canvas
		}
		return this.mDeadCanvas_Internal
	}
	private mDeadTextBlock_Internal: mw.TextBlock
	public get mDeadTextBlock(): mw.TextBlock {
		if(!this.mDeadTextBlock_Internal&&this.uiWidgetBase) {
			this.mDeadTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mDeadCanvas/mDeadTextBlock') as mw.TextBlock
		}
		return this.mDeadTextBlock_Internal
	}
	private mDeadCountDownTextBlock_Internal: mw.TextBlock
	public get mDeadCountDownTextBlock(): mw.TextBlock {
		if(!this.mDeadCountDownTextBlock_Internal&&this.uiWidgetBase) {
			this.mDeadCountDownTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mDeadCanvas/mDeadCountDownTextBlock') as mw.TextBlock
		}
		return this.mDeadCountDownTextBlock_Internal
	}
	private mDeadTipsTextBlock_Internal: mw.TextBlock
	public get mDeadTipsTextBlock(): mw.TextBlock {
		if(!this.mDeadTipsTextBlock_Internal&&this.uiWidgetBase) {
			this.mDeadTipsTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mDeadCanvas/mDeadTipsTextBlock') as mw.TextBlock
		}
		return this.mDeadTipsTextBlock_Internal
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
		
		this.mAtkButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mAtkButton");
		});
		this.mAtkButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mJumpButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mJumpButton");
		});
		this.mJumpButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mSprintButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mSprintButton");
		});
		this.mSprintButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mOnOffRingSoulButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mOnOffRingSoulButton");
		});
		this.mOnOffRingSoulButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mFlyButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mFlyButton");
		});
		this.mFlyButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mAutoAtkButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mAutoAtkButton");
		});
		this.mAutoAtkButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mPlayerButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mPlayerButton");
		});
		this.mPlayerButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mMusicButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mMusicButton");
		});
		this.mMusicButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mHomeButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mHomeButton");
		});
		this.mHomeButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mShopButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mShopButton");
		});
		this.mShopButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mRankButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mRankButton");
		});
		this.mRankButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mLotteryButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mLotteryButton");
		});
		this.mLotteryButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mOnlineRewardButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mOnlineRewardButton");
		});
		this.mOnlineRewardButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mTaskButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mTaskButton");
		});
		this.mTaskButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mSignInButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mSignInButton");
		});
		this.mSignInButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mAdsButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mAdsButton");
		});
		this.mAdsButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mArkButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mArkButton");
		});
		this.mArkButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mGetButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mGetButton");
		});
		this.mGetButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mRingSoulButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mRingSoulButton");
		});
		this.mRingSoulButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mNewPeopleButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mNewPeopleButton");
		});
		this.mNewPeopleButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mSwordButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mSwordButton");
		});
		this.mSwordButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mSoulBoneButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mSoulBoneButton");
		});
		this.mSoulBoneButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mCloseMusicBtn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mCloseMusicBtn");
		});
		this.mCloseMusicBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mLeftMusicBtn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mLeftMusicBtn");
		});
		this.mLeftMusicBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mOnOffMusicBtn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mOnOffMusicBtn");
		});
		this.mOnOffMusicBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mRightMusicBtn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mRightMusicBtn");
		});
		this.mRightMusicBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mInvincibleButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mInvincibleButton");
		});
		this.mInvincibleButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mUpLvButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mUpLvButton");
		});
		this.mUpLvButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mUpExpButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mUpExpButton");
		});
		this.mUpExpButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mAddBoneButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mAddBoneButton");
		});
		this.mAddBoneButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mAddCoinButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mAddCoinButton");
		});
		this.mAddCoinButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mAddDiamondButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mAddDiamondButton");
		});
		this.mAddDiamondButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mDayStrButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mDayStrButton");
		});
		this.mDayStrButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mOnOffRingSoulTextBlock)
		
	
		this.initLanguage(this.mFlyTextBlock)
		
	
		this.initLanguage(this.mSkillTextBlock_1)
		
	
		this.initLanguage(this.mSkillCDTextBlock_1)
		
	
		this.initLanguage(this.mAutoAtkTextBlock)
		
	
		this.initLanguage(this.mPlayerTextBlock)
		
	
		this.initLanguage(this.mMusicTextBlock)
		
	
		this.initLanguage(this.mHomeTextBlock)
		
	
		this.initLanguage(this.mShopTextBlock)
		
	
		this.initLanguage(this.mRankTextBlock)
		
	
		this.initLanguage(this.mLotteryTextBlock)
		
	
		this.initLanguage(this.mOnlineRewardTextBlock)
		
	
		this.initLanguage(this.mTaskTextBlock)
		
	
		this.initLanguage(this.mSignInTextBlock)
		
	
		this.initLanguage(this.mAdsTextBlock)
		
	
		this.initLanguage(this.mArkTextBlock)
		
	
		this.initLanguage(this.mGetTextBlock)
		
	
		this.initLanguage(this.mRingSoulTextBlock)
		
	
		this.initLanguage(this.mNewPeopleTextBlock)
		
	
		this.initLanguage(this.mSwordTextBlock)
		
	
		this.initLanguage(this.mSoulBoneTextBlock)
		
	
		this.initLanguage(this.mMusicText)
		
	
		this.initLanguage(this.mAtkTextBlock)
		
	
		this.initLanguage(this.mLvTextBlock)
		
	
		this.initLanguage(this.mHpTextBlock)
		
	
		this.initLanguage(this.mMpTextBlock)
		
	
		this.initLanguage(this.mExpTextBlock)
		
	
		this.initLanguage(this.mTipsInvincibleTextBlock)
		
	
		this.initLanguage(this.mInvincibleTextBlock)
		
	
		this.initLanguage(this.mUpExpTextBlock)
		
	
		this.initLanguage(this.mBoneextBlock)
		
	
		this.initLanguage(this.mCoinTextBlock)
		
	
		this.initLanguage(this.mDiamondTextBlock)
		
	
		this.initLanguage(this.mDayStr1TextBlock)
		
	
		this.initLanguage(this.mDayStr2TextBlock)
		
	
		this.initLanguage(this.mDayStrTimeTextBlock)
		
	
		this.initLanguage(this.mKillTipTextBlock1)
		
	
		this.initLanguage(this.mKillTipTextBlock2)
		
	
		this.initLanguage(this.mKillTipTextBlock3)
		
	
		this.initLanguage(this.mDeadTextBlock)
		
	
		this.initLanguage(this.mDeadCountDownTextBlock)
		
	
		this.initLanguage(this.mDeadTipsTextBlock)
		
	
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
 