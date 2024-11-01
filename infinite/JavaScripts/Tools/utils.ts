import { GameConfig } from "../config/GameConfig";
import GlobalData from "../const/GlobalData";
import { WorldConfigData } from "../module/RankModule/PlayerPropData";
import Console from "./Console";

export class Tween<T> extends mw.Tween<T> { }
export class Utils {

    /**
      * 随机获取指定范围内的整数
      * @param Min 起始值
      * @param Max 最大值
      * @returns 随机整数[min, max]
      */
    public static getRandomInteger(min: number, max: number): number {
        let Range = max - min;
        let Rand = Math.random();
        return (min + Math.round(Rand * Range));
    }

    /**
     * 获取指定范围内的随机数, decimalNum指小数保留多少位
     * @param maxNum 最大值
     * @param minNum 最小值
     * @param decimalNum 保留几位数
     * @returns 随机数[min, max]
     */
    public static getRandomDecimals(maxNum: number = 0, minNum: number = 0, decimalNum: number = 0): number {
        let max = 0;
        let min = 0;
        minNum <= maxNum ? (min = minNum, max = maxNum) : (min = maxNum, max = minNum);
        switch (arguments.length) {
            case 1:
                return Math.floor(Math.random() * (max + 1));
                break;
            case 2:
                return Math.floor(Math.random() * (max - min + 1) + min);
                break;
            case 3:
                return Number((Math.random() * (max - min) + min).toFixed(decimalNum));
                break;
            default:
                return Math.random();
                break;
        }
    }

    /**
     * 获取贝塞尔曲线的点的集合
     * @param points 点的集合, 至少包含起点和终点
     * @param num 想要生成多少点
     * @returns 
     */
    public static getCurvePointsInNum(points: Array<mw.Vector>, num: number): Array<mw.Vector> {
        let result: Array<mw.Vector> = new Array<mw.Vector>();
        for (let i: number = 0; i < num; i++) {
            let t: number = i / (num - 1);
            let point = this.getKeyPoint(points, t);
            result.push(point);
        }
        return result;
    }

    private static getKeyPoint(points: Array<mw.Vector>, t: number): mw.Vector {
        if (points.length > 1) {
            let dirs: Array<mw.Vector> = new Array<mw.Vector>();
            for (let i: number = 0; i < points.length - 1; ++i) {
                dirs.push(new mw.Vector(
                    points[i + 1].x - points[i].x,
                    points[i + 1].y - points[i].y,
                    points[i + 1].z - points[i].z
                ));
            }
            let points2: Array<mw.Vector> = new Array<mw.Vector>();
            for (let j: number = 0; j < dirs.length; j++) {
                points2.push(new mw.Vector(
                    points[j].x + dirs[j].x * t,
                    points[j].y + dirs[j].y * t,
                    points[j].z + dirs[j].z * t
                ));
            }
            return this.getKeyPoint(points2, t);
        }
        else {
            return new mw.Vector(points[0].x, points[0].y, points[0].z);
        }
    }

    /**
     * 震荡函数
     * @param x 
     * @param speed 震荡衰减/增益的速度
     * @param frequency 震荡的频率
     * @param amplitude 震荡的幅度
     * @returns 
     */
    public static shakeFunc(x: number, speed: number, frequency: number, amplitude: number): number {
        return (Math.pow(speed, -x) * Math.sin(2 * frequency * Math.PI * x)) / amplitude;
    }

