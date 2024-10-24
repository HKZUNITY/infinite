import { PlayerManagerExtesion, } from '../../../Modified027Editor/ModifiedPlayer';
import { SpawnManager } from '../../../Modified027Editor/ModifiedSpawn';
import Console from "../../../Tools/Console";
import { Notice } from '../../../common/notice/Notice';
import { IColdWeaponElement } from "../../../config/ColdWeapon";
import { GameConfig } from '../../../config/GameConfig';
import GlobalData from '../../../const/GlobalData';
import { PrefabEvent } from "../../PrefabEvent";
import { SkillRectCheck } from "./SkillRectCheck";
import Weapon from "./Weapon";
import { WeaponManager } from "./WeaponManager";

export class ColdWeapon {
    private static instance: ColdWeapon;
    /** 冷兵器实例 */
    private _weapon: Weapon;
    /** 当前连击时间 */
    private _curComboTime: number = 0;
    /** 结束蓄力回调 */
    private _endChargeResolve: (isNext: boolean) => void = null;
    /** 受击特效 */
    private _onHitEffGuid: string;
    /** 受击动画 */
    private _onHitAnimation: string;
    /** 伤害 */
    private _hitDamage: number = 10;

    /** 是否持有武器 */
    private _isKeepWeapon: boolean = false;
    public get isKeepWeapon(): boolean {
        return this._isKeepWeapon;
    }
    /** 是否正在播放 */
    public isPlaying: boolean;

    public static getInstance() {
        if (this.instance == null) {
            this.instance = new ColdWeapon();
            PrefabEvent.PrefabEvtEquip.onEquip((targetGuid: string, slot: PrefabEvent.EquipSlot, equipGuid: string) => {
                const player = Player.localPlayer;
                if (targetGuid == player.character.gameObjectId) {
                    if (slot == PrefabEvent.EquipSlot.Weapon && this.instance._weapon && equipGuid != this.instance._weapon.guid) {
                        if (this.instance._isKeepWeapon) {
                            this.instance.releseHandle();
                        }
                    }
                }
            });
        }
        return this.instance;
    }

    /**
     * 注册
     * @param pick 数据来源
     * @param meleeWeaponPrefabGuid 冷兵器预制件Guid
     */
    public async register(pick: IColdWeaponElement) {
        if (this._isKeepWeapon) {
            this.releseHandle();
        }
        const player = Player.localPlayer;
        if (this._weapon == null) {
            this._weapon = await WeaponManager.GetInstance().client_AsyncGetWeapon("06CF775D428E2DA13FC4B8A9B7E05D44", player.character, player, 0);
            SkillRectCheck.showRect = SystemUtil.isPIE;
        }
        //初始化打击特效，装备武器
        this._onHitEffGuid = pick.hitEffect;
        this._onHitAnimation = pick.hitAnimation;
        // this._hitDamage = pick.hitDamage;
        this._weapon.reWriteAnimationJson([pick.jsons]);
        if (pick.rightWeaponGuid != null) {
            this._weapon.equipWeapon_Hand(pick.rightWeaponGuid, true);
        }
        if (pick.leftWeaponGuid != null) {
            this._weapon.equipWeapon_Hand(pick.leftWeaponGuid, false);
        }
        this._isKeepWeapon = true;
        this.isPlaying = false;
        PrefabEvent.PrefabEvtEquip.equip(player.character.gameObjectId, PrefabEvent.EquipSlot.Weapon, this._weapon.guid);
    }

    private releseHandle() {
        this._weapon.unequipWeapon_Hand(true);
        this._weapon.unequipWeapon_Hand(false);
        this._isKeepWeapon = false;
    }

    /**
     * 冷武器进攻
     * @param index 对应的序列号
     */
    public attack(index: number) {
        if (!this._weapon) {
            Notice.showDownNotice(StringUtil.format(GameConfig.Language.Text_NotEquippedWithYetGoFind.Value, GlobalData.atkStr, GlobalData.atkStr));
            return;
        }
        this.isPlaying = true;
        this._weapon.playAnimation(index,//播放完成
            (curActionIndex: number, maxIndex: number) => {
                this._curComboTime = 0;
                Event.dispatchToLocal("AttackMp");
            },
            //到达打击点
            this.hitTargets.bind(this),
            //可以开始combo
            (milSec: number) => {
                this.isPlaying = false;
                this._curComboTime = milSec;
            },
            //蓄能
            (curIndex: number, maxIndex: number, endChargeResolve: (isNext: boolean) => void) => {
                this._endChargeResolve = endChargeResolve;
            });
    }

    private hitTargets(curActionIndex: number, maxIndex: number, hitObjs: mw.GameObject[]) {
        hitObjs.forEach(async e => {
            // if (e.tag == "Obj-Impulse") {
            // Console.error("攻击到了 guid = " + e.guid);
            // ModuleService.getModule(ObjImpulseModuleC).addImpulseToObj(e.guid, 1000);
            // return;
            // }
            if (!(PlayerManagerExtesion.isCharacter(e)) && !(PlayerManagerExtesion.isNpc(e))) {
                return;
            }
            if (Player.localPlayer.character.gameObjectId == e.gameObjectId) return;
            if (this._onHitEffGuid != "") {
                if (e && e.worldTransform) {
                    let eff = await SpawnManager.wornAsyncSpawn<mw.Effect>(this._onHitEffGuid, false) as mw.Effect;
                    eff.worldTransform.position = e.worldTransform.position.clone();
                    eff.loop = (false);
                    eff.play(() => {
                        eff.destroy();
                    })
                }
            }
            if (this._onHitAnimation != "" && (PlayerManagerExtesion.isCharacter(e) || PlayerManagerExtesion.isNpc(e))) {
                const character = e as mw.Character;
                PlayerManagerExtesion.rpcPlayAnimation(character, this._onHitAnimation)
            }
            Console.log("使用冷兵器攻击了" + e.gameObjectId);
            // PrefabEvent.PrefabEvtFight.hurt(Player.localPlayer.character.guid, e.guid, this._hitDamage);
            PrefabEvent.PrefabEvtFight.hit(Player.localPlayer.character.gameObjectId, e.gameObjectId, this._hitDamage * GlobalData.baseSkillDamage, e.worldTransform.position);
        });
    }

    public updateHitDamage(value: number): void {
        this._hitDamage = value;
    }

    /**
     * 结束（取消）蓄力
     * @param isConfirm true为结束蓄力，false为取消蓄力
     */
    public endCharge(isConfirm: boolean) {
        if (this._endChargeResolve) {
            this._endChargeResolve(isConfirm);
            this._endChargeResolve = null;
        }
    }

    /** 获取当前连击时间 */
    public getCurComboTime(): number {
        return this._curComboTime;
    }
}