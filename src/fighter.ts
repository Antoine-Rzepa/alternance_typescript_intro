
export interface Fighter {

    attack(perso: Fighter): void

    takeDamage(damage: number): void
}