    /**
     * 获取三维向量的夹角(点乘 - dot product)
     * @param center 夹角中心点
     * @param start 起始点
     * @param end 结束点
     * @returns 返回夹角
     */
    public static getTdAngle(center: mw.Vector, start: mw.Vector, end: mw.Vector): number {
        let x1 = start.x - center.x, y1 = start.y - center.y, z1 = start.z - center.z;
        let x2 = end.x - center.x, y2 = end.y - center.y, z2 = end.z - center.z;
        let vectorDot = x1 * x2 + y1 * y2 + z1 * z2;
        let vectorMold1 = Math.sqrt(Math.pow(x1, 2) + Math.pow(y1, 2) + Math.pow(z1, 2));
        let vectorMold2 = Math.sqrt(Math.pow(x2, 2) + Math.pow(y2, 2) + Math.pow(z2, 2));
        let cosAngle = vectorDot / (vectorMold1 * vectorMold2);
        let radian = Math.acos(cosAngle);

        return (180 / Math.PI * radian);
    }

    /**
    * 获取两个向量围成的面积（叉乘 - multiplication cross）
    * @param center 夹角中心点
    * @param start 起始点
    * @param end 结束点
    * @returns 面积
    */
    public static getmsArea(center: mw.Vector, start: mw.Vector, end: mw.Vector): number {
        let x1 = start.x - center.x, y1 = start.y - center.y, z1 = start.z - center.z;
        let x2 = end.x - center.x, y2 = end.y - center.y, z2 = end.z - center.z;
        let vectorMultiplication = new mw.Vector(y1 * z2 - z1 * y2, z1 * x2 - x1 * z2, x1 * y2 - y1 * x2);
        Console.error("[叉乘 - vectorMultiplication]" + vectorMultiplication);
        let area = Math.sqrt(Math.pow(vectorMultiplication.x, 2) + Math.pow(vectorMultiplication.y, 2) + Math.pow(vectorMultiplication.z, 2));
        return area;
    }

    public static setWidgetVisibility(ui: mw.Widget, visibility: mw.SlateVisibility): void {
        if (ui.visibility != visibility) ui.visibility = visibility;
    }

    /**得到今天日期 */
    public static getDay(): string {
        let day: string = "";
        day += new Date().getFullYear();
        day += (new Date().getMonth() + 1);
        day += new Date().getDate();
        return day;
    }

    /**今天是星期几 */
    // public static getWhatDay(): string {
    //     let whatDay = "7123456".charAt(new Date().getDay());
    //     Console.error("whatDay = [" + whatDay + "]");
    //     return whatDay;
    // }

    /**
     * 随机从数组中取出num个数据
     * @param arr 数组
     * @param num 多少个
     * @returns 数组
     */
    public static getRandomArr(arr: number[], num: number): number[] {
        let len = arr.length;
        for (let i = len - 1; i >= 0; --i) {
            let randomIndex = Math.floor(Math.random() * (i + 1));
            let itemIndex = arr[randomIndex];
            arr[randomIndex] = arr[i];
            arr[i] = itemIndex;
        }
        let arrList: number[] = [];
        for (let i = 0; i < num; ++i) {
            arrList.push(arr[i]);
        }
        return arrList;
    }

    public static circularRandomCoordinates(point: mw.Vector, radius: number, centerZ: number): mw.Vector {
        const u = Math.random();
        const theta = Math.random() * 2 * Math.PI;
        const r = Math.sqrt(u);
        return new mw.Vector(point.x + r * Math.cos(theta) * radius, point.y + r * Math.sin(theta) * radius, centerZ);
    }

    /**随机两个不一样的颜色 */
    public static randomColor(): mw.LinearColor[] {
        let colors: mw.LinearColor[] = [mw.LinearColor.red, mw.LinearColor.green, mw.LinearColor.blue,
        mw.LinearColor.yellow, new mw.LinearColor(1, 0, 1, 1), new mw.LinearColor(0, 1, 1, 1), mw.LinearColor.white];
        let fontColor = colors[this.getRandomInteger(0, colors.length - 1)];
        let outlineColor = colors[this.getRandomInteger(0, colors.length - 1)];
        while (fontColor.a == outlineColor.a && fontColor.r == outlineColor.r
            && fontColor.g == outlineColor.g && fontColor.b == outlineColor.b) {
            outlineColor = colors[this.getRandomInteger(0, colors.length - 1)];
            Console.error("颜色重复");
        }
        return [fontColor, outlineColor];
    }

