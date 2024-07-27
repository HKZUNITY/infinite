import { Notice } from "../../common/notice/Notice";
import { IBagInfoElement } from "../../config/BagInfo";
import { GameConfig } from "../../config/GameConfig";
import GlobalData from "../../const/GlobalData";
import { ColdWeapon } from "../../Prefabs/冷兵器/Script/ColdWeapon";
import { MapEx } from "../../Tools/MapEx";
import { Utils } from "../../Tools/utils";
import BagInfoPanel_Generate from "../../ui-generate/module/BagModule/BagInfoPanel_generate";
import BagItem_Generate from "../../ui-generate/module/BagModule/BagItem_generate";
import BagPanel_Generate from "../../ui-generate/module/BagModule/BagPanel_generate";
import BagTab_Generate from "../../ui-generate/module/BagModule/BagTab_generate";
import AdTipsPanel from "../AdsModule/ui/AdTipsPanel";
import { GuideModuleC } from "../GuideModule/GuideModule";
import HUDModuleC from "../HUDModule/HUDModuleC";
import HUDPanel from "../HUDModule/ui/HUDPanel";
import PlayerModuleC from "../PlayerModule/PlayerModuleC";
import PlayerModuleS from "../PlayerModule/PlayerModuleS";
import TaskModuleC from "../TaskModule/TaskModuleC";

/**
0-黄阶-213189
1-玄阶-213181
2-地阶-213190
3-天阶-213187
 */
const bagItemBgIcons: string[] = ["213189", "213181", "213190", "213187"];
const bagItemGoEffect: string[] = ["311092", "31645", "32240", "59956", "88773", "146767", "146768", "146784"];

export class BagData extends Subdata {
    @Decorator.persistence()
    public bagIds: number[] = [];
    @Decorator.persistence()
    public usingWeaponId: number = -1;
    @Decorator.persistence()
    public usingSkinId: number = -1;
    @Decorator.persistence()
    public usingEquipIds: MapEx.MapExClass<number> = {};
    @Decorator.persistence()
    public usingPetId: number = -1;

    public setBagId(bagId: number): void {
        if (!this.bagIds.includes(bagId)) {
            this.bagIds.push(bagId);
        }
        this.save(true);
    }

    public setUsingWeaponId(weaponId: number): void {
        this.usingWeaponId = weaponId;
        this.save(true);
    }

    public setUsingSkinId(skinId: number): void {
        this.usingSkinId = skinId;
        this.save(true);
    }

    public setUsingEquipId(key: number, bagId: number): void {
        if (key == -1 && bagId == -1) {
            this.usingEquipIds = {};
        } else {
            MapEx.set(this.usingEquipIds, key, bagId);
        }
        this.save(true);
    }

    public setUsingPetId(petId: number): void {
        this.usingPetId = petId;
        this.save(true);
    }
}


export class BagModuleC extends ModuleC<BagModuleS, BagData> {
    private hudModuleC: HUDModuleC = null;
    private get getHUDModuleC(): HUDModuleC {
        if (!this.hudModuleC) {
            this.hudModuleC = ModuleService.getModule(HUDModuleC);
        }
        return this.hudModuleC;
    }

    private bagInfoPanel: BagInfoPanel = null;
    private get getBagInfoPanel(): BagInfoPanel {
        if (!this.bagInfoPanel) {
            this.bagInfoPanel = mw.UIService.create(BagInfoPanel);
        }
        return this.bagInfoPanel;
    }

    private bagPanel: BagPanel = null;
    private get getBagPanel(): BagPanel {
        if (!this.bagPanel) {
            this.bagPanel = mw.UIService.getUI(BagPanel);
        }
        return this.bagPanel;
    }

    private taskModuleC: TaskModuleC = null;
    private get getTaskModuleC(): TaskModuleC {
        if (!this.taskModuleC) {
            this.taskModuleC = ModuleService.getModule(TaskModuleC);
        }
        return this.taskModuleC;
    }

    private adTipsPanel: AdTipsPanel = null;
    private get getAdTipsPanel(): AdTipsPanel {
        if (!this.adTipsPanel) {
            this.adTipsPanel = mw.UIService.create(AdTipsPanel);
        }
        return this.adTipsPanel
    }

