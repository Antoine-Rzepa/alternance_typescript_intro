import {Character} from "../character";
import {Weapon} from "../weapon";

export class Mage extends Character{

    life: number = 80;
    bonusDamage: number = 10;
    weapon: Weapon;

    constructor(name: string, sexe: string, weapon: Weapon) {
        super(name, sexe);
        this.weapon =  weapon;
        super.setBonusDamage(this.bonusDamage + this.weapon.damage);
        super.setLife(this.life);

    }

}