
/** 
 * AUTHOR: 爱玩游戏的小胖子
 * TIME: 2023.07.29-22.55.52
 */

import Console from "../../../Tools/Console";
import { ObjectPoolServices } from "../../../Tools/ObjectPool";
import { Notice } from "../../../common/notice/Notice";
import { IColdWeaponElement } from "../../../config/ColdWeapon";
import { GameConfig } from "../../../config/GameConfig";
import GlobalData from "../../../const/GlobalData";
import ShopPanel_Generate from "../../../ui-generate/module/ShopModule/ShopPanel_generate";
import ShopModuleC from "../ShopModuleC";

export default class ShopPanel extends ShopPanel_Generate {
	private shopModuleC: ShopModuleC = null;;
	/** 
	 * 构造UI文件成功后，在合适的时机最先初始化一次 
	 */
	protected onStart() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerMiddle;
		this.initDatas()
		this.registerActions();
		this.bindButtons();
	}

	private initDatas(): void {
		this.shopModuleC = ModuleService.getModule(ShopModuleC);
		this.initShopItems();
	}

	private registerActions(): void {
		Console.error("[ShopPanel-registerActions]");
	}

	private bindButtons(): void {
		this.mCloseButton.onClicked.add(() => {
			this.hide();
			this.shopModuleC.onSwitchCameraAction.call(false);
		});
		this.mSaveButton.onClicked.add(() => {
			this.shopModuleC.updateRoleType(this.coldWeapons[this.curSelectId - 1]);
		});
	}

	private coldWeapons: IColdWeaponElement[] = []
	private initShopItems(): void {
		this.coldWeapons = GameConfig.ColdWeapon.getAllElement();
		this.showShopItems();
	}
	private currentChildIndex: number = 0;
	private shopItems: ShopItem[] = []
	private showShopItems(): void {
		this.currentChildIndex = 0;

		for (let i = 0; i < this.coldWeapons.length; ++i) {
			let shopItem = ObjectPoolServices.getPool(ShopItem).spawn();
			let id = this.coldWeapons[i].id;
			shopItem.initData(id, this.coldWeapons[i].RoleIcon, this.shopModuleC.isHaveWeapon(id), this.coldWeapons[i].RoleType);
			this.mItemCanvas.addChild(shopItem.shopItem);
			shopItem.shopItem.size = new mw.Vector2(200, 200);
			shopItem.shopItem.position = new mw.Vector2(200 * this.currentChildIndex++, 0)
			this.shopItems.push(shopItem);
		}
		this.mItemCanvas.size = new mw.Vector2(200 * this.currentChildIndex, 200);
	}

	private curSelectId: number = 0;
	public defaultSelectItem(id: number): void {
		this.curSelectId = id;
		this.shopItems[this.curSelectId - 1].selectState();
	}

	public updateShopNPC(id: number): void {
		if (this.curSelectId == id) {
			Notice.showDownNotice("已选择");
			return;
		}
		this.shopItems[this.curSelectId - 1].cancleSelectState();
		this.curSelectId = id;
		this.shopItems[this.curSelectId - 1].selectState();
		let coldWeapon = this.coldWeapons[id - 1];
		this.shopModuleC.updateShopRoles(coldWeapon);
		let roleType = coldWeapon.RoleType;
		if (roleType == 1) {
			this.mSaveTextBlock.text = "使用";
		} else if (roleType == 2) {
			if (this.shopModuleC.isHaveWeapon(id)) {
				this.mSaveTextBlock.text = "使用";
			} else {
				this.mSaveTextBlock.text = "购买";
			}
		} else if (roleType == 3) {
			this.mSaveTextBlock.text = "使用";
		}
	}

	public updateTextBlock(): void {
		this.mSaveTextBlock.text = "使用";
		this.shopItems[this.curSelectId - 1].mTextBlock.visibility = mw.SlateVisibility.Collapsed;
	}
}

/**服装 */
class ShopItem {
	public shopItem: mw.UserWidgetPrefab;

	public mCanvas: mw.Canvas = undefined;
	public mSelectImage: mw.Image = undefined;
	public mIconImage: mw.Image = undefined;
	public mClickButton: mw.Button = undefined;
	public mTextBlock: mw.TextBlock = undefined;
	public mTextBlock_1: mw.TextBlock = undefined;

	public id: number = null;

	public isSelect: boolean = false;

	/**生成Item */
	constructor() {
		this.shopItem = mw.createUIByName("module/ShopModule/ShopItem");

		this.mCanvas = this.shopItem.findChildByPath("RootCanvas/mCanvas") as mw.Canvas;
		this.mClickButton = this.shopItem.findChildByPath("RootCanvas/mCanvas/mClickButton") as mw.Button;
		this.mSelectImage = this.shopItem.findChildByPath("RootCanvas/mCanvas/mSelectImage") as mw.Image;
		this.mIconImage = this.shopItem.findChildByPath("RootCanvas/mCanvas/mIconImage") as mw.Image;
		this.mTextBlock = this.shopItem.findChildByPath("RootCanvas/mCanvas/mTextBlock") as mw.TextBlock;
		this.mTextBlock_1 = this.shopItem.findChildByPath("RootCanvas/mCanvas/mTextBlock_1") as mw.TextBlock;
	}

	/**填充数据 */
	public initData(id: number, iconGuid: string, isHave: boolean, roleType: number): void {
		this.id = id;
		this.mIconImage.imageGuid = iconGuid;
		this.mClickButton.onClicked.add(() => {
			Event.dispatchToLocal("PlayButtonClick");
			if (!GlobalData.isCanClickShopItem) {
				Notice.showDownNotice("别点太快");
				return;
			}
			GlobalData.isCanClickShopItem = false;
			TimeUtil.delaySecond(0.5).then(() => {
				GlobalData.isCanClickShopItem = true;
			});
			mw.UIService.getUI(ShopPanel).updateShopNPC(this.id);
		});
		this.mClickButton.touchMethod = mw.ButtonTouchMethod.PreciseTap;
		if (roleType == 3) {
			this.mTextBlock_1.text = "限时";
			this.mTextBlock.visibility = mw.SlateVisibility.Collapsed;
		} else {
			this.mTextBlock.visibility = isHave ? mw.SlateVisibility.Collapsed : mw.SlateVisibility.SelfHitTestInvisible;
			this.mTextBlock_1.text = "永久";
		}
		this.cancleSelectState();
	}

	/**选中状态 */
	public selectState(): void {
		this.isSelect = true;
		this.mSelectImage.visibility = mw.SlateVisibility.SelfHitTestInvisible;
	}

	/**取消选中状态 */
	public cancleSelectState(): void {
		this.isSelect = false;
		this.mSelectImage.visibility = mw.SlateVisibility.Collapsed;
	}

	/**回收Item */
	public recycleItem(): void {
		this.cancleSelectState();
		ObjectPoolServices.getPool(ShopItem).return(this);
	}
}