    private guideModuleC: GuideModuleC = null;
    private get getGuideModuleC(): GuideModuleC {
        if (!this.guideModuleC) {
            this.guideModuleC = ModuleService.getModule(GuideModuleC);
        }
        return this.guideModuleC;
    }

    private playerModuleC: PlayerModuleC = null;
    private get getPlayerModuleC(): PlayerModuleC {
        if (!this.playerModuleC) {
            this.playerModuleC = ModuleService.getModule(PlayerModuleC);
        }
        return this.playerModuleC;
    }

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        this.getHUDModuleC.onOpenShopAction.add(() => {
            this.getBagPanel.show();
        });
    }

    protected onEnterScene(sceneType: number): void {
        this.initBagData();
        this.initTrigger();
        this.enterScenceUsing();
    }

    private enterScenceUsing(): void {
        if (this.usingWeaponId > 0) this.useWeapon(this.usingWeaponId);
        if (this.usingSkinId > 0) this.useSkin(GameConfig.BagInfo.getElement(this.usingSkinId)?.AssetId);
    }

    private bagIds: number[] = [];
    private usingWeaponId: number = -1;
    private usingSkinId: number = -1;
    private usingEquipIds: MapEx.MapExClass<number> = {};
    private usingPetId: number = -1;
    private initBagData(): void {
        this.bagIds = this.data.bagIds;
        this.usingWeaponId = this.data.usingWeaponId;
        this.usingSkinId = this.data.usingSkinId;
        this.usingEquipIds = this.data.usingEquipIds;
        this.usingPetId = this.data.usingPetId;
    }

    public isHasBagId(bagId: number): boolean {
        return this.bagIds.includes(bagId);
    }

    public setBagId(bagId: number): void {
        if (this.bagIds.includes(bagId)) {
            Notice.showDownNotice("已获得");
            return;
        }
        this.bagIds.push(bagId);
        this.server.net_setBagId(bagId);
        this.getPlayerModuleC.adsUpLv();
        Notice.showDownNotice("恭喜获得");
    }

    public setUsingWeaponId(weaponId: number): boolean {
        if (this.usingWeaponId == weaponId) {
            Notice.showDownNotice("武器使用中");
            return false;
        }
        this.usingWeaponId = weaponId;
        this.server.net_setUsingWeaponId(weaponId);
        this.updateHpByUsing();
        return true;
    }

    public setUsingSkinId(skinId: number): boolean {
        if (this.usingSkinId == skinId) {
            Notice.showDownNotice("皮肤穿戴中");
            return false;
        }
        this.usingSkinId = skinId;
        this.server.net_setUsingSkinId(skinId);
        this.updateHpByUsing();
        return true;
    }

    public resetUsingSkin(): void {
        this.usingSkinId = -1;
        this.server.net_setUsingSkinId(this.usingSkinId);
        this.updateHpByUsing();
        AccountService.downloadData(this.localPlayer.character, (success: boolean) => {
            if (!success) return;
            this.useSkin(null);
        });
    }

    public setUsingEquipId(key: number, bagId: number): boolean {
        if (MapEx.has(this.usingEquipIds, key) && MapEx.get(this.usingEquipIds, key) == bagId) {
            Notice.showDownNotice("装备中");
            return false;
        }
        MapEx.set(this.usingEquipIds, key, bagId);
        this.server.net_setUsingEquipId(key, bagId);
        this.updateHpByUsing();
        return true;
    }

    public resetUsingEquip(): void {
        this.usingEquipIds = {};
        this.server.net_setUsingEquipId(-1, -1);
        this.updateHpByUsing();
        this.localPlayer.character.detachAllFromSlot({ isDestroy: true });
        this.localPlayer.character.asyncReady().then(() => { this.localPlayer.character.syncDescription(false, true); });
    }

    public setUsingPetId(petId: number): boolean {
        if (this.usingPetId == petId) {
            Notice.showDownNotice("宠物跟随中");
            return false;
        }
        this.usingPetId = petId;
        this.server.net_setUsingPetId(petId);
        this.updateHpByUsing();
        return true;
    }

    private updateHpByUsing(): void {
        this.getHUDModuleC.updateHpByUsing(this.getAddHpByUsing());
    }

    public getAddHpByUsing(): number {
        let weaponHp: number = 0, skinHp: number = 0, equipHp: number = 0, petHp: number = 0;
        if (this.usingWeaponId != -1) {
            weaponHp = Utils.getMultipleByRarity(GameConfig.BagInfo.getElement(this.usingWeaponId)?.Rarity);
            if (weaponHp < 0 || isNaN(weaponHp)) weaponHp = 0;
        }
        if (this.usingSkinId != -1) {
            skinHp = Utils.getMultipleByRarity(GameConfig.BagInfo.getElement(this.usingSkinId)?.Rarity);
            if (skinHp < 0 || isNaN(skinHp)) skinHp = 0;
        }
        if (this.usingEquipIds && MapEx.count(this.usingEquipIds) > 0) {
            MapEx.forEach(this.usingEquipIds, (key: number, bagId: number) => {
                equipHp += Utils.getMultipleByRarity(GameConfig.BagInfo.getElement(bagId)?.Rarity);
            });
            if (equipHp < 0 || isNaN(equipHp)) equipHp = 0;
        }
        if (this.usingPetId != -1) {
            petHp = Utils.getMultipleByRarity(GameConfig.BagInfo.getElement(this.usingPetId)?.Rarity);
            if (petHp < 0 || isNaN(petHp)) petHp = 0;
        }
        return weaponHp + skinHp + equipHp + petHp;
    }

    public getAddAtkByUsing(): number {
        let weaponAtk: number = 0, skinAtk: number = 0, equipAtk: number = 0, petAtk: number = 0;
        if (this.usingWeaponId != -1) {
            weaponAtk = Utils.getMultipleByRarity(GameConfig.BagInfo.getElement(this.usingWeaponId)?.Rarity);
            if (weaponAtk < 0 || isNaN(weaponAtk)) weaponAtk = 0;
        }
        if (this.usingSkinId != -1) {
            skinAtk = Utils.getMultipleByRarity(GameConfig.BagInfo.getElement(this.usingSkinId)?.Rarity);
            if (skinAtk < 0 || isNaN(skinAtk)) skinAtk = 0;
        }
        if (this.usingEquipIds && MapEx.count(this.usingEquipIds) > 0) {
            MapEx.forEach(this.usingEquipIds, (key: number, bagId: number) => {
                equipAtk += Utils.getMultipleByRarity(GameConfig.BagInfo.getElement(bagId)?.Rarity);
            });
            if (equipAtk < 0 || isNaN(equipAtk)) equipAtk = 0;
        }
        if (this.usingPetId != -1) {
            petAtk = Utils.getMultipleByRarity(GameConfig.BagInfo.getElement(this.usingPetId)?.Rarity);
            if (petAtk < 0 || isNaN(petAtk)) petAtk = 0;
        }
        return weaponAtk + skinAtk + equipAtk + petAtk;
    }

    public clickBagItem(bagId: number, buyComplete: () => void): void {
        let isHas = this.isHasBagId(bagId);
        this.getBagInfoPanel.showThis(bagId, isHas, () => {
            if (isHas) {
                this.use(bagId);
            } else {
                Notice.showDownNotice("未获得");
                if (GlobalData.isOpenIAA) {
                    this.getAdTipsPanel.showRewardAd(() => {
                        this.getGuideModuleC.startGuide(this.getBagObVec(bagId));
                    }, "带你去免费获得", "取消", "免费获得");
                } else {
                    this.getGuideModuleC.startGuide(this.getBagObVec(bagId));
                }
            }
        }, () => {
            let price = (GameConfig.BagInfo.getElement(bagId)?.Rarity + 1) * 10000;
            if (price < 0 || isNaN(price)) price = 10000;
            let hasCoin = this.getPlayerModuleC.getCoin();
            if (hasCoin >= price) {
                this.setBagId(bagId);
                if (buyComplete) buyComplete();
                Notice.showDownNotice("购买成功");
            } else {
                Notice.showDownNotice("金币不足");
                if (GlobalData.isOpenIAA) {
                    this.getAdTipsPanel.showRewardAd(() => {
                        this.getPlayerModuleC.saveCoin(10000);
                    }, "免费领取10000金币", "取消", "免费领取");
                } else {
                    this.getPlayerModuleC.saveCoin(10000);
                }
            }
        }, () => {
            this.getGuideModuleC.startGuide(this.getBagObVec(bagId));
        });
    }

    private use(bagId: number): void {
        let bagInfoElement = GameConfig.BagInfo.getElement(bagId);
        switch (bagInfoElement.Type) {
            case 1:
                if (!this.setUsingWeaponId(bagId)) return;
                this.useWeapon(bagId);
                Notice.showDownNotice("装备成功");
                break;
            case 2:
                if (!this.setUsingSkinId(bagId)) return;
                this.useSkin(bagInfoElement.AssetId);
                Notice.showDownNotice("穿戴成功");
                break;
            case 3:
                if (!this.setUsingEquipId(bagInfoElement.HumanoidSlotType, bagId)) return;
                this.useEquip(bagInfoElement);
                Notice.showDownNotice("装备成功");
                break;
            case 4:
                // if (!this.setUsingEquipId(bagInfoElement.Type, bagId)) return;
                Notice.showDownNotice("功能暂未开放,敬请期待");
                break;
            default:
                break;
        }
    }

    private useWeapon(weaponId: number): void {
        ColdWeapon.getInstance().register(GameConfig.ColdWeapon.getElement(weaponId));
    }

    private useSkin(assetId: string): void {
        if (assetId) this.localPlayer.character.setDescription([assetId]);
        this.localPlayer.character.asyncReady().then(() => {
            if (this.usingEquipIds && MapEx.count(this.usingEquipIds) > 0) {
                MapEx.forEach(this.usingEquipIds, (key: number, value: number) => {
                    this.useEquip(GameConfig.BagInfo.getElement(value));
                });
            }
            this.localPlayer.character.asyncReady().then(() => {
                this.localPlayer.character.syncDescription();
            });
        });
    }

    private useEquip(bagInfoElement: IBagInfoElement): void {
        let relativeTransform = new mw.Transform(bagInfoElement.OffsetPos, new mw.Rotation(bagInfoElement.OffsetRot), bagInfoElement.OffsetSca);
        this.localPlayer.character.detachAllFromSlot({ slotName: bagInfoElement.HumanoidSlotType, isDestroy: true });
        this.localPlayer.character.description.advance.slotAndDecoration
            .slot[bagInfoElement.HumanoidSlotType].decoration.add(bagInfoElement.AssetId, relativeTransform);
        this.localPlayer.character.asyncReady().then(() => { this.localPlayer.character.syncDescription(false, true); });
    }

    private isInitComplete: boolean = false;
    private async initTrigger(): Promise<void> {
        let parentTrigger = await mw.GameObject.asyncFindGameObjectById("2285B717");
        await parentTrigger.asyncReady();
        parentTrigger.getChildren().forEach(async (value: mw.GameObject) => {
            if (!(value instanceof mw.Trigger)) return;
            let bagId = Number(value.name.split(`-`)[1]);
            if (isNaN(bagId) || bagId < 0) return;
            let isInitItemSuccessfully = await this.isInitItemSuccessfully(bagId, value.worldTransform.position);
            if (!isInitItemSuccessfully) return;
            value.onEnter.add((gameObject: mw.GameObject) => {
                this.onEnterTrigger(gameObject, bagId);
            });
        });
        this.isInitComplete = true;
    }

    private onEnterTrigger(go: mw.GameObject, bagId: number): void {
        if (!(go instanceof mw.Character)) return;
        if (go.gameObjectId != this.localPlayer.character.gameObjectId) return;
        this.setBagId(bagId);
        this.getTaskModuleC.pickUpTreasure();
        this.getBagInfoPanel.showThis(bagId, true, () => {
            this.use(bagId);
        }, null, null);
    }

    public getBagObVec(bagId: number): mw.Vector {
        if (this.bagItemMap.has(bagId)) return this.bagItemMap.get(bagId).loc;
        return null;
    }

    private bagItemMap: Map<number, { go: mw.Model, effectId: number, loc: mw.Vector }> = new Map<number, { go: mw.Model, effectId: number, loc: mw.Vector }>();
    private async isInitItemSuccessfully(bagId: number, loc: mw.Vector): Promise<boolean> {
        let bagInfoElement = GameConfig.BagInfo.getElement(bagId);
        if (!bagInfoElement) return false;
        let objId = bagInfoElement?.ObjId;
        if (!objId || objId == "") return false;

        let bagItemGo = await GameObjPool.asyncSpawn(objId) as mw.Model;
        if (!(bagItemGo instanceof mw.Character)) bagItemGo.collisionEnabled = false;
        bagItemGo.worldTransform.position = loc;

        let effectId = EffectService.playAtPosition(bagItemGoEffect[Utils.getRandomInteger(0, bagItemGoEffect.length - 1)], loc, { loopCount: 0 });

        this.bagItemMap.set(bagId, { go: bagItemGo, effectId: effectId, loc: loc });
        return true;
    }

    private recycleItem(bagId: number): void {
        if (!this.bagItemMap.has(bagId)) return;
        GameObjPool.despawn(this.bagItemMap.get(bagId)?.go);
        EffectService.stop(this.bagItemMap.get(bagId)?.effectId);
    }

    protected onUpdate(dt: number): void {
        this.setBagItemRot(dt);
    }

    private setBagItemRot(dt: number): void {
        if (!this.isInitComplete) return;
        this.bagItemMap.forEach((value: { go: mw.GameObject, effectId: number }, key: number) => {
            value.go.worldTransform.rotation = new mw.Rotation(0, 0, value.go.worldTransform.rotation.z + dt * 50);
        });
    }
}

