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
    expect(board1.cells.flat(2).filter((x) => x === 'Carrier').length).toBe(5);
    expect(board1.cells.flat(2).filter((x) => x === 'Battleship').length).toBe(4);
    expect(board1.cells.flat(2).filter((x) => x === 'Cruiser').length).toBe(3);
    expect(board1.cells.flat(2).filter((x) => x === 'Submarine').length).toBe(3);
    expect(board1.cells.flat(2).filter((x) => x === 'Destroyer').length).toBe(2);
});

test("There are inactive cells:", () => {
    let board1 = gameboard();
    board1.setComputerBoard();
    console.table(board1.cells);
    expect(board1.cells.flat(2).filter((x) => x === 'notNull').length).toBeGreaterThan(30);
});


test("There are not used cells:", () => {
    let board1 = gameboard();
    board1.setComputerBoard();
    expect(board1.cells.flat(2).filter((x) => x === 'null').length).toBeGreaterThan(25);
});

test("Shoot all of cells:", () => {
    let board1 = gameboard();
    board1.setComputerBoard();
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            board1.receiveAttack([i, j])
        }
    }
    expect(board1.cells.flat(2).filter((x) => x === 'didNotHit').length).toBeGreaterThan(30);
});


test("All the ships sunk:", () => {
    let board1 = gameboard();
    board1.setComputerBoard();
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            board1.receiveAttack([i, j])
        }
    }
    expect(board1.stillAlive).toBe(0);
});