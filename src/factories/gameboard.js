import { ship } from './ship.js';
import { createBoard } from './createBoard.js'

// Factory function for create board
export const gameboard = () => {
    const random = (x) => Math.floor(Math.random() * x);

    // Ship types and lengths
    const ships = {
        Carrier: 5,
        Battleship: 4,
        Cruiser: 3,
        Submarine: 3,
        Destroyer: 2
    }
    const chooseShip = Object.keys(ships);
    const board = {}
    board.fleet = {}
    let coords = []
    let placed = false;
    board.cells = createBoard();
    board.stillAlive = 5;


    board.placeShip = ([row, col], shipType, length, direction) => {
        coords = [];
        for (let i = 0; i < length; i++) {
            coords.push(direction === 0 ? board.cells[row][i + col] : board.cells[i + row][col]);
        }
        if (coords.every((x) => x === 'null')) {
            placed = true;
            for (let i = 0; i < length; i++) {
                if (direction === 0) {
                    board.cells[row][i + col] = shipType;
                    setInactive([row, i + col]);
                }
                else if (direction === 1) {
                    board.cells[i + row][col] = shipType;
                    setInactive([i + row, col]);
                }
            }
        }
    }


    board.setComputerBoard = () => {
        chooseShip.forEach((x) => {
            while (!placed) {
                let direction = random(2);
                let row = direction === 1 ? random(10 - ships[x]) : random(10);
                let col = direction === 1 ? random(10) : random(10 - ships[x]);
                board.placeShip([row, col], x, ships[x], direction);
            }
            placed = false;
            board.fleet[x] = ship(ships[x]);
        });
    }

    board.receiveAttack = ([row, col]) => {
        if (board.cells[row][col] === 'null'
            || board.cells[row][col] === 'notNull') {
            board.cells[row][col] = 'didNotHit';
            return 'didNotHit';
        } else if (board.cells[row][col] === 'didNotHit') {
            return 'inactive';
        } else if (board.cells[row][col][0] === 'h') {
            return 'inactive';
        } else {
            board.fleet[board.cells[row][col]].hit();
            if (board.fleet[board.cells[row][col]].isSunk() === true) { board.stillAlive-- };
            board.cells[row][col] = 'hit' + board.cells[row][col];
            return board.cells[row][col].slice(3)
        }
    }

    // Set the cell value inactive around the ship
    const setInactive = ([col, row]) => {
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                if (board.cells[i + col] !== undefined && board.cells[i + col][j + row] !== undefined) {
                    if (board.cells[i + col][j + row] === 'null') {
                        board.cells[i + col][j + row] = 'notNull'
                    }
                }
            }
        }
    }

    return board;
};