export class BagModuleS extends ModuleS<BagModuleC, BagData> {
    private playerModuleS: PlayerModuleS = null;
    private get getPlayerModuleS(): PlayerModuleS {
        if (!this.playerModuleS) {
            this.playerModuleS = ModuleService.getModule(PlayerModuleS);
        }
        return this.playerModuleS;
    }
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {

    }

    public net_setBagId(bagId: number): void {
        this.currentData.setBagId(bagId);
    }

    public net_setUsingWeaponId(weaponId: number): void {
        this.currentData.setUsingWeaponId(weaponId);
        this.updateHpByUsing(this.currentPlayer);
    }

    public net_setUsingSkinId(skinId: number): void {
        this.currentData.setUsingSkinId(skinId);
        this.updateHpByUsing(this.currentPlayer);
    }

    public net_setUsingEquipId(key: number, bagId: number): void {
        this.currentData.setUsingEquipId(key, bagId);
        this.updateHpByUsing(this.currentPlayer);
    }

    public net_setUsingPetId(petId: number): void {
        this.currentData.setUsingPetId(petId);
        this.updateHpByUsing(this.currentPlayer);
    }

    private updateHpByUsing(player: mw.Player): void {
        this.getPlayerModuleS.updateHpByUsing(player, this.getAddHpByUsing(player));
    }

