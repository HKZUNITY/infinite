import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["Id","Name","Value","Value_Ch","Value_Cht","Value_J","Value_K"],["","Key|ReadByName","MainLanguage","ChildLanguage","ChildLanguage","ChildLanguage","ChildLanguage"],[1,"Text_AfterStrengthening","After\nStrengthening","强化后","强化後","強化されます","강화된 후"],[2,"Text_StarRating","{0} Star Rating","{0}星级","{0}星級","{0}つ星","{0}성급"],[3,"Text_NeedToReachLevel","Need To Reach Level {0}","需要等级达到{0}级","需要等級達到{0}級","要求レベルが{0}レベルに達する","레벨 {0} 레벨 달성 필요"],[4,"Text_IncreaseBloodVolumeByTimes","Blood Volume Increase\n{0} Times","血量提升{0}倍","血量提升{0}倍","血液量が{0}倍に上昇","혈액량 {0}배 증가"],[5,"Text_AttackPowerIncreasedByTimes","Attack Power Enhancement\n{0} Times","攻击力提升{0}倍","攻擊力提升{0}倍","攻撃力{0}倍アップ","공격력 {0}배 증가"],[6,"Text_StrengthenSoulBones","Strengthen Soul Bones","强化魂骨","强化魂骨","魂の骨を強化する","혼골 강화"],[7,"Text_NeedToConsume","Need To Consume","需要消耗","需要消耗","消費する必要がある","필요 소비"],[8,"Text_Diamonds","Diamonds","钻石","鑽石","ダイヤモンド","다이아몬드"],[9,"Text_GoldCoins","Gold Coins","金币","金幣","金貨","금화"],[10,"Text_StrengtheningConditions","Strengthening Conditions","强化条件","强化條件","強化条件","조건을 강화하다"],[11,"Text_EnhanceTheProbabilityOfSuccess","Strengthening Success\nProbability: {0}%","强化成功\n概率：{0}%","强化成功\n概率：{0}%","強化に成功\n確率：{0}%","강화 성공\n확률: {0}%"],[12,"Text_IncreaseProbability","Increase\nProbability","提升概率","提升概率","かくりつを上げる","확률 증가"],[13,"Text_StartStrengthening","Start\nStrengthening","开始强化","開始强化","強化を開始","강화 시작"],[14,"Text_TeamCoin","Team Coin","派队币","派隊幣","派隊貨幣","파티 머니"],[15,"Text_Buy","Buy","购买","購買","購入する","구매"],[16,"Text_Or","Or","或","或","または","또는"],[17,"Text_UpProbabiliotyConetntTextBlock_0","Consume {0} Diamonds\nEnhancement Probability\nIncreased To {1}%","消耗{0}钻石\n强化概率提升到{1}%","消耗{0}鑽石\n强化概率提升到{1}%","{0}ダイヤモンド消費\n強化確率が{1}%に向上","{0} 다이아 소모\n강화 확률을 {1}%까지 증가"],[18,"Text_UpProbabiliotyConetntTextBlock_1","Consume {0} Team Coins\nEnhance The Probability\nTo {1}%","消耗{0}派队币\n强化概率提升到{1}%","消耗{0}派隊幣\n强化概率提升到{1}%","{0}パーティー貨幣を消費する\n強化確率が{1}%にアップ","{0} 파티 코인 소모\n강화 확률을 {1}%까지 증가"],[19,"Text_UsingDiamonds","Using Diamonds","使用钻石","使用鑽石","ダイヤモンドを使う","다이아몬드 사용"],[20,"Text_UseTeamCoins","Use Team Coins","使用派队币","使用派隊幣","ディスパッチ通貨の使用","파티 코인 사용"],[21,"Text_DiamondShortage","Diamond Shortage","钻石不足","鑽石不足","ダイヤ不足","다이아 부족"],[22,"Text_InsufficientGoldCoins","Insufficient Gold Coins","金币不足","金幣不足","金貨不足","금화 부족"],[23,"Text_SuccessfullyObtainedDiamonds","Successfully Obtained Diamonds+{0}","成功获得钻石+{0}","成功獲得鑽石+{0}","ダイヤモンド+{0}の獲得に成功","다이아 +{0} 획득 성공"],[24,"Text_GetDiamondsForFree","Get {0} Diamonds For Free","免费领取{0}颗钻石","免費領取{0}顆鑽石","{0}個のダイヤモンドを無料で受け取ります","{0}개 다이아 무료 수령"],[25,"Text_Cancel","Cancel","取消","取消","キャンセル","취소"],[26,"Text_FreeToReceive","Free To Receive","免费领取","免費領取","無料で受け取る","무료 수령"],[27,"Text_FullLevel","Full Level","已满级","已滿級","フルレベル","만급"],[28,"Text_HeadSoulBone","Head Soul Bone","头部魂骨","頭部魂骨","頭部魂骨","머리의 혼골"],[29,"Text_ExternalSoulBone","External Soul Bone","外附魂骨","外附魂骨","外付魂骨","외부혼골"],[30,"Text_TorsoSoulBone","Torso Soul Bone","躯干魂骨","軀幹魂骨","体幹魂骨","몸통 혼골"],[31,"Text_WaistSoulBone","Waist Soul Bone","腰部魂骨","腰部魂骨","腰部魂骨","허리의 혼골"],[32,"Text_ArmSoulBone","Arm Soul Bone","手臂魂骨","手臂魂骨","腕の魂骨","팔의 혼골"],[33,"Text_LegSoulBone","Leg Soul Bone","腿部魂骨","腿部魂骨","足の魂骨","다리 혼골"],[34,"Text_FootSoulBone","Foot Soul Bone","脚部魂骨","脚部魂骨","足魂骨","발의 혼골"],[35,"Text_GoTo","Go To","前往",null,null,null],[36,"Text_GodLevelHuntingGround","God Level Hunting Ground","神级狩猎场",null,null,null],[37,"Text_NoviceVillage","Novice Village","新手村",null,null,null],[38,"Text_IntermediateHuntingGround","Intermediate Hunting Ground","中级狩猎场",null,null,null],[39,"Text_AdvancedHuntingGround","Advanced Hunting Ground","高级狩猎场",null,null,null],[40,"Text_HuntAndKill","Hunt And Kill","猎杀",null,null,null],[41,"Text_100000YearSoulBeast","100000 Year Soul Beast","10万年魂兽",null,null,null],[42,"Text_LoadingMapResourcesPleaseBePatient","Loading Map Resources, Please Be Patient","正在加载地图资源，请耐心等待",null,null,null],[43,"Text_AdvertisingRewards","Advertising Rewards","广告奖励",null,null,null],[44,"Text_WatchTheAdvertisementTimesGetItForFree","Watch The Advertisement {0} Times\nGet It For Free","观看{0}次广告\n免费获得",null,null,null],[45,"Text_TakeYouToGetItForFree","Take You To Get It For Free","带你去免费获得",null,null,null],[46,"Text_GetItForFree","Get It For Free","免费获得",null,null,null],[47,"Text_GetGoldCoinsForFree","Get {0} Gold Coins For Free","免费领取{0}金币",null,null,null],[48,"Text_SuccessfullyObtainedCoins","Successfully Obtained Coins","成功获得金币",null,null,null],[49,"Text_GetFreeDiamonds","Get {0} Free Diamonds","免费领取{0}颗钻石",null,null,null],[50,"Text_FreeLevelUpgradeByLevel","Free Level Upgrade By {0} Level","等级免费提升{0}级",null,null,null],[51,"Text_FreeUpgrade","Free Upgrade","免费提升",null,null,null],[52,"Text_FreeDayReward","Free {0}st Day Reward","免费领取第{0}天奖励",null,null,null],[53,"Text_FailedPleaseTryAgain","{0} Failed, Please Try Again","{0}失败，请重试",null,null,null],[54,"Text_DontClickTooFastItWillGetStuck","Don't Click Too Fast, It Will Get Stuck","别点太快、会卡哦",null,null,null],[55,"Text_DirectlyUpgradeTheLevel","Directly Upgrade The Level","直接提升等级",null,null,null],[56,"Text_Determine","Determine","确定",null,null,null],[57,"Text_UpgradeLevel","Upgrade Level","升级等级",null,null,null],[58,"Text_UseDiamondsUpgradeLevel","Use {0} Diamonds\nUpgrade Level","使用5个钻石\n提升等级",null,null,null],[59,"Text_PleaseEnterTheRedemptionCode","Please Enter The Redemption Code","请输入兑换码",null,null,null],[60,"Text_Exchange","Exchange","兑换",null,null,null],[61,"Text_PleaseEnterTheRedemptionCodeProvidedByTheAuthorCanBeRedeemedForRewards","Please Enter The Redemption Code Provided By The Author\nCan Be Redeemed For Rewards","请输入作者提供的兑换码\n即可兑换奖励",null,null,null],[62,"Text_GiftPackExchange","Gift Pack Exchange","礼包兑换",null,null,null],[63,"Text_AlreadyredeemedNoNeedToRedeemAgain","Already Redeemed, No Need To Redeem Again","已兑换，无需重复兑换",null,null,null],[64,"Text_CollectionFailed","Collection Failed","领取失败",null,null,null],[65,"Text_GiftPackRedemptionCodeError","Gift Pack Redemption Code Error","礼包兑换码错误",null,null,null],[66,"Text_Grade","Grade","等级",null,null,null],[67,"Text_ExchangeSuccessful","Exchange Successful","兑换成功",null,null,null],[68,"Text_CoolForSeconds","Cool For {0} Seconds","冷却{0}秒",null,null,null],[69,"Text_SoldouttodayPleaseReplaceWithOtherProductsToPurchase","Sold Out Today, Please Replace With Other Products To Purchase","今日已售空,请更换其他商品购买",null,null,null],[70,"Text_Rechargediamonds","Recharge Diamonds","充值钻石",null,null,null],[71,"Text_Nopurchaserestrictions","No purchase Restrictions","不限购",null,null,null],[72,"Text_Soldouttoday","Sold Out Today","今日已售空",null,null,null],[73,"Text_Limitedtoonepurchaseperday","Limited To One Purchase Per Day","每天限购一次",null,null,null],[74,"Text_BagTabTextBlock","Martial Soul|Soul Master|Soul Bone|Soul Beast","武魂|魂师|魂骨|魂兽",null,null,null],[75,"Text_AutomaticAttackFist_Male","Automatic Attack Fist (Male)","自动攻击拳(男)",null,null,null],[76,"Text_AutomaticAttackFist_Female","Automatic Attack Fist (Female)","自动攻击拳(女)",null,null,null],[77,"Text_MechSlashWindSlash_Male","Mech Slash Wind Slash (Male)","机甲斩狂风斩(男)",null,null,null],[78,"Text_MechSlashWindSlash_Female","Mech Slash Wind Slash (Female)","机甲斩狂风斩(女)",null,null,null],[79,"Text_GoldenHoopRod_Powder","Golden Hoop Rod (Powder)","金箍棒(粉)",null,null,null],[80,"Text_GoldenHoopRod_Purple","Golden Hoop Rod (Purple)","金箍棒(紫)",null,null,null],[81,"Text_HaotianHammer","Haotian Hammer","昊天锤",null,null,null],[82,"Text_TridentOfTheSeaGod","Trident Of The Sea God","海神三叉戟",null,null,null],[83,"Text_CyberComesWithALongSpear","Cyber Comes With A Long Spear","赛博自来也长枪",null,null,null],[84,"Text_SeaKingDoubleHeadedKnife","Sea King Double Headed Knife","海王双头刀",null,null,null],[85,"Text_CaptainAmericaSHammer","Captain America'S Hammer","美国队长神锤",null,null,null],[86,"Text_VenomAxe","Venom Axe","毒液斧头",null,null,null],[87,"Text_MiebaAxe","Mieba Axe","灭霸斧",null,null,null],[88,"Text_NarutoWieldingASword","Naruto Wielding A Sword","鸣人手里剑",null,null,null],[89,"Text_FutureWarriorGoldenSword","Future Warrior Golden Sword","未来战士黄金剑",null,null,null],[90,"Text_ForestSentinelMagicBattle","Forest Sentinel Magic Battle","森林哨兵魔法仗",null,null,null],[91,"Text_Pistol_SonicSpecific","Pistol (Sonic Specific)","手枪\n索尼克专用",null,null,null],[92,"Text_SignalGun_SpecificallyForPinkHairMonster","Signal Gun\nSpecifically For Pink Hair Monster","信号枪\n粉毛怪专用",null,null,null],[93,"Text_Knife_ForTsunade","Knife (For Tsunade)","刀(纲手专用)",null,null,null],[94,"Text_Knife_ExclusiveToLilock","Knife (Exclusive To Lilock)","刀(李洛克专用)",null,null,null],[95,"Text_Sickle_ForDriedPersimmonGhostShark","Sickle\nFor Dried Persimmon Ghost Shark","镰刀\n干柿鬼鲛专用",null,null,null],[96,"Text_Sickle_ExclusivelyForCyberGirls","Sickle\nExclusively For Cyber Girls","镰刀\n赛博女孩专用",null,null,null],[97,"Text_IceSword_ExclusivelyForBlackWidow","Ice Sword\nExclusively For Black Widow","冰封剑\n黑寡妇专用",null,null,null],[98,"Text_MonsterClawKnife","Monster Claw Knife","怪物爪刀",null,null,null],[99,"Text_Machete_KakashiSpecific","Machete (Kakashi Specific)","大砍刀\n卡卡西专用",null,null,null],[100,"Text_TheStaff_ExclusivelyForUchihaItachi","The Staff\nExclusively For Uchiha Itachi","法杖\n宇智波鼬专用",null,null,null],[101,"Text_WaterGun","Water Gun","水枪",null,null,null],[102,"Text_IceDiamondSword","Ice Diamond Sword","冰钻剑",null,null,null],[103,"Text_ButcherSKnife","Butcher 'S Knife","屠刀",null,null,null],[104,"Text_BlueStaff_LokiSpecific","Blue Staff (Loki Specific)","蓝色法杖\n洛基专用",null,null,null],[105,"Text_Sickle_SunGodExclusive","Sickle (Sun God Exclusive)","镰刀\n太阳神专用",null,null,null],[106,"Text_DemonSword_ExclusivelyForUchihaMadara","Demon Sword\nExclusively For Uchiha Madara","恶魔剑\n宇智波斑爷专用",null,null,null],[107,"Text_Sword_SpecificallyDesignedForNanorobots","Sword\nSpecifically Designed For Nanorobots","剑(纳米机器人专用)",null,null,null],[108,"Text_Sickle_DeadpoolSpecific","Sickle (Deadpool Specific)","镰刀(死侍专用)",null,null,null],[109,"Text_FluorescentSword_ForVolcanoSentinelsOnly","Fluorescent Sword\nFor Volcano Sentinels Only","荧光剑\n火山哨兵专用",null,null,null],[110,"Text_FanaticalSword_ExclusiveToCrimsonWitch","Fanatical Sword\nExclusive To Crimson Witch","狂热剑\n绯红女巫专用",null,null,null],[111,"Text_InflatableHammer","Inflatable Hammer","充气锤子",null,null,null],[112,"Text_WoodenStaff_VenomSpiderManSpecific","Wooden Staff\nVenom Spider Man Specific","木法杖\n毒液蜘蛛侠专用",null,null,null],[113,"Text_GuaziShield","Guazi Shield","瓜子盾",null,null,null],[114,"Text_Shield_HulkExclusive","Shield (Hulk Exclusive)","盾(浩克专用)",null,null,null],[115,"Text_UltimateIceRingSword","Ultimate Ice Ring Sword","终极冰环剑",null,null,null],[116,"Text_BulletSprayGun_ForHinata","Bullet Spray Gun (For Hinata)","散弹喷枪\n雏田专用",null,null,null],[117,"Text_Firearms_LuffySpecific","Firearms (Luffy Specific)","火枪(路飞专用)",null,null,null],[118,"Text_PurpleLightSword_SpecialForSasuke","Purple Light Sword\nSpecial For Sasuke","紫光剑\n佐助专用",null,null,null],[119,"Text_LaserGun_TenjinSpecific","Laser Gun (Tenjin Specific)","激光枪(天神专用)",null,null,null],[120,"Text_Sword_ExclusivelyForWolverine","Sword\nExclusively For Wolverine","剑(金刚狼专用)",null,null,null],[121,"Text_LaserGun_IronManSpecific","Laser Gun (Iron Man Specific)","激光枪(钢铁侠专用)",null,null,null],[122,"Text_CoupleMechSet_Female","Couple Mech Set (Female)","情侣机甲套装(女)",null,null,null],[123,"Text_CoupleMechSet_Male","Couple Mech Set (Male)","情侣机甲套装(男)",null,null,null],[124,"Text_XiaoWuJie","Xiao Wu Jie","小舞姐",null,null,null],[125,"Text_BlueSilverEmperor","Blue Silver Emperor","蓝银皇",null,null,null],[126,"Text_UniformGirl","Uniform Girl","制服女孩",null,null,null],[127,"Text_TangSan","Tang San","唐三",null,null,null],[128,"Text_TheGoldenPrince","The Golden Prince","黄金王子",null,null,null],[129,"Text_JkGirl","Jk Girl","JK女孩",null,null,null],[130,"Text_XiaolanLong","Xiaolan Long","小蓝龙",null,null,null],[131,"Text_LittleGreenDragon","Little Green Dragon","小绿龙",null,null,null],[132,"Text_LittleBlackDragon","Little Black Dragon","小黑龙",null,null,null],[133,"Text_LittleOrangeDragon","Little Orange Dragon","小橘龙",null,null,null],[134,"Text_GodLevelDemonKing","God Level Demon King","神级魔王",null,null,null],[135,"Text_TheFourthHokage","The Fourth Hokage","四代火影",null,null,null],[136,"Text_MedusaQueen","Medusa Queen","美杜莎女王",null,null,null],[137,"Text_FoxEaredGirl","Fox Eared Girl","狐耳少女",null,null,null],[138,"Text_EvilMessenger","Evil Messenger","邪恶使者",null,null,null],[139,"Text_LongCoatForWomen","Long Coat For Women","长款大衣女",null,null,null],[140,"Text_Spongebob","Spongebob","海绵宝宝",null,null,null],[141,"Text_IronMan","Iron Man","钢铁侠",null,null,null],[142,"Text_Thanos","Thanos","灭霸",null,null,null],[143,"Text_HedgehogBoy","Hedgehog Boy","刺猬小子",null,null,null],[144,"Text_EvilMessenger1","Evil Messenger","邪恶使者",null,null,null],[145,"Text_BlueClothedMan","Blue Clothed Man","蓝衣男",null,null,null],[146,"Text_BlackClothedMan","Black Clothed Man","黑衣男",null,null,null],[147,"Text_Doom","Doom","毁灭战士",null,null,null],[148,"Text_ThunderGod","Thunder God","雷神",null,null,null],[149,"Text_BlackWidow","Black Widow","黑寡妇",null,null,null],[150,"Text_CuteGirl","Cute Girl","可爱女",null,null,null],[151,"Text_MarukoHeadGirl","Maruko Head Girl","丸子头女",null,null,null],[152,"Text_WesternGoddess","Western Goddess","西方神女",null,null,null],[153,"Text_BlackDressGirl","Black Dress Girl","黑裙少女",null,null,null],[154,"Text_ShortHairedWoman","Short Haired Woman","短发女",null,null,null],[155,"Text_QipaoWomen","Qipao Women","旗袍女",null,null,null],[156,"Text_ClothedMan","Clothed Man","披风男",null,null,null],[157,"Text_LongHairedWoman","Long Haired Woman","长发女",null,null,null],[158,"Text_DoublePonytailGirl1","Double Ponytail Girl","双马尾女",null,null,null],[159,"Text_WomenWithLongHairAndShortSkirts","Women With Long Hair\nShort Skirts","长发短裙女",null,null,null],[160,"Text_DoublePonytailGirl2","Double Ponytail Girl","双马尾女",null,null,null],[161,"Text_DoublePonytailGirl3","Double Ponytail Girl","双马尾女",null,null,null],[162,"Text_PleatedSkirtGirl","Pleated Skirt Girl","百褶裙女孩",null,null,null],[163,"Text_ShortHairedFashionableWomen","Short Haired\nFashionable Women","短发时尚女",null,null,null],[164,"Text_LongPonytailGirl","Long Ponytail Girl","长马尾女孩",null,null,null],[165,"Text_LongEaredGirl","Long Eared Girl","长耳女",null,null,null],[166,"Text_LongHairedWomanInWindbreaker","Long Haired\nWoman In Windbreaker","风衣长发女",null,null,null],[167,"Text_DevilHornGirl","Devil Horn Girl","恶魔角女",null,null,null],[168,"Text_KimonoGirl","Kimono Girl","和服女",null,null,null],[169,"Text_HairpinGirl","Hairpin Girl","发卡女",null,null,null],[170,"Text_MaidSuitForWomen","Maid Suit For Women","女仆套装女",null,null,null],[171,"Text_HatGirl","Hat Girl","帽子女",null,null,null],[172,"Text_MagicalGirl","Magical Girl","魔法女孩",null,null,null],[173,"Text_LongSkirtWomen","Long Skirt Women","长裙女",null,null,null],[174,"Text_KillerWoman","Killer Woman","杀手女",null,null,null],[175,"Text_WitchDoctor","Witch Doctor","巫医",null,null,null],[176,"Text_LongLeggedMom","Long Legged Mom","长腿妈妈",null,null,null],[177,"Text_XuanKui","Xuan Kui","玄魁",null,null,null],[178,"Text_EvilWitch","Evil Witch","邪恶女巫",null,null,null],[179,"Text_LittleUglyGirl","Little Ugly Girl","小丑女",null,null,null],[180,"Text_HalloweenGirl","Halloween Girl","万圣节女",null,null,null],[181,"Text_Butcher","Butcher","屠夫",null,null,null],[182,"Text_DeanOfMolewoodCollege","Dean Of Molewood College","魔莱坞学院院长",null,null,null],[183,"Text_MistyGhostShadow","Misty Ghost Shadow","迷雾鬼影",null,null,null],[184,"Text_BlueHairedMonster","Blue Haired Monster","蓝毛怪",null,null,null],[185,"Text_DogHeadedCaterpillar","Dog Headed Caterpillar","狗头毛毛虫",null,null,null],[186,"Text_PinkHairedMonster","Pink Haired Monster","粉毛怪",null,null,null],[187,"Text_SonicAdvance","Sonic Advance","索尼克",null,null,null],[188,"Text_RainbowFriends","Rainbow Friends","Rainbow friends",null,null,null],[189,"Text_SeaGod","Sea God","海神",null,null,null],[190,"Text_DevilSWings","Devil'S Wings","恶魔翅膀",null,null,null],[191,"Text_DevilSCorner","Devil'S Corner","恶魔角",null,null,null],[192,"Text_DevilSTail","Devil'S Tail","恶魔尾巴",null,null,null],[193,"Text_DemonSkull","Demon Skull","恶魔头骨",null,null,null],[194,"Text_DevilSThreeHeadedDog","Devil'S Three Headed Dog","恶魔三头犬",null,null,null],[195,"Text_AngelWings","Angel Wings","天使翅膀",null,null,null],[196,"Text_AngelSpider","Angel Spider","天使蜘蛛",null,null,null],[197,"Text_FoxSTail","Fox'S Tail","狐狸尾巴",null,null,null],[198,"Text_FoxEars","Fox Ears","狐狸耳朵",null,null,null],[199,"Text_WavingScarf","Waving Scarf","挥动的围巾",null,null,null],[200,"Text_LightningWings","Lightning Wings","闪电翅膀",null,null,null],[201,"Text_Glasses","Glasses","眼镜",null,null,null],[202,"Text_PhotographyRobot","Photography Robot","拍照机器人",null,null,null],[203,"Text_Veil","Veil","面纱",null,null,null],[204,"Text_RocketLauncher","Rocket Launcher","火箭发射器",null,null,null],[205,"Text_SniperGunBody","Sniper Gun Body","狙击枪枪身",null,null,null],[206,"Text_CuteWesternDragon","Cute Western Dragon","可爱西方龙",null,null,null],[207,"Text_Loong","Loong","龙",null,null,null],[208,"Text_EmperorDragon","Emperor Dragon","帝王龙",null,null,null],[209,"Text_HellDragon","Hell Dragon","地狱龙",null,null,null],[210,"Text_CandyDragon","Candy Dragon","糖果龙",null,null,null],[211,"Text_WuShilong","Wu Shilong","武士龙",null,null,null],[212,"Text_CrystalWings","Crystal Wings","水晶翅膀",null,null,null],[213,"Text_KillingWings","Killing Wings","杀戮翅膀",null,null,null],[214,"Text_HellSWings","Hell'S Wings","地狱翅膀",null,null,null],[215,"Text_FairyWings","Fairy Wings","精灵翅膀",null,null,null],[216,"Text_FlameWings","Flame Wings","火焰翅膀",null,null,null],[217,"Text_BigSword","Big Sword","大剑",null,null,null],[218,"Text_AngelSword","Angel Sword","天使剑",null,null,null],[219,"Text_Snaker","Snaker","蛇女",null,null,null],[220,"Text_ASpider","A Spider","络新妇",null,null,null],[221,"Text_BigSpider","Big Spider","大蜘蛛",null,null,null],[222,"Text_SmallFaceHuggingPurpleSpider","Small Face Hugging\nPurple Spider","小型抱脸紫蜘蛛",null,null,null],[223,"Text_SmallBlushingSpider","Small Blushing Spider","小型抱脸红蜘蛛",null,null,null],[224,"Text_SmallFaceHuggingGreenSpider","Small Face Hugging\nGreen Spider","小型抱脸绿蜘蛛",null,null,null],[225,"Text_SmallFaceHuggingBlueSpider","Small Face Hugging\nBlue Spider","小型抱脸蓝蜘蛛",null,null,null],[226,"Text_Xiaolong","Xiaolong","小龙",null,null,null],[227,"Text_CartoonWoodenDragon","Cartoon Wooden Dragon","卡通木龙",null,null,null],[228,"Text_RedDragon","Red Dragon","红龙",null,null,null],[229,"Text_Huanglong","Huanglong","黄龙",null,null,null],[230,"Text_BlueDragon","Blue Dragon","蓝龙",null,null,null],[231,"Text_TheGodOfOtter","The God Of Otter","奥特之神",null,null,null],[232,"Text_SuccessfullyActivatedAutomaticAttack","Successfully Activated Automatic Attack","成功开启自动攻击",null,null,null],[233,"Text_FailedToObtainAutomaticAttackSoul","Failed To Obtain Automatic Attack Soul","未获得自动攻击武魂",null,null,null],[234,"Text_SuccessfullyDisabledAutomaticAttack","Successfully Disabled Automatic Attack","成功关闭自动攻击",null,null,null],[235,"Text_Obtained","Obtained","已获得",null,null,null],[236,"Text_CongratulationsOnObtaining","Congratulations On Obtaining","恭喜获得",null,null,null],[237,"Text_SoulPower","Soul Power","魂力",null,null,null],[238,"Text_MartialSoul","Martial Soul","武魂",null,null,null],[239,"Text_SoulMaster","Soul Master","魂师",null,null,null],[240,"Text_SoulBone","Soul Bone","魂骨",null,null,null],[241,"Text_Ayakashi","Ayakashi","魂兽",null,null,null],[242,"Text_Ordinary","Ordinary","普通",null,null,null],[243,"Text_Rare","Rare","稀有",null,null,null],[244,"Text_Epic","Epic","史诗",null,null,null],[245,"Text_Legend","Legend","传说",null,null,null],[246,"Text_KillingGodDomain","Killing God Domain","杀神领域",null,null,null],[247,"Text_DoushenContinent_MySoulRingUnlimitedUpgrade","Doushen Continent (My Soul Ring Unlimited Upgrade)","斗神大陆(我的魂环无限升级)",null,null,null],[248,"Text_InTheEquipment","In The Equipment","装备中",null,null,null],[249,"Text_InUse","In Use","使用中",null,null,null],[250,"Text_FollowIn","Follow In","跟随中",null,null,null],[251,"Text_BeginnerGiftPackAcquisition","Beginner Gift Pack Acquisition","新手礼包获取",null,null,null],[252,"Text_GoldCoinLotteryToObtain","Gold Coin Lottery To Obtain","金币抽奖获取",null,null,null],[253,"Text_PleaseCompleteTheBeginnerGuideFirst","Please Complete The Beginner Guide First","请先完成新手引导",null,null,null],[254,"Text_ObtainByWatchingAdvertisements","Obtain By Watching Advertisements","看广告获得",null,null,null],[255,"Text_OldPlayersReturningToObtain","Old Players Returning To Obtain","老玩家回归获得",null,null,null],[256,"Text_NotObtained","Not Obtained","未获得",null,null,null],[257,"Text_StartGuiding","Start Guiding","开始引导",null,null,null],[258,"Text_PurchaseSuccessful","Purchase Successful","购买成功",null,null,null],[259,"Text_EquipmentSuccessful","Equipment Successful","装备成功",null,null,null],[260,"Text_WearingSuccessfully","Wearing Successfully","穿戴成功",null,null,null],[261,"Text_FollowSuccess","Follow Success","跟随成功",null,null,null],[262,"Text_TheFunctionIsNotYetOpen_PleaseStayTuned","The Function Is Not Yet Open, Please Stay Tuned","功能暂未开放，敬请期待",null,null,null],[263,"Text_RecoveryWasSuccessful","Recovery Was Successful","恢复成功",null,null,null],[264,"Text_RemovedSuccessfully","Removed Successfully","卸下成功",null,null,null],[265,"Text_SuccessfullyDiscardedPet","Successfully Discarded Pet","丢掉宠物成功",null,null,null],[266,"Text_RestoreInitialImage","Restore Initial Image","恢复初始形象",null,null,null],[267,"Text_RemoveAllEquipment","Remove All Equipment","卸下所有装备",null,null,null],[268,"Text_CancelPetFollowing","Cancel Pet Following","取消宠物跟随",null,null,null],[269,"Text_ClickToUse","Click To Use","点击使用",null,null,null],[270,"Text_AlreadyOwned","Already Owned","已拥有",null,null,null],[271,"Text_ClickToGet","Click To Get","点击获得",null,null,null],[272,"Text_NotOwned","Not Owned","未拥有",null,null,null],[273,"Text_Use","Use","使用",null,null,null],[274,"Text_PurchaseCoins","Purchase Coins","金币购买",null,null,null],[275,"Text_Introduce","Introduce","介绍",null,null,null],[276,"Text_IncreasedHealthAndAttackPowerAfterUse","Increased Health And Attack Power After Use","使用后血量和攻击力提升",null,null,null],[277,"Text_Times","Times","倍",null,null,null],[278,"Text_ConsumingDiamondsToPurchase","Consuming {0} Diamonds\nTo Purchase","消耗{0}钻石购买",null,null,null],[279,"Text_ConsumeTeamCoinsToPurchase","Consume {0} Team Coins\nTo Purchase","消耗{0}派队币购买",null,null,null],[280,"Text_YujianFlyingMall","Yujian Flying Mall","御剑飞行商城",null,null,null],[281,"Text_RoyalSwordFlyingBonus","Royal Sword Flying Bonus","御剑飞行总加成",null,null,null],[282,"Text_MitsurugiSmartKiller","Mitsurugi - Smart Killer","御剑_智弑者",null,null,null],[283,"Text_MitsurugiGoldenSword","Mitsurugi - Golden Sword","御剑_黄金剑",null,null,null],[284,"Text_MitsurugiIceDiamondSword","Mitsurugi - Ice Diamond Sword","御剑_冰钻剑",null,null,null],[285,"Text_MitsurugiDemonSword","Mitsurugi - Demon Sword","御剑_恶魔剑",null,null,null],[286,"Text_MitsurugiBrokenCrazySword","Mitsurugi - Broken Crazy Sword","御剑_断狂剑",null,null,null],[287,"Text_MitsurugiAerocraft","Mitsurugi - Aerocraft","御剑_飞行器",null,null,null],[288,"Text_MitsurugiImperialSwordDart","Mitsurugi - Imperial Sword Dart","御剑_飞镖",null,null,null],[289,"Text_MitsurugiSmallBicycle","Mitsurugi - Small Bicycle","御剑_小单车",null,null,null],[290,"Text_MitsurugiAnywayHeShandsome","Mitsurugi - Anyway, He's Handsome","御剑_反正很帅",null,null,null],[291,"Text_MitsurugiSkate","Mitsurugi - Skate","御剑_滑板",null,null,null],[292,"Text_MitsurugiLittleGreenDragon","Mitsurugi - Little Green Dragon","御剑_小绿龙",null,null,null],[293,"Text_MitsurugiXiaolanLong","Mitsurugi - Xiaolan Long","御剑_小蓝龙",null,null,null],[294,"Text_MitsurugiLittleFireDragon","Mitsurugi - Little Fire Dragon","御剑_小火龙",null,null,null],[295,"Text_YujianFlyingHasBeenSuccessfullyPurchased","Yujian Flying Has Been Successfully Purchased","御剑飞行购买成功",null,null,null],[296,"Text_EquippingSwordFlying","Equipping Sword Flying","装备御剑飞行",null,null,null],[297,"Text_FlyingWithoutEquippedSword","Flying Without Equipped Sword","未装备御剑飞行",null,null,null],[298,"Text_RemoveTheImperialSwordAndFly","Remove The Imperial Sword And Fly","卸下御剑飞行",null,null,null],[299,"Text_IncreaseBloodVolumeByTimes_Nowrap","Blood Volume Increase {0} Times","血量提升{0}倍","血量提升{0}倍","血液量が{0}倍に上昇","혈액량 {0}배 증가"],[300,"Text_AttackPowerIncreasedByTimes_Nowrap","Attack Power Enhancement {0} Times","攻击力提升{0}倍","攻擊力提升{0}倍","攻撃力{0}倍アップ","공격력 {0}배 증가"],[301,"Text_ClickAnywhereToContinue","Click anywhere to continue","点击任意位置继续……",null,null,null],[302,"Text_Guid_0","Welcome to\n{0}\nLet me introduce you to all the button operations.","欢迎来到\n{0}\n我来给你介绍一下所有按钮操作吧。",null,null,null],[303,"Text_Guid_1","Move button, click and drag to control the character's movement.","移动按钮，点击后拖拽可以控制角色移动。",null,null,null],[304,"Text_Guid_2","View movement area, click and drag here to control the screen view.","视角移动区域，点击拖动这里可以控制屏幕视角。",null,null,null],[305,"Text_Guid_3","Jump button, continuous clicking will perform a two-stage jump, which will consume {0}","跳跃按钮，连续点击会进行二段跳，会消耗{0}",null,null,null],[306,"Text_Guid_4","Sword flying, can fly","御剑飞行，可以飞行",null,null,null],[307,"Text_Guid_5","Attack button, continuous clicking can release cool combos, which will consume {0}","攻击按钮，连续点击可释放炫酷的连招，会消耗{0}",null,null,null],[308,"Text_Guid_6","Automatic attack button, enable automatic attack","自动攻击按钮、开启自动攻击",null,null,null],[309,"Text_Guid_7","Activate the soul ring button to display the soul ring.","开启魂环按钮，可展示魂环。",null,null,null],[310,"Text_Guid_8","Background music button, open to change background music and switch background music on/off.","背景音乐按钮，打开可更换背景音乐以及开关背景音乐。",null,null,null],[311,"Text_Guid_9","Click the 'I'm Home' button, and when you're stuck in the map and unable to move, you can try clicking on 'I'll Try'.","点我回家按钮，当你被卡在地图中无法移动时可以点击我试试哦。",null,null,null],[312,"Text_Guid_10","The backpack button, the fastest way to level up is to search for martial souls, professions, soul bones, and pets in the map.","背包按钮，提升等级最快的办法就是在地图中寻找武魂、职业、魂骨、宠物。",null,null,null],[313,"Text_Guid_11","The leaderboard button can be opened to view the in room leaderboard and world leaderboard. Come and check your ranking in Douluo Continent.","排行榜按钮，打开可以进行查看房间内排行榜和世界排行榜，快来查看你在斗罗大陆的排名是多少吧。",null,null,null],[314,"Text_Guid_12","Gold coin lottery button, where you can redeem diamonds, levels, and skins for coins that you can't spend all","金币抽奖按钮，花不完的金币在这里可以兑现 钻石、等级、皮肤哦",null,null,null],[315,"Text_Guid_13","The online reward button allows you to receive a large amount of coins and experience to quickly upgrade your level. You can quickly upgrade to a banned Douluo within 10 minutes of being online.","在线奖励按钮，可以领取大量金币和经验来快速提升等级，在线10分钟即可快速升级到封号斗罗。",null,null,null],[316,"Text_Guid_14","Task button, completing tasks can earn a large amount of coins and experience to quickly level up, and you can immediately upgrade to god level.","任务按钮，完成任务可以领取大量金币和经验来快速提升等级，马上就可升级到神级。",null,null,null],[317,"Text_Guid_15","Check in button, log in to the game, check in to receive a large amount of diamonds and levels.","签到按钮，登录游戏签到领取大量钻石和等级。",null,null,null],[318,"Text_Guid_16","There are many benefits, the fastest way to level up, unlimited upgrades, and become a shortcut to becoming a god level.","福利多多，最快提升等级的办法，无限升级，成为神级的捷径。",null,null,null],[319,"Text_Guid_17","Sword flying, equipped to fly.","御剑飞行，装备后可飞行。",null,null,null],[320,"Text_Guid_18","Recharge diamonds to quickly increase the lifespan of soul rings and reach up to one million grade levels.","充值钻石，可充值大量钻石快速提升魂环年限、最快达到百万年级别。",null,null,null],[321,"Text_Guid_19","Redeem rewards, receive redemption codes to redeem rewards, diamonds+levels.","兑换奖励，领取兑换码兑换奖励，钻石+等级。",null,null,null],[322,"Text_Guid_20","Newbie Gift Pack Button, Get Newbie Gift Pack","新手礼包按钮，领取新手大礼包",null,null,null],[323,"Text_Guid_21","Forge soul ring button, can forge soul rings, making your soul rings reach 100000 levels, and the tenth ring can reach millions of levels","锻造魂环按钮，可以锻造魂环，使自己的魂环都达到十万年级别，第十环可以达到百万年级别",null,null,null],[324,"Text_Guid_22","The hang up button automatically upgrades without the need for operation when turned on.","挂机按钮，开启后、无需操作自动升级。",null,null,null],[325,"Text_Guid_23","Activate defense and avoid being accidentally injured by teammates.","开启防御，不会被队友误伤。",null,null,null],[326,"Text_Guid_24","Character attributes, health, {0}, attack power will increase with level.","角色属性，血量、{0}，攻击力会随等级提升而提升。",null,null,null],[327,"Text_Guid_25","Quickly increase coins to directly purchase martial souls and soul bones.","可快速增加金币直接购买武魂、魂骨。",null,null,null],[328,"Text_Guid_26","Can quickly increase diamond forged soul rings.","可快速增加钻石锻造魂环。",null,null,null],[329,"Text_Guid_27","Introduction completed, welcome to leave a message in the gaming community. Follow my signpost and I'll take you to find the martial soul and soul bone.","介绍完毕，欢迎游戏圈留言。跟我路标走，带你去找武魂、魂骨。",null,null,null],[330,"Text_Guid_28","Forge Soul Bones","锻造魂骨",null,null,null],[331,"Text_ArrivedNearTheTargetPoint","Arrived Near The Target Point","已到达目标点附近",null,null,null],[332,"Text_ReturnToNewbieVillage","Return To Newbie Village","返回新手村",null,null,null],[333,"Text_LetSOfficiallyOpenYourCopy","Let'S Officially Open Your Copy","正式开启你的副本吧",null,null,null],[334,"Text_Beat","Beat","击败",null,null,null],[335,"Text_SwordFlying","Sword","御剑飞行",null,null,null],[336,"Text_AutomaticAttack","Automatic","自动攻击",null,null,null],[337,"Text_BackgroundMusic","Music","背景音乐",null,null,null],[338,"Text_ClickOnMeToGoHome","Home","点我回家",null,null,null],[339,"Text_Knapsack","Knapsack","背包",null,null,null],[340,"Text_RankingList","Ranking","排行榜",null,null,null],[341,"Text_GoldCoinLottery","Lottery","金币抽奖",null,null,null],[342,"Text_CollectingTasks","Tasks","领取任务",null,null,null],[343,"Text_SignIn","Sign In","签到",null,null,null],[344,"Text_RechargeDiamonds","Diamonds","充值钻石",null,null,null],[345,"Text_ExchangeRewards","Exchange","兑换奖励",null,null,null],[346,"Text_ForgeSoulRings","Rings","锻造魂环",null,null,null],[347,"Text_NoviceGiftPack","Gift Pack","新手礼包",null,null,null],[348,"Text_ForgeSoulBones","Bones","锻造魂骨",null,null,null],[349,"Text_DoYouWantToActivateTeammateAccidentalInjury","Do You Want To Activate Teammate Accidental Injury","是否开启队友误伤",null,null,null],[350,"Text_EnableAfk","Enable Afk","开启挂机",null,null,null],[351,"Text_DefenseHasBeenTurnedOff","Defense Has Been Turned Off","已关闭防御",null,null,null],[352,"Text_DefenseActivated","Defense Activated","已开启防御",null,null,null],[353,"Text_PutItAway","Off","收起",null,null,null],[354,"Text_Open","On","开启",null,null,null],[355,"Text_Defeated","Defeated","击败了",null,null,null],[356,"Text_YouHaveBeenDefeatedBy","You Have Been Defeated By {0}","你已被 {0} 击败",null,null,null],[357,"Text_DefeatToCompleteRevenge","Defeat {0} To Complete Revenge","击败 {0} 完成复仇",null,null,null],[358,"Text_Grade_MaoHao","Grade:","等级：",null,null,null],[359,"Text_Experience","Experience:","经验：",null,null,null],[360,"Text_Aggressivity","Aggressivity:","攻击力：",null,null,null],[361,"Text_LevelUnlock","Level Unlock","级解锁",null,null,null],[362,"Text_BloodVolume","Blood Volume:","血量：",null,null,null],[363,"Text_Insufficient","Insufficient","不足",null,null,null],[364,"Text_UpgradeToIncreaseReserves","Upgrade To Increase {0} Reserves","升级增加{0}储量",null,null,null],[365,"Text_DoubleTheAttackPowerWithinSeconds","Seconds","秒内攻击力翻倍",null,null,null],[366,"Text_LevelOpen","Level Open","级开启",null,null,null],[367,"Text_TheSkillsAreNotReadyYet","The Skills Are Not Ready Yet","技能还没准备好",null,null,null],[368,"Text_UpgradeSuccessLevel","Upgrade Success Level+{0}","升级成功 等级+{0}",null,null,null],[369,"Text_ContinuouslyEliminatePeople_2","Continuously Eliminate 2 People!","连续消灭2人！势不可当！",null,null,null],[370,"Text_ContinuouslyEliminatePeople_3","Continuously Eliminate 3 People!","连续消灭3人！勇冠三军！",null,null,null],[371,"Text_ContinuouslyEliminatePeople_4","Continuously Eliminate 4 People!","连续消灭4人！无人能敌！",null,null,null],[372,"Text_ContinuouslyEliminatePeople_5","Continuously Eliminate 5 People!","连续消灭5人！横扫千军！",null,null,null],[373,"Text_ContinuouslyEliminatePeople_6","Continuously Eliminate 6 People!","连续消灭6人！接近神了！",null,null,null],[374,"Text_ContinuouslyEliminatePeople_7","Continuously Eliminate {0} People!","连续消灭{0}人！超越神了！",null,null,null],[375,"Text_FreeUpgrade_Simoleness","Upgrade","免费升级",null,null,null],[376,"Text_HangingOnTheHook","Hanging On The Hook","挂机中",null,null,null],[377,"Text_CancelAfk","Cancel Afk","取消挂机",null,null,null],[378,"Text_Level","Level","级",null,null,null],[379,"Text_BlackMonkeyKingLevel","Black Monkey King","黑悟空关卡",null,null,null],[380,"Text_MillionYearSoulBeast","Million Year Soul Beast","百万年魂兽",null,null,null],[381,"Text_ReturningToTheCity","Returning To The City","回城",null,null,null],[382,"Text_PleaseFirstRaiseTheLevelToLevel","Please First Raise The Level To {0} Level","请先将等级提升至{0}级",null,null,null],[383,"Text_EmptyPrizeHaha","Empty Prize - Haha","空奖-哈哈",null,null,null],[384,"Text_WinningProbability","Winning Probability","中奖概率",null,null,null],[385,"Text_DrawTimes","Draw {0} Times","抽{0}次",null,null,null],[386,"Text_ConsumeCoins","Consume {0} Coins","消耗{0}金币",null,null,null],[387,"Text_ConsumeDispatchCoins","Consume {0} Dispatch Coins","消耗{0}派队币",null,null,null],[388,"Text_FreeLotteryDraw","Free\nLottery Draw","免费抽奖",null,null,null],[389,"Text_LotteryResults","Lottery Results","抽奖结果",null,null,null],[390,"Text_CongratulationsOnWinningThePrize","Congratulations On Winning The Prize","恭喜中奖",null,null,null],[391,"Text_ObtainDiamonds","Obtain {0} Diamonds","获得{0}钻石",null,null,null],[392,"Text_OpenTheBackpackForUse","Open The Backpack For Use","打开背包使用",null,null,null],[393,"Text_FirstDay","First Day","第一天",null,null,null],[394,"Text_TheSecondDay","The Second Day","第二天",null,null,null],[395,"Text_ReturnGiftPackageForVeteranPlayers","Return Gift Package For Veteran Players","老玩家回归礼包",null,null,null],[396,"Text_OnlineTimeIsLessThanMinutes","Online Time Is Less Than {0} Minutes","在线时间不足{0}分钟",null,null,null],[397,"Text_ReceivedSuccessfully","Received Successfully","领取成功",null,null,null],[398,"Text_CannotBeClaimedRepeatedly","Cannot Be Claimed Repeatedly","不能重复领取",null,null,null],[399,"Text_PleaseComeBackToCollectOnTheThDay","Please Come Back To Collect On The {0} Th Day","请第{0}天再来领取",null,null,null],[400,"Text_OpenTheBackpackAndUseItAfterReceivingIt","Open The Backpack And Use It After Receiving It","领取后打开背包使用",null,null,null],[401,"Text_OnlineMinutes","Online {0} Minutes ({1}/{2})","在线{0}分钟({1}/{2})",null,null,null],[402,"Text_ReceivedAlready","Received Already","已领取",null,null,null],[403,"Text_OnlineRewards","Online Rewards","在线奖励",null,null,null],[404,"Text_CanBeClaimed","Can Be Claimed","可领取",null,null,null],[405,"Text_InsufficientOnlineTime","Insufficient Online Time","在线时间不足",null,null,null],[406,"Text_ClaimRewards","Claim Rewards","领取奖励",null,null,null],[407,"Text_ReceivedReward","Received Reward","已领取奖励",null,null,null],[408,"Text_RewardCoins","Reward {0} Coins","奖励{0}金币",null,null,null],[409,"Text_RewardExperience","Reward {0} Experience","奖励{0}经验",null,null,null],[410,"Text_RewardDiamonds","Reward {0} Diamonds","奖励{0}钻石",null,null,null],[411,"Text_Lv","Lv.","等级Lv.",null,null,null],[412,"Text_IncreaseCoins","Increase {0} Coins","增加{0}金币",null,null,null],[413,"Text_IncreaseExperience","Increase {0} Experience","增加{0}经验",null,null,null],[414,"Text_GetCoins","Get {0} Coins","获得{0}金币",null,null,null],[415,"Text_UpgradeLevelTo","Upgrade Level To","等级提升至",null,null,null],[416,"Text_CurrentlyUnavailable","0","暂无",null,null,null],[417,"Text_Ranking","Ranking","排名",null,null,null],[418,"Text_Name","Name","名字",null,null,null],[419,"Text_Height","Height","高度",null,null,null],[420,"Text_Kill","Kill","击杀",null,null,null],[421,"Text_LevelMode","Level Mode","等级模式",null,null,null],[422,"Text_HeightMode","Height Mode","高度模式",null,null,null],[423,"Text_KillMode","Kill Mode","击杀模式",null,null,null],[424,"Text_SwitchRoomLeaderboard","Switch Room Leaderboard","切换房间排行榜",null,null,null],[425,"Text_SwitchToTheFullServerRankingList","Switch To The Full Server Ranking List","切换全服排行榜",null,null,null],[426,"Text_TheRankingListInYourRoom","The Ranking List In Your Room\nClicking The Ranking Mode Button \nOn The Right Will Refresh The Ranking Mode","你所在房间内的排行榜。\n点击右侧排行模式按钮会刷新排行榜模式。",null,null,null],[427,"Text_RoomRanking","Room Ranking","房间排行榜",null,null,null],[428,"Text_TopInTheEntireServer","Top {0} In The Entire Server\nRank Lv. Rank Ranking","全服前{0}名\n段位 Lv.等级排行。",null,null,null],[429,"Text_FullServerRankingList","Full Server Ranking List","全服排行榜",null,null,null],[430,"Text_DonTClickTooQuicklyWithYourLittleHand","Don'T Click Too Quickly With Your Little Hand~","小手别点太快哟~",null,null,null],[431,"Text_Decade","Decade","十年",null,null,null],[432,"Text_AHundredYears","A Hundred Years","百年",null,null,null],[433,"Text_Millennium","Millennium","千年",null,null,null],[434,"Text_TenThousandYears","Ten Thousand Years","万年",null,null,null],[435,"Text_100000Years","100000 Years","十万年",null,null,null],[436,"Text_MillionsOfYears","Millions Of Years","百万年",null,null,null],[437,"Text_Eternity","Eternity","万万年",null,null,null],[438,"Text_BillionsOfYears","Billions Of Years","亿万年",null,null,null],[439,"Text_1","1","一",null,null,null],[440,"Text_2","2","二",null,null,null],[441,"Text_3","3","三",null,null,null],[442,"Text_4","4","四",null,null,null],[443,"Text_5","5","五",null,null,null],[444,"Text_6","6","六",null,null,null],[445,"Text_7","7","七",null,null,null],[446,"Text_8","8","八",null,null,null],[447,"Text_9","9","九",null,null,null],[448,"Text_10","10","十",null,null,null],[449,"Text_NotYetObtainedSoulRing","Not Yet Obtained Soul Ring","还未获取魂环",null,null,null],[450,"Text_ContactTheAuthorForRepair","Contact The Author For Repair","联系作者修复",null,null,null],[451,"Text_InsufficientLevel","Insufficient Level","等级不足",null,null,null],[452,"Text_SuccessfullyForged","Successfully Forged","锻造成功",null,null,null],[453,"Text_TotalBonus","Total Bonus: Health Increased By {0} Times, Attack Power Increased By {1} Times","总加成：血量提升{0}倍，攻击力提升{1}倍",null,null,null],[454,"Text_CongratulationsOnCompletingTheBeginnerSGuide","Congratulations On Completing The Beginner'S Guide","恭喜你完成新手引导",null,null,null],[455,"Text_RewardTheFirstSoulRingWithATenYearSoulRing","Reward The First Soul Ring With A Ten-Year Soul Ring","奖励第一魂环 十年魂环",null,null,null],[456,"Text_TheSoulRingSoulRing","The {0} Soul Ring\n{1} Soul Ring","第{0}魂环\n{1}魂环 ",null,null,null],[457,"Text_UnlockableAtLevel","Unlockable At Level {0}","{0}级可解锁",null,null,null],[458,"Text_Cost","Cost","需要消耗",null,null,null],[459,"Text_SoulRing","Soul Ring","魂环",null,null,null],[460,"Text_Unlockable","Unlockable","可解锁",null,null,null],[461,"Text_SupplementarySignature","Supplementary Signature","补签",null,null,null],[462,"Text_Unclaimed","Unclaimed","待领取",null,null,null],[463,"Text_DiamondGrade","Diamond+{0} Grade+{1}","钻石 +{0} 等级 +{1}",null,null,null],[464,"Text_Day","Day {0}","第{0}天",null,null,null],[465,"Text_DayCheckIn","{0} Day Check-In","{0}日签到",null,null,null],[466,"Text_SignedIn","Signed In","已签到",null,null,null],[467,"Text_SuccessfullyObtainedTodaySReward","Successfully Obtained Today'S Reward","成功获得今日奖励",null,null,null],[468,"Text_TheCheckInDateHasNotYetArrived","The Check-In Date Has Not Yet Arrived","还未到签到日期",null,null,null],[469,"Text_DailyLoginToGames","Daily Login To Games（{0}/{1}）","每日登陆游戏（{0}/{1}）",null,null,null],[470,"Text_DailyOnlineMinutes","Daily Online {2} Minutes（{0}/{1}）","每日在线时长{2}分钟（{0}/{1}）",null,null,null],[471,"Text_DefeatMedusaEveryDay","Defeat {2} Medusa Every Day（{0}/{1}）","每日击败{2}只美杜莎（{0}/{1}）",null,null,null],[472,"Text_DefeatSpiderSpiritsDaily","Defeat {2} Spider Spirits Daily（{0}/{1}）","每日击败{2}只蜘蛛精（{0}/{1}）",null,null,null],[473,"Text_DefeatDazzlingSpidersDaily","Defeat {2} Dazzling Spiders Daily（{0}/{1}）","每日击败{2}只炫彩蜘蛛（{0}/{1}）",null,null,null],[474,"Text_DefeatDragonBeastsDaily","Defeat {2} Dragon Beasts Daily（{0}/{1}）","每日击败{2}只龙兽（{0}/{1}）",null,null,null],[475,"Text_DefeatZombiesDaily","Defeat {2} Zombies Daily（{0}/{1}）","每日击败{2}只丧尸（{0}/{1}）",null,null,null],[476,"Text_DefeatMutatedPuppetsDaily","Defeat {2} Mutated Puppets Daily（{0}/{1}）","每日击败{2}只变异布偶（{0}/{1}）",null,null,null],[477,"Text_DefeatPlayersDaily","Defeat {2} Players Daily（{0}/{1}）","每日击败{2}名玩家（{0}/{1}）",null,null,null],[478,"Text_DailyLevelIncreaseByLevels","Daily Level Increase By {2} Levels（{0}/{1}）","每日等级提升{2}级（{0}/{1}）",null,null,null],[479,"Text_PickUpTreasuresEveryDay","Pick Up {2} Treasures Every Day（{0}/{1}）","每日捡到{2}个秘宝（{0}/{1}）",null,null,null],[480,"Text_WatchAdsPerDay","Watch {2} Ads Per Day（{0}/{1}）","每日观看{2}次广告（{0}/{1}）",null,null,null],[481,"Text_LoginDaysAWeek","Login {2} Days A Week（{0}/{1}）","每周登录{2}天（{0}/{1}）",null,null,null],[482,"Text_UpTo30MinutesAndDaysPerWeek","Up To 30 Minutes And {2} Days Per Week（{0}/{1}）","每周时长达到30分钟{2}天（{0}/{1}）",null,null,null],[483,"Text_DefeatMedusaEveryWeek","Defeat {2} Medusa Every Week（{0}/{1}）","每周击败{2}只美杜莎（{0}/{1}）",null,null,null],[484,"Text_DefeatSpiderSpiritsEveryWeek","Defeat {2} Spider Spirits Every Week（{0}/{1}）","每周击败{2}只蜘蛛精（{0}/{1}）",null,null,null],[485,"Text_DefeatDazzlingSpidersEveryWeek","Defeat {2} Dazzling Spiders Every Week（{0}/{1}）","每周击败{2}只炫彩蜘蛛（{0}/{1}）",null,null,null],[486,"Text_DefeatDragonBeastsEveryWeek","Defeat {2} Dragon Beasts Every Week（{0}/{1}）","每周击败{2}只龙兽（{0}/{1}）",null,null,null],[487,"Text_DefeatZombiesEveryWeek","Defeat {2} Zombies Every Week（{0}/{1}）","每周击败{2}只丧尸（{0}/{1}）",null,null,null],[488,"Text_DefeatMutatedPuppetsEveryWeek","Defeat {2} Mutated Puppets Every Week（{0}/{1}）","每周击败{2}只变异布偶（{0}/{1}）",null,null,null],[489,"Text_DefeatPlayersPerWeek","Defeat {2} Players Per Week（{0}/{1}）","每周击败{2}名玩家（{0}/{1}）",null,null,null],[490,"Text_UpgradeByLevelsPerWeek","Upgrade By {2} Levels Per Week（{0}/{1}）","每周等级提升{2}级（{0}/{1}）",null,null,null],[491,"Text_PickUpTreasuresEveryWeek","Pick Up {2} Treasures Every Week（{0}/{1}）","每周捡到{2}个秘宝（{0}/{1}）",null,null,null],[492,"Text_WatchAdsPerWeek","Watch {2} Ads Per Week（{0}/{1}）","每周观看{2}次广告（{0}/{1}）",null,null,null],[493,"Text_DailyTasks","Daily Tasks","每日任务",null,null,null],[494,"Text_AllTasksHaveBeenCompletedWaitingForRefresh","All Tasks Have Been Completed, Waiting For Refresh","任务已全部完成，等待刷新...",null,null,null],[495,"Text_WeeklyTasks","Weekly Tasks","每周任务",null,null,null],[496,"Text_RemainingHours","Remaining: {0} Hours","剩余：{0}小时",null,null,null],[497,"Text_RemainingDays","Remaining: {0} Days","剩余：{0}天",null,null,null],[498,"Text_HangInTheAir","Hang In The Air","未完成",null,null,null],[499,"Text_NotEquippedWithYetGoFind","Not Equipped With {0} Yet, Go Find {1}","还未装备{0},去寻找{1}",null,null,null],[500,"Text_WarcraftMedusa","Warcraft Medusa","魔兽美杜莎",null,null,null],[501,"Text_WarcraftColorfulSpider","Warcraft Colorful Spider","魔兽炫彩蜘蛛",null,null,null],[502,"Text_WarcraftSpiderSpirit","Warcraft Spider Spirit","魔兽蜘蛛精",null,null,null],[503,"Text_DragonSWarcraft","Dragon'S Warcraft","龙之魔兽",null,null,null],[504,"Text_Zombies","Zombies","丧尸",null,null,null],[505,"Text_MutatedPuppet","Mutated Puppet","变异布偶",null,null,null],[506,"Text_BlackWukong","Black Wukong","黑悟空",null,null,null],[507,"Text_MickeyMouse","Mickey Mouse","魔兽米老鼠",null,null,null],[508,"Text_LevelSoulMaster1","{0} Level Soul Master","{0}级 魂士",null,null,null],[509,"Text_LevelSoulMaster2","{0} Level Soul Master","{0}级 魂师",null,null,null],[510,"Text_LevelSoulMaster3","{0} Level Soul Master","{0}级 大魂师",null,null,null],[511,"Text_LevelSoulSovereign","{0} Level Soul Sovereign","{0}级 魂尊",null,null,null],[512,"Text_LevelSoulSect","{0} Level Soul Sect","{0}级 魂宗",null,null,null],[513,"Text_LevelSoulKing","{0} Level Soul King","{0}级 魂王",null,null,null],[514,"Text_LevelSoulEmperor","{0} Level Soul Emperor","{0}级 魂帝",null,null,null],[515,"Text_LevelSoulSaint","{0} Level Soul Saint","{0}级 魂圣",null,null,null],[516,"Text_LevelContra","{0} Level Contra","{0}级 魂斗罗",null,null,null],[517,"Text_LevelBannedDouluo","{0} Level Banned Douluo","{0}级 封号斗罗",null,null,null],[518,"Text_LevelPeakDouluo","{0} Level Peak Douluo","{0}级 巅峰斗罗",null,null,null],[519,"Text_LevelDemigod","{0} Level Demigod","{0}级 半神",null,null,null],[520,"Text_LevelDivineOfficer","{0} Level Divine Officer","{0}级 神官",null,null,null],[521,"Text_LevelTrueGodLevel","{0} Level True God Level","{0}级 真神级",null,null,null],[522,"Text_LevelSuperGodLevel","{0} Level Super God Level","{0}级 超神级",null,null,null],[523,"Text_LevelSuperGodPeak","{0} Level Super God Peak","{0}级 超神巅峰",null,null,null],[524,"Text_LevelDivineKing","{0} Level Divine King","{0}级 神王",null,null,null],[525,"Text_LevelEternalImmortalEmperor","{0} Level Eternal Immortal Emperor","{0}级 万古仙帝",null,null,null],[526,"Text_EternalImmortalEmperor","Eternal Immortal Emperor","万古仙帝",null,null,null],[527,"Text_MartialSoulMechSlashWindSlash_Male","Martial Soul - Mech Slash Wind Slash (Male)","武魂-机甲斩狂风斩(男)",null,null,null],[528,"Text_MartialSoulMechSlashWindSlash_Female","Martial Soul - Mech Slash Wind Slash (Female)","武魂-机甲斩狂风斩(女)",null,null,null],[529,"Text_GoldenHoopRodPowderUniformGirl","Golden Hoop Rod (Powder)+Uniform Girl","金箍棒(粉)+制服女孩",null,null,null],[530,"HaotianHammerTangSan_GoldenHoopRodPurpleBlueSilverEmperor","Haotian Hammer+Tang San\nGolden Hoop Rod (Purple)+Blue Silver Emperor","昊天锤+唐三\n金箍棒(紫)+蓝银皇",null,null,null],[531,"Text_TheGoldenPrinceJkGirl","The Golden Prince+Jk Girl","黄金王子+JK女孩",null,null,null],[532,"Text_XiaolanGreenBlackOrangeDragon","Xiaolan Long+Little Green Dragon\nLittle Black Dragon+Little Orange Dragon","小蓝龙+小绿龙\n小黑龙+小橘龙",null,null,null],[533,"Text_ProbabilityIncreaseSuccess","Probability Increase Success","概率提升成功",null,null,null],[534,"Text_SoulBoneStrengtheningSuccessful","Soul Bone Strengthening Successful","魂骨强化成功",null,null,null],[535,"Text_SoulBoneStrengtheningFailed","Soul Bone Strengthening Failed","魂骨强化失败",null,null,null],[536,"Text_ClaimLimitedSkin","Claim Limited Skin","领取限定皮肤",null,null,null],[537,"Text_ClaimAutomaticAttack","Claim Automatic Attack","领取自动攻击",null,null,null],[538,"Text_ObtainedOpenTheBackpackToUse","Obtained, Open The Backpack To Use","已获得，打开背包使用",null,null,null],[539,"Text_Music_1","Open World","开放世界",null,null,null],[540,"Text_Music_2","Stay","留下来",null,null,null],[541,"Text_Music_3","Bad Guy","坏人",null,null,null],[542,"Text_Music_4","I Will Survive","我会活下去",null,null,null],[543,"Text_Music_5","Let Me Love You","让我爱你",null,null,null],[544,"Text_Music_6","Running Up That Hill","跑上那座山",null,null,null],[545,"Text_Music_7","Love To Hate Me","爱恨我",null,null,null],[546,"Text_Music_8","Tomboy","假小子",null,null,null],[547,"Text_Music_9","Shut Down","关闭",null,null,null],[548,"Text_Music_10","Celestial","天空的",null,null,null],[549,"Text_Music_11","As It Was","事实上",null,null,null],[550,"Text_Music_12","Good Morning","早上好",null,null,null],[551,"Text_Music_13","Alone","独自一人",null,null,null],[552,"Text_Music_14","Chanderiler","钱德里勒",null,null,null],[553,"Text_Music_15","Don'T Wanna Know","不想知道",null,null,null],[554,"Text_Music_16","Mood","心情",null,null,null],[555,"Text_Music_17","Moon","金轮",null,null,null],[556,"Text_Music_18","I Don'T Know What It'S Called","不知道叫啥",null,null,null],[557,"Text_Music_19","I Don'T Know What It'S Called","也不知道叫啥",null,null,null],[558,"Text_RewardSoulBone","Reward {0} Soul Bone","奖励{0}魂骨碎片",null,null,null],[559,"Text_InsufficientSoulBoneFragments","Insufficient Soul Bone Fragments","魂骨碎片不足",null,null,null],[560,"Text_GetFreeBones","Get {0} Free Bones","免费领取{0}魂骨碎片",null,null,null],[561,"Text_SuccessfullyObtainedBones","Successfully Obtained Bones+{0}","成功获得魂骨碎片+{0}",null,null,null],[562,"Text_Upgrade","Upgrade","升级",null,null,null],[563,"Text_ForgeSoulRings_Button","Forge Soul Rings","锻造魂环",null,null,null],[564,"Text_LotsOfDiamonds","Lots Of Diamonds","领取大量钻石\n下次翻倍",null,null,null],[565,"Text_BillionsOfYears_10","10 Billions Of Years","十亿万年",null,null,null],[566,"Text_TensOfBillionsOfYears","Tens Of Billions Of Years","百亿万年",null,null,null],[567,"Text_HundredsOfBillionsOfYears","Hundreds Of Billions Of Years","千亿万年",null,null,null],[568,"Text_ModifyTheTitle","Modify The Title","修改称号",null,null,null],[569,"Text_TitleNameTips","Level reached {0}\nConsuming {1} diamonds modifies the title.","等级达到{0}级\n消耗{1}钻石即可修改称号",null,null,null],[570,"Text_PleaseEnterTheTitle","Please Enter The Title","请输入称号",null,null,null],[571,"Text_ModifiedSuccessfully","Modified Successfully","修改成功",null,null,null],[572,"Text_RestartTheGameToTakeEffect","Restart The Game To Take Effect","重启游戏即可生效",null,null,null],[573,"Text_FlashSales","Flash Sales","限时特惠",null,null,null],[574,"Text_ConsumeTeamCoins","Consume {0} Team Coins","消耗{0}派队币",null,null,null],[575,"Text_FlashTips","Diamond +{0}\nSoul Bone Fragment +{1}\nGold +{2}\nIs Equal To {3} 100 Draws.","钻石+{0}\n魂骨碎片+{1}\n金币+{2} \n等于 {3}次100连抽",null,null,null]];
export interface ILanguageElement extends IElementBase{
 	/**唯一标识*/
	Id:number
	/**名字*/
	Name:string
	/**英文*/
	Value:string
 } 