    /**
    * 返回当前时间（例 13：15）。
    * @returns 
    */
    public static getCurrentTime(): string {
        let date = new Date();
        return date.getHours() + ":" + date.getMinutes();
    }

    /**
     * 今天是星期几
     * @returns 
     */
    public static getWhatDay(): string {
        let whatDay = "7123456".charAt(new Date().getDay());
        return whatDay;
    }

    /**
     * 返回上次登录是周几
     * @param day 
     * @returns 
     */
    public static getLastDay(day: number): string {
        let whatDay = "7123456".charAt(day);
        return whatDay;
    }

    /**
     * 判断是否同一周
     * @param date1 
     * @param date2 
     * @returns 
     */
    public static iSameWeek(date1, date2): boolean {
        let dt1 = new Date();
        dt1.setTime(date1);
        let dt2 = new Date();
        dt2.setTime(date2);
        let md1 = this.tmonday(dt1);
        let md2 = this.tmonday(dt2);
        return md1 === md2;
    }

    public static tmonday(dtm): string {
        let dte = new Date(dtm);
        let day = dte.getDay();
        let dty = dte.getDate();
        if (day === 0) {
            day = 7;
        }
        dte.setDate(dty - day + 1);
        return dte.getFullYear() + '-' + dte.getMonth() + '-' + dte.getDate();
    }

    /**
     * 开打UI缓动
     * @param mCanvas 
     * @param onStart 
     * @param onComplete 
     */
    public static openUITween(mCanvas: mw.Canvas, onStart: () => void, onComplete: () => void): void {
        let tmpX: number = 0;
        let tmpY: number = 0;
        if (this.getRandomInteger(0, 1) == 0) {
            if (this.getRandomInteger(0, 1)) {
                tmpX = mCanvas.size.x;
            } else {
                tmpX = -mCanvas.size.x;
            }
            tmpY = this.getRandomInteger(-mCanvas.size.y, mCanvas.size.y);
            Console.error("wfz - A - tmpX = " + tmpX + "\ntmpY = " + tmpY);
        } else {
            tmpX = this.getRandomInteger(-mCanvas.size.x, mCanvas.size.x);
            if (this.getRandomInteger(0, 1)) {
                tmpY = mCanvas.size.y;
            } else {
                tmpY = -mCanvas.size.y;
            }
            Console.error("wfz - A - tmpX = " + tmpX + "\ntmpY = " + tmpY);
        }
        new mw.Tween({ x: tmpX, y: tmpY })
            .to({ x: 0, y: 0 }, 0.5 * 1000)
            .onStart(() => {
                mCanvas.position = new mw.Vector2(tmpX, tmpY);
                if (onStart) onStart();
            })
            .onUpdate((v) => {
                mCanvas.position = new mw.Vector2(v.x, v.y);
            })
            .easing(cubicBezier(.75, 2.9, .46, -0.18))
            .onComplete(() => {
                mCanvas.position = mw.Vector2.zero;
                if (onComplete) onComplete();
            })
            .start();

        let scaleType = this.getRandomInteger(0, 2);
        new mw.Tween({ x: 0, y: 0 })
            .to({ x: 1, y: 1 }, 0.5 * 1000)
            .onStart(() => {
                switch (scaleType) {
                    case 0:
                        mCanvas.renderScale = new mw.Vector2(1, 0);
                        break;
                    case 1:
                        mCanvas.renderScale = new mw.Vector2(0, 1);
                        break;
                    case 2:
                        mCanvas.renderScale = new mw.Vector2(1, 1);
                        break;
                    default:
                        break;
                }
            })
            .onUpdate((v) => {
                switch (scaleType) {
                    case 0:
                        mCanvas.renderScale = new mw.Vector2(1, v.y);
                        break;
                    case 1:
                        mCanvas.renderScale = new mw.Vector2(v.x, 1);
                        break;
                    case 2:
                        mCanvas.renderScale = new mw.Vector2(v.x, v.y);
                        break;
                    default:
                        break;
                }
            })
            .onComplete(() => {
                mCanvas.renderScale = mw.Vector2.one;
            })
            .start();
    }

