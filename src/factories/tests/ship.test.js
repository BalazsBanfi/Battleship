import { ship } from "../ship";

test("has length property", () => {
    let ship1 = ship(4);
    expect(ship1.length).toBe(4);
});


test("hits the ship", () => {
    let ship1 = ship(4);
    ship1.hit();
    ship1.hit();
    expect(ship1.hitCounter()).toBe(2);
});

test("not yet sinks the ship", () => {
    let ship1 = ship(4);
    ship1.hit();
    ship1.hit();
    expect(ship1.isSunk()).toBe(false);
});

test("sinks the ship", () => {
    let ship1 = ship(4);
    ship1.hit();
    ship1.hit();
    ship1.hit();
    ship1.hit();
    expect(ship1.isSunk()).toBeTruthy();
});