import { gameboard } from '../gameboard'

test("Board is array", () => {
    let board1 = gameboard();
    expect(Array.isArray(board1)).toBe(true);
});

test("Board has 100 cells", () => {
    let board1 = gameboard();
    expect(board1.length).toBe(100);
});

test("One element of a board is null", () => {
    let board1 = gameboard();
    expect(board1[47]).toBe('null');
});


test("Place ship on random cell", () => {
    let board1 = gameboard();
    board1.goodPlace('Carrier', 5, 0, 33);
    expect(board1[33]).toBe('Carrier');
});
