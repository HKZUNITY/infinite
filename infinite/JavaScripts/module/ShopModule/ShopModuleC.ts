import { ModifiedCameraSystem } from '../../Modified027Editor/ModifiedCamera';
import { PlayerManagerExtesion, } from '../../Modified027Editor/ModifiedPlayer';
import { SpawnManager } from '../../Modified027Editor/ModifiedSpawn';
import { GeneralManager, } from '../../Modified027Editor/ModifiedStaticAPI';
import { ColdWeapon } from "../../Prefabs/冷兵器/Script/ColdWeapon";
import Console from "../../Tools/Console";
import { InputManagers, TouchData } from "../../Tools/InputManager";
import { Notice } from "../../common/notice/Notice";
import { IColdWeaponElement } from "../../config/ColdWeapon";
import { GameConfig } from "../../config/GameConfig";
import NPCHead_Generate from "../../ui-generate/module/ShopModule/NPCHead_generate";
import AdTipsPanel from "../AdsModule/ui/AdTipsPanel";
import HUDModuleC from "../HUDModule/HUDModuleC";
import PlayerModuleC from "../PlayerModule/PlayerModuleC";
import TaskModuleC from "../TaskModule/TaskModuleC";
import ShopData from "./ShopData";
import ShopModuleS from "./ShopModuleS";
import CostPanel from "./ui/CostPanel";
import ShopPanel from "./ui/ShopPanel";

