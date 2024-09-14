import { SpawnManager } from '../../Modified027Editor/ModifiedSpawn';
import { PrefabEvent } from "../../Prefabs/PrefabEvent";
import Console from "../../Tools/Console";
import { Utils } from "../../Tools/utils";
import GlobalData from "../../const/GlobalData";
import { BagModuleS } from '../BagModule/BagModule';
import { LevelModuleS } from '../LevelModule/LevelModule';
import { WorldRankModuleS } from "../RankModule/WorldRankModuleS";
import TaskModuleS from "../TaskModule/TaskModuleS";
import PlayerData from "./PlayerData";
import PlayerModuleC from "./PlayerModuleC";
import PlayerLifebar from "./ui/PlayerLifebar";

export default class PlayerModuleS extends ModuleS<PlayerModuleC, PlayerData> {
    private worldModuleS: WorldRankModuleS = null;
    private get getWorldModuleS(): WorldRankModuleS {
        if (!this.worldModuleS) {
            this.worldModuleS = ModuleService.getModule(WorldRankModuleS);
        }
        return this.worldModuleS;
    }
    private taskModuleS: TaskModuleS = null;
    private get getTaskModuleS(): TaskModuleS {
        if (!this.taskModuleS) {
            this.taskModuleS = ModuleService.getModule(TaskModuleS);
        }
        return this.taskModuleS;
    }

    private bagModuleS: BagModuleS = null;
    private get getBagModuleS(): BagModuleS {
        if (!this.bagModuleS) {
            this.bagModuleS = ModuleService.getModule(BagModuleS);
        }
        return this.bagModuleS;
    }

