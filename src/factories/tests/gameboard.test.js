import { gameboard } from '../gameboard'

test("Board is array", () => {
    let board1 = gameboard();
    expect(Array.isArray(board1)).toBe(true);
});

test("Board ha 10 rows", () => {
    let board1 = gameboard();
    expect(board1.length).toBe(10);
});

test("Board ha 10 columns", () => {
    let board1 = gameboard();
    expect(board1[0].length).toBe(10);
});

test("One element of a board is null", () => {
    let board1 = gameboard();
    expect(board1[4][7]).toBe('47');
});


test("Place ship on random cell", () => {
    let board1 = gameboard();
    board1.goodPlace('Destroyer', 2);
    expect(board1[4][7]).toBe('47');
});