    /**
     * 开打UI缓动
     * @param mCanvas 
     * @param onStart 
     * @param onComplete 
     */
    public static openUITween1(mCanvas: mw.Canvas, onStart: () => void, onComplete: () => void): void {
        let scaleType = this.getRandomInteger(0, 2);
        new mw.Tween({ x: 0, y: 0 })
            .to({ x: 1, y: 1 }, 0.5 * 1000)
            .onStart(() => {
                if (onStart) {
                    onStart();
                }
                switch (scaleType) {
                    case 0:
                        mCanvas.renderScale = new mw.Vector2(1, 0);
                        break;
                    case 1:
                        mCanvas.renderScale = new mw.Vector2(0, 1);
                        break;
                    case 2:
                        mCanvas.renderScale = new mw.Vector2(1, 1);
                        break;
                    default:
                        break;
                }
            })
            .onUpdate((v) => {
                switch (scaleType) {
                    case 0:
                        mCanvas.renderScale = new mw.Vector2(1, v.y);
                        break;
                    case 1:
                        mCanvas.renderScale = new mw.Vector2(v.x, 1);
                        break;
                    case 2:
                        mCanvas.renderScale = new mw.Vector2(v.x, v.y);
                        break;
                    default:
                        break;
                }
            })
            .onComplete(() => {
                if (onComplete) {
                    onComplete();
                }
                mCanvas.renderScale = mw.Vector2.one;
            })
            .start();
    }

    /**
     * 关闭UI缓动
     * @param mCanvas 
     * @param onStart 
     * @param onComplete 
     * @param */
    public static closeUITween(mCanvas: mw.Canvas, onStart: () => void, onComplete: () => void): void {
        let scaleType = this.getRandomInteger(0, 2);
        new mw.Tween({ x: 1, y: 1 })
            .to({ x: 0, y: 0 }, 0.5 * 1000)
            .onStart(() => {
                if (onStart) onStart();
                mCanvas.renderScale = new mw.Vector2(1, 1);
            })
            .onUpdate((v) => {
                switch (scaleType) {
                    case 0:
                        mCanvas.renderScale = new mw.Vector2(1, v.y);
                        break;
                    case 1:
                        mCanvas.renderScale = new mw.Vector2(v.x, 1);
                        break;
                    case 2:
                        mCanvas.renderScale = new mw.Vector2(v.x, v.y);
                        break;
                    default:
                        break;
                }
            })
            .onComplete(() => {
                if (onComplete) onComplete();
                switch (scaleType) {
                    case 0:
                        mCanvas.renderScale = new mw.Vector2(1, 0);
                        break;
                    case 1:
                        mCanvas.renderScale = new mw.Vector2(0, 1);
                        break;
                    case 2:
                        mCanvas.renderScale = new mw.Vector2(0, 0);
                        break;
                    default:
                        break;
                }
            })
            .start();
    }

    /**
     * 得到等级名字
     * @param lv 
     * @returns 
     */
    // public static getLvText(lv: number): string {
    //     let lvText = "";
    //     let lvType = Math.floor(lv / 10);
    //     switch (lvType) {
    //         case 0:
    //             lvText = "坚韧黑铁";
    //             break;
    //         case 1:
    //             lvText = "英勇青铜";
    //             break;
    //         case 2:
    //             lvText = "不屈白银";
    //             break;
    //         case 3:
    //             lvText = "荣耀黄金";
    //             break;
    //         case 4:
    //             lvText = "华贵铂金";
    //             break;
    //         case 5:
    //             lvText = "流光翡翠";
    //             break;
    //         case 6:
    //             lvText = "璀璨钻石";
    //             break;
    //         case 7:
    //             lvText = "超凡大师";
    //             break;
    //         case 8:
    //             lvText = "傲世宗师";
    //             break;
    //         case 9:
    //             lvText = "最强王者";
    //             break;
    //         default:
    //             lvText = "最强王者";
    //             break;
    //     }
    //     return lvText;
    // }