    public getAddHpByUsing(player: mw.Player): number {
        let bagData = DataCenterS.getData(player, BagData);
        let weaponHp: number = 0, skinHp: number = 0, equipHp: number = 0, petHp: number = 0;
        if (bagData.usingWeaponId != -1) {
            weaponHp = Utils.getMultipleByRarity(GameConfig.BagInfo.getElement(bagData.usingWeaponId)?.Rarity);
            if (weaponHp < 0 || isNaN(weaponHp)) weaponHp = 0;
        }
        if (bagData.usingSkinId != -1) {
            skinHp = Utils.getMultipleByRarity(GameConfig.BagInfo.getElement(bagData.usingSkinId)?.Rarity);
            if (skinHp < 0 || isNaN(skinHp)) skinHp = 0;
        }
        if (bagData.usingEquipIds && MapEx.count(bagData.usingEquipIds) > 0) {
            MapEx.forEach(bagData.usingEquipIds, (key: number, bagId: number) => {
                equipHp += Utils.getMultipleByRarity(GameConfig.BagInfo.getElement(bagId)?.Rarity);
            });
            if (equipHp < 0 || isNaN(equipHp)) equipHp = 0;
        }
        if (bagData.usingPetId != -1) {
            petHp = Utils.getMultipleByRarity(GameConfig.BagInfo.getElement(bagData.usingPetId)?.Rarity);
            if (petHp < 0 || isNaN(petHp)) petHp = 0;
        }
        return weaponHp + skinHp + equipHp + petHp;
    }
}

