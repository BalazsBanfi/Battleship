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
    board1.goodPlace(33, 'Carrier', 5);
    expect(board1.cells[33]).toBe('Carrier');
});


test("Place ship on cell 33, cell 36:", () => {
    let board1 = gameboard();
    board1.goodPlace(33, 'Carrier', 5);
    expect(board1.cells[36]).toBe('Carrier');
});


test("Place ship on cell 33, cell 39:", () => {
    let board1 = gameboard();
    board1.goodPlace(33, 'Carrier', 5);
    expect(board1.cells[39]).toBe('null');
});

