import { gameboard } from '../gameboard'

test("Board is array", () => {
    let board1 = gameboard();
    expect(Array.isArray(board1.cells)).toBe(true);
});

test("Board has 10 cells", () => {
    let board1 = gameboard();
    expect(board1.cells.length).toBe(10);
});

test("Board has 10 cells", () => {
    let board1 = gameboard();
    expect(board1.cells[1].length).toBe(10);
});

test("Place all the ships on random cells:", () => {
    let board1 = gameboard();
    expect(board1.cells.filter((x) => x === 'Carrier').length).toBe(5);
    expect(board1.cells.filter((x) => x === 'Battleship').length).toBe(4);
    expect(board1.cells.filter((x) => x === 'Cruiser').length).toBe(3);
    expect(board1.cells.filter((x) => x === 'Submarine').length).toBe(3);
    expect(board1.cells.filter((x) => x === 'Destroyer').length).toBe(2);
});

test("There are inactive cells:", () => {
    let board1 = gameboard();
    expect(board1.cells.filter((x) => x === 'notNull').length).toBeGreaterThan(30);
});


test("There are not used cells:", () => {
    let board1 = gameboard();
    expect(board1.cells.filter((x) => x === 'null').length).toBeGreaterThan(25);
});

test("Shoot all of cells:", () => {
    let board1 = gameboard();
    for (let i = 0; i < 100; i++) {
        board1.receiveAttack(i)
    }
    expect(board1.cells.filter((x) => x === 'didNotHit').length).toBeGreaterThan(30);
});


test("All the ships sunk:", () => {
    let board1 = gameboard();
    for (let i = 0; i < 100; i++) {
        board1.receiveAttack(i)
    }
    expect(board1.stillAlive).toBe(0);
});