export class BagPanel extends BagPanel_Generate {
    private bagModuleC: BagModuleC = null;
    private get getBagModuleC(): BagModuleC {
        if (!this.bagModuleC) {
            this.bagModuleC = ModuleService.getModule(BagModuleC);
        }
        return this.bagModuleC;
    }
    private hudPanel: HUDPanel = null;
    private get getHudPanel(): HUDPanel {
        if (!this.hudPanel) {
            this.hudPanel = mw.UIService.getUI(HUDPanel);
        }
        return this.hudPanel;
    }
    protected onStart(): void {
        this.initTab();
        this.initResetButton();
        this.initBagData();
        this.bindButton();
    }

    private bindButton(): void {
        this.mCloseButtons.onClicked.add(() => { this.hideTween(); });
    }

    private bagTabs: BagTab[] = [];
    private initTab(): void {
        let tabNames = GameConfig.BagInfo.getElement(1).Name.split(`|`);
        for (let i = 0; i < tabNames.length; ++i) {
            let bagTab = mw.UIService.create(BagTab);
            bagTab.setData(tabNames[i]);
            bagTab.mButton.onClicked.add(() => { this.bindBagTabButton(i) });
            this.mTabContentCanvas.addChild(bagTab.uiObject);
            this.bagTabs.push(bagTab);
        }
    }

