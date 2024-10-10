import { Notice } from "./common/notice/Notice";
import { GameConfig } from "./config/GameConfig";
import AdTipsPanel from "./module/AdsModule/ui/AdTipsPanel";
import { BagModuleC } from "./module/BagModule/BagModule";
import { Utils } from "./Tools/utils";

@Component
export default class NewScript extends Script {
    @mw.Property({ displayName: "bagId", group: "脚本设置" })
    private bagId: number = 0;

    @mw.Property({ displayName: "skinId", group: "脚本设置" })
    private skinId: string = "";

    @mw.Property({ displayName: "adsCount", group: "脚本设置" })
    private adsCount: number = 10;

    private adTipsPanel: AdTipsPanel = null;
    private get getAdTipsPanel(): AdTipsPanel {
        if (!this.adTipsPanel) {
            this.adTipsPanel = mw.UIService.create(AdTipsPanel);
        }
        return this.adTipsPanel
    }

    private bagModuleC: BagModuleC = null;
    private get getBagModuleC(): BagModuleC {
        if (!this.bagModuleC) {
            this.bagModuleC = ModuleService.getModule(BagModuleC);
        }
        return this.bagModuleC;
    }


    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        if (mw.SystemUtil.isClient()) {
            if (this.bagId <= 0) return;
            let skinId = (this.skinId && this.skinId.length > 0) ? this.skinId : GameConfig.BagInfo.getElement(this.bagId).AssetId;
            this.curAdsCount = 0;
            Utils.asyncDownloadAsset(skinId).then(() => {
                (this.gameObject.parent as mw.Character).setDescription([skinId]);
            });
            let trigger = this.gameObject as mw.Trigger;
            trigger.onEnter.add((char: mw.Character) => {
                if (char.gameObjectId != Player.localPlayer.character.gameObjectId) return;
                if (this.getBagModuleC.isHasBagId(this.bagId)) {
                    Notice.showDownNotice(`已获得，打开背包使用`);
                    return;
                }
                this.nextAds();
            });
        }
    }

    private curAdsCount: number = 0;
    private nextAds(): void {
        this.getAdTipsPanel.showRewardAd(() => {
            this.curAdsCount++;
            if (this.curAdsCount >= this.adsCount) {
                this.getBagModuleC.onCompleted(this.bagId);
            } else {
                TimeUtil.delaySecond(2).then(() => {
                    this.nextAds();
                });
            }
        }, `观看${this.adsCount - this.curAdsCount}次广告\n免费获得`, `取消`, `领取`);
    }

    /**
     * 周期函数 每帧执行
     * 此函数执行需要将this.useUpdate赋值为true
     * @param dt 当前帧与上一帧的延迟 / 秒
     */
    protected onUpdate(dt: number): void {

    }

    /** 脚本被销毁时最后一帧执行完调用此函数 */
    protected onDestroy(): void {

    }
}