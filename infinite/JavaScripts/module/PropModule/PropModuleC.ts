import HUDModuleC from "../HUDModule/HUDModuleC";
import { PropData } from "./PropData";
import { PropModuleS } from "./PropModuleS";

export class PropModuleC extends ModuleC<PropModuleS, PropData> {
    private playerCamera: Camera = null;
    private get playerCameraSystem(): Camera {
        if (this.playerCamera == null) {
            this.playerCamera = Camera.currentCamera;
        }
        return this.playerCamera;
    }

    private hudModuleC: HUDModuleC = null;

    protected onStart(): void {
        this.initData();
        this.registerAction();
    }

    private initData(): void {
        this.hudModuleC = ModuleService.getModule(HUDModuleC);
    }

    private registerAction(): void {
        let isBig = false;
        InputUtil.onKeyDown(mw.Keys.NumPadTwo, () => {
            isBig = !isBig;
            this.giant(isBig);
        });
    }

    //#region 巨人
    public giant(isGiant: boolean): void {
        if (isGiant) {
            this.hudModuleC.onPlayerScaleAction.call(5);
        } else {
            this.hudModuleC.onPlayerScaleAction.call(1);
        }
        this.setCameraOffset(isGiant);
        this.server.net_giant(isGiant);
    }

    private normalCameraLocation: mw.Vector = new mw.Vector(0, 0, 85);
    private normalCameraRotation: mw.Rotation = new mw.Rotation(0, 0, 0);
    private giantCameraLocation: mw.Vector = new mw.Vector(-200, 0, 85);
    private giantCameraRotation: mw.Rotation = new mw.Rotation(0, 0, 0);
    private setCameraOffset(isGiant: boolean): void {
        let playerCameraTransform: mw.Transform = new mw.Transform();
        playerCameraTransform.position = isGiant ? this.giantCameraLocation : this.normalCameraLocation;
        playerCameraTransform.rotation = isGiant ? this.giantCameraRotation : this.normalCameraRotation;
        this.playerCameraSystem.localTransform = playerCameraTransform;
    }
    //#endregion
}