    private resetButton: BagTab = null;
    private initResetButton(): void {
        this.resetButton = mw.UIService.create(BagTab);
        this.resetButton.unSelect();
        this.resetButton.mButton.onClicked.add(() => {
            switch (this.currentBagTabIndex) {
                case 0:
                    Notice.showDownNotice(`功能暂未开放，敬请期待`);
                    break;
                case 1:
                    this.getBagModuleC.resetUsingSkin();
                    Notice.showDownNotice(`恢复成功`);
                    break;
                case 2:
                    this.getBagModuleC.resetUsingEquip();
                    Notice.showDownNotice(`卸下成功`);
                    break;
                case 3:
                    Notice.showDownNotice(`功能暂未开放，敬请期待`);
                    break;
                default:
                    break;
            }
        });
        this.mTabContentCanvas.addChild(this.resetButton.uiObject);
        Utils.setWidgetVisibility(this.resetButton.uiObject, mw.SlateVisibility.Collapsed);
    }

    private updateResetButton(): void {
        switch (this.currentBagTabIndex) {
            case 0:
                Utils.setWidgetVisibility(this.resetButton.uiObject, mw.SlateVisibility.Collapsed);
                break;
            case 1:
                Utils.setWidgetVisibility(this.resetButton.uiObject, mw.SlateVisibility.SelfHitTestInvisible);
                this.resetButton.setData("恢复初始形象");
                break;
            case 2:
                Utils.setWidgetVisibility(this.resetButton.uiObject, mw.SlateVisibility.SelfHitTestInvisible);
                this.resetButton.setData("卸下所有装备");
                break;
            case 3:
                Utils.setWidgetVisibility(this.resetButton.uiObject, mw.SlateVisibility.SelfHitTestInvisible);
                this.resetButton.setData("取消宠物跟随");
                break;
            default:
                break;
        }
    }

    private currentBagTabIndex: number = -1;
    private bindBagTabButton(index: number): void {
        if (this.currentBagTabIndex == index) return;
        if (this.currentBagTabIndex != -1) {
            this.bagTabs[this.currentBagTabIndex].unSelect();
        }
        this.currentBagTabIndex = index;
        this.bagTabs[this.currentBagTabIndex].select();
        this.initBagItem();
        this.updateResetButton();
    }

