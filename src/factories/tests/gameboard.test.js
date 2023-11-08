import { gameboard } from '../gameboard'

test("Board is array", () => {
    let board1 = gameboard();
    expect(Array.isArray(board1.cells)).toBe(true);
});

test("Board has 100 cells", () => {
    let board1 = gameboard();
    expect(board1.cells.length).toBe(100);
});

test("One element of a board is null", () => {
    let board1 = gameboard();
    expect(board1.cells[47]).toBe('null');
});


test("Place ship on random cell 33", () => {
    let board1 = gameboard();
    board1.goodPlace(33, 'Carrier', 5, 1);
    expect(board1.cells[33]).toBe('Carrier');
});


test("Place ship on cell 33, cell 36:", () => {
    let board1 = gameboard();
    board1.goodPlace(33, 'Carrier', 5, 1);
    expect(board1.cells[36]).toBe('Carrier');
});


test("Place ship on cell 33, cell 39:", () => {
    let board1 = gameboard();
    board1.goodPlace(33, 'Carrier', 5, 1);
    expect(board1.cells[39]).toBe('null');
});


test("Place ship vertically on cell 33, cell 53:", () => {
    let board1 = gameboard();
    board1.goodPlace(33, 'Carrier', 5, 10);
    expect(board1.cells[53]).toBe('Carrier');
});


test("Place ship out of board on cell 38, cell 42:", () => {
    let board1 = gameboard();
    board1.goodPlace(38, 'Carrier', 5, 1);
    expect(board1.cells[39]).toBe('null');
});


test("Place ship vertically out of board on cell 78, cell 88:", () => {
    let board1 = gameboard();
    board1.goodPlace(78, 'Carrier', 5, 10);
    expect(board1.cells[88]).toBe('null');
});

test("Place two ships on the same cells", () => {
    let board1 = gameboard();
    board1.goodPlace(43, 'Carrier', 5, 1);
    board1.goodPlace(36, 'Destroyer', 2, 10);
    expect(board1.cells[46]).toBe('Carrier');
});
