export class PlayerData_CSR {
    public userId: string = "";
    public playerName: string = "";
    public playerLv: number = 0;
    public playerHeight: number = 0;
    public playerKill: number = 0;

    public constructor(id: string, name: string, lv: number, height: number, kill: number) {
        this.userId = id;
        this.playerName = name;
        this.playerLv = lv;
        this.playerHeight = height;
        this.playerKill = kill;
    }
}

export class PlayerData_CSW {
    public userId: string = "";
    public playerName: string = "";
    public playerLv: number = 0;

    public constructor(id: string, name: string, lv: number) {
        this.userId = id;
        this.playerName = name;
        this.playerLv = lv;
    }
}