    private bagIdsMap: Map<number, number[]> = new Map<number, number[]>();
    private initBagData(): void {
        this.bagIdsMap.clear();
        GameConfig.BagInfo.getAllElement().forEach((value: IBagInfoElement) => {
            let key = value.Type - 1;
            if (key < 0) return;
            console.error(`key:${key}`);
            if (this.bagIdsMap.has(key)) {
                this.bagIdsMap.get(key)?.push(value.ID);
            } else {
                this.bagIdsMap.set(key, [value.ID]);
            }
        });
        this.bagIdsMap.forEach((value: number[], key: number) => {
            value.sort((a, b) => {
                return GameConfig.BagInfo.getElement(b).Rarity - GameConfig.BagInfo.getElement(a).Rarity;
            });
        });
        this.bindBagTabButton(0);
    }

    private bagItems: BagItem[] = [];
    private initBagItem(): void {
        if (!this.bagIdsMap.has(this.currentBagTabIndex)) return;
        let bagIds = this.bagIdsMap.get(this.currentBagTabIndex);
        if (bagIds.length >= this.bagItems.length) {
            for (let i = 0; i < this.bagItems.length; ++i) {
                this.bagItems[i].setData(bagIds[i]);
                this.bagItems[i].uiObject.visibility = mw.SlateVisibility.SelfHitTestInvisible;
            }
            for (let i = this.bagItems.length; i < bagIds.length; ++i) {
                let bagItem = mw.UIService.create(BagItem);
                this.mContentCanvas.addChild(bagItem.uiObject);
                bagItem.setData(bagIds[i]);
                this.bagItems.push(bagItem);
            }
        } else {
            for (let i = 0; i < bagIds.length; ++i) {
                this.bagItems[i].setData(bagIds[i]);
                this.bagItems[i].uiObject.visibility = mw.SlateVisibility.SelfHitTestInvisible;
            }
            for (let i = bagIds.length; i < this.bagItems.length; ++i) {
                this.bagItems[i].uiObject.visibility = mw.SlateVisibility.Collapsed;
            }
        }
    }

    protected onShow(...params: any[]): void {
        Utils.openUITween(
            this.rootCanvas,
            () => {
                this.getHudPanel.hide();
            },
            null
        );
    }

    public hideTween(): void {
        this.hide();
        this.getHudPanel.show();
        return;
        Utils.closeUITween(
            this.rootCanvas,
            null,
            () => {

            });
    }
}

export class BagItem extends BagItem_Generate {
    private bagModuleC: BagModuleC = null;
    private get getBagModuleC(): BagModuleC {
        if (!this.bagModuleC) {
            this.bagModuleC = ModuleService.getModule(BagModuleC);
        }
        return this.bagModuleC;
    }

    protected onStart(): void {
        this.bindButton();
    }

    private bindButton(): void {
        this.mClickButton.onClicked.add(this.bindClickButton.bind(this));
    }

    private bindClickButton(): void {
        this.getBagModuleC.clickBagItem(this.bagId, this.setHas.bind(this));
    }

    private bagId: number = -1;
    public setData(bagId: number): void {
        this.bagId = bagId;
        let bagInfoElement = GameConfig.BagInfo.getElement(bagId);
        if (!bagInfoElement) return;
        this.setHas();
        this.setName(bagInfoElement.Name);
        this.setBgIcon(bagInfoElement.Rarity);
        this.setIconImage(bagInfoElement.AssetId);
    }

    private setName(name: string): void {
        this.mNameTextBlock.text = name;
    }

    private setHas(): void {
        this.mHasTextBlock.text = this.getBagModuleC.isHasBagId(this.bagId) ? "点击使用" : "点击获得";
    }

    private setIconImage(assetId: string): void {
        Utils.setImageByAssetIconData(this.mIconImage, assetId);
    }

    private setBgIcon(rarity: number): void {
        this.mBgImage.imageGuid = bagItemBgIcons[rarity];
    }
}

export class BagTab extends BagTab_Generate {
    protected onStart(): void {
    }

    public setData(name: string): void {
        this.mTextBlock.text = name;
    }

    public select(): void {
        this.uiObject.size = new mw.Vector2(300, 150);
        this.mButton.normalImageGuid = "100705";
        this.mButton.pressedImageGuid = "100705";
    }

    public unSelect(): void {
        this.uiObject.size = new mw.Vector2(250, 125);
        this.mButton.normalImageGuid = "100707";
        this.mButton.pressedImageGuid = "100707";
    }
}

