import Console from "../../Tools/Console";
import { MapEx } from "../../Tools/MapEx";
import { Utils } from "../../Tools/utils";
import { GameConfig } from "../../config/GameConfig";

export enum TaskItemType {
    None = 0,
    /**每日登录游戏 */
    DailyLogin = 1,
    /**每日在线时长 */
    DailyOnlineTime = 2,
    /**每日击杀怪物 */
    DailyKillMonster = 3,
    /**每日击杀Boss */
    DailyKillBoss = 4,
    /**每日击杀玩家 */
    DailyKillPlayer = 5,
    /**每日购买武器套装个数 */
    DailyBuyWeapon = 6,
    /**每日换装次数 */
    DailyChangeClothes = 7,
    /**每日切换背景音乐次数 */
    DailySwitchBgm = 8,

    /**每日聊天次数 */
    DailyChat = 10,
    /**每日看广告次数 */
    DailyAds = 11,
    /**每周登录 */
    WeeklyLogin = 30,
    /**每周登录时长 */
    WeeklyOnlineTime = 31,
    /**每周击杀怪物 */
    WeeklyKillMonster = 32,
    /**每周击杀Boss */
    WeeklyKillBoss = 33,
    /**每周击杀玩家 */
    WeeklyKillPlayer = 34,
    /**每周购买武器套装个数 */
    WeeklyBuyWeapon = 35,
    /**每周换装次数 */
    WeeklyChangeClothes = 36,
    /**每周切换背景音乐次数 */
    WeeklySwitchBgm = 37,
    /**每周聊天次数 */
    WeeklyChat = 38,
    /**每周看广告次数 */
    WeeklyAds = 39,
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