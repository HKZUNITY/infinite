import { Notice } from "../../common/notice/Notice";
import HUDModuleC from "../HUDModule/HUDModuleC";
import { LevelItem } from "../LevelModule/LevelModule";
import PlayerModuleS from "../PlayerModule/PlayerModuleS";

export class FlyData extends Subdata {
    @Decorator.persistence()
    public flyIds: number[] = [];

    // @Decorator.persistence()
    // public usingFlyId: number = 0;

    public setFlyId(flyId: number): void {
        if (!this.flyIds.includes(flyId)) {
            this.flyIds.push(flyId);
        }
        this.save(true);
    }

    // public setUsingFlyId(flyId: number): void {
    //     this.usingFlyId = flyId;
    //     this.save(true);
    // }
}

export const flyDataMap: Map<number, { commodityId: string, characterId: string, triggerId: string, worldUIId: string, name: string, skinId: string, wingId: string, jianId: string, animationId: string }> =
    new Map<number, { commodityId: string, characterId: string, triggerId: string, worldUIId: string, name: string, skinId: string, wingId: string, jianId: string, animationId: string }>();
flyDataMap.set(1, { commodityId: "9SKsZwz8S6X0001O0", characterId: "2E45E725", triggerId: "04BCD921", worldUIId: "2DBB7484", name: `购买\n御剑飞行技能`, skinId: "142921", wingId: "211667", jianId: "CDA48366471D1E2820A362823CC0E991", animationId: "284751" });

