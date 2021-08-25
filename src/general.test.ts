import { Character } from "./character"
import { Enemy } from "./enemy";

test('ennemi name should be Gobelin', () => {
    let charac: Character = new Character("toto", "man")
    let monster: Enemy = new Enemy("Gobelin")
    expect(charac.attack(monster)).toBe(monster.name = "Gobelin");
});

test('Charactere life should be 5', () => {
    let charac: Character = new Character("toto", "man")
    expect(charac.setLife(5)).toBe(5);
});