import { SpawnManager } from '../../../Modified027Editor/ModifiedSpawn';
import Console from "../../../Tools/Console";
import { Utils } from "../../../Tools/utils";
import { GameConfig } from '../../../config/GameConfig';
import GlobalData from "../../../const/GlobalData";
import PlayerLifebar_Generate from "../../../ui-generate/module/PlayerModule/PlayerLifebar_generate";
import { flyDataMap } from '../../FlyModule/FlyModule';

@Component
export default class PlayerLifebar extends mw.Script {
    @mw.Property({ replicated: true, onChanged: "onHpChange" })
    public maxHp: number = 0;
    @mw.Property({ replicated: true, onChanged: "onHpChange" })
    public hp: number = 0;
    @mw.Property({ replicated: true, onChanged: "onNameChange" })
    public playerName: string = "";
    @mw.Property({ replicated: true, onChanged: "onLevelChange" })
    public playerLevel: number = -1;
    @mw.Property({ replicated: true, onChanged: "onUsePet" })
    public bagId: number = -1;
    @mw.Property({ replicated: true, onChanged: "onUseFly" })
    public flyId: number = -1;
    @mw.Property({ replicated: true, onChanged: "onInvincible" })
    public isInvincible: boolean = false;
    public get getIsInvincible(): boolean {
        return this.isInvincible;
    }
    public get getBagId(): number {
        return this.bagId;
    }
    public get getFlyId(): number {
        return this.flyId;
    }
    private _hpBarUI: PlayerLifebar_Generate;
    private _hpBarWidget: mw.UIWidget;
    private _isInit = false;

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        if (SystemUtil.isClient()) {
            Console.log("初始化Player血条UI");
            this.init();
        }
    }

    protected onUpdate(dt: number): void {
        if (mw.SystemUtil.isClient()) {
            this.onUpdateC(dt);
        }
    }

    private character: mw.Character = null;
    private async init(): Promise<void> {
        this._hpBarUI = mw.UIService.create(PlayerLifebar_Generate);
        this._hpBarWidget = await SpawnManager.asyncSpawn<mw.UIWidget>({ guid: "UIWidget", replicates: false });
        this._hpBarWidget.setTargetUIWidget(this._hpBarUI.uiWidgetBase);
        this._hpBarWidget.widgetSpace = mw.WidgetSpaceMode.OverheadUI;
        this.character = this.gameObject as mw.Character;
        this._hpBarWidget.parent = this.character.overheadUI;
        this._hpBarWidget.localTransform.position = Vector.up.multiply(0);
        this._isInit = true;
        this.onHpChange();
        if (GlobalData.isOpenCcreenshot) {
            this._hpBarWidget.setVisibility(mw.PropertyStatus.Off);
        }
    }

    private onHpChange(): void {
        if (!this._isInit) return;
        let curHp = this.hp;
        if (curHp < 0) curHp = 0;
        if (curHp > this.maxHp) curHp = this.maxHp;
        this._hpBarUI.mLifebar.percent = curHp / this.maxHp;
        this._hpBarUI.mLifeText.text = `${curHp}/${this.maxHp}`;
    }

    private onNameChange(): void {
        if (!this._isInit) return;
        this._hpBarUI.mNameText.text = this.playerName;
    }

    private async onLevelChange(): Promise<void> {
        if (!this._isInit || this.playerLevel < 0) return;
        this._hpBarUI.mLevelText.text = await Utils.getLvText(this.playerLevel, this.character?.player?.userId) + " 等级Lv." + this.playerLevel;
    }

    private invincibleEffectId: number = null;
    private onInvincible(): void {
        if (!this._isInit) return;
        if (this.isInvincible) {
            this.invincibleEffectId = EffectService.playOnGameObject("140172", this.character, { slotType: mw.HumanoidSlotType.Root, loopCount: 0 });
        } else {
            EffectService.stop(this.invincibleEffectId);
        }
    }

    private pet: mw.Character = null;
    private petIdleId: string = null;
    private petMoveId: string = null;
    private async onUsePet(): Promise<void> {
        if (this.bagId == -1) {
            if (!this.pet) return;
            GameObjPool.despawn(this.pet);
            this.pet = null;
            this.useUpdate = false;
        } else {
            let bagInfoElement = GameConfig.BagInfo.getElement(this.bagId);
            if (!bagInfoElement) return;
            if (!this.pet) {
                this.pet = await GameObjPool.asyncSpawn("Character") as mw.Character;
                await this.pet.asyncReady();
            }
            let loc = this.character.worldTransform.position;
            this.pet.worldTransform.position = new mw.Vector(loc.x, loc.y, loc.z + 500);
            Utils.asyncDownloadAsset(bagInfoElement.AssetId).then(() => {
                this.pet.setDescription([bagInfoElement.AssetId]);
                this.petIdleId = bagInfoElement.Idle;
                this.petMoveId = bagInfoElement.Move;
                this.useUpdate = true;
            });
        }
    }

    private frameCount: number = 0;
    private maxFrameCount: number = 1;
    private onUpdateC(dt: number): void {
        this.frameCount++;
        if (this.frameCount < this.maxFrameCount) return;
        this.frameCount = 0;
        this.updateMove();
    }

    private curPetDir: mw.Vector = mw.Vector.zero;
    private targetLoc: mw.Vector = mw.Vector.zero;
    private targetDistance: number = 0;
    private petAnimation: mw.Animation = null;
    private updateMove(): void {
        if (!this.pet || !this.character || !this.petMoveId || !this.petIdleId) return;
        this.targetLoc = this.character.worldTransform.position;
        this.targetDistance = Math.sqrt(
            Math.pow(this.pet.worldTransform.position.x - this.targetLoc.x, 2) +
            Math.pow(this.pet.worldTransform.position.y - this.targetLoc.y, 2)
        );
        if (this.targetDistance > 300 && this.targetDistance <= 2000) {
            this.curPetDir = this.targetLoc.clone().add(this.targetLoc.clone().subtract(this.pet.worldTransform.position.clone()))
            this.pet.lookAt(this.curPetDir);
            this.pet.addMovement(mw.Vector.forward);

            if (this.petAnimation && this.petAnimation?.assetId == this.petMoveId) {
            } else {
                Utils.asyncDownloadAsset(this.petMoveId).then(() => {
                    this.petAnimation = this.pet.loadAnimation(this.petMoveId);
                    this.petAnimation.loop = 0;
                    this.petAnimation.play();
                });
            }
        } else {
            if (this.petAnimation && this.petAnimation?.assetId == this.petIdleId) {
            } else {
                Utils.asyncDownloadAsset(this.petIdleId).then(() => {
                    this.petAnimation = this.pet.loadAnimation(this.petIdleId);
                    this.petAnimation.loop = 0;
                    this.petAnimation.play();
                })
            }
        }
    }

    private flyJian: mw.GameObject = null;
    private flyJianAni: mw.Animation = null;
    private onUseFly(): void {
        if (this.flyId == -1) {
            if (this.flyJian) {
                GameObjPool.despawn(this.flyJian);
                this.flyJian = null;
            }
            if (this.flyJianAni) {
                this.flyJianAni.stop();
                this.flyJianAni = null;
            }
        } else {
            if (!this.character) return;
            if (this.flyJian) {
                GameObjPool.despawn(this.flyJian);
                this.flyJian = null;
            }
            if (!flyDataMap.has(this.flyId)) return;
            let flyData = flyDataMap.get(this.flyId);
            Utils.asyncDownloadAsset(flyData.jianId).then(() => {
                GameObjPool.asyncSpawn(flyData.jianId).then((go: mw.GameObject) => {
                    this.flyJian = go;
                    this.character.attachToSlot(this.flyJian, mw.HumanoidSlotType.Root);
                    this.flyJian.localTransform.position = mw.Vector.zero;
                    this.flyJian.localTransform.rotation = mw.Rotation.zero;
                    this.flyJianAni = this.character.loadAnimation(flyData.animationId);
                    this.flyJianAni.loop = 0;
                    this.flyJianAni.play();
                });
            });
        }
    }

    protected onDestroy(): void {
        if (this.pet) GameObjPool.despawn(this.pet);
        if (this.flyJian) GameObjPool.despawn(this.flyJian);
        this._hpBarUI?.destroy();
        this._hpBarWidget?.destroy();
    }
}