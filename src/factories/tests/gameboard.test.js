import { gameboard } from '../gameboard'

test("Board is array", () => {
    let board1 = gameboard();
    expect(Array.isArray(board1.cells)).toBe(true);
});

test("Board has 100 cells", () => {
    let board1 = gameboard();
    expect(board1.cells.length).toBe(100);
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
    console.table(board1.cells);
    expect(board1.cells.filter((x) => x === 'null').length).toBeGreaterThan(30);
});