    public static async getLvText(lv: number, userId: string): Promise<string> {
        let level = Math.floor(lv / 10);
        switch (level) {
            case 0:
                return StringUtil.format(GameConfig.Language.Text_LevelSoulMaster1.Value, lv);
            case 1:
                return StringUtil.format(GameConfig.Language.Text_LevelSoulMaster2.Value, lv);
            case 2:
                return StringUtil.format(GameConfig.Language.Text_LevelSoulMaster3.Value, lv);
            case 3:
                return StringUtil.format(GameConfig.Language.Text_LevelSoulSovereign.Value, lv);
            case 4:
                return StringUtil.format(GameConfig.Language.Text_LevelSoulSect.Value, lv);
            case 5:
                return StringUtil.format(GameConfig.Language.Text_LevelSoulKing.Value, lv);
            case 6:
                return StringUtil.format(GameConfig.Language.Text_LevelSoulEmperor.Value, lv);
            case 7:
                return StringUtil.format(GameConfig.Language.Text_LevelSoulSaint.Value, lv);
            case 8:
                return StringUtil.format(GameConfig.Language.Text_LevelContra.Value, lv);
            case 9:
                if (lv <= 94) return StringUtil.format(GameConfig.Language.Text_LevelBannedDouluo.Value, lv);
                if (lv <= 98) return StringUtil.format(GameConfig.Language.Text_LevelPeakDouluo.Value, lv);
                if (lv == 99) return StringUtil.format(GameConfig.Language.Text_LevelDemigod.Value, lv);
            case 10:
                return StringUtil.format(GameConfig.Language.Text_LevelDivineOfficer.Value, lv);
            case 11:
                return StringUtil.format(GameConfig.Language.Text_LevelTrueGodLevel.Value, lv);
            case 12:
            case 13:
                return StringUtil.format(GameConfig.Language.Text_LevelSuperGodLevel.Value, lv);
            case 14:
                return StringUtil.format(GameConfig.Language.Text_LevelSuperGodPeak.Value, lv);
            case 15:
                return StringUtil.format(GameConfig.Language.Text_LevelDivineKing.Value, lv);
            case 16:
                return StringUtil.format(GameConfig.Language.Text_LevelEternalImmortalEmperor.Value, lv);
            default:
                if (level >= 17) {
                    if (GlobalData.languageId == 0) {
                        return StringUtil.format(GameConfig.Language.Text_LevelEternalImmortalEmperor.Value, lv);
                    } else {
                        let titleName: string = await this.getTitleNameByUserId(userId);
                        if (titleName == "-1") titleName = GameConfig.Language.Text_EternalImmortalEmperor.Value
                        return `${lv}${GameConfig.Language.Text_Level.Value} ${titleName}`;
                    }
                }
        }
    }