    private levelModuleS: LevelModuleS = null;
    private get getLevelModuleS(): LevelModuleS {
        if (!this.levelModuleS) {
            this.levelModuleS = ModuleService.getModule(LevelModuleS);
        }
        return this.levelModuleS;
    }

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        this.registerEvents();
    }

    private registerEvents(): void {
        PrefabEvent.PrefabEvtFight.onHit(this.playerAtkPlayer.bind(this));
        PrefabEvent.PrefabEvtFight.onHurt(this.npcAtkPlayer.bind(this));
        Event.addClientListener("RefreshMaxHeight", this.saveHeight.bind(this));
    }

    /**
     * 玩家攻击玩家
     * @param senderGuid 
     * @param targetGuid 
     * @param damage 
     * @param hitPoint 
     */
    private playerAtkPlayer(senderGuid: string, targetGuid: string, damage: number, hitPoint: mw.Vector): void {
        Console.error("PlayerModuleS-playerAtkPlayerAndNPC");
        if (!this.allPlayerMap.has(targetGuid) || !this.allPlayerMap.has(senderGuid)) return;
        let sendPlayer = this.allPlayerMap.get(senderGuid);
        let targetPlayer = this.allPlayerMap.get(targetGuid);
        if (this.playerLifeMap.get(targetPlayer.playerId).isDie || this.playerLifeMap.get(sendPlayer.playerId).isDie) return;
        if (this.playerLifeMap.get(targetPlayer.playerId).playerLifebar.getIsInvincible) {
            Console.error("已开启队友免伤");
            return;
        }
        this.getClient(targetPlayer).net_onPlayerAtkSelf(damage, hitPoint);
        this.updatePlayerData(sendPlayer, targetPlayer, damage, hitPoint)
    }

    /**
     * 玩家攻击NPC
     * @param senderGuid 
     * @param damage 
     * @param hitPoint 
     */
    public playerAtkNPC(senderGuid: string, damage: number, hitPoint: mw.Vector, isDie: boolean, maxHp: number): void {
        if (!this.allPlayerMap.has(senderGuid)) return;
        let sendPlayer = this.allPlayerMap.get(senderGuid);
        this.getClient(sendPlayer).net_onSelfAtkPlayer(damage, hitPoint, isDie, maxHp);
    }

    /**
     * NPC攻击Player
     * @param senderGuid 
     * @param targetGuid 
     * @param damage 
     */
    private npcAtkPlayer(senderGuid: string, targetGuid: string, damage: number): void {
        if (!this.allPlayerMap.has(targetGuid)) return;
        let targetPlayer = this.allPlayerMap.get(targetGuid);
        if (this.playerLifeMap.get(targetPlayer.playerId).isDie) return;
        this.getClient(targetPlayer).net_onPlayerAtkSelf(damage, targetPlayer.character.worldTransform.position);
        this.updatePlayerData(null, targetPlayer, damage, mw.Vector.zero);
    }

    /**
     * 玩家击杀敌人
     * @param senderGuid 
     * @param hp 
     */
    public playerKillEnemy(senderGuid: string, hp: number, monsterId: number): void {
        if (!this.allPlayerMap.has(senderGuid)) return;
        let sendPlayer = this.allPlayerMap.get(senderGuid);
        this.saveKill(sendPlayer, 1);
        this.addExpAndCoin(sendPlayer, hp);
        this.getTaskModuleS.killMonster(sendPlayer, monsterId);
        let names: string[] = [];
        names.push(this.getWorldModuleS.getNameByUserId(sendPlayer.userId));
        names.push(Utils.randomNpcName(monsterId));
        this.getAllClient().net_killTip(sendPlayer.userId, names[0], "-1", names[1]);
    }

    /**
     * 玩家击杀敌人
     * @param senderGuid 
     * @param hp 
     */
    public playerKillEnemy_Level(senderGuid: string, hp: number, monsterId: number, key: number): void {
        if (!this.allPlayerMap.has(senderGuid)) return;
        let sendPlayer = this.allPlayerMap.get(senderGuid);
        this.saveKill(sendPlayer, 1);
        this.addExpAndCoin(sendPlayer, hp);
        // this.getTaskModuleS.killMonster(sendPlayer, monsterId);//TODO
        let names: string[] = [];
        names.push(this.getWorldModuleS.getNameByUserId(sendPlayer.userId));
        names.push(Utils.randomNpcName(monsterId));
        this.getAllClient().net_killTip(sendPlayer.userId, names[0], "-1", names[1]);
        this.getLevelModuleS.startLevel(sendPlayer, key);
    }

    public playerAtkEnemyFlyText(senderGuid: string, hitPoint: mw.Vector, damage: number): void {
        if (!this.allPlayerMap.has(senderGuid)) return;
        let sendPlayer = this.allPlayerMap.get(senderGuid);
        this.getClient(sendPlayer).net_flyText(damage, hitPoint);
    }

    /**
     * 
     * @param player 
     * @param hp 
     */
    private addExpAndCoin(player: mw.Player, hp: number): void {
        let expOrCoin = Math.round((hp / (Utils.getRandomInteger(1, 2) == 1 ? 2 : 4)));
        let playerData = DataCenterS.getData(player, PlayerData);
        let preLv = playerData.playerLv;
        playerData.saveExpAndCoin(expOrCoin);
        let isAddLv: boolean = false;
        if (preLv != playerData.playerLv) {
            isAddLv = true;
            let playerId = player.playerId;
            if (this.playerLifeMap.has(playerId)) {
                let playerLifebar = this.playerLifeMap.get(player.playerId).playerLifebar;
                let maxHp = Math.round(playerData.getHp() * this.getBagModuleS.getAddHpByUsing(player));
                playerLifebar.maxHp = maxHp;
                playerLifebar.hp = maxHp;
                playerLifebar.playerLevel = playerData.playerLv;
            }
            this.saveLv(player, playerData.playerLv - preLv, playerData.playerLv);
            this.playEffectAndSoundToPlayer(player);
        }
        this.getClient(player).net_updateLvExpAndCoin(isAddLv, expOrCoin);
    }

    private allPlayerMap: Map<string, mw.Player> = new Map<string, mw.Player>();

    protected onPlayerEnterGame(player: mw.Player): void {
        this.initPlayerData(player);
    }

    protected onPlayerLeft(player: mw.Player): void {
        this.deletePlayerData(player);
    }

    /**存储所有玩家的生命数据 */
    private playerLifeMap: Map<number, PlayerDataS> = new Map<number, PlayerDataS>();
    public setPlayerLifeNickName(playerId: number, nickName: string, level: number): void {
        TimeUtil.delaySecond(5).then(() => {
            if (!this.playerLifeMap.has(playerId)) return;
            let lifebar = this.playerLifeMap.get(playerId).playerLifebar;
            lifebar.playerName = nickName;
            lifebar.playerLevel = level;
        });
    }

    /**设置玩家等级 */
    public setPlayerLevel(playerId: number, level: number): void {
        if (!this.playerLifeMap.has(playerId)) return;
        this.playerLifeMap.get(playerId).playerLifebar.playerLevel = level;
    }

    private updatePlayerData(sendPlayer: mw.Player, targetPlayer: mw.Player, damage: number, hitPoint: mw.Vector): void {
        let playerId = targetPlayer.playerId;
        let targetPlayerData = this.playerLifeMap.get(playerId);
        if (targetPlayerData.isDie) return;
        // if (sendPlayer != null && targetPlayerData.playerLifebar.getIsInvincible) {
        //     Console.error("已开启队友免伤");
        //     return;
        // }
        let curHp = targetPlayerData.playerLifebar.hp;
        curHp -= damage;
        if (curHp <= 0) {
            let maxHp = Math.round(DataCenterS.getData(targetPlayer, PlayerData).getHp() * this.getBagModuleS.getAddHpByUsing(targetPlayer));
            targetPlayerData.playerLifebar.hp = 0;
            targetPlayerData.isDie = true;
            if (sendPlayer) {
                this.saveKill(sendPlayer, 1);
                this.addExpAndCoin(sendPlayer, maxHp);
                this.getTaskModuleS.killPlayer(sendPlayer);
                let names: string[] = [];
                names = this.getWorldModuleS.getNamesByUserId(sendPlayer.userId, targetPlayer.userId);
                this.getAllClient().net_killTip(sendPlayer.userId, names[0], targetPlayer.userId, names[1]);
            }
            targetPlayer.character.ragdollEnabled = true;
            this.spawnTombstoneS(targetPlayer);
            TimeUtil.delaySecond(3).then(() => {
                targetPlayer.character.ragdollEnabled = false;
                targetPlayerData.playerLifebar.hp = maxHp;
                targetPlayerData.isDie = false;
                this.getClient(targetPlayer).net_updateHp(maxHp);
                targetPlayer.character.worldTransform.position = Utils.getWorldLocation();
            });
        } else {
            targetPlayerData.playerLifebar.hp = curHp;
        }

        if (sendPlayer) {
            let maxHp = 0;
            if (targetPlayerData.isDie) {
                maxHp = Math.round(DataCenterS.getData(targetPlayer, PlayerData).getHp() * this.getBagModuleS.getAddHpByUsing(targetPlayer));
            }
            this.getClient(sendPlayer).net_onSelfAtkPlayer(damage, hitPoint, targetPlayerData.isDie, maxHp);
        }
        this.getClient(targetPlayer).net_updateHp(curHp);
    }

    /**生成墓碑（服务端） */
    private spawnTombstoneS(player: mw.Player): void {
        let tombstone: mw.GameObject = null;
        tombstone = SpawnManager.wornSpawn(GlobalData.tombstoneGuid);
        let pos = player.character.worldTransform.position;
        tombstone.worldTransform.position = (new mw.Vector(pos.x, pos.y, pos.z - 110));
        setTimeout(() => {
            tombstone.destroy();
        }, 3 * 1000);
    }

    /**设置玩家生命数据 */
    private async initPlayerData(player: mw.Player): Promise<void> {
        let playerId = player.playerId;
        let playerDataS = new PlayerDataS();
        // let hpbar = await mw.Script.spawnScript(PlayerLifebar, true, player.character);
        let hpbar = player.character.addComponent(PlayerLifebar, true);
        let maxHp = Math.round(DataCenterS.getData(player, PlayerData).getHp() * this.getBagModuleS.getAddHpByUsing(player));
        hpbar.maxHp = maxHp;
        hpbar.hp = maxHp;
        playerDataS.playerLifebar = hpbar;
        playerDataS.isDie = false;
        playerDataS.playerLifebar.isInvincible = false;
        this.playerLifeMap.set(playerId, playerDataS);
        this.allPlayerMap.set(player.character.gameObjectId, player);
    }

    /**删除玩家生命数据 */
    private deletePlayerData(player: mw.Player): void {
        let playerId = player.playerId;
        if (this.playerLifeMap.has(playerId)) {
            this.playerLifeMap.get(playerId).playerLifebar.isInvincible = false;
            this.playerLifeMap.get(playerId).playerLifebar.destroy();
            this.playerLifeMap.delete(playerId);
        }
        if (this.allPlayerMap.has(player.character.gameObjectId)) {
            this.allPlayerMap.delete(player.character.gameObjectId);
        }
    }

    public saveLv(player: mw.Player, value: number, value1): void {
        this.getWorldModuleS.refreshLv_S(player.userId, value);
        this.setPlayerLevel(player.playerId, value1);
    }

    public saveHeight(player: mw.Player, value: number): void {
        DataCenterS.getData(player, PlayerData).refashHeight(value);
        this.getWorldModuleS.refreshHeight_S(player.userId, value);
    }

    public saveKill(player: mw.Player, value: number): void {
        DataCenterS.getData(player, PlayerData).refashKill(value);
        this.getWorldModuleS.refreshKill_S(player.userId, value);
    }

    // @Decorator.noReply()
    // public net_saveLv(value: number): void {
    //     this.currentData.refashLv(value);
    //     this.worldModuleS.refreshLv_S(this.currentPlayer.userId, value);
    // }

    // @Decorator.noReply()
    // public net_saveHeight(value: number): void {
    //     this.currentData.refashHeight(value);
    //     this.worldModuleS.refreshHeight_S(this.currentPlayer.userId, value);
    // }

    // @Decorator.noReply()
    // public net_saveKill(value: number): void {
    //     this.currentData.refashKill(value);
    //     this.worldModuleS.refreshKill_S(this.currentPlayer.userId, value);
    // }

    @Decorator.noReply()
    public net_saveCoin(value: number): void {
        this.currentData.saveCoin(value);
    }

    @Decorator.noReply()
    public net_saveDiamond(value: number): void {
        this.currentData.saveDiamond(value);
    }

    /**
     * 更新金币
     * @param player 
     * @param value 
     */
    public updateCoin(player: mw.Player, value: number): void {
        this.getClient(player).net_updateCoin(value);
        DataCenterS.getData(player, PlayerData).saveCoin(value);
    }

    @Decorator.noReply()
    public net_saveCoinAndExp(coin: number, exp: number): void {
        let player = this.currentPlayer;
        let preLv = this.currentData.playerLv;
        this.currentData.saveCoinAndExp(coin, exp);
        let isAddLv: boolean = false;
        if (preLv != this.currentData.playerLv) {
            isAddLv = true;
            let playerId = player.playerId;
            if (this.playerLifeMap.has(playerId)) {
                let playerLifebar = this.playerLifeMap.get(player.playerId).playerLifebar;
                let maxHp = Math.round(this.currentData.getHp() * this.getBagModuleS.getAddHpByUsing(player));
                playerLifebar.maxHp = maxHp;
                playerLifebar.hp = maxHp;
                playerLifebar.playerLevel = this.currentData.playerLv;
            }
            this.saveLv(player, this.currentData.playerLv - preLv, this.currentData.playerLv);
            this.playEffectAndSoundToPlayer(player);
        }
        this.getClient(player).net_updateLvExpAndCoin(isAddLv);
    }

    @Decorator.noReply()
    public net_isInvincible(isInvincible: boolean): void {
        if (this.playerLifeMap.has(this.currentPlayerId)) {
            this.playerLifeMap.get(this.currentPlayerId).playerLifebar.isInvincible = isInvincible;
        }
    }

    public updateHpByUsing(player: mw.Player, addHp: number): void {
        let playerData = DataCenterS.getData(player, PlayerData);
        let maxHp = Math.round(playerData.getHp() * addHp);
        if (this.playerLifeMap.has(player.playerId)) {
            this.playerLifeMap.get(player.playerId).playerLifebar.maxHp = maxHp;
        }
    }

    public playEffectAndSoundToPlayer(player: mw.Player): void {
        SoundService.play3DSound("169179", player.character, 1, 10, { radius: 500, falloffDistance: 1200 });
        EffectService.playOnGameObject("142750", player.character, { slotType: mw.HumanoidSlotType.Root, loopCount: 1 });
    }
}

class PlayerDataS {
    public playerLifebar: PlayerLifebar = null;
    public isDie: boolean = false;
}