import { player } from "../player";

test("Player ha a name", () => {
    let playerOne = player('John');
    expect(playerOne.name).toBe('John');
});


test("Player has not shoot", () => {
    let playerOne = player('John');
    expect(playerOne.attacks.length).toBe(0);
});


test("Player shot 3 times", () => {
    let playerOne = player('John');
    playerOne.attack(5);
    playerOne.attack(15);
    playerOne.attack(77);
    playerOne.attack(32);
    playerOne.attack(20);
    expect(playerOne.attacks.length).toBe(5);
});