    /**
    * 得到等级名字
    * @param lv 
    * @returns 
    */
    // public static getLvText(lv: number): string {
    //     let starLevel = lv % 10;
    //     let level = Math.floor(lv / 10);
    //     Console.error("操蛋#" + starLevel + "#" + level);
    //     let playerLevelTxt = "";
    //     switch (level) {
    //         case 0:
    //             playerLevelTxt = starLevel + " 段斗之气";
    //             break;
    //         case 1:
    //             playerLevelTxt = starLevel + " 星斗者";
    //             break;
    //         case 2:
    //             playerLevelTxt = starLevel + " 星斗师";
    //             break;
    //         case 3:
    //             playerLevelTxt = starLevel + " 星大斗师";
    //             break;
    //         case 4:
    //             playerLevelTxt = starLevel + " 星斗灵";
    //             break;
    //         case 5:
    //             playerLevelTxt = starLevel + " 星斗王";
    //             break;
    //         case 6:
    //             playerLevelTxt = starLevel + " 星斗皇";
    //             break;
    //         case 7:
    //             playerLevelTxt = starLevel + " 星斗宗";
    //             break;
    //         case 8:
    //             playerLevelTxt = starLevel + " 星斗尊";
    //             break;
    //         case 9:
    //             playerLevelTxt = starLevel + " 星斗圣";
    //             break;
    //         default:
    //             playerLevelTxt = (lv - 100) + " 星斗帝";
    //             break;
    //     }
    //     return playerLevelTxt;
    // }

    private static locs: mw.Vector[] =
        [
            new mw.Vector(-4065, 6446, 2000),
            new mw.Vector(-2596, 7032, 2000),
            new mw.Vector(-930, 7584, 2000),
            new mw.Vector(1277, 8205, 2000),
            new mw.Vector(-3479, 6635, 2000),
            new mw.Vector(-3836, 6980, 2000),
            new mw.Vector(-4255, 7299, 2000),
            new mw.Vector(-3640, 7440, 2000),
            new mw.Vector(-3106, 7545, 2000),
            new mw.Vector(-4459, 6234, 2000)
        ];
    public static getWorldLocation(): mw.Vector {
        return this.locs[this.getRandomInteger(0, this.locs.length - 1)];
    }

    public static boss: string[] = [
        "219915",
        "141618",
        "142272",
        "142255",
        "219912",
        "226915",
        "226913",
        "142153",
        "219909",
        "142396",
        "142397"
    ];
    public static getBoss(): string {
        return this.boss[this.getRandomInteger(0, this.boss.length - 1)];
    }

    private static npcNames: string[] = ["张吉惟", "林国瑞", "林玫书", "林雅南", "江奕云", "刘柏宏", "阮建安", "林子帆", "夏志豪", "吉茹定", "李中冰", "谢彦文", "傅智翔", "洪振霞", "刘姿婷", "荣姿康", "吕致盈", "方一强", "黎芸贵", "郑伊雯", "雷进宝", "吴美隆", "吴心真", "王美珠", "郭芳天", "李雅惠", "陈文婷", "曹敏侑", "王依婷", "陈婉璇", "吴美玉", "蔡依婷", "郑昌梦", "林家纶", "黄丽昆", "李育泉", "黄芸欢", "吴韵如", "李肇芬", "卢木仲", "李成白", "方兆玉", "刘翊惠", "丁汉臻", "吴佳瑞", "舒绿珮", "周白芷", "张姿妤", "张虹伦", "周琼玫", "倪怡芳", "郭贵妃", "杨佩芳", "黄盛玫", "郑丽青", "许智云", "张孟涵", "李小爱", "王恩龙", "朱政廷", "邓诗涵", "陈政倩", "吴俊伯", "阮馨学", "翁惠珠", "吴思翰", "林佩玲", "邓海来", "陈翊依", "李建智", "武淑芬", "金雅琪", "赖怡宜", "黄育霖", "张仪湖", "王俊民", "张诗刚", "林慧颖", "沈俊君", "陈淑妤", "李姿伶", "高咏钰", "黄彦宜", "周孟儒", "潘欣臻", "李祯韵", "叶洁启", "梁哲宇", "黄晓萍", "杨雅萍", "卢志铭", "张茂以", "林婉婷", "蔡宜芸", "林珮瑜", "黄柏仪", "周逸珮", "夏雅惠", "王采珮", "林孟霖", "林竹水", "王怡乐", "王爱乐", "金佳蓉", "韩健毓", "李士杰", "陈董珍", "苏姿婷", "张政霖", "李志宏", "陈素达", "陈虹荣", "何美玲", "李仪琳", "张俞幸", "黄秋萍", "潘吉维"];
    public static randomNpcName(monsterId: number): string {
        switch (monsterId) {
            case 1:
                return `Text_WarcraftMedusa`;
            case 2:
                return `Text_WarcraftColorfulSpider`;
            case 3:
                return `Text_WarcraftSpiderSpirit`;
            case 4:
                return `Text_DragonSWarcraft`;
            case 5:
                return `Text_Zombies`;
            case 6:
                return `Text_MutatedPuppet`;
            case 100:
                return `Text_BlackWukong`;
        }

        // switch (monsterId) {
        //     case 1:
        //         return GameConfig.Language.Text_WarcraftMedusa.Value;
        //     case 2:
        //         return GameConfig.Language.Text_WarcraftColorfulSpider.Value;
        //     case 3:
        //         return GameConfig.Language.Text_WarcraftSpiderSpirit.Value;
        //     case 4:
        //         return GameConfig.Language.Text_DragonSWarcraft.Value;
        //     case 5:
        //         return GameConfig.Language.Text_Zombies.Value;
        //     case 6:
        //         return GameConfig.Language.Text_MutatedPuppet.Value;
        //     case 100:
        //         return GameConfig.Language.Text_BlackWukong.Value;
        // }
        // if (GlobalData.languageId == 0) {
        //     return GameConfig.Language.Text_MickeyMouse.Value;
        // } else {
        //     return this.npcNames[this.getRandomInteger(0, this.npcNames.length - 1)];
        // }
    }