export class LanguageConfig extends ConfigBase<ILanguageElement>{
	constructor(){
		super(EXCELDATA);
	}
	/**强化后*/
	get Text_AfterStrengthening():ILanguageElement{return this.getElement(1)};
	/**{0}星级*/
	get Text_StarRating():ILanguageElement{return this.getElement(2)};
	/**需要等级达到{0}级*/
	get Text_NeedToReachLevel():ILanguageElement{return this.getElement(3)};
	/**血量提升{0}倍*/
	get Text_IncreaseBloodVolumeByTimes():ILanguageElement{return this.getElement(4)};
	/**攻击力提升{0}倍*/
	get Text_AttackPowerIncreasedByTimes():ILanguageElement{return this.getElement(5)};
	/**强化魂骨*/
	get Text_StrengthenSoulBones():ILanguageElement{return this.getElement(6)};
	/**需要消耗*/
	get Text_NeedToConsume():ILanguageElement{return this.getElement(7)};
	/**钻石*/
	get Text_Diamonds():ILanguageElement{return this.getElement(8)};
	/**金币*/
	get Text_GoldCoins():ILanguageElement{return this.getElement(9)};
	/**强化条件*/
	get Text_StrengtheningConditions():ILanguageElement{return this.getElement(10)};
	/**强化成功
概率：{0}%*/
	get Text_EnhanceTheProbabilityOfSuccess():ILanguageElement{return this.getElement(11)};
	/**提升概率*/
	get Text_IncreaseProbability():ILanguageElement{return this.getElement(12)};
	/**开始强化*/
	get Text_StartStrengthening():ILanguageElement{return this.getElement(13)};
	/**派队币*/
	get Text_TeamCoin():ILanguageElement{return this.getElement(14)};
	/**购买*/
	get Text_Buy():ILanguageElement{return this.getElement(15)};
	/**或*/
	get Text_Or():ILanguageElement{return this.getElement(16)};
	/**消耗{0}钻石
强化概率提升到{1}%*/
	get Text_UpProbabiliotyConetntTextBlock_0():ILanguageElement{return this.getElement(17)};
	/**消耗{0}派队币
强化概率提升到{1}%*/
	get Text_UpProbabiliotyConetntTextBlock_1():ILanguageElement{return this.getElement(18)};
	/**使用钻石*/
	get Text_UsingDiamonds():ILanguageElement{return this.getElement(19)};
	/**使用派队币*/
	get Text_UseTeamCoins():ILanguageElement{return this.getElement(20)};
	/**钻石不足*/
	get Text_DiamondShortage():ILanguageElement{return this.getElement(21)};
	/**金币不足*/
	get Text_InsufficientGoldCoins():ILanguageElement{return this.getElement(22)};
	/**成功获得钻石+{0}*/
	get Text_SuccessfullyObtainedDiamonds():ILanguageElement{return this.getElement(23)};
	/**免费领取{0}颗钻石*/
	get Text_GetDiamondsForFree():ILanguageElement{return this.getElement(24)};
	/**取消*/
	get Text_Cancel():ILanguageElement{return this.getElement(25)};
	/**免费领取*/
	get Text_FreeToReceive():ILanguageElement{return this.getElement(26)};
	/**已满级*/
	get Text_FullLevel():ILanguageElement{return this.getElement(27)};
	/**头部魂骨*/
	get Text_HeadSoulBone():ILanguageElement{return this.getElement(28)};
	/**外附魂骨*/
	get Text_ExternalSoulBone():ILanguageElement{return this.getElement(29)};
	/**躯干魂骨*/
	get Text_TorsoSoulBone():ILanguageElement{return this.getElement(30)};
	/**腰部魂骨*/
	get Text_WaistSoulBone():ILanguageElement{return this.getElement(31)};
	/**手臂魂骨*/
	get Text_ArmSoulBone():ILanguageElement{return this.getElement(32)};
	/**腿部魂骨*/
	get Text_LegSoulBone():ILanguageElement{return this.getElement(33)};
	/**脚部魂骨*/
	get Text_FootSoulBone():ILanguageElement{return this.getElement(34)};
	/**前往*/
	get Text_GoTo():ILanguageElement{return this.getElement(35)};
	/**神级狩猎场*/
	get Text_GodLevelHuntingGround():ILanguageElement{return this.getElement(36)};
	/**新手村*/
	get Text_NoviceVillage():ILanguageElement{return this.getElement(37)};
	/**中级狩猎场*/
	get Text_IntermediateHuntingGround():ILanguageElement{return this.getElement(38)};
	/**高级狩猎场*/
	get Text_AdvancedHuntingGround():ILanguageElement{return this.getElement(39)};
	/**猎杀*/
	get Text_HuntAndKill():ILanguageElement{return this.getElement(40)};
	/**10万年魂兽*/
	get Text_100000YearSoulBeast():ILanguageElement{return this.getElement(41)};
	/**正在加载地图资源，请耐心等待*/
	get Text_LoadingMapResourcesPleaseBePatient():ILanguageElement{return this.getElement(42)};
	/**广告奖励*/
	get Text_AdvertisingRewards():ILanguageElement{return this.getElement(43)};
	/**观看{0}次广告
免费获得*/
	get Text_WatchTheAdvertisementTimesGetItForFree():ILanguageElement{return this.getElement(44)};
	/**带你去免费获得*/
	get Text_TakeYouToGetItForFree():ILanguageElement{return this.getElement(45)};
	/**免费获得*/
	get Text_GetItForFree():ILanguageElement{return this.getElement(46)};
	/**免费领取{0}金币*/
	get Text_GetGoldCoinsForFree():ILanguageElement{return this.getElement(47)};
	/**成功获得金币*/
	get Text_SuccessfullyObtainedCoins():ILanguageElement{return this.getElement(48)};
	/**免费领取{0}颗钻石*/
	get Text_GetFreeDiamonds():ILanguageElement{return this.getElement(49)};
	/**等级免费提升{0}级*/
	get Text_FreeLevelUpgradeByLevel():ILanguageElement{return this.getElement(50)};
	/**免费提升*/
	get Text_FreeUpgrade():ILanguageElement{return this.getElement(51)};
	/**免费领取第{0}天奖励*/
	get Text_FreeDayReward():ILanguageElement{return this.getElement(52)};
	/**{0}失败，请重试*/
	get Text_FailedPleaseTryAgain():ILanguageElement{return this.getElement(53)};
	/**别点太快、会卡哦*/
	get Text_DontClickTooFastItWillGetStuck():ILanguageElement{return this.getElement(54)};
	/**直接提升等级*/
	get Text_DirectlyUpgradeTheLevel():ILanguageElement{return this.getElement(55)};
	/**确定*/
	get Text_Determine():ILanguageElement{return this.getElement(56)};
	/**升级等级*/
	get Text_UpgradeLevel():ILanguageElement{return this.getElement(57)};
	/**使用5个钻石
提升等级*/
	get Text_UseDiamondsUpgradeLevel():ILanguageElement{return this.getElement(58)};
	/**请输入兑换码*/
	get Text_PleaseEnterTheRedemptionCode():ILanguageElement{return this.getElement(59)};
	/**兑换*/
	get Text_Exchange():ILanguageElement{return this.getElement(60)};
	/**请输入作者提供的兑换码
即可兑换奖励*/
	get Text_PleaseEnterTheRedemptionCodeProvidedByTheAuthorCanBeRedeemedForRewards():ILanguageElement{return this.getElement(61)};
	/**礼包兑换*/
	get Text_GiftPackExchange():ILanguageElement{return this.getElement(62)};
	/**已兑换，无需重复兑换*/
	get Text_AlreadyredeemedNoNeedToRedeemAgain():ILanguageElement{return this.getElement(63)};
	/**领取失败*/
	get Text_CollectionFailed():ILanguageElement{return this.getElement(64)};
	/**礼包兑换码错误*/
	get Text_GiftPackRedemptionCodeError():ILanguageElement{return this.getElement(65)};
	/**等级*/
	get Text_Grade():ILanguageElement{return this.getElement(66)};
	/**兑换成功*/
	get Text_ExchangeSuccessful():ILanguageElement{return this.getElement(67)};
	/**冷却{0}秒*/
	get Text_CoolForSeconds():ILanguageElement{return this.getElement(68)};
	/**今日已售空,请更换其他商品购买*/
	get Text_SoldouttodayPleaseReplaceWithOtherProductsToPurchase():ILanguageElement{return this.getElement(69)};
	/**充值钻石*/
	get Text_Rechargediamonds():ILanguageElement{return this.getElement(70)};
	/**不限购*/
	get Text_Nopurchaserestrictions():ILanguageElement{return this.getElement(71)};
	/**今日已售空*/
	get Text_Soldouttoday():ILanguageElement{return this.getElement(72)};
	/**每天限购一次*/
	get Text_Limitedtoonepurchaseperday():ILanguageElement{return this.getElement(73)};
	/**武魂|魂师|魂骨|魂兽*/
	get Text_BagTabTextBlock():ILanguageElement{return this.getElement(74)};
	/**自动攻击拳(男)*/
	get Text_AutomaticAttackFist_Male():ILanguageElement{return this.getElement(75)};
	/**自动攻击拳(女)*/
	get Text_AutomaticAttackFist_Female():ILanguageElement{return this.getElement(76)};
	/**机甲斩狂风斩(男)*/
	get Text_MechSlashWindSlash_Male():ILanguageElement{return this.getElement(77)};
	/**机甲斩狂风斩(女)*/
	get Text_MechSlashWindSlash_Female():ILanguageElement{return this.getElement(78)};
	/**金箍棒(粉)*/
	get Text_GoldenHoopRod_Powder():ILanguageElement{return this.getElement(79)};
	/**金箍棒(紫)*/
	get Text_GoldenHoopRod_Purple():ILanguageElement{return this.getElement(80)};
	/**昊天锤*/
	get Text_HaotianHammer():ILanguageElement{return this.getElement(81)};
	/**海神三叉戟*/
	get Text_TridentOfTheSeaGod():ILanguageElement{return this.getElement(82)};
	/**赛博自来也长枪*/
	get Text_CyberComesWithALongSpear():ILanguageElement{return this.getElement(83)};
	/**海王双头刀*/
	get Text_SeaKingDoubleHeadedKnife():ILanguageElement{return this.getElement(84)};
	/**美国队长神锤*/
	get Text_CaptainAmericaSHammer():ILanguageElement{return this.getElement(85)};
	/**毒液斧头*/
	get Text_VenomAxe():ILanguageElement{return this.getElement(86)};
	/**灭霸斧*/
	get Text_MiebaAxe():ILanguageElement{return this.getElement(87)};
	/**鸣人手里剑*/
	get Text_NarutoWieldingASword():ILanguageElement{return this.getElement(88)};
	/**未来战士黄金剑*/
	get Text_FutureWarriorGoldenSword():ILanguageElement{return this.getElement(89)};
	/**森林哨兵魔法仗*/
	get Text_ForestSentinelMagicBattle():ILanguageElement{return this.getElement(90)};
	/**手枪
索尼克专用*/
	get Text_Pistol_SonicSpecific():ILanguageElement{return this.getElement(91)};
	/**信号枪
粉毛怪专用*/
	get Text_SignalGun_SpecificallyForPinkHairMonster():ILanguageElement{return this.getElement(92)};
	/**刀(纲手专用)*/
	get Text_Knife_ForTsunade():ILanguageElement{return this.getElement(93)};
	/**刀(李洛克专用)*/
	get Text_Knife_ExclusiveToLilock():ILanguageElement{return this.getElement(94)};
	/**镰刀
干柿鬼鲛专用*/
	get Text_Sickle_ForDriedPersimmonGhostShark():ILanguageElement{return this.getElement(95)};
	/**镰刀
赛博女孩专用*/
	get Text_Sickle_ExclusivelyForCyberGirls():ILanguageElement{return this.getElement(96)};
	/**冰封剑
黑寡妇专用*/
	get Text_IceSword_ExclusivelyForBlackWidow():ILanguageElement{return this.getElement(97)};
	/**怪物爪刀*/
	get Text_MonsterClawKnife():ILanguageElement{return this.getElement(98)};
	/**大砍刀
卡卡西专用*/
	get Text_Machete_KakashiSpecific():ILanguageElement{return this.getElement(99)};
	/**法杖
宇智波鼬专用*/
	get Text_TheStaff_ExclusivelyForUchihaItachi():ILanguageElement{return this.getElement(100)};
	/**水枪*/
	get Text_WaterGun():ILanguageElement{return this.getElement(101)};
	/**冰钻剑*/
	get Text_IceDiamondSword():ILanguageElement{return this.getElement(102)};
	/**屠刀*/
	get Text_ButcherSKnife():ILanguageElement{return this.getElement(103)};
	/**蓝色法杖
洛基专用*/
	get Text_BlueStaff_LokiSpecific():ILanguageElement{return this.getElement(104)};
	/**镰刀
太阳神专用*/
	get Text_Sickle_SunGodExclusive():ILanguageElement{return this.getElement(105)};
	/**恶魔剑
宇智波斑爷专用*/
	get Text_DemonSword_ExclusivelyForUchihaMadara():ILanguageElement{return this.getElement(106)};
	/**剑(纳米机器人专用)*/
	get Text_Sword_SpecificallyDesignedForNanorobots():ILanguageElement{return this.getElement(107)};
	/**镰刀(死侍专用)*/
	get Text_Sickle_DeadpoolSpecific():ILanguageElement{return this.getElement(108)};
	/**荧光剑
火山哨兵专用*/
	get Text_FluorescentSword_ForVolcanoSentinelsOnly():ILanguageElement{return this.getElement(109)};
	/**狂热剑
绯红女巫专用*/
	get Text_FanaticalSword_ExclusiveToCrimsonWitch():ILanguageElement{return this.getElement(110)};
	/**充气锤子*/
	get Text_InflatableHammer():ILanguageElement{return this.getElement(111)};
	/**木法杖
毒液蜘蛛侠专用*/
	get Text_WoodenStaff_VenomSpiderManSpecific():ILanguageElement{return this.getElement(112)};
	/**瓜子盾*/
	get Text_GuaziShield():ILanguageElement{return this.getElement(113)};
	/**盾(浩克专用)*/
	get Text_Shield_HulkExclusive():ILanguageElement{return this.getElement(114)};
	/**终极冰环剑*/
	get Text_UltimateIceRingSword():ILanguageElement{return this.getElement(115)};
	/**散弹喷枪
雏田专用*/
	get Text_BulletSprayGun_ForHinata():ILanguageElement{return this.getElement(116)};
	/**火枪(路飞专用)*/
	get Text_Firearms_LuffySpecific():ILanguageElement{return this.getElement(117)};
	/**紫光剑
佐助专用*/
	get Text_PurpleLightSword_SpecialForSasuke():ILanguageElement{return this.getElement(118)};
	/**激光枪(天神专用)*/
	get Text_LaserGun_TenjinSpecific():ILanguageElement{return this.getElement(119)};
	/**剑(金刚狼专用)*/
	get Text_Sword_ExclusivelyForWolverine():ILanguageElement{return this.getElement(120)};
	/**激光枪(钢铁侠专用)*/
	get Text_LaserGun_IronManSpecific():ILanguageElement{return this.getElement(121)};
	/**情侣机甲套装(女)*/
	get Text_CoupleMechSet_Female():ILanguageElement{return this.getElement(122)};
	/**情侣机甲套装(男)*/
	get Text_CoupleMechSet_Male():ILanguageElement{return this.getElement(123)};
	/**小舞姐*/
	get Text_XiaoWuJie():ILanguageElement{return this.getElement(124)};
	/**蓝银皇*/
	get Text_BlueSilverEmperor():ILanguageElement{return this.getElement(125)};
	/**制服女孩*/
	get Text_UniformGirl():ILanguageElement{return this.getElement(126)};
	/**唐三*/
	get Text_TangSan():ILanguageElement{return this.getElement(127)};
	/**黄金王子*/
	get Text_TheGoldenPrince():ILanguageElement{return this.getElement(128)};
	/**JK女孩*/
	get Text_JkGirl():ILanguageElement{return this.getElement(129)};
	/**小蓝龙*/
	get Text_XiaolanLong():ILanguageElement{return this.getElement(130)};
	/**小绿龙*/
	get Text_LittleGreenDragon():ILanguageElement{return this.getElement(131)};
	/**小黑龙*/
	get Text_LittleBlackDragon():ILanguageElement{return this.getElement(132)};
	/**小橘龙*/
	get Text_LittleOrangeDragon():ILanguageElement{return this.getElement(133)};
	/**神级魔王*/
	get Text_GodLevelDemonKing():ILanguageElement{return this.getElement(134)};
	/**四代火影*/
	get Text_TheFourthHokage():ILanguageElement{return this.getElement(135)};
	/**美杜莎女王*/
	get Text_MedusaQueen():ILanguageElement{return this.getElement(136)};
	/**狐耳少女*/
	get Text_FoxEaredGirl():ILanguageElement{return this.getElement(137)};
	/**邪恶使者*/
	get Text_EvilMessenger():ILanguageElement{return this.getElement(138)};
	/**长款大衣女*/
	get Text_LongCoatForWomen():ILanguageElement{return this.getElement(139)};
	/**海绵宝宝*/
	get Text_Spongebob():ILanguageElement{return this.getElement(140)};
	/**钢铁侠*/
	get Text_IronMan():ILanguageElement{return this.getElement(141)};
	/**灭霸*/
	get Text_Thanos():ILanguageElement{return this.getElement(142)};
	/**刺猬小子*/
	get Text_HedgehogBoy():ILanguageElement{return this.getElement(143)};
	/**邪恶使者*/
	get Text_EvilMessenger1():ILanguageElement{return this.getElement(144)};
	/**蓝衣男*/
	get Text_BlueClothedMan():ILanguageElement{return this.getElement(145)};
	/**黑衣男*/
	get Text_BlackClothedMan():ILanguageElement{return this.getElement(146)};
	/**毁灭战士*/
	get Text_Doom():ILanguageElement{return this.getElement(147)};
	/**雷神*/
	get Text_ThunderGod():ILanguageElement{return this.getElement(148)};
	/**黑寡妇*/
	get Text_BlackWidow():ILanguageElement{return this.getElement(149)};
	/**可爱女*/
	get Text_CuteGirl():ILanguageElement{return this.getElement(150)};
	/**丸子头女*/
	get Text_MarukoHeadGirl():ILanguageElement{return this.getElement(151)};
	/**西方神女*/
	get Text_WesternGoddess():ILanguageElement{return this.getElement(152)};
	/**黑裙少女*/
	get Text_BlackDressGirl():ILanguageElement{return this.getElement(153)};
	/**短发女*/
	get Text_ShortHairedWoman():ILanguageElement{return this.getElement(154)};
	/**旗袍女*/
	get Text_QipaoWomen():ILanguageElement{return this.getElement(155)};
	/**披风男*/
	get Text_ClothedMan():ILanguageElement{return this.getElement(156)};
	/**长发女*/
	get Text_LongHairedWoman():ILanguageElement{return this.getElement(157)};
	/**双马尾女*/
	get Text_DoublePonytailGirl1():ILanguageElement{return this.getElement(158)};
	/**长发短裙女*/
	get Text_WomenWithLongHairAndShortSkirts():ILanguageElement{return this.getElement(159)};
	/**双马尾女*/
	get Text_DoublePonytailGirl2():ILanguageElement{return this.getElement(160)};
	/**双马尾女*/
	get Text_DoublePonytailGirl3():ILanguageElement{return this.getElement(161)};
	/**百褶裙女孩*/
	get Text_PleatedSkirtGirl():ILanguageElement{return this.getElement(162)};
	/**短发时尚女*/
	get Text_ShortHairedFashionableWomen():ILanguageElement{return this.getElement(163)};
	/**长马尾女孩*/
	get Text_LongPonytailGirl():ILanguageElement{return this.getElement(164)};
	/**长耳女*/
	get Text_LongEaredGirl():ILanguageElement{return this.getElement(165)};
	/**风衣长发女*/
	get Text_LongHairedWomanInWindbreaker():ILanguageElement{return this.getElement(166)};
	/**恶魔角女*/
	get Text_DevilHornGirl():ILanguageElement{return this.getElement(167)};
	/**和服女*/
	get Text_KimonoGirl():ILanguageElement{return this.getElement(168)};
	/**发卡女*/
	get Text_HairpinGirl():ILanguageElement{return this.getElement(169)};
	/**女仆套装女*/
	get Text_MaidSuitForWomen():ILanguageElement{return this.getElement(170)};
	/**帽子女*/
	get Text_HatGirl():ILanguageElement{return this.getElement(171)};
	/**魔法女孩*/
	get Text_MagicalGirl():ILanguageElement{return this.getElement(172)};
	/**长裙女*/
	get Text_LongSkirtWomen():ILanguageElement{return this.getElement(173)};
	/**杀手女*/
	get Text_KillerWoman():ILanguageElement{return this.getElement(174)};
	/**巫医*/
	get Text_WitchDoctor():ILanguageElement{return this.getElement(175)};
	/**长腿妈妈*/
	get Text_LongLeggedMom():ILanguageElement{return this.getElement(176)};
	/**玄魁*/
	get Text_XuanKui():ILanguageElement{return this.getElement(177)};
	/**邪恶女巫*/
	get Text_EvilWitch():ILanguageElement{return this.getElement(178)};
	/**小丑女*/
	get Text_LittleUglyGirl():ILanguageElement{return this.getElement(179)};
	/**万圣节女*/
	get Text_HalloweenGirl():ILanguageElement{return this.getElement(180)};
	/**屠夫*/
	get Text_Butcher():ILanguageElement{return this.getElement(181)};
	/**魔莱坞学院院长*/
	get Text_DeanOfMolewoodCollege():ILanguageElement{return this.getElement(182)};
	/**迷雾鬼影*/
	get Text_MistyGhostShadow():ILanguageElement{return this.getElement(183)};
	/**蓝毛怪*/
	get Text_BlueHairedMonster():ILanguageElement{return this.getElement(184)};
	/**狗头毛毛虫*/
	get Text_DogHeadedCaterpillar():ILanguageElement{return this.getElement(185)};
	/**粉毛怪*/
	get Text_PinkHairedMonster():ILanguageElement{return this.getElement(186)};
	/**索尼克*/
	get Text_SonicAdvance():ILanguageElement{return this.getElement(187)};
	/**Rainbow friends*/
	get Text_RainbowFriends():ILanguageElement{return this.getElement(188)};
	/**海神*/
	get Text_SeaGod():ILanguageElement{return this.getElement(189)};
	/**恶魔翅膀*/
	get Text_DevilSWings():ILanguageElement{return this.getElement(190)};
	/**恶魔角*/
	get Text_DevilSCorner():ILanguageElement{return this.getElement(191)};
	/**恶魔尾巴*/
	get Text_DevilSTail():ILanguageElement{return this.getElement(192)};
	/**恶魔头骨*/
	get Text_DemonSkull():ILanguageElement{return this.getElement(193)};
	/**恶魔三头犬*/
	get Text_DevilSThreeHeadedDog():ILanguageElement{return this.getElement(194)};
	/**天使翅膀*/
	get Text_AngelWings():ILanguageElement{return this.getElement(195)};
	/**天使蜘蛛*/
	get Text_AngelSpider():ILanguageElement{return this.getElement(196)};
	/**狐狸尾巴*/
	get Text_FoxSTail():ILanguageElement{return this.getElement(197)};
	/**狐狸耳朵*/
	get Text_FoxEars():ILanguageElement{return this.getElement(198)};
	/**挥动的围巾*/
	get Text_WavingScarf():ILanguageElement{return this.getElement(199)};
	/**闪电翅膀*/
	get Text_LightningWings():ILanguageElement{return this.getElement(200)};
	/**眼镜*/
	get Text_Glasses():ILanguageElement{return this.getElement(201)};
	/**拍照机器人*/
	get Text_PhotographyRobot():ILanguageElement{return this.getElement(202)};
	/**面纱*/
	get Text_Veil():ILanguageElement{return this.getElement(203)};
	/**火箭发射器*/
	get Text_RocketLauncher():ILanguageElement{return this.getElement(204)};
	/**狙击枪枪身*/
	get Text_SniperGunBody():ILanguageElement{return this.getElement(205)};
	/**可爱西方龙*/
	get Text_CuteWesternDragon():ILanguageElement{return this.getElement(206)};
	/**龙*/
	get Text_Loong():ILanguageElement{return this.getElement(207)};
	/**帝王龙*/
	get Text_EmperorDragon():ILanguageElement{return this.getElement(208)};
	/**地狱龙*/
	get Text_HellDragon():ILanguageElement{return this.getElement(209)};
	/**糖果龙*/
	get Text_CandyDragon():ILanguageElement{return this.getElement(210)};
	/**武士龙*/
	get Text_WuShilong():ILanguageElement{return this.getElement(211)};
	/**水晶翅膀*/
	get Text_CrystalWings():ILanguageElement{return this.getElement(212)};
	/**杀戮翅膀*/
	get Text_KillingWings():ILanguageElement{return this.getElement(213)};
	/**地狱翅膀*/
	get Text_HellSWings():ILanguageElement{return this.getElement(214)};
	/**精灵翅膀*/
	get Text_FairyWings():ILanguageElement{return this.getElement(215)};
	/**火焰翅膀*/
	get Text_FlameWings():ILanguageElement{return this.getElement(216)};
	/**大剑*/
	get Text_BigSword():ILanguageElement{return this.getElement(217)};
	/**天使剑*/
	get Text_AngelSword():ILanguageElement{return this.getElement(218)};
	/**蛇女*/
	get Text_Snaker():ILanguageElement{return this.getElement(219)};
	/**络新妇*/
	get Text_ASpider():ILanguageElement{return this.getElement(220)};
	/**大蜘蛛*/
	get Text_BigSpider():ILanguageElement{return this.getElement(221)};
	/**小型抱脸紫蜘蛛*/
	get Text_SmallFaceHuggingPurpleSpider():ILanguageElement{return this.getElement(222)};
	/**小型抱脸红蜘蛛*/
	get Text_SmallBlushingSpider():ILanguageElement{return this.getElement(223)};
	/**小型抱脸绿蜘蛛*/
	get Text_SmallFaceHuggingGreenSpider():ILanguageElement{return this.getElement(224)};
	/**小型抱脸蓝蜘蛛*/
	get Text_SmallFaceHuggingBlueSpider():ILanguageElement{return this.getElement(225)};
	/**小龙*/
	get Text_Xiaolong():ILanguageElement{return this.getElement(226)};
	/**卡通木龙*/
	get Text_CartoonWoodenDragon():ILanguageElement{return this.getElement(227)};
	/**红龙*/
	get Text_RedDragon():ILanguageElement{return this.getElement(228)};
	/**黄龙*/
	get Text_Huanglong():ILanguageElement{return this.getElement(229)};
	/**蓝龙*/
	get Text_BlueDragon():ILanguageElement{return this.getElement(230)};
	/**奥特之神*/
	get Text_TheGodOfOtter():ILanguageElement{return this.getElement(231)};
	/**成功开启自动攻击*/
	get Text_SuccessfullyActivatedAutomaticAttack():ILanguageElement{return this.getElement(232)};
	/**未获得自动攻击武魂*/
	get Text_FailedToObtainAutomaticAttackSoul():ILanguageElement{return this.getElement(233)};
	/**成功关闭自动攻击*/
	get Text_SuccessfullyDisabledAutomaticAttack():ILanguageElement{return this.getElement(234)};
	/**已获得*/
	get Text_Obtained():ILanguageElement{return this.getElement(235)};
	/**恭喜获得*/
	get Text_CongratulationsOnObtaining():ILanguageElement{return this.getElement(236)};
	/**魂力*/
	get Text_SoulPower():ILanguageElement{return this.getElement(237)};
	/**武魂*/
	get Text_MartialSoul():ILanguageElement{return this.getElement(238)};
	/**魂师*/
	get Text_SoulMaster():ILanguageElement{return this.getElement(239)};
	/**魂骨*/
	get Text_SoulBone():ILanguageElement{return this.getElement(240)};
	/**魂兽*/
	get Text_Ayakashi():ILanguageElement{return this.getElement(241)};
	/**普通*/
	get Text_Ordinary():ILanguageElement{return this.getElement(242)};
	/**稀有*/
	get Text_Rare():ILanguageElement{return this.getElement(243)};
	/**史诗*/
	get Text_Epic():ILanguageElement{return this.getElement(244)};
	/**传说*/
	get Text_Legend():ILanguageElement{return this.getElement(245)};
	/**杀神领域*/
	get Text_KillingGodDomain():ILanguageElement{return this.getElement(246)};
	/**斗神大陆(我的魂环无限升级)*/
	get Text_DoushenContinent_MySoulRingUnlimitedUpgrade():ILanguageElement{return this.getElement(247)};
	/**装备中*/
	get Text_InTheEquipment():ILanguageElement{return this.getElement(248)};
	/**使用中*/
	get Text_InUse():ILanguageElement{return this.getElement(249)};
	/**跟随中*/
	get Text_FollowIn():ILanguageElement{return this.getElement(250)};
	/**新手礼包获取*/
	get Text_BeginnerGiftPackAcquisition():ILanguageElement{return this.getElement(251)};
	/**金币抽奖获取*/
	get Text_GoldCoinLotteryToObtain():ILanguageElement{return this.getElement(252)};
	/**请先完成新手引导*/
	get Text_PleaseCompleteTheBeginnerGuideFirst():ILanguageElement{return this.getElement(253)};
	/**看广告获得*/
	get Text_ObtainByWatchingAdvertisements():ILanguageElement{return this.getElement(254)};
	/**老玩家回归获得*/
	get Text_OldPlayersReturningToObtain():ILanguageElement{return this.getElement(255)};
	/**未获得*/
	get Text_NotObtained():ILanguageElement{return this.getElement(256)};
	/**开始引导*/
	get Text_StartGuiding():ILanguageElement{return this.getElement(257)};
	/**购买成功*/
	get Text_PurchaseSuccessful():ILanguageElement{return this.getElement(258)};
	/**装备成功*/
	get Text_EquipmentSuccessful():ILanguageElement{return this.getElement(259)};
	/**穿戴成功*/
	get Text_WearingSuccessfully():ILanguageElement{return this.getElement(260)};
	/**跟随成功*/
	get Text_FollowSuccess():ILanguageElement{return this.getElement(261)};
	/**功能暂未开放，敬请期待*/
	get Text_TheFunctionIsNotYetOpen_PleaseStayTuned():ILanguageElement{return this.getElement(262)};
	/**恢复成功*/
	get Text_RecoveryWasSuccessful():ILanguageElement{return this.getElement(263)};
	/**卸下成功*/
	get Text_RemovedSuccessfully():ILanguageElement{return this.getElement(264)};
	/**丢掉宠物成功*/
	get Text_SuccessfullyDiscardedPet():ILanguageElement{return this.getElement(265)};
	/**恢复初始形象*/
	get Text_RestoreInitialImage():ILanguageElement{return this.getElement(266)};
	/**卸下所有装备*/
	get Text_RemoveAllEquipment():ILanguageElement{return this.getElement(267)};
	/**取消宠物跟随*/
	get Text_CancelPetFollowing():ILanguageElement{return this.getElement(268)};
	/**点击使用*/
	get Text_ClickToUse():ILanguageElement{return this.getElement(269)};
	/**已拥有*/
	get Text_AlreadyOwned():ILanguageElement{return this.getElement(270)};
	/**点击获得*/
	get Text_ClickToGet():ILanguageElement{return this.getElement(271)};
	/**未拥有*/
	get Text_NotOwned():ILanguageElement{return this.getElement(272)};
	/**使用*/
	get Text_Use():ILanguageElement{return this.getElement(273)};
	/**金币购买*/
	get Text_PurchaseCoins():ILanguageElement{return this.getElement(274)};
	/**介绍*/
	get Text_Introduce():ILanguageElement{return this.getElement(275)};
	/**使用后血量和攻击力提升*/
	get Text_IncreasedHealthAndAttackPowerAfterUse():ILanguageElement{return this.getElement(276)};
	/**倍*/
	get Text_Times():ILanguageElement{return this.getElement(277)};
	/**消耗{0}钻石购买*/
	get Text_ConsumingDiamondsToPurchase():ILanguageElement{return this.getElement(278)};
	/**消耗{0}派队币购买*/
	get Text_ConsumeTeamCoinsToPurchase():ILanguageElement{return this.getElement(279)};
	/**御剑飞行商城*/
	get Text_YujianFlyingMall():ILanguageElement{return this.getElement(280)};
	/**御剑飞行总加成*/
	get Text_RoyalSwordFlyingBonus():ILanguageElement{return this.getElement(281)};
	/**御剑_智弑者*/
	get Text_MitsurugiSmartKiller():ILanguageElement{return this.getElement(282)};
	/**御剑_黄金剑*/
	get Text_MitsurugiGoldenSword():ILanguageElement{return this.getElement(283)};
	/**御剑_冰钻剑*/
	get Text_MitsurugiIceDiamondSword():ILanguageElement{return this.getElement(284)};
	/**御剑_恶魔剑*/
	get Text_MitsurugiDemonSword():ILanguageElement{return this.getElement(285)};
	/**御剑_断狂剑*/
	get Text_MitsurugiBrokenCrazySword():ILanguageElement{return this.getElement(286)};
	/**御剑_飞行器*/
	get Text_MitsurugiAerocraft():ILanguageElement{return this.getElement(287)};
	/**御剑_飞镖*/
	get Text_MitsurugiImperialSwordDart():ILanguageElement{return this.getElement(288)};
	/**御剑_小单车*/
	get Text_MitsurugiSmallBicycle():ILanguageElement{return this.getElement(289)};
	/**御剑_反正很帅*/
	get Text_MitsurugiAnywayHeShandsome():ILanguageElement{return this.getElement(290)};
	/**御剑_滑板*/
	get Text_MitsurugiSkate():ILanguageElement{return this.getElement(291)};
	/**御剑_小绿龙*/
	get Text_MitsurugiLittleGreenDragon():ILanguageElement{return this.getElement(292)};
	/**御剑_小蓝龙*/
	get Text_MitsurugiXiaolanLong():ILanguageElement{return this.getElement(293)};
	/**御剑_小火龙*/
	get Text_MitsurugiLittleFireDragon():ILanguageElement{return this.getElement(294)};
	/**御剑飞行购买成功*/
	get Text_YujianFlyingHasBeenSuccessfullyPurchased():ILanguageElement{return this.getElement(295)};
	/**装备御剑飞行*/
	get Text_EquippingSwordFlying():ILanguageElement{return this.getElement(296)};
	/**未装备御剑飞行*/
	get Text_FlyingWithoutEquippedSword():ILanguageElement{return this.getElement(297)};
	/**卸下御剑飞行*/
	get Text_RemoveTheImperialSwordAndFly():ILanguageElement{return this.getElement(298)};
	/**血量提升{0}倍*/
	get Text_IncreaseBloodVolumeByTimes_Nowrap():ILanguageElement{return this.getElement(299)};
	/**攻击力提升{0}倍*/
	get Text_AttackPowerIncreasedByTimes_Nowrap():ILanguageElement{return this.getElement(300)};
	/**点击任意位置继续……*/
	get Text_ClickAnywhereToContinue():ILanguageElement{return this.getElement(301)};
	/**欢迎来到
{0}
我来给你介绍一下所有按钮操作吧。*/
	get Text_Guid_0():ILanguageElement{return this.getElement(302)};
	/**移动按钮，点击后拖拽可以控制角色移动。*/
	get Text_Guid_1():ILanguageElement{return this.getElement(303)};
	/**视角移动区域，点击拖动这里可以控制屏幕视角。*/
	get Text_Guid_2():ILanguageElement{return this.getElement(304)};
	/**跳跃按钮，连续点击会进行二段跳，会消耗{0}*/
	get Text_Guid_3():ILanguageElement{return this.getElement(305)};
	/**御剑飞行，可以飞行*/
	get Text_Guid_4():ILanguageElement{return this.getElement(306)};
	/**攻击按钮，连续点击可释放炫酷的连招，会消耗{0}*/
	get Text_Guid_5():ILanguageElement{return this.getElement(307)};
	/**自动攻击按钮、开启自动攻击*/
	get Text_Guid_6():ILanguageElement{return this.getElement(308)};
	/**开启魂环按钮，可展示魂环。*/
	get Text_Guid_7():ILanguageElement{return this.getElement(309)};
	/**背景音乐按钮，打开可更换背景音乐以及开关背景音乐。*/
	get Text_Guid_8():ILanguageElement{return this.getElement(310)};
	/**点我回家按钮，当你被卡在地图中无法移动时可以点击我试试哦。*/
	get Text_Guid_9():ILanguageElement{return this.getElement(311)};
	/**背包按钮，提升等级最快的办法就是在地图中寻找武魂、职业、魂骨、宠物。*/
	get Text_Guid_10():ILanguageElement{return this.getElement(312)};
	/**排行榜按钮，打开可以进行查看房间内排行榜和世界排行榜，快来查看你在斗罗大陆的排名是多少吧。*/
	get Text_Guid_11():ILanguageElement{return this.getElement(313)};
	/**金币抽奖按钮，花不完的金币在这里可以兑现 钻石、等级、皮肤哦*/
	get Text_Guid_12():ILanguageElement{return this.getElement(314)};
	/**在线奖励按钮，可以领取大量金币和经验来快速提升等级，在线10分钟即可快速升级到封号斗罗。*/
	get Text_Guid_13():ILanguageElement{return this.getElement(315)};
	/**任务按钮，完成任务可以领取大量金币和经验来快速提升等级，马上就可升级到神级。*/
	get Text_Guid_14():ILanguageElement{return this.getElement(316)};
	/**签到按钮，登录游戏签到领取大量钻石和等级。*/
	get Text_Guid_15():ILanguageElement{return this.getElement(317)};
	/**福利多多，最快提升等级的办法，无限升级，成为神级的捷径。*/
	get Text_Guid_16():ILanguageElement{return this.getElement(318)};
	/**御剑飞行，装备后可飞行。*/
	get Text_Guid_17():ILanguageElement{return this.getElement(319)};
	/**充值钻石，可充值大量钻石快速提升魂环年限、最快达到百万年级别。*/
	get Text_Guid_18():ILanguageElement{return this.getElement(320)};
	/**兑换奖励，领取兑换码兑换奖励，钻石+等级。*/
	get Text_Guid_19():ILanguageElement{return this.getElement(321)};
	/**新手礼包按钮，领取新手大礼包*/
	get Text_Guid_20():ILanguageElement{return this.getElement(322)};
	/**锻造魂环按钮，可以锻造魂环，使自己的魂环都达到十万年级别，第十环可以达到百万年级别*/
	get Text_Guid_21():ILanguageElement{return this.getElement(323)};
	/**挂机按钮，开启后、无需操作自动升级。*/
	get Text_Guid_22():ILanguageElement{return this.getElement(324)};
	/**开启防御，不会被队友误伤。*/
	get Text_Guid_23():ILanguageElement{return this.getElement(325)};
	/**角色属性，血量、{0}，攻击力会随等级提升而提升。*/
	get Text_Guid_24():ILanguageElement{return this.getElement(326)};
	/**可快速增加金币直接购买武魂、魂骨。*/
	get Text_Guid_25():ILanguageElement{return this.getElement(327)};
	/**可快速增加钻石锻造魂环。*/
	get Text_Guid_26():ILanguageElement{return this.getElement(328)};
	/**介绍完毕，欢迎游戏圈留言。跟我路标走，带你去找武魂、魂骨。*/
	get Text_Guid_27():ILanguageElement{return this.getElement(329)};
	/**锻造魂骨*/
	get Text_Guid_28():ILanguageElement{return this.getElement(330)};
	/**已到达目标点附近*/
	get Text_ArrivedNearTheTargetPoint():ILanguageElement{return this.getElement(331)};
	/**返回新手村*/
	get Text_ReturnToNewbieVillage():ILanguageElement{return this.getElement(332)};
	/**正式开启你的副本吧*/
	get Text_LetSOfficiallyOpenYourCopy():ILanguageElement{return this.getElement(333)};
	/**击败*/
	get Text_Beat():ILanguageElement{return this.getElement(334)};
	/**御剑飞行*/
	get Text_SwordFlying():ILanguageElement{return this.getElement(335)};
	/**自动攻击*/
	get Text_AutomaticAttack():ILanguageElement{return this.getElement(336)};
	/**背景音乐*/
	get Text_BackgroundMusic():ILanguageElement{return this.getElement(337)};
	/**点我回家*/
	get Text_ClickOnMeToGoHome():ILanguageElement{return this.getElement(338)};
	/**背包*/
	get Text_Knapsack():ILanguageElement{return this.getElement(339)};
	/**排行榜*/
	get Text_RankingList():ILanguageElement{return this.getElement(340)};
	/**金币抽奖*/
	get Text_GoldCoinLottery():ILanguageElement{return this.getElement(341)};
	/**领取任务*/
	get Text_CollectingTasks():ILanguageElement{return this.getElement(342)};
	/**签到*/
	get Text_SignIn():ILanguageElement{return this.getElement(343)};
	/**充值钻石*/
	get Text_RechargeDiamonds():ILanguageElement{return this.getElement(344)};
	/**兑换奖励*/
	get Text_ExchangeRewards():ILanguageElement{return this.getElement(345)};
	/**锻造魂环*/
	get Text_ForgeSoulRings():ILanguageElement{return this.getElement(346)};
	/**新手礼包*/
	get Text_NoviceGiftPack():ILanguageElement{return this.getElement(347)};
	/**锻造魂骨*/
	get Text_ForgeSoulBones():ILanguageElement{return this.getElement(348)};
	/**是否开启队友误伤*/
	get Text_DoYouWantToActivateTeammateAccidentalInjury():ILanguageElement{return this.getElement(349)};
	/**开启挂机*/
	get Text_EnableAfk():ILanguageElement{return this.getElement(350)};
	/**已关闭防御*/
	get Text_DefenseHasBeenTurnedOff():ILanguageElement{return this.getElement(351)};
	/**已开启防御*/
	get Text_DefenseActivated():ILanguageElement{return this.getElement(352)};
	/**收起*/
	get Text_PutItAway():ILanguageElement{return this.getElement(353)};
	/**开启*/
	get Text_Open():ILanguageElement{return this.getElement(354)};
	/**击败了*/
	get Text_Defeated():ILanguageElement{return this.getElement(355)};
	/**你已被 {0} 击败*/
	get Text_YouHaveBeenDefeatedBy():ILanguageElement{return this.getElement(356)};
	/**击败 {0} 完成复仇*/
	get Text_DefeatToCompleteRevenge():ILanguageElement{return this.getElement(357)};
	/**等级：*/
	get Text_Grade_MaoHao():ILanguageElement{return this.getElement(358)};
	/**经验：*/
	get Text_Experience():ILanguageElement{return this.getElement(359)};
	/**攻击力：*/
	get Text_Aggressivity():ILanguageElement{return this.getElement(360)};
	/**级解锁*/
	get Text_LevelUnlock():ILanguageElement{return this.getElement(361)};
	/**血量：*/
	get Text_BloodVolume():ILanguageElement{return this.getElement(362)};
	/**不足*/
	get Text_Insufficient():ILanguageElement{return this.getElement(363)};
	/**升级增加{0}储量*/
	get Text_UpgradeToIncreaseReserves():ILanguageElement{return this.getElement(364)};
	/**秒内攻击力翻倍*/
	get Text_DoubleTheAttackPowerWithinSeconds():ILanguageElement{return this.getElement(365)};
	/**级开启*/
	get Text_LevelOpen():ILanguageElement{return this.getElement(366)};
	/**技能还没准备好*/
	get Text_TheSkillsAreNotReadyYet():ILanguageElement{return this.getElement(367)};
	/**升级成功 等级+{0}*/
	get Text_UpgradeSuccessLevel():ILanguageElement{return this.getElement(368)};
	/**连续消灭2人！势不可当！*/
	get Text_ContinuouslyEliminatePeople_2():ILanguageElement{return this.getElement(369)};
	/**连续消灭3人！勇冠三军！*/
	get Text_ContinuouslyEliminatePeople_3():ILanguageElement{return this.getElement(370)};
	/**连续消灭4人！无人能敌！*/
	get Text_ContinuouslyEliminatePeople_4():ILanguageElement{return this.getElement(371)};
	/**连续消灭5人！横扫千军！*/
	get Text_ContinuouslyEliminatePeople_5():ILanguageElement{return this.getElement(372)};
	/**连续消灭6人！接近神了！*/
	get Text_ContinuouslyEliminatePeople_6():ILanguageElement{return this.getElement(373)};
	/**连续消灭{0}人！超越神了！*/
	get Text_ContinuouslyEliminatePeople_7():ILanguageElement{return this.getElement(374)};
	/**免费升级*/
	get Text_FreeUpgrade_Simoleness():ILanguageElement{return this.getElement(375)};
	/**挂机中*/
	get Text_HangingOnTheHook():ILanguageElement{return this.getElement(376)};
	/**取消挂机*/
	get Text_CancelAfk():ILanguageElement{return this.getElement(377)};
	/**级*/
	get Text_Level():ILanguageElement{return this.getElement(378)};
	/**黑悟空关卡*/
	get Text_BlackMonkeyKingLevel():ILanguageElement{return this.getElement(379)};
	/**百万年魂兽*/
	get Text_MillionYearSoulBeast():ILanguageElement{return this.getElement(380)};
	/**回城*/
	get Text_ReturningToTheCity():ILanguageElement{return this.getElement(381)};
	/**请先将等级提升至{0}级*/
	get Text_PleaseFirstRaiseTheLevelToLevel():ILanguageElement{return this.getElement(382)};
	/**空奖-哈哈*/
	get Text_EmptyPrizeHaha():ILanguageElement{return this.getElement(383)};
	/**中奖概率*/
	get Text_WinningProbability():ILanguageElement{return this.getElement(384)};
	/**抽{0}次*/
	get Text_DrawTimes():ILanguageElement{return this.getElement(385)};
	/**消耗{0}金币*/
	get Text_ConsumeCoins():ILanguageElement{return this.getElement(386)};
	/**消耗{0}派队币*/
	get Text_ConsumeDispatchCoins():ILanguageElement{return this.getElement(387)};
	/**免费抽奖*/
	get Text_FreeLotteryDraw():ILanguageElement{return this.getElement(388)};
	/**抽奖结果*/
	get Text_LotteryResults():ILanguageElement{return this.getElement(389)};
	/**恭喜中奖*/
	get Text_CongratulationsOnWinningThePrize():ILanguageElement{return this.getElement(390)};
	/**获得{0}钻石*/
	get Text_ObtainDiamonds():ILanguageElement{return this.getElement(391)};
	/**打开背包使用*/
	get Text_OpenTheBackpackForUse():ILanguageElement{return this.getElement(392)};
	/**第一天*/
	get Text_FirstDay():ILanguageElement{return this.getElement(393)};
	/**第二天*/
	get Text_TheSecondDay():ILanguageElement{return this.getElement(394)};
	/**老玩家回归礼包*/
	get Text_ReturnGiftPackageForVeteranPlayers():ILanguageElement{return this.getElement(395)};
	/**在线时间不足{0}分钟*/
	get Text_OnlineTimeIsLessThanMinutes():ILanguageElement{return this.getElement(396)};
	/**领取成功*/
	get Text_ReceivedSuccessfully():ILanguageElement{return this.getElement(397)};
	/**不能重复领取*/
	get Text_CannotBeClaimedRepeatedly():ILanguageElement{return this.getElement(398)};
	/**请第{0}天再来领取*/
	get Text_PleaseComeBackToCollectOnTheThDay():ILanguageElement{return this.getElement(399)};
	/**领取后打开背包使用*/
	get Text_OpenTheBackpackAndUseItAfterReceivingIt():ILanguageElement{return this.getElement(400)};
	/**在线{0}分钟({1}/{2})*/
	get Text_OnlineMinutes():ILanguageElement{return this.getElement(401)};
	/**已领取*/
	get Text_ReceivedAlready():ILanguageElement{return this.getElement(402)};
	/**在线奖励*/
	get Text_OnlineRewards():ILanguageElement{return this.getElement(403)};
	/**可领取*/
	get Text_CanBeClaimed():ILanguageElement{return this.getElement(404)};
	/**在线时间不足*/
	get Text_InsufficientOnlineTime():ILanguageElement{return this.getElement(405)};
	/**领取奖励*/
	get Text_ClaimRewards():ILanguageElement{return this.getElement(406)};
	/**已领取奖励*/
	get Text_ReceivedReward():ILanguageElement{return this.getElement(407)};
	/**奖励{0}金币*/
	get Text_RewardCoins():ILanguageElement{return this.getElement(408)};
	/**奖励{0}经验*/
	get Text_RewardExperience():ILanguageElement{return this.getElement(409)};
	/**奖励{0}钻石*/
	get Text_RewardDiamonds():ILanguageElement{return this.getElement(410)};
	/**等级Lv.*/
	get Text_Lv():ILanguageElement{return this.getElement(411)};
	/**增加{0}金币*/
	get Text_IncreaseCoins():ILanguageElement{return this.getElement(412)};
	/**增加{0}经验*/
	get Text_IncreaseExperience():ILanguageElement{return this.getElement(413)};
	/**获得{0}金币*/
	get Text_GetCoins():ILanguageElement{return this.getElement(414)};
	/**等级提升至*/
	get Text_UpgradeLevelTo():ILanguageElement{return this.getElement(415)};
	/**暂无*/
	get Text_CurrentlyUnavailable():ILanguageElement{return this.getElement(416)};
	/**排名*/
	get Text_Ranking():ILanguageElement{return this.getElement(417)};
	/**名字*/
	get Text_Name():ILanguageElement{return this.getElement(418)};
	/**高度*/
	get Text_Height():ILanguageElement{return this.getElement(419)};
	/**击杀*/
	get Text_Kill():ILanguageElement{return this.getElement(420)};
	/**等级模式*/
	get Text_LevelMode():ILanguageElement{return this.getElement(421)};
	/**高度模式*/
	get Text_HeightMode():ILanguageElement{return this.getElement(422)};
	/**击杀模式*/
	get Text_KillMode():ILanguageElement{return this.getElement(423)};
	/**切换房间排行榜*/
	get Text_SwitchRoomLeaderboard():ILanguageElement{return this.getElement(424)};
	/**切换全服排行榜*/
	get Text_SwitchToTheFullServerRankingList():ILanguageElement{return this.getElement(425)};
	/**你所在房间内的排行榜。
点击右侧排行模式按钮会刷新排行榜模式。*/
	get Text_TheRankingListInYourRoom():ILanguageElement{return this.getElement(426)};
	/**房间排行榜*/
	get Text_RoomRanking():ILanguageElement{return this.getElement(427)};
	/**全服前{0}名
段位 Lv.等级排行。*/
	get Text_TopInTheEntireServer():ILanguageElement{return this.getElement(428)};
	/**全服排行榜*/
	get Text_FullServerRankingList():ILanguageElement{return this.getElement(429)};
	/**小手别点太快哟~*/
	get Text_DonTClickTooQuicklyWithYourLittleHand():ILanguageElement{return this.getElement(430)};
	/**十年*/
	get Text_Decade():ILanguageElement{return this.getElement(431)};
	/**百年*/
	get Text_AHundredYears():ILanguageElement{return this.getElement(432)};
	/**千年*/
	get Text_Millennium():ILanguageElement{return this.getElement(433)};
	/**万年*/
	get Text_TenThousandYears():ILanguageElement{return this.getElement(434)};
	/**十万年*/
	get Text_100000Years():ILanguageElement{return this.getElement(435)};
	/**百万年*/
	get Text_MillionsOfYears():ILanguageElement{return this.getElement(436)};
	/**万万年*/
	get Text_Eternity():ILanguageElement{return this.getElement(437)};
	/**亿万年*/
	get Text_BillionsOfYears():ILanguageElement{return this.getElement(438)};
	/**一*/
	get Text_1():ILanguageElement{return this.getElement(439)};
	/**二*/
	get Text_2():ILanguageElement{return this.getElement(440)};
	/**三*/
	get Text_3():ILanguageElement{return this.getElement(441)};
	/**四*/
	get Text_4():ILanguageElement{return this.getElement(442)};
	/**五*/
	get Text_5():ILanguageElement{return this.getElement(443)};
	/**六*/
	get Text_6():ILanguageElement{return this.getElement(444)};
	/**七*/
	get Text_7():ILanguageElement{return this.getElement(445)};
	/**八*/
	get Text_8():ILanguageElement{return this.getElement(446)};
	/**九*/
	get Text_9():ILanguageElement{return this.getElement(447)};
	/**十*/
	get Text_10():ILanguageElement{return this.getElement(448)};
	/**还未获取魂环*/
	get Text_NotYetObtainedSoulRing():ILanguageElement{return this.getElement(449)};
	/**联系作者修复*/
	get Text_ContactTheAuthorForRepair():ILanguageElement{return this.getElement(450)};
	/**等级不足*/
	get Text_InsufficientLevel():ILanguageElement{return this.getElement(451)};
	/**锻造成功*/
	get Text_SuccessfullyForged():ILanguageElement{return this.getElement(452)};
	/**总加成：血量提升{0}倍，攻击力提升{1}倍*/
	get Text_TotalBonus():ILanguageElement{return this.getElement(453)};
	/**恭喜你完成新手引导*/
	get Text_CongratulationsOnCompletingTheBeginnerSGuide():ILanguageElement{return this.getElement(454)};
	/**奖励第一魂环 十年魂环*/
	get Text_RewardTheFirstSoulRingWithATenYearSoulRing():ILanguageElement{return this.getElement(455)};
	/**第{0}魂环
{1}魂环 */
	get Text_TheSoulRingSoulRing():ILanguageElement{return this.getElement(456)};
	/**{0}级可解锁*/
	get Text_UnlockableAtLevel():ILanguageElement{return this.getElement(457)};
	/**需要消耗*/
	get Text_Cost():ILanguageElement{return this.getElement(458)};
	/**魂环*/
	get Text_SoulRing():ILanguageElement{return this.getElement(459)};
	/**可解锁*/
	get Text_Unlockable():ILanguageElement{return this.getElement(460)};
	/**补签*/
	get Text_SupplementarySignature():ILanguageElement{return this.getElement(461)};
	/**待领取*/
	get Text_Unclaimed():ILanguageElement{return this.getElement(462)};
	/**钻石 +{0} 等级 +{1}*/
	get Text_DiamondGrade():ILanguageElement{return this.getElement(463)};
	/**第{0}天*/
	get Text_Day():ILanguageElement{return this.getElement(464)};
	/**{0}日签到*/
	get Text_DayCheckIn():ILanguageElement{return this.getElement(465)};
	/**已签到*/
	get Text_SignedIn():ILanguageElement{return this.getElement(466)};
	/**成功获得今日奖励*/
	get Text_SuccessfullyObtainedTodaySReward():ILanguageElement{return this.getElement(467)};
	/**还未到签到日期*/
	get Text_TheCheckInDateHasNotYetArrived():ILanguageElement{return this.getElement(468)};
	/**每日登陆游戏（{0}/{1}）*/
	get Text_DailyLoginToGames():ILanguageElement{return this.getElement(469)};
	/**每日在线时长{2}分钟（{0}/{1}）*/
	get Text_DailyOnlineMinutes():ILanguageElement{return this.getElement(470)};
	/**每日击败{2}只美杜莎（{0}/{1}）*/
	get Text_DefeatMedusaEveryDay():ILanguageElement{return this.getElement(471)};
	/**每日击败{2}只蜘蛛精（{0}/{1}）*/
	get Text_DefeatSpiderSpiritsDaily():ILanguageElement{return this.getElement(472)};
	/**每日击败{2}只炫彩蜘蛛（{0}/{1}）*/
	get Text_DefeatDazzlingSpidersDaily():ILanguageElement{return this.getElement(473)};
	/**每日击败{2}只龙兽（{0}/{1}）*/
	get Text_DefeatDragonBeastsDaily():ILanguageElement{return this.getElement(474)};
	/**每日击败{2}只丧尸（{0}/{1}）*/
	get Text_DefeatZombiesDaily():ILanguageElement{return this.getElement(475)};
	/**每日击败{2}只变异布偶（{0}/{1}）*/
	get Text_DefeatMutatedPuppetsDaily():ILanguageElement{return this.getElement(476)};
	/**每日击败{2}名玩家（{0}/{1}）*/
	get Text_DefeatPlayersDaily():ILanguageElement{return this.getElement(477)};
	/**每日等级提升{2}级（{0}/{1}）*/
	get Text_DailyLevelIncreaseByLevels():ILanguageElement{return this.getElement(478)};
	/**每日捡到{2}个秘宝（{0}/{1}）*/
	get Text_PickUpTreasuresEveryDay():ILanguageElement{return this.getElement(479)};
	/**每日观看{2}次广告（{0}/{1}）*/
	get Text_WatchAdsPerDay():ILanguageElement{return this.getElement(480)};
	/**每周登录{2}天（{0}/{1}）*/
	get Text_LoginDaysAWeek():ILanguageElement{return this.getElement(481)};
	/**每周时长达到30分钟{2}天（{0}/{1}）*/
	get Text_UpTo30MinutesAndDaysPerWeek():ILanguageElement{return this.getElement(482)};
	/**每周击败{2}只美杜莎（{0}/{1}）*/
	get Text_DefeatMedusaEveryWeek():ILanguageElement{return this.getElement(483)};
	/**每周击败{2}只蜘蛛精（{0}/{1}）*/
	get Text_DefeatSpiderSpiritsEveryWeek():ILanguageElement{return this.getElement(484)};
	/**每周击败{2}只炫彩蜘蛛（{0}/{1}）*/
	get Text_DefeatDazzlingSpidersEveryWeek():ILanguageElement{return this.getElement(485)};
	/**每周击败{2}只龙兽（{0}/{1}）*/
	get Text_DefeatDragonBeastsEveryWeek():ILanguageElement{return this.getElement(486)};
	/**每周击败{2}只丧尸（{0}/{1}）*/
	get Text_DefeatZombiesEveryWeek():ILanguageElement{return this.getElement(487)};
	/**每周击败{2}只变异布偶（{0}/{1}）*/
	get Text_DefeatMutatedPuppetsEveryWeek():ILanguageElement{return this.getElement(488)};
	/**每周击败{2}名玩家（{0}/{1}）*/
	get Text_DefeatPlayersPerWeek():ILanguageElement{return this.getElement(489)};
	/**每周等级提升{2}级（{0}/{1}）*/
	get Text_UpgradeByLevelsPerWeek():ILanguageElement{return this.getElement(490)};
	/**每周捡到{2}个秘宝（{0}/{1}）*/
	get Text_PickUpTreasuresEveryWeek():ILanguageElement{return this.getElement(491)};
	/**每周观看{2}次广告（{0}/{1}）*/
	get Text_WatchAdsPerWeek():ILanguageElement{return this.getElement(492)};
	/**每日任务*/
	get Text_DailyTasks():ILanguageElement{return this.getElement(493)};
	/**任务已全部完成，等待刷新...*/
	get Text_AllTasksHaveBeenCompletedWaitingForRefresh():ILanguageElement{return this.getElement(494)};
	/**每周任务*/
	get Text_WeeklyTasks():ILanguageElement{return this.getElement(495)};
	/**剩余：{0}小时*/
	get Text_RemainingHours():ILanguageElement{return this.getElement(496)};
	/**剩余：{0}天*/
	get Text_RemainingDays():ILanguageElement{return this.getElement(497)};
	/**未完成*/
	get Text_HangInTheAir():ILanguageElement{return this.getElement(498)};
	/**还未装备{0},去寻找{1}*/
	get Text_NotEquippedWithYetGoFind():ILanguageElement{return this.getElement(499)};
	/**魔兽美杜莎*/
	get Text_WarcraftMedusa():ILanguageElement{return this.getElement(500)};
	/**魔兽炫彩蜘蛛*/
	get Text_WarcraftColorfulSpider():ILanguageElement{return this.getElement(501)};
	/**魔兽蜘蛛精*/
	get Text_WarcraftSpiderSpirit():ILanguageElement{return this.getElement(502)};
	/**龙之魔兽*/
	get Text_DragonSWarcraft():ILanguageElement{return this.getElement(503)};
	/**丧尸*/
	get Text_Zombies():ILanguageElement{return this.getElement(504)};
	/**变异布偶*/
	get Text_MutatedPuppet():ILanguageElement{return this.getElement(505)};
	/**黑悟空*/
	get Text_BlackWukong():ILanguageElement{return this.getElement(506)};
	/**魔兽米老鼠*/
	get Text_MickeyMouse():ILanguageElement{return this.getElement(507)};
	/**{0}级 魂士*/
	get Text_LevelSoulMaster1():ILanguageElement{return this.getElement(508)};
	/**{0}级 魂师*/
	get Text_LevelSoulMaster2():ILanguageElement{return this.getElement(509)};
	/**{0}级 大魂师*/
	get Text_LevelSoulMaster3():ILanguageElement{return this.getElement(510)};
	/**{0}级 魂尊*/
	get Text_LevelSoulSovereign():ILanguageElement{return this.getElement(511)};
	/**{0}级 魂宗*/
	get Text_LevelSoulSect():ILanguageElement{return this.getElement(512)};
	/**{0}级 魂王*/
	get Text_LevelSoulKing():ILanguageElement{return this.getElement(513)};
	/**{0}级 魂帝*/
	get Text_LevelSoulEmperor():ILanguageElement{return this.getElement(514)};
	/**{0}级 魂圣*/
	get Text_LevelSoulSaint():ILanguageElement{return this.getElement(515)};
	/**{0}级 魂斗罗*/
	get Text_LevelContra():ILanguageElement{return this.getElement(516)};
	/**{0}级 封号斗罗*/
	get Text_LevelBannedDouluo():ILanguageElement{return this.getElement(517)};
	/**{0}级 巅峰斗罗*/
	get Text_LevelPeakDouluo():ILanguageElement{return this.getElement(518)};
	/**{0}级 半神*/
	get Text_LevelDemigod():ILanguageElement{return this.getElement(519)};
	/**{0}级 神官*/
	get Text_LevelDivineOfficer():ILanguageElement{return this.getElement(520)};
	/**{0}级 真神级*/
	get Text_LevelTrueGodLevel():ILanguageElement{return this.getElement(521)};
	/**{0}级 超神级*/
	get Text_LevelSuperGodLevel():ILanguageElement{return this.getElement(522)};
	/**{0}级 超神巅峰*/
	get Text_LevelSuperGodPeak():ILanguageElement{return this.getElement(523)};
	/**{0}级 神王*/
	get Text_LevelDivineKing():ILanguageElement{return this.getElement(524)};
	/**{0}级 万古仙帝*/
	get Text_LevelEternalImmortalEmperor():ILanguageElement{return this.getElement(525)};
	/**万古仙帝*/
	get Text_EternalImmortalEmperor():ILanguageElement{return this.getElement(526)};
	/**武魂-机甲斩狂风斩(男)*/
	get Text_MartialSoulMechSlashWindSlash_Male():ILanguageElement{return this.getElement(527)};
	/**武魂-机甲斩狂风斩(女)*/
	get Text_MartialSoulMechSlashWindSlash_Female():ILanguageElement{return this.getElement(528)};
	/**金箍棒(粉)+制服女孩*/
	get Text_GoldenHoopRodPowderUniformGirl():ILanguageElement{return this.getElement(529)};
	/**昊天锤+唐三
金箍棒(紫)+蓝银皇*/
	get HaotianHammerTangSan_GoldenHoopRodPurpleBlueSilverEmperor():ILanguageElement{return this.getElement(530)};
	/**黄金王子+JK女孩*/
	get Text_TheGoldenPrinceJkGirl():ILanguageElement{return this.getElement(531)};
	/**小蓝龙+小绿龙
小黑龙+小橘龙*/
	get Text_XiaolanGreenBlackOrangeDragon():ILanguageElement{return this.getElement(532)};
	/**概率提升成功*/
	get Text_ProbabilityIncreaseSuccess():ILanguageElement{return this.getElement(533)};
	/**魂骨强化成功*/
	get Text_SoulBoneStrengtheningSuccessful():ILanguageElement{return this.getElement(534)};
	/**魂骨强化失败*/
	get Text_SoulBoneStrengtheningFailed():ILanguageElement{return this.getElement(535)};
	/**领取限定皮肤*/
	get Text_ClaimLimitedSkin():ILanguageElement{return this.getElement(536)};
	/**领取自动攻击*/
	get Text_ClaimAutomaticAttack():ILanguageElement{return this.getElement(537)};
	/**已获得，打开背包使用*/
	get Text_ObtainedOpenTheBackpackToUse():ILanguageElement{return this.getElement(538)};
	/**开放世界*/
	get Text_Music_1():ILanguageElement{return this.getElement(539)};
	/**留下来*/
	get Text_Music_2():ILanguageElement{return this.getElement(540)};
	/**坏人*/
	get Text_Music_3():ILanguageElement{return this.getElement(541)};
	/**我会活下去*/
	get Text_Music_4():ILanguageElement{return this.getElement(542)};
	/**让我爱你*/
	get Text_Music_5():ILanguageElement{return this.getElement(543)};
	/**跑上那座山*/
	get Text_Music_6():ILanguageElement{return this.getElement(544)};
	/**爱恨我*/
	get Text_Music_7():ILanguageElement{return this.getElement(545)};
	/**假小子*/
	get Text_Music_8():ILanguageElement{return this.getElement(546)};
	/**关闭*/
	get Text_Music_9():ILanguageElement{return this.getElement(547)};
	/**天空的*/
	get Text_Music_10():ILanguageElement{return this.getElement(548)};
	/**事实上*/
	get Text_Music_11():ILanguageElement{return this.getElement(549)};
	/**早上好*/
	get Text_Music_12():ILanguageElement{return this.getElement(550)};
	/**独自一人*/
	get Text_Music_13():ILanguageElement{return this.getElement(551)};
	/**钱德里勒*/
	get Text_Music_14():ILanguageElement{return this.getElement(552)};
	/**不想知道*/
	get Text_Music_15():ILanguageElement{return this.getElement(553)};
	/**心情*/
	get Text_Music_16():ILanguageElement{return this.getElement(554)};
	/**金轮*/
	get Text_Music_17():ILanguageElement{return this.getElement(555)};
	/**不知道叫啥*/
	get Text_Music_18():ILanguageElement{return this.getElement(556)};
	/**也不知道叫啥*/
	get Text_Music_19():ILanguageElement{return this.getElement(557)};
	/**奖励{0}魂骨碎片*/
	get Text_RewardSoulBone():ILanguageElement{return this.getElement(558)};
	/**魂骨碎片不足*/
	get Text_InsufficientSoulBoneFragments():ILanguageElement{return this.getElement(559)};
	/**免费领取{0}魂骨碎片*/
	get Text_GetFreeBones():ILanguageElement{return this.getElement(560)};
	/**成功获得魂骨碎片+{0}*/
	get Text_SuccessfullyObtainedBones():ILanguageElement{return this.getElement(561)};
	/**升级*/
	get Text_Upgrade():ILanguageElement{return this.getElement(562)};
	/**锻造魂环*/
	get Text_ForgeSoulRings_Button():ILanguageElement{return this.getElement(563)};
	/**领取大量钻石
下次翻倍*/
	get Text_LotsOfDiamonds():ILanguageElement{return this.getElement(564)};
	/**十亿万年*/
	get Text_BillionsOfYears_10():ILanguageElement{return this.getElement(565)};
	/**百亿万年*/
	get Text_TensOfBillionsOfYears():ILanguageElement{return this.getElement(566)};
	/**千亿万年*/
	get Text_HundredsOfBillionsOfYears():ILanguageElement{return this.getElement(567)};
	/**修改称号*/
	get Text_ModifyTheTitle():ILanguageElement{return this.getElement(568)};
	/**等级达到{0}级
消耗{1}钻石即可修改称号*/
	get Text_TitleNameTips():ILanguageElement{return this.getElement(569)};
	/**请输入称号*/
	get Text_PleaseEnterTheTitle():ILanguageElement{return this.getElement(570)};
	/**修改成功*/
	get Text_ModifiedSuccessfully():ILanguageElement{return this.getElement(571)};
	/**重启游戏即可生效*/
	get Text_RestartTheGameToTakeEffect():ILanguageElement{return this.getElement(572)};
	/**限时特惠*/
	get Text_FlashSales():ILanguageElement{return this.getElement(573)};
	/**消耗{0}派队币*/
	get Text_ConsumeTeamCoins():ILanguageElement{return this.getElement(574)};
	/**钻石+{0}
魂骨碎片+{1}
金币+{2} 
等于 {3}次100连抽*/
	get Text_FlashTips():ILanguageElement{return this.getElement(575)};

}