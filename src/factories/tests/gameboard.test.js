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
    expect(board1[0][0]).toBe('null');
});