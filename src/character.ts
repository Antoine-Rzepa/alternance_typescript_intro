import {Enemy} from "./enemy";
import {Fighter} from "./fighter";

export class Character implements Fighter{
    name: string;
    sexe: string;
    life: number = 100;
    bonusDamage: number = 0;

    constructor(name: string, sexe: string) {
        this.name = name;
        this.sexe = sexe;
    }

    summary(){
        console.log(
            `Voici le résumé de votre personnage:\n
            Nom : ${this.name} \n
            Sexe : ${this.sexe}`);
    }

    attack(enemy: Enemy) :void{
        let degats = Math.floor(Math.random() * 100);
        enemy.takeDamage((degats + this.bonusDamage));
    }

    takeDamage(damage: number): void {
        let degatSubis = Math.floor(damage*0.5)
        this.life -= degatSubis;
        console.log(`Vous avez subis ${degatSubis} de dégâts`)
    }

    setLife(life: number){
        this.life = life;
    }

    setBonusDamage(bonusDamage: number){
        this.bonusDamage = bonusDamage;
    }

}