export class BagInfoPanel extends BagInfoPanel_Generate {
    protected onStart(): void {
        this.initUI();
        this.bindButton();
    }

    private initUI(): void {
        this.mUseTextBlock.text = "使用";
        this.mAdsButton.text = `免费获得`;
    }

    private bindButton(): void {
        this.mUseButton.onClicked.add(this.addUseButton.bind(this));
        this.mPriceButton.onClicked.add(this.addPriceButton.bind(this));
        this.mAdsButton.onClose.add(this.addAdsButton.bind(this));
        this.mCloseButton.onClicked.add(this.bindCloseButton.bind(this));
    }

    private addUseButton(): void {
        if (this.useCallBack) this.useCallBack();
        this.hide();
    }

    private addPriceButton(): void {
        if (this.priceCallBack) this.priceCallBack();
    }

    private addAdsButton(isSuccess: boolean): void {
        this.hide();
        if (!isSuccess) return;
        if (this.adsCallBack) this.adsCallBack();
    }

    private bindCloseButton(): void {
        this.hide();
    }

    private bagId: number = -1;
    private isHas: boolean = false;
    private useCallBack: () => void = null;
    private priceCallBack: () => void = null;
    private adsCallBack: () => void = null;
    public showThis(bagId: number, isHas: boolean, useCallBack: () => void, preceCallBack: () => void, adsCallBack: () => void): void {
        this.bagId = bagId;
        this.isHas = isHas;
        this.setUI();
        this.useCallBack = useCallBack;
        this.priceCallBack = preceCallBack;
        this.adsCallBack = adsCallBack;
        let price = (GameConfig.BagInfo.getElement(bagId)?.Rarity + 1) * 10000;
        this.mPreceTextBlock.text = `${price}金币购买`;
        this.show();
    }

    private setUI(): void {
        if (this.isHas) {
            this.mPriceButton.visibility = mw.SlateVisibility.Collapsed;
            this.mAdsButton.visibility = mw.SlateVisibility.Collapsed;
        } else {
            this.mPriceButton.visibility = mw.SlateVisibility.Visible;
            this.mAdsButton.visibility = mw.SlateVisibility.Visible;
        }
        let bagInfoElement = GameConfig.BagInfo.getElement(this.bagId);
        let rarityStr: string = "";
        switch (bagInfoElement.Rarity) {
            case 0:
                rarityStr = "黄阶";
                break;
            case 1:
                rarityStr = "玄阶";
                break;
            case 2:
                rarityStr = "地阶";
                break;
            case 3:
                rarityStr = "天阶";
                break;
            default:
                break;
        }
        let bagTypeStr: string = "";
        switch (bagInfoElement.Type) {
            case 1:
                bagTypeStr = "武器";
                this.mTitleTextBlock.text = `${rarityStr}${bagTypeStr}介绍`;
                break;
            case 2:
                bagTypeStr = "皮肤";
                this.mTitleTextBlock.text = `${rarityStr}${bagTypeStr}介绍`;
                break;
            case 3:
                bagTypeStr = "装备";
                this.mTitleTextBlock.text = `${rarityStr}${bagTypeStr}介绍`;
                break;
            case 4:
                bagTypeStr = "宠物";
                this.mTitleTextBlock.text = `${rarityStr}${bagTypeStr}介绍`;
                break;
            default:
                break;
        }
        this.mNameTextBlock.text = bagInfoElement?.Name;
        this.mInfoTextBlock.text = `<size=40><b><color=#lime>${bagInfoElement?.Name}</color><b><color=#red>，<size=50><b><color=#red>${rarityStr}${bagTypeStr}</color></b></size>\n使用后血量和攻击力提升<size=50><b><color=#fuchsia>${1 + Utils.getMultipleByRarity(bagInfoElement.Rarity)}倍</color></b></size>\n提升后的<size=40><b><color=#yellow>血量：${GlobalData.hp}，攻击力：${GlobalData.atk}</color></b></size>`;
        let assetId = bagInfoElement?.AssetId;
        Utils.setImageByAssetIconData(this.mIconImage, assetId);
    }

    protected onHide(): void {
        this.useCallBack = null;
        this.priceCallBack = null;
        this.adsCallBack = null;
    }
}