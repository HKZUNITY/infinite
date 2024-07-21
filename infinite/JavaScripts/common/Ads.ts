import { PlayerManagerExtesion, } from '../Modified027Editor/ModifiedPlayer';
import { SpawnManager } from '../Modified027Editor/ModifiedSpawn';
import { GeneralManager, } from '../Modified027Editor/ModifiedStaticAPI';
import { IAdsElement } from "../config/Ads";
import { GameConfig } from "../config/GameConfig";
import AdTipsPanel from "../module/AdsModule/ui/AdTipsPanel";
import ShopModuleC from "../module/ShopModule/ShopModuleC";

@Component
export default class Ads extends mw.Script {

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        if (mw.SystemUtil.isClient()) {
            this.onStartC();
        }
        else if (mw.SystemUtil.isServer()) {
            this.onStartS();
        }
    }

    /**
     * 周期函数 每帧执行
     * 此函数执行需要将this.useUpdate赋值为true
     * @param dt 当前帧与上一帧的延迟 / 秒
     */
    protected onUpdate(dt: number): void {
        if (mw.SystemUtil.isClient()) {
            this.onUpdateC(dt);
        }
        else if (mw.SystemUtil.isServer()) {
            this.onUpdateS(dt);
        }
    }
    /**----------------------------------------[客户端]---------------------------------------- */
    /**客户端的onStart */
    private async onStartC(): Promise<void> {
        await ModuleService.ready();
        let adsTipsPanel = mw.UIService.getUI(AdTipsPanel);
        let shopModuleC = ModuleService.getModule(ShopModuleC);
        GameConfig.Ads.getAllElement().forEach(async (value: IAdsElement, index: number, array: IAdsElement[]) => {
            let npc = await GameObject.asyncFindGameObjectById(value.Role) as mw.Character;
            npc.displayName = value.Del;
            GeneralManager.rpcPlayEffectOnPlayer(
                value.EffectId,
                npc,
                mw.HumanoidSlotType.BackOrnamental,
                0,
                value.EffectOffset,
                new mw.Rotation(value.EffectRot),
                value.EffectScale.multiply(1));
            if (value.StandbyAnimation) {
                let npcAnima = PlayerManagerExtesion.loadAnimationExtesion(npc, value.StandbyAnimation, false)
                npcAnima.loop = 0;
                npcAnima.play();
            }
            if (value.rightWeaponGuid) {
                let rightWeapon = await SpawnManager.asyncSpawn({ guid: value.rightWeaponGuid, replicates: false });
                npc.attachToSlot(rightWeapon, mw.HumanoidSlotType.RightHand);
            }
            if (value.leftWeaponGuid) {
                let leftWeapon = await SpawnManager.asyncSpawn({ guid: value.leftWeaponGuid, replicates: false });
                npc.attachToSlot(leftWeapon, mw.HumanoidSlotType.LeftHand);
            }
            let trigger = await GameObject.asyncFindGameObjectById(value.Trigger) as mw.Trigger;
            trigger.onEnter.add((char: mw.Character) => {
                if (char != Player.localPlayer.character) return;
                // if (GlobalData.isOpenIAA) {
                //     adsTipsPanel.showAdTips(value.id, AdType.WeaponSet1);
                // } else {
                //     shopModuleC.ads(value.id);
                // }
            });
        });
    }

    /**客户端的onUpdate */
    private onUpdateC(dt: number): void {

    }
    /**----------------------------------------[客户端]---------------------------------------- */

    /**----------------------------------------[服务端]---------------------------------------- */
    /**服务端的onStart */
    private onStartS(): void {

    }
    /**服务端的onUpdate */
    private onUpdateS(dt: number): void {

    }
    /**----------------------------------------[服务端]---------------------------------------- */
}