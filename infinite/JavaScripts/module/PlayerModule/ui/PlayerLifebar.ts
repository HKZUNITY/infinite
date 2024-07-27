import { SpawnManager } from '../../../Modified027Editor/ModifiedSpawn';
import Console from "../../../Tools/Console";
import { Utils } from "../../../Tools/utils";
import GlobalData from "../../../const/GlobalData";
import PlayerLifebar_Generate from "../../../ui-generate/module/PlayerModule/PlayerLifebar_generate";

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
    @mw.Property({ replicated: true, onChanged: "onInvincible" })
    public isInvincible: boolean = true;
    public get getIsInvincible(): boolean {
        return this.isInvincible;
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
        this._hpBarUI.mLifebar.percent = curHp / this.maxHp;
        this._hpBarUI.mLifeText.text = `${curHp}/${this.maxHp}`;
    }

    private onNameChange(): void {
        if (!this._isInit) return;
        this._hpBarUI.mNameText.text = this.playerName;
    }

    private onLevelChange(): void {
        if (!this._isInit || this.playerLevel < 0) return;
        this._hpBarUI.mLevelText.text = Utils.getLvText(this.playerLevel) + " 等级Lv." + this.playerLevel;
    }

    private invincibleEffectId: number = null;
    private onInvincible(): void {
        if (!this._isInit) return;
        if (this.onInvincible) {
            this.invincibleEffectId = EffectService.playOnGameObject("140172", this.character, { slotType: mw.HumanoidSlotType.Root, loopCount: 0 });
        } else {
            EffectService.stop(this.invincibleEffectId);
        }
    }

    protected onDestroy(): void {
        this._hpBarUI?.destroy();
        this._hpBarWidget?.destroy();
    }
}