export default class ShopModuleC extends ModuleC<ShopModuleS, ShopData> {
    private hudModuleC: HUDModuleC = null
    private playerModuleC: PlayerModuleC = null;
    private taskModuleC: TaskModuleC = null;
    private shopPanel: ShopPanel = null;;
    private costPanel: CostPanel = null;
    private adsTipsPanel: AdTipsPanel = null;

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        this.initDatas();
        this.registerActions();
    }

    /**初始化数据 */
    private initDatas(): void {
        this.hudModuleC = ModuleService.getModule(HUDModuleC);
        this.playerModuleC = ModuleService.getModule(PlayerModuleC);
        this.taskModuleC = ModuleService.getModule(TaskModuleC);
        this.shopPanel = mw.UIService.getUI(ShopPanel);
        this.costPanel = mw.UIService.getUI(CostPanel);
        this.adsTipsPanel = mw.UIService.getUI(AdTipsPanel);

        let rootCanvaSize = mw.getViewportSize();
        this.limitedTouchXs[0] = 460 * rootCanvaSize.x / 1920;
        this.limitedTouchXs[1] = 1460 * rootCanvaSize.x / 1920;
        this.limitedTouchYs[0] = 220 * rootCanvaSize.y / 1080;
        this.limitedTouchYs[1] = 840 * rootCanvaSize.y / 1080;
        Console.error(this.limitedTouchXs + " | " + this.limitedTouchYs);
    }

    private registerActions(): void {
        this.hudModuleC.onOpenShopAction.add(() => {
            this.shopPanel.show();
            this.onSwitchCameraAction.call(true);
        });

        this.onSwitchCameraAction.add((isOpenSkinShop: boolean) => {
            isOpenSkinShop ? this.openWeaponSetShop() : this.closeWeaponSetShop();
        });
    }
    private weaponSet: number[] = [];
    protected onEnterScene(sceneType: number): void {
        this.initShopNPCData();
        // this.appearance = this.localPlayer.character.setDescription(mw.HumanoidV2);
        this.weaponSet = this.data.weaponSet;
        TimeUtil.delaySecond(3).then(() => {
            let id = this.data.useWeaponId;
            let coldWeaponElement = GameConfig.ColdWeapon.getElement(id);
            // this.updateRoleType(coldWeaponElement);
            this.onSwitchWeapon(coldWeaponElement);
            //切换角色
            this.onSwitchRole(coldWeaponElement.Role);
            //切换翅膀
            this.onSwitchWing(coldWeaponElement);
            this.updateShopRoles(coldWeaponElement);
            this.shopPanel.defaultSelectItem(id);
            this.updateHeadUI(coldWeaponElement);
        });
    }

    private coldWeaponElement: IColdWeaponElement = null;
    /**更新角色类型 */
    public updateRoleType(element: IColdWeaponElement): void {
        this.coldWeaponElement = element;
        switch (this.coldWeaponElement.RoleType) {
            case 1:
                this.onSwitchWeaponSet();
                break;
            case 2:
                this.isHaveWeaponSet();
                break;
            case 3:
                this.onWatchAdSwitchWeaponSet();
                break;
            default:
                break;
        }
    }

    /**判断是否拥有 */
    private isHaveWeaponSet(): void {
        if (this.weaponSet.includes(this.coldWeaponElement.id)) {
            this.onSwitchWeaponSet();
        }
        else {
            this.costPanel.showAndInitData(this.coldWeaponElement.Price);
        }
    }

    public sureBuy(): void {
        let costPrice = this.coldWeaponElement.Price;
        if (this.playerModuleC.getCoin() >= costPrice) {
            let id = this.coldWeaponElement.id;
            if (!this.weaponSet.includes(id)) {
                this.weaponSet.push(id);
            }
            this.saveWeaponSet(id);
            this.playerModuleC.saveCoin(-costPrice);
            this.updateHeadUI(this.coldWeaponElement);
            this.shopPanel.updateTextBlock();
            Notice.showDownNotice("购买成功");
        }
        else {
            Notice.showDownNotice("金币不足");
        }
    }

    /**看广告切换武器套装 */
    private onWatchAdSwitchWeaponSet(): void {
        // if (GlobalData.isOpenIAA) {
        //     this.adsTipsPanel.showAdTips(0, AdType.WeaponSet);
        // }
        // else {
        //     this.onSwitchWeaponSet();
        // }
    }

    /**----------【PlayerModule】---------- */

    public ads(id: number): void {
        this.coldWeaponElement = GameConfig.ColdWeapon.getElement(id);
        //切换武器
        this.onSwitchWeapon(this.coldWeaponElement);
        //切换角色
        this.onSwitchRole(this.coldWeaponElement.Role);
        //切换翅膀
        this.onSwitchWing(this.coldWeaponElement);
    }

    /**切换武器套装 */
    public onSwitchWeaponSet(): void {
        //切换武器
        this.onSwitchWeapon(this.coldWeaponElement);
        //切换角色
        this.onSwitchRole(this.coldWeaponElement.Role);
        //切换翅膀
        this.onSwitchWing(this.coldWeaponElement);
        this.shopPanel.hide();
        this.onSwitchCameraAction.call(false);
    }

    /**切换武器 */
    private onSwitchWeapon(element: IColdWeaponElement): void {
        const userInstance = ColdWeapon.getInstance();
        userInstance.register(element);
        if (element.RoleType != 3) {
            this.saveUseWeaponId(element.id);
        }
    }

    // private appearance: mw.HumanoidV2 = null;
    /**切换角色 */
    private onSwitchRole(role: string): void {
        this.localPlayer.character.setDescription([role]);
        this.localPlayer.character.syncDescription();
    }

    /**切换翅膀 */
    private onSwitchWing(element: IColdWeaponElement): void {
        this.server.net_onSwitchWing(element.EffectId, element.EffectOffset, element.EffectRot, element.EffectScale);
    }

    /**玩家和皮肤商店之间的相机转化 */
    public onSwitchCameraAction: Action1<boolean> = new Action1<boolean>();

    /**玩家身上的相机 */
    private camera: Camera = null;
    /**拿到相机 */
    private get getCamera(): Camera {
        if (this.camera == null) {
            this.camera = Camera.currentCamera;
        }
        return this.camera;
    }

    /**皮肤商店要展示的NPC */
    private shopNpc: mw.Character = null;
    /**得到商店的NPC */
    private get getShopNpc(): mw.Character {
        if (this.shopNpc == null) {
            this.shopNpc = GameObject.findGameObjectById("333D8F0C") as mw.Character;
        }
        return this.shopNpc;
    }

    // private npcHv2: mw.HumanoidV2 = null;

    /**初始化商店NPC数据 */
    private async initShopNPCData(): Promise<void> {
        this.shopNpc = await GameObject.asyncFindGameObjectById("333D8F0C") as mw.Character;
        this.shopNpc.complexMovementEnabled = false;
        AccountService.downloadData(this.getShopNpc);
        // let nickName = AccountService.getNickName();
        // nickName = (nickName) ? nickName : "playerId:" + this.currentPlayerId;
        this.getShopNpc.displayName = "";
        this.currentNpcRotZ = this.getShopNpc.localTransform.rotation.z;
        // this.npcHv2 = this.getShopNpc.setDescription(mw.HumanoidV2);

        this.lookObj = await GameObject.asyncFindGameObjectById("3F08E093");
        this.cameraRotation = this.getShopNpc.worldTransform.getForwardVector().multiply(-1).toRotation();
        this.headUI = mw.UIService.create(NPCHead_Generate);
        let headUIWidget = await GameObject.asyncFindGameObjectById("1A034CD5") as mw.UIWidget;
        headUIWidget.setTargetUIWidget(this.headUI.uiWidgetBase);
    }

    private headUI: NPCHead_Generate = null
    public updateHeadUI(element: IColdWeaponElement): void {
        switch (element.RoleType) {
            case 1:
                this.headUI.mFreeCanvas.visibility = mw.SlateVisibility.SelfHitTestInvisible;
                this.headUI.mCoinCanvas.visibility = mw.SlateVisibility.Collapsed;
                this.headUI.mAdsCanvas.visibility = mw.SlateVisibility.Collapsed;
                break;
            case 2:
                this.headUI.mFreeCanvas.visibility = mw.SlateVisibility.Collapsed;
                this.headUI.mCoinCanvas.visibility = mw.SlateVisibility.SelfHitTestInvisible;
                this.headUI.mAdsCanvas.visibility = mw.SlateVisibility.Collapsed;
                if (this.weaponSet.includes(element.id)) {
                    this.headUI.mCoinText.fontSize = 100;
                    this.headUI.mCoinText.text = "已拥有";
                    // this.headUI.mCoinImage.visibility = mw.SlateVisibility.Collapsed;
                }
                else {
                    this.headUI.mCoinText.fontSize = 70;
                    this.headUI.mCoinText.text = "需要花费\n" + element.Price + "金币购买";
                    // this.headUI.mCoinImage.visibility = mw.SlateVisibility.SelfHitTestInvisible;
                }
                break;
            case 3:
                this.headUI.mFreeCanvas.visibility = mw.SlateVisibility.Collapsed;
                this.headUI.mCoinCanvas.visibility = mw.SlateVisibility.Collapsed;
                this.headUI.mAdsCanvas.visibility = mw.SlateVisibility.SelfHitTestInvisible;
                break;
            default:
                break;
        }
    }

    private shopNPCEffectId: number = null;
    private npcAnima: mw.Animation = null;
    private rightWeapon: mw.GameObject = null
    private leftWeapon: mw.GameObject = null
    public async updateShopRoles(element: IColdWeaponElement): Promise<void> {
        if (!element.Role) {
            Console.error("配置表角色GUID不存在");
            return;
        }
        if (!this.getShopNpc) {
            Console.error("商店角色不存在");
            return;
        }

        this.getShopNpc.setDescription([element.Role]);
        this.getShopNpc.displayName = element.Del;

        if (this.shopNPCEffectId) {
            EffectService.stop(this.shopNPCEffectId);
            this.shopNPCEffectId = null
        }
        this.shopNPCEffectId = GeneralManager.rpcPlayEffectOnPlayer(
            element.EffectId,
            this.getShopNpc,
            mw.HumanoidSlotType.BackOrnamental,
            0,
            element.EffectOffset,
            new mw.Rotation(element.EffectRot),
            element.EffectScale);


        if (this.npcAnima) {
            this.npcAnima.stop();
            this.npcAnima = null;
        }
        if (element.StandbyAnimation) {
            this.npcAnima = PlayerManagerExtesion.loadAnimationExtesion(this.getShopNpc, element.StandbyAnimation, false)
            this.npcAnima.loop = 0;
            this.npcAnima.play();
        }

        if (this.rightWeapon) {
            this.rightWeapon.destroy();
            this.rightWeapon = null;
        }
        if (element.rightWeaponGuid) {
            this.rightWeapon = await SpawnManager.asyncSpawn({ guid: element.rightWeaponGuid, replicates: false });
            this.getShopNpc.attachToSlot(this.rightWeapon, mw.HumanoidSlotType.RightHand);
        }
        if (this.leftWeapon) {
            this.leftWeapon.destroy();
            this.leftWeapon = null;
        }
        if (element.leftWeaponGuid) {
            this.leftWeapon = await SpawnManager.asyncSpawn({ guid: element.leftWeaponGuid, replicates: false });
            this.getShopNpc.attachToSlot(this.leftWeapon, mw.HumanoidSlotType.LeftHand);
        }
        this.updateHeadUI(element);
    }

    private lookObj: mw.GameObject;
    private oldRotation: mw.Rotation;
    private cameraRotation: mw.Rotation;
    private oldCameraData: any = {};
    /**打开武器套装商店 */
    private openWeaponSetShop(): void {
        this.oldCameraData = this.getCameraData();
        let cs = this.getCamera;
        this.oldRotation = cs.worldTransform.clone().rotation.clone();
        this.oldCameraData[1].followTargetInterpSpeed = ModifiedCameraSystem.followTargetInterpSpeed;
        ModifiedCameraSystem.followTargetInterpSpeed = 0;
        cs.positionLagSpeed = 0;
        cs.rotationLagEnabled = false;
        cs.positionLagEnabled = false
        cs.rotationLagSpeed = 0;
        cs.springArm.localTransform.position = mw.Vector.zero;
        cs.localTransform.position = mw.Vector.zero;
        ModifiedCameraSystem.setCameraFollowTarget(this.lookObj);
        let crT = cs.localTransform.clone();
        crT.position = new mw.Vector(0, 0, 85);
        crT.rotation = mw.Rotation.zero;
        cs.localTransform = crT;
        ModifiedCameraSystem.setOverrideCameraRotation(this.cameraRotation);

        InputManagers.getInstance.onPressTouch.add((data: TouchData) => {
            this.onPressTouch(data);
        });
        InputManagers.getInstance.onReleaseTouch.add((data: TouchData) => {
            this.onReleaseTouch(data);
        });
    }

    /**关闭武器套装商店 */
    private closeWeaponSetShop(): void {
        let cs = this.getCamera;
        ModifiedCameraSystem.setCameraFollowTarget(this.localPlayer.character);
        ModifiedCameraSystem.applySettings(this.oldCameraData[0]);
        ModifiedCameraSystem.setOverrideCameraRotation(this.oldRotation);
        setTimeout(() => {
            cs.positionLagEnabled = this.oldCameraData[1].positionLagEnabled;
            cs.rotationLagEnabled = this.oldCameraData[1].rotationLagEnabled;
            ModifiedCameraSystem.followTargetInterpSpeed = this.oldCameraData[1].followTargetInterpSpeed;
            cs.positionLagSpeed = this.oldCameraData[1].positionLagSpeed;
            cs.rotationLagSpeed = this.oldCameraData[1].rotationLagSpeed;
            ModifiedCameraSystem.resetOverrideCameraRotation();
        }, 200);

        InputManagers.getInstance.onPressTouch.clear();
        InputManagers.getInstance.onReleaseTouch.clear();
    }

    private getCameraData() {
        let tmp = ModifiedCameraSystem.getCurrentSettings();
        let ret = [{}, {}];
        for (const key in tmp) {
            if (Object.prototype.hasOwnProperty.call(tmp, key)) {
                if (key == "cameraLocationLagSpeed" ||
                    key == "cameraRotationLagSpeed" ||
                    key == "followTargetInterpSpeed") {
                    ret[0][key] = 0;
                    ret[1][key] = tmp[key];
                } else if (
                    key == "cameraRotationLagEnable" ||
                    key == "cameraLocationLagEnable"
                ) {
                    ret[0][key] = false;
                    ret[1][key] = tmp[key];
                }
                else {
                    ret[0][key] = tmp[key];
                }
            }
        }
        return ret;
    }

    /**记录当前滑动屏幕的X轴正负值 */
    private x: number = 0;
    /**旋转速度 */
    private slideSpeedX: number = 1;
    /**当前Npc的旋转Z轴值 */
    private currentNpcRotZ: number = 0;
    private limitedTouchXs: number[] = [460, 1460];
    private limitedTouchYs: number[] = [220, 840];
    /**按下 */
    private onPressTouch(data: TouchData): void {
        // Console.error("[onPressTouch-data] " + data.x + "/" + data.y);
        if (data.x > this.limitedTouchXs[1] || data.x < this.limitedTouchXs[0]
            || data.y > this.limitedTouchYs[1] || data.y < this.limitedTouchYs[0]) return;
        if (this.x != 0) {
            let x = (data.x - this.x) * this.slideSpeedX;
            // Console.error("x = " + x);
            this.currentNpcRotZ -= x;
            this.getShopNpc.localTransform.rotation = (new mw.Rotation(0, 0, this.currentNpcRotZ));
        }
        this.x = data.x;
    }

    /**释放 */
    private onReleaseTouch(data: TouchData): void {
        // Console.error("[onReleaseTouch-data] " + data.x + "/" + data.y);
        this.x = 0;
    }

    public getWeaponSet(): number[] {
        return this.data.weaponSet;
    }

    /**
     * 是否拥有
     * @param id 
     * @returns 
     */
    public isHaveWeapon(id: number): boolean {
        return this.data.weaponSet.includes(id);
    }

    public saveWeaponSet(weaponId: number): void {
        this.server.net_saveWeaponSet(weaponId);
    }

    public saveUseWeaponId(useWeaponId: number): void {
        this.server.net_saveUseWeaponId(useWeaponId);
    }
}