    // private static tens: string[] = ["", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];
    // private static digitalUnits: string[] = ["", '十', '百', '千', '万', '亿', '十', '百', '千'];

    /**根据数字获取汉字*/
    // public static numChangeToCN(num: number): string {
    //     if (this.tens[num]) {
    //         return this.tens[num];
    //     } else if (num > 10 && num < 20) {
    //         let numStr = num.toString();
    //         let n = numStr.substring(1, 2);
    //         let result = this.digitalUnits[1] + this.tens[n];
    //         return result;
    //     } else if (num > 10) {
    //         let result = "";
    //         let numStr = num.toString();
    //         for (var i = 0; i < numStr.length; ++i) {
    //             let n = numStr.substring(i, i + 1);
    //             let m = numStr.length - i - 1;
    //             result += this.tens[n] + this.digitalUnits[m];
    //         }
    //         return result;
    //     }
    //     else return "零";
    // }

    public static getHp(lv: number): number {
        return 100 + (lv * 100);
    }

    public static getAtk(lv: number): number {
        return 50 + (lv * 50);
    }

    public static getMultipleByRarity(rarity: number): number {
        if (rarity < 0 || isNaN(rarity)) rarity = 0;
        return (rarity + 1) * 0.1;
    }

    private static assetIconDataMap: Map<string, mw.AssetIconData> = new Map<string, mw.AssetIconData>();
    public static setImageByAssetIconData(image: mw.Image, icon: string): void {
        if (this.assetIconDataMap.has(icon)) {
            image.setImageByAssetIconData(this.assetIconDataMap.get(icon));
        } else {
            mw.assetIDChangeIconUrlRequest([icon]).then(() => {
                try {
                    let assetIconData = mw.getAssetIconDataByAssetID(icon);
                    image.setImageByAssetIconData(assetIconData);
                    this.assetIconDataMap.set(icon, assetIconData);
                } catch (error) { }
            });
        }
    }

    private static pathIndex: number = 0;
    public static getPathIndex(length: number): number {
        if (this.pathIndex <= length - 1) return this.pathIndex++;
        if (this.pathIndex >= length) {
            this.pathIndex = 0
            return this.pathIndex;
        }
        return this.getRandomInteger(0, length - 1);
    }

