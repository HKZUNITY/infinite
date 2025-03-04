import { GeneralManager, } from '../../Modified027Editor/ModifiedStaticAPI';
import Console from "../../Tools/Console";

// declare global {
//     var UE: any;
// }

class ObjMeshCalss {
    public objMesh: mw.Model = null;
    public objLocation: mw.Vector = mw.Vector.zero;
    public objRotation: mw.Rotation = mw.Rotation.zero;
    public isCanAtk: boolean = true;
}

export class ObjImpulseModuleC extends ModuleC<ObjImpulseModuleS, null> {
    protected onStart(): void {

    }

    public addImpulseToObj(objGuid: string, force: number): void {
        this.server.net_addImpulseToObj(objGuid, force);
    }
}

export class ObjImpulseModuleS extends ModuleS<ObjImpulseModuleC, null> {
    private objGuids: string[] = ["1F185144", "36F3DE51", "3B9AEB96", "0C7BDA34", "368270D9", "1F7D8922"];
    private objMeshClassMap: Map<string, ObjMeshCalss> = new Map<string, ObjMeshCalss>();
    protected onStart(): void {
        this.findObjs();
    }

    private async findObjs() {
        for (let i = 0; i < this.objGuids.length; ++i) {
            let objMesh = await GameObject.asyncFindGameObjectById(this.objGuids[i]) as mw.Model;
            if (objMesh) {
                objMesh.physicsEnabled = true;
                objMesh.physicsEnabled = false;
                let objMeshClass = new ObjMeshCalss();
                objMeshClass.objMesh = objMesh;
                objMeshClass.objLocation = objMesh.worldTransform.position;
                objMeshClass.objRotation = objMesh.worldTransform.rotation;
                this.objMeshClassMap.set(this.objGuids[i], objMeshClass);
            }
            Console.error("i = " + i);
        }
    }

    @Decorator.noReply()
    public net_addImpulseToObj(objGuid: string, force: number): void {
        this.addImpulseToObj(this.currentPlayer, objGuid, force);
    }

    public addImpulseToObj(player: mw.Player, objGuid: string, force: number): void {
        if (!this.objMeshClassMap.has(objGuid)) return;
        let objMeshClass = this.objMeshClassMap.get(objGuid);
        if (!objMeshClass.isCanAtk) return;
        objMeshClass.isCanAtk = false;
        let objMesh = objMeshClass.objMesh;
        let objLocation = objMesh.worldTransform.position;
        let objRotation = objMesh.worldTransform.rotation;

        objMesh.physicsEnabled = true;

        let playerLoc = player.character.worldTransform.position;
        let forceVector = new mw.Vector(objLocation.x - playerLoc.x, objLocation.y - playerLoc.y, 0).normalize();

        // const uForce = new UE.Vector();
        // uForce.X = forceVector.x * force;
        // uForce.Y = forceVector.y * force;
        // uForce.Z = forceVector.z * force;

        TimeUtil.delayExecute(() => {
            // objMesh["privateActor"].GetStaticMeshComponent().AddImpulse(uForce, "None", true);
            SoundService.play3DSound(
                "47430",
                objLocation,
                1,
                1,
                // { innerRadius: 300, falloffDistance: 1000 }
            );
            GeneralManager.rpcPlayEffectAtLocation(
                "174248",
                objLocation,
                1,
                mw.Rotation.zero,
                mw.Vector.one.multiply(5),
            );
        }, 1);
        TimeUtil.delaySecond(5).then(() => {
            objMeshClass.isCanAtk = true;
            objMesh.physicsEnabled = false;
            objMesh.worldTransform.position = (objLocation);
            objMesh.worldTransform.rotation = (objRotation);
        });
    }
}