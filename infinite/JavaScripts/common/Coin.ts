import Console from "../Tools/Console";
import { ICoinElement } from "../config/Coin";
import { GameConfig } from "../config/GameConfig";
import PlayerModuleS from "../module/PlayerModule/PlayerModuleS";

@Component
export default class Coin extends Script {
    @mw.Property({ displayName: "金币特效", group: "金币属性", tooltip: "金币特效" })
    private coinEffect: string = "29704";

    @mw.Property({ displayName: "金币音效", group: "金币属性", tooltip: "金币音效" })
    private coinSound: string = "124720";

    @mw.Property({ displayName: "重生时间", group: "金币属性", tooltip: "重生时间", range: { min: 30, max: 120, showSlider: true } })
    private rebirthTime: number = 30;

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
    /**--------------------------------【客户端】-------------------------------- */
    /**客户端的onStart */
    private onStartC(): void {
        this.useUpdate = false;
    }

    /**客户端的onUpdate */
    private onUpdateC(dt: number): void {

    }
    /**--------------------------------【客户端】-------------------------------- */

    /**--------------------------------【服务端】-------------------------------- */
    private playerModuleS: PlayerModuleS = null;
    private get getPlayerModuleS(): PlayerModuleS {
        if (this.playerModuleS == null) {
            this.playerModuleS = ModuleService.getModule(PlayerModuleS);
        }
        return this.playerModuleS;
    }

    private coinElement: ICoinElement[] = [];
    private triggers: mw.Trigger[] = [];
    private coinEffectIds: number[] = [];


    /**服务端的onStart */
    private onStartS(): void {
        this.useUpdate = false;
        this.initData();
    }

    private async initData(): Promise<void> {
        await ModuleService.ready();
        this.coinElement = GameConfig.Coin.getAllElement();
        this.initTrigger();
    }

    private async initTrigger(): Promise<void> {
        for (let i = 0; i < this.coinElement.length; ++i) {
            let triggerGuid = this.coinElement[i].Trigger;
            if (!triggerGuid) continue;
            let trigger = await mw.GameObject.findGameObjectById(triggerGuid) as mw.Trigger;
            trigger.onEnter.add(this.bindTrigger.bind(this, i));
            this.triggers.push(trigger);
            let effectId = EffectService.playOnGameObject(
                this.coinEffect,
                trigger,
                {
                    position: new mw.Vector(0, 0, -30),
                    loopCount: 0,
                    scale: mw.Vector.one.multiply(2)
                });
            this.coinEffectIds.push(effectId);
            Console.error("wfz - " + i);
        }
    }

    private bindTrigger(index: number, character: mw.Character): void {
        if (!(character instanceof mw.Character)) {
            console.error("触发器进入的不是角色");
            return;
        }
        this.getPlayerModuleS.updateCoin(character.player, this.randomValueS(10, 30));

        this.triggers[index].enabled = false;
        SoundService.play3DSound(this.coinSound, this.triggers[index]);
        if (this.coinEffectIds.length > index) {
            EffectService.stop(this.coinEffectIds[index]);
            this.coinEffectIds[index] = null;
        }

        TimeUtil.delaySecond(this.rebirthTime).then(() => {
            this.triggers[index].enabled = true;
            let effectId = EffectService.playOnGameObject(
                this.coinEffect,
                this.triggers[index],
                {
                    position: new mw.Vector(0, 0, -30),
                    loopCount: 0,
                    scale: mw.Vector.one.multiply(2)
                });
            this.coinEffectIds[index] = effectId;
        });
    }

    /**服务端的onUpdate */
    private onUpdateS(dt: number): void {

    }

    /**随机一个值 */
    private randomValueS(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    /**--------------------------------【服务端】-------------------------------- */

    /** 脚本被销毁时最后一帧执行完调用此函数 */
    protected onDestroy(): void {

    }
}