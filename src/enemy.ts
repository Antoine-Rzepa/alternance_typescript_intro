import {Character} from "./character";
import {Fighter} from "./fighter";

export class Enemy implements Fighter{
    name: string;
    life: number;

    constructor(name: string) {
        this.name = name;
        this.life = 20;
    }

    attack(charac: Character) :void{
        let degats = Math.floor(Math.random() * 100);
        charac.takeDamage(degats);
    }

    takeDamage(damage: number): void {
        this.life = this.life-damage;
        console.log(`Vous infligez ${damage} à l'ennemi ${this.name}`);
    }


}