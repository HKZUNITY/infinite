/*
 * @Author: yukun.gao yukun.gao@appshahe.com
 * @Date: 2022-08-11 00:05:21
 * @LastEditors: yukun.gao yukun.gao@appshahe.com
 * @LastEditTime: 2022-09-25 17:04:42
 * @FilePath: \JavaScripts\WeaponObj\Weapon.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { WeaponServer } from "./WeaponServer";


/** 冷兵器类 */
@Component
export default class Weapon extends WeaponServer {

    onStart() {
        super.onStart();
        this.useUpdate = true;
    }

    onUpdate(dt: number) {
        super.onUpdate(dt);
    }

}