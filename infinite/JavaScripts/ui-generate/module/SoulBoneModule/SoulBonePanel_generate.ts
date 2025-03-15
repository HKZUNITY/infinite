/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 爱玩游戏的小胖子
 * UI: UI/module/SoulBoneModule/SoulBonePanel.ui
 * TIME: 2025.03.15-11.43.48
 */
 
@UIBind('UI/module/SoulBoneModule/SoulBonePanel.ui')
export default class SoulBonePanel_Generate extends UIScript {
		private mMainCanvas_Internal: mw.Canvas
	public get mMainCanvas(): mw.Canvas {
		if(!this.mMainCanvas_Internal&&this.uiWidgetBase) {
			this.mMainCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/mMainCanvas') as mw.Canvas
		}
		return this.mMainCanvas_Internal
	}
	private mPartListScrollBox_Internal: mw.ScrollBox
	public get mPartListScrollBox(): mw.ScrollBox {
		if(!this.mPartListScrollBox_Internal&&this.uiWidgetBase) {
			this.mPartListScrollBox_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/mMainCanvas/mPartListScrollBox') as mw.ScrollBox
		}
		return this.mPartListScrollBox_Internal
	}
	private mPartListCanvas_Internal: mw.Canvas
	public get mPartListCanvas(): mw.Canvas {
		if(!this.mPartListCanvas_Internal&&this.uiWidgetBase) {
			this.mPartListCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/mMainCanvas/mPartListScrollBox/mPartListCanvas') as mw.Canvas
		}
		return this.mPartListCanvas_Internal
	}
	private mContentCanvas_Internal: mw.Canvas
	public get mContentCanvas(): mw.Canvas {
		if(!this.mContentCanvas_Internal&&this.uiWidgetBase) {
			this.mContentCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/mMainCanvas/mContentCanvas') as mw.Canvas
		}
		return this.mContentCanvas_Internal
	}
	private mIconCanvas_Internal: mw.Canvas
	public get mIconCanvas(): mw.Canvas {
		if(!this.mIconCanvas_Internal&&this.uiWidgetBase) {
			this.mIconCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/mMainCanvas/mContentCanvas/mIconCanvas') as mw.Canvas
		}
		return this.mIconCanvas_Internal
	}
	private mIconBgImage_Internal: mw.Image
	public get mIconBgImage(): mw.Image {
		if(!this.mIconBgImage_Internal&&this.uiWidgetBase) {
			this.mIconBgImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/mMainCanvas/mContentCanvas/mIconCanvas/mIconBgImage') as mw.Image
		}
		return this.mIconBgImage_Internal
	}
	private mIconImage_Internal: mw.Image
	public get mIconImage(): mw.Image {
		if(!this.mIconImage_Internal&&this.uiWidgetBase) {
			this.mIconImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/mMainCanvas/mContentCanvas/mIconCanvas/mIconBgImage/mIconImage') as mw.Image
		}
		return this.mIconImage_Internal
	}
	private mNameFgImage_Internal: mw.Image
	public get mNameFgImage(): mw.Image {
		if(!this.mNameFgImage_Internal&&this.uiWidgetBase) {
			this.mNameFgImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/mMainCanvas/mContentCanvas/mIconCanvas/mNameFgImage') as mw.Image
		}
		return this.mNameFgImage_Internal
	}
	private mNameTextBlock_Internal: mw.TextBlock
	public get mNameTextBlock(): mw.TextBlock {
		if(!this.mNameTextBlock_Internal&&this.uiWidgetBase) {
			this.mNameTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/mMainCanvas/mContentCanvas/mIconCanvas/mNameFgImage/mNameTextBlock') as mw.TextBlock
		}
		return this.mNameTextBlock_Internal
	}
	private mStarCanvas_Internal: mw.Canvas
	public get mStarCanvas(): mw.Canvas {
		if(!this.mStarCanvas_Internal&&this.uiWidgetBase) {
			this.mStarCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/mMainCanvas/mContentCanvas/mIconCanvas/mStarCanvas') as mw.Canvas
		}
		return this.mStarCanvas_Internal
	}
	private mPropertyCanvas_Internal: mw.Canvas
	public get mPropertyCanvas(): mw.Canvas {
		if(!this.mPropertyCanvas_Internal&&this.uiWidgetBase) {
			this.mPropertyCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/mMainCanvas/mContentCanvas/mPropertyCanvas') as mw.Canvas
		}
		return this.mPropertyCanvas_Internal
	}
	private mHpCanvas_Internal: mw.Canvas
	public get mHpCanvas(): mw.Canvas {
		if(!this.mHpCanvas_Internal&&this.uiWidgetBase) {
			this.mHpCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/mMainCanvas/mContentCanvas/mPropertyCanvas/mHpCanvas') as mw.Canvas
		}
		return this.mHpCanvas_Internal
	}
	private mHpTextBlock_Internal: mw.TextBlock
	public get mHpTextBlock(): mw.TextBlock {
		if(!this.mHpTextBlock_Internal&&this.uiWidgetBase) {
			this.mHpTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/mMainCanvas/mContentCanvas/mPropertyCanvas/mHpCanvas/HpTitleImage/mHpTextBlock') as mw.TextBlock
		}
		return this.mHpTextBlock_Internal
	}
	private mHpArrowImage_Internal: mw.Image
	public get mHpArrowImage(): mw.Image {
		if(!this.mHpArrowImage_Internal&&this.uiWidgetBase) {
			this.mHpArrowImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/mMainCanvas/mContentCanvas/mPropertyCanvas/mHpCanvas/mHpArrowImage') as mw.Image
		}
		return this.mHpArrowImage_Internal
	}
	private mHpTipsTextBlock_Internal: mw.TextBlock
	public get mHpTipsTextBlock(): mw.TextBlock {
		if(!this.mHpTipsTextBlock_Internal&&this.uiWidgetBase) {
			this.mHpTipsTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/mMainCanvas/mContentCanvas/mPropertyCanvas/mHpCanvas/mHpArrowImage/mHpTipsTextBlock') as mw.TextBlock
		}
		return this.mHpTipsTextBlock_Internal
	}
	private mHpedTextBlock_Internal: mw.TextBlock
	public get mHpedTextBlock(): mw.TextBlock {
		if(!this.mHpedTextBlock_Internal&&this.uiWidgetBase) {
			this.mHpedTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/mMainCanvas/mContentCanvas/mPropertyCanvas/mHpCanvas/mHpArrowImage/mHpedTextBlock') as mw.TextBlock
		}
		return this.mHpedTextBlock_Internal
	}
	private mHpLineImage_Internal: mw.Image
	public get mHpLineImage(): mw.Image {
		if(!this.mHpLineImage_Internal&&this.uiWidgetBase) {
			this.mHpLineImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/mMainCanvas/mContentCanvas/mPropertyCanvas/mHpCanvas/mHpLineImage') as mw.Image
		}
		return this.mHpLineImage_Internal
	}
	private mAtkCanvas_Internal: mw.Canvas
	public get mAtkCanvas(): mw.Canvas {
		if(!this.mAtkCanvas_Internal&&this.uiWidgetBase) {
			this.mAtkCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/mMainCanvas/mContentCanvas/mPropertyCanvas/mAtkCanvas') as mw.Canvas
		}
		return this.mAtkCanvas_Internal
	}
	private mAtkTextBlock_Internal: mw.TextBlock
	public get mAtkTextBlock(): mw.TextBlock {
		if(!this.mAtkTextBlock_Internal&&this.uiWidgetBase) {
			this.mAtkTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/mMainCanvas/mContentCanvas/mPropertyCanvas/mAtkCanvas/AtkTitleImage/mAtkTextBlock') as mw.TextBlock
		}
		return this.mAtkTextBlock_Internal
	}
	private mAtkArrowImage_Internal: mw.Image
	public get mAtkArrowImage(): mw.Image {
		if(!this.mAtkArrowImage_Internal&&this.uiWidgetBase) {
			this.mAtkArrowImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/mMainCanvas/mContentCanvas/mPropertyCanvas/mAtkCanvas/mAtkArrowImage') as mw.Image
		}
		return this.mAtkArrowImage_Internal
	}
	private mAtkTipsTextBlock_Internal: mw.TextBlock
	public get mAtkTipsTextBlock(): mw.TextBlock {
		if(!this.mAtkTipsTextBlock_Internal&&this.uiWidgetBase) {
			this.mAtkTipsTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/mMainCanvas/mContentCanvas/mPropertyCanvas/mAtkCanvas/mAtkArrowImage/mAtkTipsTextBlock') as mw.TextBlock
		}
		return this.mAtkTipsTextBlock_Internal
	}
	private mAtkedTextBlock_Internal: mw.TextBlock
	public get mAtkedTextBlock(): mw.TextBlock {
		if(!this.mAtkedTextBlock_Internal&&this.uiWidgetBase) {
			this.mAtkedTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/mMainCanvas/mContentCanvas/mPropertyCanvas/mAtkCanvas/mAtkArrowImage/mAtkedTextBlock') as mw.TextBlock
		}
		return this.mAtkedTextBlock_Internal
	}
	private mAtkLineImage_Internal: mw.Image
	public get mAtkLineImage(): mw.Image {
		if(!this.mAtkLineImage_Internal&&this.uiWidgetBase) {
			this.mAtkLineImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/mMainCanvas/mContentCanvas/mPropertyCanvas/mAtkCanvas/mAtkLineImage') as mw.Image
		}
		return this.mAtkLineImage_Internal
	}
	private mNeedInfoCanvas_Internal: mw.Canvas
	public get mNeedInfoCanvas(): mw.Canvas {
		if(!this.mNeedInfoCanvas_Internal&&this.uiWidgetBase) {
			this.mNeedInfoCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/mMainCanvas/mContentCanvas/mNeedInfoCanvas') as mw.Canvas
		}
		return this.mNeedInfoCanvas_Internal
	}
	private mNeedTitleTextBlock_Internal: mw.TextBlock
	public get mNeedTitleTextBlock(): mw.TextBlock {
		if(!this.mNeedTitleTextBlock_Internal&&this.uiWidgetBase) {
			this.mNeedTitleTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/mMainCanvas/mContentCanvas/mNeedInfoCanvas/NeedInfoBgImage/mNeedTitleTextBlock') as mw.TextBlock
		}
		return this.mNeedTitleTextBlock_Internal
	}
	private mNeedLvCanvas_Internal: mw.Canvas
	public get mNeedLvCanvas(): mw.Canvas {
		if(!this.mNeedLvCanvas_Internal&&this.uiWidgetBase) {
			this.mNeedLvCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/mMainCanvas/mContentCanvas/mNeedInfoCanvas/mNeedLvCanvas') as mw.Canvas
		}
		return this.mNeedLvCanvas_Internal
	}
	private mNeedLvCountTextBlock_Internal: mw.TextBlock
	public get mNeedLvCountTextBlock(): mw.TextBlock {
		if(!this.mNeedLvCountTextBlock_Internal&&this.uiWidgetBase) {
			this.mNeedLvCountTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/mMainCanvas/mContentCanvas/mNeedInfoCanvas/mNeedLvCanvas/mNeedLvCountTextBlock') as mw.TextBlock
		}
		return this.mNeedLvCountTextBlock_Internal
	}
	private mNeedDianondtCanvas_Internal: mw.Canvas
	public get mNeedDianondtCanvas(): mw.Canvas {
		if(!this.mNeedDianondtCanvas_Internal&&this.uiWidgetBase) {
			this.mNeedDianondtCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/mMainCanvas/mContentCanvas/mNeedInfoCanvas/mNeedDianondtCanvas') as mw.Canvas
		}
		return this.mNeedDianondtCanvas_Internal
	}
	private mNeedDiamondTipsTextBlock_Internal: mw.TextBlock
	public get mNeedDiamondTipsTextBlock(): mw.TextBlock {
		if(!this.mNeedDiamondTipsTextBlock_Internal&&this.uiWidgetBase) {
			this.mNeedDiamondTipsTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/mMainCanvas/mContentCanvas/mNeedInfoCanvas/mNeedDianondtCanvas/mNeedDiamondTipsTextBlock') as mw.TextBlock
		}
		return this.mNeedDiamondTipsTextBlock_Internal
	}
	private mNeedDiamondIconBgImage_Internal: mw.Image
	public get mNeedDiamondIconBgImage(): mw.Image {
		if(!this.mNeedDiamondIconBgImage_Internal&&this.uiWidgetBase) {
			this.mNeedDiamondIconBgImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/mMainCanvas/mContentCanvas/mNeedInfoCanvas/mNeedDianondtCanvas/mNeedDiamondIconBgImage') as mw.Image
		}
		return this.mNeedDiamondIconBgImage_Internal
	}
	private mNeedDiamondIconImage_Internal: mw.Image
	public get mNeedDiamondIconImage(): mw.Image {
		if(!this.mNeedDiamondIconImage_Internal&&this.uiWidgetBase) {
			this.mNeedDiamondIconImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/mMainCanvas/mContentCanvas/mNeedInfoCanvas/mNeedDianondtCanvas/mNeedDiamondIconBgImage/mNeedDiamondIconImage') as mw.Image
		}
		return this.mNeedDiamondIconImage_Internal
	}
	private mNeedDiamondCountTextBlock_Internal: mw.TextBlock
	public get mNeedDiamondCountTextBlock(): mw.TextBlock {
		if(!this.mNeedDiamondCountTextBlock_Internal&&this.uiWidgetBase) {
			this.mNeedDiamondCountTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/mMainCanvas/mContentCanvas/mNeedInfoCanvas/mNeedDianondtCanvas/mNeedDiamondCountTextBlock') as mw.TextBlock
		}
		return this.mNeedDiamondCountTextBlock_Internal
	}
	private mNeedCoinCanvas_Internal: mw.Canvas
	public get mNeedCoinCanvas(): mw.Canvas {
		if(!this.mNeedCoinCanvas_Internal&&this.uiWidgetBase) {
			this.mNeedCoinCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/mMainCanvas/mContentCanvas/mNeedInfoCanvas/mNeedCoinCanvas') as mw.Canvas
		}
		return this.mNeedCoinCanvas_Internal
	}
	private mNeedCionTitleImage_Internal: mw.Image
	public get mNeedCionTitleImage(): mw.Image {
		if(!this.mNeedCionTitleImage_Internal&&this.uiWidgetBase) {
			this.mNeedCionTitleImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/mMainCanvas/mContentCanvas/mNeedInfoCanvas/mNeedCoinCanvas/mNeedCionTitleImage') as mw.Image
		}
		return this.mNeedCionTitleImage_Internal
	}
	private mNeedCoinTextBlock_Internal: mw.TextBlock
	public get mNeedCoinTextBlock(): mw.TextBlock {
		if(!this.mNeedCoinTextBlock_Internal&&this.uiWidgetBase) {
			this.mNeedCoinTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/mMainCanvas/mContentCanvas/mNeedInfoCanvas/mNeedCoinCanvas/mNeedCoinTextBlock') as mw.TextBlock
		}
		return this.mNeedCoinTextBlock_Internal
	}
	private mNeedCoinIconBgImage_Internal: mw.Image
	public get mNeedCoinIconBgImage(): mw.Image {
		if(!this.mNeedCoinIconBgImage_Internal&&this.uiWidgetBase) {
			this.mNeedCoinIconBgImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/mMainCanvas/mContentCanvas/mNeedInfoCanvas/mNeedCoinCanvas/mNeedCoinIconBgImage') as mw.Image
		}
		return this.mNeedCoinIconBgImage_Internal
	}
	private mNeedCoinIconImage_Internal: mw.Image
	public get mNeedCoinIconImage(): mw.Image {
		if(!this.mNeedCoinIconImage_Internal&&this.uiWidgetBase) {
			this.mNeedCoinIconImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/mMainCanvas/mContentCanvas/mNeedInfoCanvas/mNeedCoinCanvas/mNeedCoinIconBgImage/mNeedCoinIconImage') as mw.Image
		}
		return this.mNeedCoinIconImage_Internal
	}
	private mNeedCoinCountTextBlock_Internal: mw.TextBlock
	public get mNeedCoinCountTextBlock(): mw.TextBlock {
		if(!this.mNeedCoinCountTextBlock_Internal&&this.uiWidgetBase) {
			this.mNeedCoinCountTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/mMainCanvas/mContentCanvas/mNeedInfoCanvas/mNeedCoinCanvas/mNeedCoinCountTextBlock') as mw.TextBlock
		}
		return this.mNeedCoinCountTextBlock_Internal
	}
	private mNeedBoneCanvas_Internal: mw.Canvas
	public get mNeedBoneCanvas(): mw.Canvas {
		if(!this.mNeedBoneCanvas_Internal&&this.uiWidgetBase) {
			this.mNeedBoneCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/mMainCanvas/mContentCanvas/mNeedInfoCanvas/mNeedBoneCanvas') as mw.Canvas
		}
		return this.mNeedBoneCanvas_Internal
	}
	private mNeedBoneTitleImage_Internal: mw.Image
	public get mNeedBoneTitleImage(): mw.Image {
		if(!this.mNeedBoneTitleImage_Internal&&this.uiWidgetBase) {
			this.mNeedBoneTitleImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/mMainCanvas/mContentCanvas/mNeedInfoCanvas/mNeedBoneCanvas/mNeedBoneTitleImage') as mw.Image
		}
		return this.mNeedBoneTitleImage_Internal
	}
	private mNeedBoneTextBlock_Internal: mw.TextBlock
	public get mNeedBoneTextBlock(): mw.TextBlock {
		if(!this.mNeedBoneTextBlock_Internal&&this.uiWidgetBase) {
			this.mNeedBoneTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/mMainCanvas/mContentCanvas/mNeedInfoCanvas/mNeedBoneCanvas/mNeedBoneTextBlock') as mw.TextBlock
		}
		return this.mNeedBoneTextBlock_Internal
	}
	private mNeedBoneIconBgImage_Internal: mw.Image
	public get mNeedBoneIconBgImage(): mw.Image {
		if(!this.mNeedBoneIconBgImage_Internal&&this.uiWidgetBase) {
			this.mNeedBoneIconBgImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/mMainCanvas/mContentCanvas/mNeedInfoCanvas/mNeedBoneCanvas/mNeedBoneIconBgImage') as mw.Image
		}
		return this.mNeedBoneIconBgImage_Internal
	}
	private mNeedBoneIconImage_Internal: mw.Image
	public get mNeedBoneIconImage(): mw.Image {
		if(!this.mNeedBoneIconImage_Internal&&this.uiWidgetBase) {
			this.mNeedBoneIconImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/mMainCanvas/mContentCanvas/mNeedInfoCanvas/mNeedBoneCanvas/mNeedBoneIconBgImage/mNeedBoneIconImage') as mw.Image
		}
		return this.mNeedBoneIconImage_Internal
	}
	private mNeedBoneCountTextBlock_Internal: mw.TextBlock
	public get mNeedBoneCountTextBlock(): mw.TextBlock {
		if(!this.mNeedBoneCountTextBlock_Internal&&this.uiWidgetBase) {
			this.mNeedBoneCountTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/mMainCanvas/mContentCanvas/mNeedInfoCanvas/mNeedBoneCanvas/mNeedBoneCountTextBlock') as mw.TextBlock
		}
		return this.mNeedBoneCountTextBlock_Internal
	}
	private mHasMaxLvTextBlock_Internal: mw.TextBlock
	public get mHasMaxLvTextBlock(): mw.TextBlock {
		if(!this.mHasMaxLvTextBlock_Internal&&this.uiWidgetBase) {
			this.mHasMaxLvTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/mMainCanvas/mContentCanvas/mHasMaxLvTextBlock') as mw.TextBlock
		}
		return this.mHasMaxLvTextBlock_Internal
	}
	private mStrengthenCanvas_Internal: mw.Canvas
	public get mStrengthenCanvas(): mw.Canvas {
		if(!this.mStrengthenCanvas_Internal&&this.uiWidgetBase) {
			this.mStrengthenCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/mMainCanvas/mContentCanvas/mStrengthenCanvas') as mw.Canvas
		}
		return this.mStrengthenCanvas_Internal
	}
	private mProbabilityTextBlock_Internal: mw.TextBlock
	public get mProbabilityTextBlock(): mw.TextBlock {
		if(!this.mProbabilityTextBlock_Internal&&this.uiWidgetBase) {
			this.mProbabilityTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/mMainCanvas/mContentCanvas/mStrengthenCanvas/mProbabilityTextBlock') as mw.TextBlock
		}
		return this.mProbabilityTextBlock_Internal
	}
	private mUpProbabilityButton_Internal: mw.Button
	public get mUpProbabilityButton(): mw.Button {
		if(!this.mUpProbabilityButton_Internal&&this.uiWidgetBase) {
			this.mUpProbabilityButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/mMainCanvas/mContentCanvas/mStrengthenCanvas/mUpProbabilityButton') as mw.Button
		}
		return this.mUpProbabilityButton_Internal
	}
	private mUpProbabilityTextBlock_Internal: mw.TextBlock
	public get mUpProbabilityTextBlock(): mw.TextBlock {
		if(!this.mUpProbabilityTextBlock_Internal&&this.uiWidgetBase) {
			this.mUpProbabilityTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/mMainCanvas/mContentCanvas/mStrengthenCanvas/mUpProbabilityButton/mUpProbabilityTextBlock') as mw.TextBlock
		}
		return this.mUpProbabilityTextBlock_Internal
	}
	private mStrengthenButton_Internal: mw.Button
	public get mStrengthenButton(): mw.Button {
		if(!this.mStrengthenButton_Internal&&this.uiWidgetBase) {
			this.mStrengthenButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/mMainCanvas/mContentCanvas/mStrengthenCanvas/mStrengthenButton') as mw.Button
		}
		return this.mStrengthenButton_Internal
	}
	private mStrengthenTextBlock_Internal: mw.TextBlock
	public get mStrengthenTextBlock(): mw.TextBlock {
		if(!this.mStrengthenTextBlock_Internal&&this.uiWidgetBase) {
			this.mStrengthenTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/mMainCanvas/mContentCanvas/mStrengthenCanvas/mStrengthenButton/mStrengthenTextBlock') as mw.TextBlock
		}
		return this.mStrengthenTextBlock_Internal
	}
	private mMoneyCanvas_Internal: mw.Canvas
	public get mMoneyCanvas(): mw.Canvas {
		if(!this.mMoneyCanvas_Internal&&this.uiWidgetBase) {
			this.mMoneyCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/mMoneyCanvas') as mw.Canvas
		}
		return this.mMoneyCanvas_Internal
	}
	private mIconBoneImage_Internal: mw.Image
	public get mIconBoneImage(): mw.Image {
		if(!this.mIconBoneImage_Internal&&this.uiWidgetBase) {
			this.mIconBoneImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/mMoneyCanvas/MoneyCanvas/BoneCanvas/mIconBoneImage') as mw.Image
		}
		return this.mIconBoneImage_Internal
	}
	private mBoneCountTextBlock_Internal: mw.TextBlock
	public get mBoneCountTextBlock(): mw.TextBlock {
		if(!this.mBoneCountTextBlock_Internal&&this.uiWidgetBase) {
			this.mBoneCountTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/mMoneyCanvas/MoneyCanvas/BoneCanvas/mBoneCountTextBlock') as mw.TextBlock
		}
		return this.mBoneCountTextBlock_Internal
	}
	private mIconCoinImage_Internal: mw.Image
	public get mIconCoinImage(): mw.Image {
		if(!this.mIconCoinImage_Internal&&this.uiWidgetBase) {
			this.mIconCoinImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/mMoneyCanvas/MoneyCanvas/CoinCanvas/mIconCoinImage') as mw.Image
		}
		return this.mIconCoinImage_Internal
	}
	private mCoinCountTextBlock_Internal: mw.TextBlock
	public get mCoinCountTextBlock(): mw.TextBlock {
		if(!this.mCoinCountTextBlock_Internal&&this.uiWidgetBase) {
			this.mCoinCountTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/mMoneyCanvas/MoneyCanvas/CoinCanvas/mCoinCountTextBlock') as mw.TextBlock
		}
		return this.mCoinCountTextBlock_Internal
	}
	private mIconDiamondImage_Internal: mw.Image
	public get mIconDiamondImage(): mw.Image {
		if(!this.mIconDiamondImage_Internal&&this.uiWidgetBase) {
			this.mIconDiamondImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/mMoneyCanvas/MoneyCanvas/DiamondCanvas/mIconDiamondImage') as mw.Image
		}
		return this.mIconDiamondImage_Internal
	}
	private mDiamondCountTextBlock_Internal: mw.TextBlock
	public get mDiamondCountTextBlock(): mw.TextBlock {
		if(!this.mDiamondCountTextBlock_Internal&&this.uiWidgetBase) {
			this.mDiamondCountTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/mMoneyCanvas/MoneyCanvas/DiamondCanvas/mDiamondCountTextBlock') as mw.TextBlock
		}
		return this.mDiamondCountTextBlock_Internal
	}
	private mIconArkImage_Internal: mw.Image
	public get mIconArkImage(): mw.Image {
		if(!this.mIconArkImage_Internal&&this.uiWidgetBase) {
			this.mIconArkImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/mMoneyCanvas/MoneyCanvas/ArkCanvas/mIconArkImage') as mw.Image
		}
		return this.mIconArkImage_Internal
	}
	private mArkCountTextBlock_Internal: mw.TextBlock
	public get mArkCountTextBlock(): mw.TextBlock {
		if(!this.mArkCountTextBlock_Internal&&this.uiWidgetBase) {
			this.mArkCountTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/mMoneyCanvas/MoneyCanvas/ArkCanvas/mArkCountTextBlock') as mw.TextBlock
		}
		return this.mArkCountTextBlock_Internal
	}
	private mTotalRarityImage_Internal: mw.Image
	public get mTotalRarityImage(): mw.Image {
		if(!this.mTotalRarityImage_Internal&&this.uiWidgetBase) {
			this.mTotalRarityImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/mTotalRarityImage') as mw.Image
		}
		return this.mTotalRarityImage_Internal
	}
	private mTotalRarityTextBlock_Internal: mw.TextBlock
	public get mTotalRarityTextBlock(): mw.TextBlock {
		if(!this.mTotalRarityTextBlock_Internal&&this.uiWidgetBase) {
			this.mTotalRarityTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/mTotalRarityImage/mTotalRarityTextBlock') as mw.TextBlock
		}
		return this.mTotalRarityTextBlock_Internal
	}
	private mTitleTextBlock_Internal: mw.TextBlock
	public get mTitleTextBlock(): mw.TextBlock {
		if(!this.mTitleTextBlock_Internal&&this.uiWidgetBase) {
			this.mTitleTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainBgImage/TitleBgImage/mTitleTextBlock') as mw.TextBlock
		}
		return this.mTitleTextBlock_Internal
	}
	private mCloseButton_Internal: mw.Button
	public get mCloseButton(): mw.Button {
		if(!this.mCloseButton_Internal&&this.uiWidgetBase) {
			this.mCloseButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCloseButton') as mw.Button
		}
		return this.mCloseButton_Internal
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
		
		this.mUpProbabilityButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mUpProbabilityButton");
		});
		this.mUpProbabilityButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mStrengthenButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mStrengthenButton");
		});
		this.mStrengthenButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mCloseButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mCloseButton");
		});
		this.mCloseButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mNameTextBlock)
		
	
		this.initLanguage(this.mHpTextBlock)
		
	
		this.initLanguage(this.mHpTipsTextBlock)
		
	
		this.initLanguage(this.mHpedTextBlock)
		
	
		this.initLanguage(this.mAtkTextBlock)
		
	
		this.initLanguage(this.mAtkTipsTextBlock)
		
	
		this.initLanguage(this.mAtkedTextBlock)
		
	
		this.initLanguage(this.mNeedTitleTextBlock)
		
	
		this.initLanguage(this.mNeedLvCountTextBlock)
		
	
		this.initLanguage(this.mNeedDiamondTipsTextBlock)
		
	
		this.initLanguage(this.mNeedDiamondCountTextBlock)
		
	
		this.initLanguage(this.mNeedCoinTextBlock)
		
	
		this.initLanguage(this.mNeedCoinCountTextBlock)
		
	
		this.initLanguage(this.mNeedBoneTextBlock)
		
	
		this.initLanguage(this.mNeedBoneCountTextBlock)
		
	
		this.initLanguage(this.mHasMaxLvTextBlock)
		
	
		this.initLanguage(this.mProbabilityTextBlock)
		
	
		this.initLanguage(this.mUpProbabilityTextBlock)
		
	
		this.initLanguage(this.mStrengthenTextBlock)
		
	
		this.initLanguage(this.mBoneCountTextBlock)
		
	
		this.initLanguage(this.mCoinCountTextBlock)
		
	
		this.initLanguage(this.mDiamondCountTextBlock)
		
	
		this.initLanguage(this.mArkCountTextBlock)
		
	
		this.initLanguage(this.mTotalRarityTextBlock)
		
	
		this.initLanguage(this.mTitleTextBlock)
		
	
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
 