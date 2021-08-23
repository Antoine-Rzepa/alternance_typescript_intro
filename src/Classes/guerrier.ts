import {Character} from "../character";
import {Weapon} from "../weapon";

export class Guerrier extends Character{

    life: number = 120;
    weapon: Weapon;
    // weaponName: string | undefined;
    // weaponDamages: number | undefined;

    constructor(name: string, sexe: string, weapon: Weapon) {
        super(name, sexe);
        this.weapon = weapon;
        super.setBonusDamage(this.weapon.damage);
        super.setLife(this.life)
    }

    // setWeaponName(weaponName: string){
    //     this.weaponName = weaponName;
    // }
    //
    // setWeaponDamages(weaponDamages: number){
    //     this.weaponDamages = weaponDamages;
    // }
}