export class FlyModuleC extends ModuleC<FlyModuleS, FlyData> {
    private hudModuleC: HUDModuleC = null;
    private get getHudModuleC(): HUDModuleC {
        if (!this.hudModuleC) {
            this.hudModuleC = ModuleService.getModule(HUDModuleC);
        }
        return this.hudModuleC;
    }

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        this.bindAction();
    }

    private bindAction(): void {
        this.getHudModuleC.onOnOffFlyAction.add(this.addOnOffFlyAction.bind(this));
    }

    private addOnOffFlyAction(on: boolean): void {
        if (on) {
            if (!this.flyIds || this.flyIds.length == 0) {
                Notice.showDownNotice(`未获得御剑飞行技能`);
            } else {
                this.useFly(1);
            }
        } else {
            if (!this.flyIds || this.flyIds.length == 0) return;
            this.useFly(-1);
        }
    }

    private flyIds: number[] = [];
    // private usingFlyId: number = 0;
    protected onEnterScene(sceneType: number): void {
        this.flyIds = this.data.flyIds;
        // this.usingFlyId = this.data.usingFlyId;
        if (this.flyIds && this.flyIds.length > 0) {
            TimeUtil.delaySecond(10).then(() => {
                this.useFly(this.flyIds[0]);
            });
        }
        this.initFly();
    }

    public isGetFly(flyId: number): boolean {
        return this.flyIds.includes(flyId);
    }

    public setFlyId(flyId: number): void {
        if (!this.isGetFly(flyId)) {
            this.flyIds.push(flyId);
            this.server.net_setFlyId(flyId);
        }
    }

    // public getUsingFlyId(): number {
    //     return this.usingFlyId;
    // }

    // public setUsingFlyId(flyId: number): void {
    //     if (this.usingFlyId == flyId) return;
    //     this.usingFlyId = flyId;
    //     this.server.net_setUsingFlyId(this.usingFlyId);
    // }
    private isFlying: boolean = false;
    public get getIsFlying(): boolean {
        return this.isFlying;
    }
    public useFly(key: number): void {
        if (key == 1) {
            if (this.isFlying) return;
            this.isFlying = true;
            this.localPlayer.character.changeState(mw.CharacterStateType.Flying);
        } else {
            if (!this.isFlying) return;
            this.isFlying = false;
            this.localPlayer.character.changeState(mw.CharacterStateType.Running);
        }
        this.server.net_useFly(key);
    }

    private initFly(): void {
        flyDataMap.forEach((value: { commodityId: string; characterId: string; triggerId: string; worldUIId: string; name: string; skinId: string; wingId: string; jianId: string; animationId: string; }, key: number) => {
            mw.GameObject.asyncFindGameObjectById(value.characterId).then((go: mw.GameObject) => {
                let character = go as mw.Character;
                character.setDescription([value.skinId]);
                let ani = character.loadAnimation(value.animationId);
                ani.loop = 0;
                ani.play();
                let relativeTransform1 = new mw.Transform(mw.Vector.zero, mw.Rotation.zero, mw.Vector.one);
                let relativeTransform2 = new mw.Transform(mw.Vector.zero, new mw.Rotation(0, 0, 90), mw.Vector.one);
                character.description.advance.slotAndDecoration.slot[mw.HumanoidSlotType.Root].decoration.add(value.jianId, relativeTransform1);
                character.description.advance.slotAndDecoration.slot[mw.HumanoidSlotType.BackOrnamental].decoration.add(value.wingId, relativeTransform2);
            });
            mw.GameObject.asyncFindGameObjectById(value.triggerId).then((go: mw.GameObject) => {
                let trigger = go as mw.Trigger;
                trigger.onEnter.add((character: mw.Character) => {
                    if (character.gameObjectId != this.localPlayer.character.gameObjectId) return;
                    if (this.isGetFly(key)) {
                        if (!this.isFlying) this.useFly(key);
                    } else {
                        Notice.showDownNotice(`未获得御剑飞行技能`);
                        Notice.showDownNotice(`开始购买`);
                        if (mw.SystemUtil.isPIE) {
                            Notice.showDownNotice(`购买成功`);
                            this.setFlyId(key);
                            // this.setUsingFlyId(key);
                            this.useFly(key);
                        }
                        mw.PurchaseService.placeOrder(value.commodityId, 1, (status, msg) => {
                            mw.PurchaseService.getArkBalance();//刷新代币数量
                        });
                    }
                });
            });
            mw.GameObject.asyncFindGameObjectById(value.worldUIId).then((go: mw.GameObject) => {
                let worldUI: mw.UIWidget = go as mw.UIWidget;
                let levelItem = mw.UIService.create(LevelItem);
                levelItem.updateLevelTextBlock(value.name);
                worldUI.setTargetUIWidget(levelItem.uiWidgetBase);
            });
        });
    }

    public net_deliverGoods(commodityId: string, amount: number): void {
        flyDataMap.forEach((value: { commodityId: string; characterId: string; triggerId: string; worldUIId: string; name: string; skinId: string; wingId: string; jianId: string; animationId: string; }, key: number) => {
            if (value.commodityId == commodityId) {
                Notice.showDownNotice(`购买成功`);
                this.setFlyId(key);
                // this.setUsingFlyId(key);
                this.useFly(key);
            }
        });
    }
}


export class FlyModuleS extends ModuleS<FlyModuleC, FlyData> {
    private playerModuleS: PlayerModuleS = null;
    private get getPlayerModuleS(): PlayerModuleS {
        if (!this.playerModuleS) {
            this.playerModuleS = ModuleService.getModule(PlayerModuleS);
        }
        return this.playerModuleS;
    }
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        this.bindAction();
    }

    private bindAction(): void {
        mw.PurchaseService.onOrderDelivered.add(this.addShipOrder.bind(this));
    }

    private addShipOrder(playerId: number, orderId: string, commodityId: string, amount: number, confirmOrder: (bReceived: boolean) => void): void {
        //根据playerId和commodityId来处理购买逻辑
        this.getClient(playerId).net_deliverGoods(commodityId, amount);
        confirmOrder(true);//调用这个方法表示确认收货成功
    }

    @Decorator.noReply()
    public net_setFlyId(flyId: number): void {
        this.currentData.setFlyId(flyId);
    }

    // @Decorator.noReply()
    // public net_setUsingFlyId(flyId: number): void {
    //     this.currentData.setUsingFlyId(flyId);
    // }

    @Decorator.noReply()
    public net_useFly(key: number): void {
        this.getPlayerModuleS.useFly(this.currentPlayer, key);
    }
}