import { Guerrier } from "./Classes/guerrier"
import { Enemy } from "./enemy"
import { Mage } from "./Classes/mage";
import { Axe } from "./Weapon/axe";
import {Sword} from "./Weapon/sword";
import {FireStaff} from "./Weapon/fireStaff";
import {FrostStaff} from "./Weapon/frostStaff";

const prompts = require('prompts');

const setHero = [
    {
        type: 'text',
        name: 'name',
        message: 'Quel est votre nom ?'
    },
    {
        type: 'select',    //text //multiselect
        name: 'sexe',
        message: 'Êtes vous un homme ou une femme ?',
        choices: [
            {title: 'Masculin', value: 'Masculin'},
            {title: 'Féminin', value: 'Féminin'},
        ],
    },
    {
        type: 'select',    //text //multiselect
        name: 'classe',
        message: 'Choisissez votre classe :',
        choices: [
            {title: 'Guerrier', value: '1'},
            {title: 'Mage', value: '2'},
        ],
    },
];



(async () => {
    const responseSetHero = await prompts(setHero);
    let hero: any;
    if (responseSetHero.classe === '1'){

        const responseWeapon = await prompts({
            type: 'select',
            name: 'value',
            message: 'Choisissez votre arme',
            //validate: value => value > 1 ? `Vous allez fuir ? vraiment ?` : true
            choices: [
                {title: 'Hache', value: 1},
                {title: 'Epee', value: 2},
            ],
        });
        switch (responseWeapon.value){
            case 1:
                let axe = new Axe();
                hero = new Guerrier(responseSetHero.name, responseSetHero.sexe, axe);
                break;
            case 2:
                let sword = new Sword();
                hero = new Guerrier(responseSetHero.name, responseSetHero.sexe, sword);
                break;
            default:
                console.log(`Désolé, nous attendons un choix correct of ${responseWeapon.value}`)
        }

    } else if (responseSetHero.classe === '2'){

        const responseWeapon = await prompts({
            type: 'select',
            name: 'value',
            message: 'Choisissez votre arme',
            //validate: value => value > 1 ? `Vous allez fuir ? vraiment ?` : true
            choices: [
                {title: 'Baton de feu', value: 1},
                {title: 'Baton de givre', value: 2},
            ],
        });
        switch (responseWeapon.value){
            case 1:
                let fireStaff = new FireStaff();
                hero = new Mage(responseSetHero.name, responseSetHero.sexe, fireStaff);
                break;
            case 2:
                let frostStaff =  new FrostStaff();
                hero = new Mage(responseSetHero.name, responseSetHero.sexe, frostStaff);
                break;
            default:
                console.log(`Désolé, nous attendons un choix correct of ${responseWeapon.value}`)
        }
    }

    hero.summary();
    console.log('\n Ennemi en approche !');

    let endGame = false;
    while (!endGame) {
        const responseMouv = await prompts({
            type: 'select',
            name: 'value',
            message: 'Si vous voulez combattre tapez 1, si vous voulez fuir tapez 2',
            //validate: value => value > 1 ? `Vous allez fuir ? vraiment ?` : true
            choices: [
                {title: 'Combattre', value: 1},
                {title: 'Fuir', value: 2},
            ],
        });
        if (responseMouv.value === 2) {
            console.log("Fin de la partie, vous avez fui")
            break;
        } else if (responseMouv.value === 1) {
            let enemy = new Enemy("Gobelin");
            hero.attack(enemy);
            if (enemy.life <= 0) {
                console.log(`Vous avez vaincu l'ennemi ${enemy.name}`)
            } else {
                console.log(`L'ennemi ${enemy.name} riposte: `)
                enemy.attack(hero)
                if (hero.life <= 0) {
                    console.log(`Vous avez été vaincu par ${enemy.name}`)
                    endGame = true;
                } else {
                    console.log(`Il vous reste ${hero.life} points de vie`)
                }
            }
        }
    }
})();


