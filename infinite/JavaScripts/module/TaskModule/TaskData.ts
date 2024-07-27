import Console from "../../Tools/Console";
import { MapEx } from "../../Tools/MapEx";
import { Utils } from "../../Tools/utils";
import { GameConfig } from "../../config/GameConfig";

export enum TaskItemType {
    None = 0,
    /**每日登录游戏 */
    DailyLogin = 1,
    /**每日在线时长 */
    DailyOnlineTime = 11,
    /**每日击败美杜莎 */
    DailyKillMedusa = 21,
    /**每日击败蜘蛛精 */
    DailyKillSpider = 31,
    /**每日击败炫彩蜘蛛 */
    DailyKillColorfulSpider = 41,
    /**每日击败龙兽 */
    DailyKillDragon = 51,
    /**每日击败丧尸 */
    DailyKillZombie = 61,
    /**每日击败变异布偶 */
    DailyKillMutantPuppet = 71,
    /**每日击败玩家 */
    DailyKillPlayer = 81,
    /**每日提升级 */
    DailyUpLv = 91,
    /**每日捡到秘宝 */
    DailyPickUpTreasure = 101,
    /**每日看广告次数 */
    DailyAds = 111,

    /**每周登录天数 */
    WeeklyLogin = 201,
    /**每周在线时长30分钟次数 */
    WeeklyOnlineTime = 211,
    /**每周击败美杜莎 */
    WeeklyKillMedusa = 221,
    /**每周击败蜘蛛精 */
    WeeklyKillSpider = 231,
    /**每周击败炫彩蜘蛛 */
    WeeklyKillColorfulSpider = 241,
    /**每周击败龙兽 */
    WeeklyKillDragon = 251,
    /**每周击败丧尸 */
    WeeklyKillZombie = 261,
    /**每周击败变异布偶 */
    WeeklyKillMutantPuppet = 271,
    /**每周击败玩家 */
    WeeklyKillPlayer = 281,
    /**每周提升级 */
    WeeklyUpLv = 291,
    /**每周捡到秘宝 */
    WeeklyPickUpTreasure = 301,
    /**每周看广告次数 */
    WeeklyAds = 311,
}

export enum TaskType {
    /**每日任务 */
    DailyTask = 1,
    /**每周任务 */
    WeeklyTask = 2,
}

export class Task {
    taskId: number;
    progress: number;
    isGetReward: boolean;

    constructor(taskId: number, progress: number, isGetReward: boolean) {
        this.taskId = taskId;
        this.progress = progress;
        this.isGetReward = isGetReward;
    }
}

export class TaskData extends Subdata {
    @Decorator.persistence()
    public lastDayNow: number = 0;
    @Decorator.persistence()
    public lastWeekNow: number = 0;
    @Decorator.persistence()
    public dailyTasks: MapEx.MapExClass<Task> = {};
    @Decorator.persistence()
    public weeklyTasks: MapEx.MapExClass<Task> = {};

    protected initDefaultData() {
        this.dailyTasks = {};
        this.weeklyTasks = {};
        this.lastDayNow = Date.now();
        this.lastWeekNow = Number(Utils.getWhatDay());
    }

    public saveDailyTask(taskId: number, vipTaskType: TaskItemType, progress: number): void {
        let dailyTask: Task = null;
        if (MapEx.has(this.dailyTasks, vipTaskType)) {
            dailyTask = MapEx.get(this.dailyTasks, vipTaskType);
            dailyTask.progress = progress;
        } else {
            dailyTask = new Task(taskId, progress, false);
        }
        MapEx.set(this.dailyTasks, vipTaskType, dailyTask);
    }

    public saveWeeklyTask(taskId: number, vipTaskType: TaskItemType, progress: number): void {
        let weeklyTask: Task = null;
        if (MapEx.has(this.weeklyTasks, vipTaskType)) {
            weeklyTask = MapEx.get(this.weeklyTasks, vipTaskType);
            weeklyTask.progress = progress;
        } else {
            weeklyTask = new Task(taskId, progress, false);
        }
        MapEx.set(this.weeklyTasks, vipTaskType, weeklyTask);
    }

    public updateTaskCompleteData(vipTaskType: TaskItemType): void {
        if (MapEx.has(this.dailyTasks, vipTaskType)) {
            let dailyTask = MapEx.get(this.dailyTasks, vipTaskType);
            let nextId = GameConfig.Task.getElement(dailyTask.taskId).NextId;
            if (nextId != 0) {
                dailyTask.taskId = nextId;
                dailyTask.isGetReward = false;
            } else {
                dailyTask.isGetReward = true;
            }
            MapEx.set(this.dailyTasks, vipTaskType, dailyTask);
        }
        if (MapEx.has(this.weeklyTasks, vipTaskType)) {
            let weeklyTask = MapEx.get(this.weeklyTasks, vipTaskType);
            let nextId = GameConfig.Task.getElement(weeklyTask.taskId).NextId;
            if (nextId != 0) {
                weeklyTask.taskId = nextId;
                weeklyTask.isGetReward = false;
            } else {
                weeklyTask.isGetReward = true;
            }
            MapEx.set(this.weeklyTasks, vipTaskType, weeklyTask);
        }
        this.save(true);
    }

    /**
     * 保存退出游戏的时间
     * @param value 
     */
    public saveLastDayNow(lastDayNow: number, lastWeekNow: number): void {
        this.lastDayNow = lastDayNow;
        this.lastWeekNow = lastWeekNow;
        this.save(true);
    }

    /**重置每日任务 */
    public resetDailyTask(): void {
        this.dailyTasks = {};
        this.save(true);
        Console.error("重置每日任务");
    }

    /**重置每周任务 */
    public resetWeeklyTask(): void {
        this.weeklyTasks = {};
        this.save(true);
        Console.error("重置每周任务");
    }
}