// import { Utils } from '../../Tools/utils';
// import { Notice } from "../../common/notice/Notice";
// import GlobalData from '../../const/GlobalData';
// import PlayerModuleC from "../PlayerModule/PlayerModuleC";
// import ShopModuleC from "../ShopModule/ShopModuleC";
// import TaskModuleC from "../TaskModule/TaskModuleC";
// import AdsModuleS from "./AdsModuleS";
// import AdTipsPanel from "./ui/AdTipsPanel";

// export default class AdsModuleC extends ModuleC<AdsModuleS, null> {
//     /**商店模块 */
//     private shopModuleC: ShopModuleC = null;
//     private taskModuleC: TaskModuleC = null;
//     private playerModuleC: PlayerModuleC = null;
//     /**广告面板 */
//     private adTipsPanel: AdTipsPanel = null;

//     /** 当脚本被实例后，会在第一帧更新前调用此函数 */
//     protected onStart(): void {
//         this.initData();
//         this.registerActions();
//     }

//     /**初始化数据 */
//     private initData(): void {
//         this.shopModuleC = ModuleService.getModule(ShopModuleC);
//         this.taskModuleC = ModuleService.getModule(TaskModuleC);
//         this.playerModuleC = ModuleService.getModule(PlayerModuleC);
//         this.adTipsPanel = mw.UIService.getUI(AdTipsPanel);
//     }

//     /**注册事件 */
//     private registerActions(): void {
//         this.adTipsPanel.onWatchAdsAction.add(this.playAds.bind(this));
//     }

//     protected onEnterScene(sceneType: number): void {
//         this.defaultAds();
//     }

//     /**播放广告 */
//     private playAds(id: number, adType: number): void {
//         this.getReward(id, adType);
//         Notice.showDownNotice("成功获得奖励");
//     }

//     /**获得奖励 */
//     private getReward(id: number, adType: number): void {
//         switch (adType) {
//             case AdType.WeaponSet:
//                 this.shopModuleC.onSwitchWeaponSet();
//                 Notice.showDownNotice("成功获得英雄套装");
//                 break;
//             case AdType.AddCoin:
//                 this.playerModuleC.saveCoin(1000);
//                 Notice.showDownNotice("成功获得1000金币");
//                 break;
//             case AdType.AddCoinAndExp:
//                 this.playerModuleC.saveCoinAndExp(500, 500);
//                 Notice.showDownNotice("成功获得500金币");
//                 Notice.showDownNotice("成功获得500经验");
//                 break;
//             case AdType.WeaponSet1:
//                 this.shopModuleC.ads(id);
//                 Notice.showDownNotice("成功获得英雄套装");
//                 break;
//             default:
//                 break;
//         }
//         this.taskModuleC.ads();
//     }

//     private defaultAds(): void {
//         TimeUtil.delaySecond(60).then(() => {
//             if (GlobalData.isOpenIAA) {
//                 this.adTipsPanel.showAdTips(30, AdType.WeaponSet1);
//             } else {
//                 this.getReward(30, AdType.WeaponSet1);
//             }
//             TimeUtil.setInterval(() => {
//                 this.adTipsPanel.showAdTips(Utils.getRandomInteger(23, 40), AdType.WeaponSet1);
//             }, 180);
//         });
//     }
// }

// export enum AdType {
//     /**武器套装 */
//     WeaponSet = 1,
//     /**AddCoin */
//     AddCoin = 2,
//     /**AddCoinAndExp */
//     AddCoinAndExp = 3,
//     /**武器套装 */
//     WeaponSet1 = 4,
// }