    private static worldConfigDataMap: Map<string, WorldConfigData> = new Map<string, WorldConfigData>();
    public static async getTitleNameByUserId(userId: string): Promise<string> {
        if (!this.worldConfigDataMap || this.worldConfigDataMap.size == 0) {
            await TimeUtil.delaySecond(10);
        }
        if (this.worldConfigDataMap.has(userId)) {
            if (this.worldConfigDataMap.get(userId).titleName != "-1") {
                return this.worldConfigDataMap.get(userId).titleName;
            }
        }
        return "-1";
    }

    public static setWorldConfigData(worldConfigDatas: WorldConfigData[]): void {
        for (let i = 0; i < worldConfigDatas.length; ++i) {
            this.worldConfigDataMap.set(worldConfigDatas[i].userId, worldConfigDatas[i]);
        }
    }

    public static async asyncDownloadAsset(InAssetId: string): Promise<void> {
        if (!mw.AssetUtil.assetLoaded(InAssetId)) {
            await mw.AssetUtil.asyncDownloadAsset(InAssetId);
        }
    }

    public static integerUnitConversionStr(num: number): string {
        if (GlobalData.languageId == 0) {
            return `${num}`;
        } else {
            if (num <= 9999) {
                return `${num}`;
            } else {
                if (num <= 99999999) {
                    return `${(num / 10000).toFixed(2)}万`;
                } else {
                    if (num <= 999999999999) {
                        return `${(num / 100000000).toFixed(2)}亿`;
                    } else {
                        if (num <= 9999999999999999) {
                            return `${(num / 1000000000000).toFixed(2)}万亿`;
                        } else {
                            return `${(num / 10000000000000000).toFixed(2)}亿亿`;
                        }
                    }
                }
            }
        }
    }

    public static setGraphicsLevel(): void {
        let defaultGraphicsLevel = mw.GraphicsSettings.getDefaultGPULevel();
        let targetGraphicsLevel = Math.ceil(defaultGraphicsLevel / 2);
        mw.GraphicsSettings.setGraphicsCPULevel(targetGraphicsLevel);
        mw.GraphicsSettings.setGraphicsGPULevel(targetGraphicsLevel);
    }
}

/**贝塞尔曲线 */
export function cubicBezier(p1x, p1y, p2x, p2y) {
    const ZERO_LIMIT = 1e-6;
    const ax = 3 * p1x - 3 * p2x + 1;
    const bx = 3 * p2x - 6 * p1x;
    const cx = 3 * p1x;
    const ay = 3 * p1y - 3 * p2y + 1;
    const by = 3 * p2y - 6 * p1y;
    const cy = 3 * p1y;

    function sampleCurveDerivativeX(t) {
        return (3 * ax * t + 2 * bx) * t + cx;
    }
    function sampleCurveX(t) {
        return ((ax * t + bx) * t + cx) * t;
    }
    function sampleCurveY(t) {
        return ((ay * t + by) * t + cy) * t;
    }
    function solveCurveX(x) {
        let t2 = x;
        let derivative;
        let x2;
        for (let i = 0; i < 8; i++) {
            x2 = sampleCurveX(t2) - x;
            if (Math.abs(x2) < ZERO_LIMIT) {
                return t2;
            }
            derivative = sampleCurveDerivativeX(t2);
            if (Math.abs(derivative) < ZERO_LIMIT) {
                break;
            }
            t2 -= x2 / derivative;
        }
        let t1 = 1;
        let t0 = 0;
        t2 = x;
        while (t1 > t0) {
            x2 = sampleCurveX(t2) - x;
            if (Math.abs(x2) < ZERO_LIMIT) {
                return t2;
            }
            if (x2 > 0) {
                t1 = t2;
            } else {
                t0 = t2;
            }
            t2 = (t1 + t0) / 2;
        }
        return t2;
    }
    function solve(x) {
        return sampleCurveY(solveCurveX(x));
    }
    return solve;
}