import {Character} from "./character";
import {Fighter} from "./fighter";
import axios, {AxiosResponse} from 'axios';


export class Enemy implements Fighter{
    name: string;
    life: number;

    constructor(name: string) {
        this.name = name;
        this.life = 20;
    }

    async getReplique(){
        await axios.get("https://kaamelott.hotentic.com/api/random/personnage/Le%20Ma%C3%AEtre%20d'Armes")
            .then((reponse) => console.log(reponse.data.citation.citation));
    }

    attack(charac: Character) :void{
        let degats = Math.floor(Math.random() * 100);
        charac.takeDamage(degats);
    }

    takeDamage(damage: number): void {
        this.life = this.life-damage;
        console.log(`........................................`)
        console.log(`Vous infligez ${damage} à l'ennemi ${this.name}`);
    }

}