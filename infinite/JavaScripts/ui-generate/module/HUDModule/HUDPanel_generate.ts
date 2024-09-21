/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 爱玩游戏的小胖子
 * UI: UI/module/HUDModule/HUDPanel.ui
 * TIME: 2024.09.21-21.04.40
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
	private mPlayerButton_Internal: mw.Button
	public get mPlayerButton(): mw.Button {
		if(!this.mPlayerButton_Internal&&this.uiWidgetBase) {
			this.mPlayerButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/RightTopCanvas/PlayerCanvas/mPlayerButton') as mw.Button
		}
		return this.mPlayerButton_Internal
	}
	private mMusicButton_Internal: mw.Button
	public get mMusicButton(): mw.Button {
		if(!this.mMusicButton_Internal&&this.uiWidgetBase) {
			this.mMusicButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/RightTopCanvas/MusicCanvas/mMusicButton') as mw.Button
		}
		return this.mMusicButton_Internal
	}
	private mHomeButton_Internal: mw.Button
	public get mHomeButton(): mw.Button {
		if(!this.mHomeButton_Internal&&this.uiWidgetBase) {
			this.mHomeButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/RightTopCanvas/HomeCanvas/mHomeButton') as mw.Button
		}
		return this.mHomeButton_Internal
	}
	private mShopButton_Internal: mw.Button
	public get mShopButton(): mw.Button {
		if(!this.mShopButton_Internal&&this.uiWidgetBase) {
			this.mShopButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/RightTopCanvas/ShopCanvas/mShopButton') as mw.Button
		}
		return this.mShopButton_Internal
	}
	private mRankButton_Internal: mw.Button
	public get mRankButton(): mw.Button {
		if(!this.mRankButton_Internal&&this.uiWidgetBase) {
			this.mRankButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/RightTopCanvas/RankCanvas/mRankButton') as mw.Button
		}
		return this.mRankButton_Internal
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
	private mArkButton_Internal: mw.Button
	public get mArkButton(): mw.Button {
		if(!this.mArkButton_Internal&&this.uiWidgetBase) {
			this.mArkButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/RightTopCanvas/ArkCanvas/mArkButton') as mw.Button
		}
		return this.mArkButton_Internal
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
	private mRingSoulButton_Internal: mw.Button
	public get mRingSoulButton(): mw.Button {
		if(!this.mRingSoulButton_Internal&&this.uiWidgetBase) {
			this.mRingSoulButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/RightTopCanvas/RingSoulCanvas/mRingSoulButton') as mw.Button
		}
		return this.mRingSoulButton_Internal
	}
	private mRingSoulPointImage_Internal: mw.Image
	public get mRingSoulPointImage(): mw.Image {
		if(!this.mRingSoulPointImage_Internal&&this.uiWidgetBase) {
			this.mRingSoulPointImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/RightTopCanvas/RingSoulCanvas/mRingSoulPointImage') as mw.Image
		}
		return this.mRingSoulPointImage_Internal
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
	private mDeadCountDownTextBlock_Internal: mw.TextBlock
	public get mDeadCountDownTextBlock(): mw.TextBlock {
		if(!this.mDeadCountDownTextBlock_Internal&&this.uiWidgetBase) {
			this.mDeadCountDownTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mDeadCanvas/mDeadCountDownTextBlock') as mw.TextBlock
		}
		return this.mDeadCountDownTextBlock_Internal
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
		
	
		this.mAddCoinButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mAddCoinButton");
		});
		this.mAddCoinButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mAddDiamondButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mAddDiamondButton");
		});
		this.mAddDiamondButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mOnOffRingSoulTextBlock)
		
	
		this.initLanguage(this.mOnlineRewardTextBlock)
		
	
		this.initLanguage(this.mMusicText)
		
	
		this.initLanguage(this.mAtkTextBlock)
		
	
		this.initLanguage(this.mLvTextBlock)
		
	
		this.initLanguage(this.mHpTextBlock)
		
	
		this.initLanguage(this.mMpTextBlock)
		
	
		this.initLanguage(this.mExpTextBlock)
		
	
		this.initLanguage(this.mInvincibleTextBlock)
		
	
		this.initLanguage(this.mCoinTextBlock)
		
	
		this.initLanguage(this.mDiamondTextBlock)
		
	
		this.initLanguage(this.mKillTipTextBlock1)
		
	
		this.initLanguage(this.mKillTipTextBlock2)
		
	
		this.initLanguage(this.mKillTipTextBlock3)
		
	
		this.initLanguage(this.mDeadCountDownTextBlock)
		
	
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/RightTopCanvas/PlayerCanvas/ShopTextBlock") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/RightTopCanvas/MusicCanvas/MusicTextBlock") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/RightTopCanvas/HomeCanvas/HomeTextBlock") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/RightTopCanvas/ShopCanvas/ShopTextBlock") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/RightTopCanvas/RankCanvas/RankTextBlock") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/RightTopCanvas/TaskCanvas/TaskTextBlock") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/RightTopCanvas/SignInCanvas/SignInTextBlock") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/RightTopCanvas/AdsCanvas/AdsTextBlock") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/RightTopCanvas/ArkCanvas/ArkTextBlock") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/RightTopCanvas/GetCanvas/GetTextBlock") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/RightTopCanvas/RingSoulCanvas/RingSoulTextBlock") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mRoleCanvas_G/mInvincibleCanvas/InvincibleTextBlock") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mRoleCanvas_G/UpExpCanvas/UpExpTextBlock") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mDeadCanvas/DeadTextBlock") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mDeadCanvas/DeadTipsTextBlock") as any);
		
	
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
 