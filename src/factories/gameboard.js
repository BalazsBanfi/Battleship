import { ship } from './ship.js';
import { createBoard } from './createBoard.js'

// Ship types and lengths
const ships = {
    Carrier: 5,
    Battleship: 4,
    Cruiser: 3,
    Submarine: 3,
    Destroyer: 2
}

const random = (x) => Math.floor(Math.random() * x);

// Factory function for create board
export const gameboard = () => {
    const board = {}
    board.cells = createBoard();
    let placed = false;

    // Set the cell value inactive around the ship
    const setInactive = (coord) => {
        for (let i = -1; i < 2; i++)
            for (let j = -1; j < 2; j++) {
                {
                    if (board.cells[i + coord[0]] !== undefined && board.cells[i + coord[0]][j + coord[1]] !== undefined) {
                        if (board.cells[i + coord[0]][j + coord[1]] === 'null') {
                            board.cells[i + coord[0]][j + coord[1]] = 'notNull'
                        }
                    }
                }

            }

    }

    let coords = []
    board.placeShip = (startCoord, shipType, length, direction) => {

        coords = [];
        for (let i = 0; i < length; i++) {
            if (direction === 0) {
                coords.push(board.cells[startCoord[0]][i + startCoord[1]])
            } else if (direction === 1) {
                coords.push(board.cells[i + startCoord[0]][startCoord[1]])
            }
        }
        if (coords.every((x) => x === 'null')) {
            placed = true;
            for (let i = 0; i < length; i++) {
                if (direction === 0) {
                    board.cells[startCoord[0]][i + startCoord[1]] = shipType;
                    setInactive([startCoord[0], i + startCoord[1]]);
                }
                else if (direction === 1) {
                    board.cells[i + startCoord[0]][startCoord[1]] = shipType;
                    setInactive([i + startCoord[0], startCoord[1]]);
                }
            }
        }
    }

    const chooseShip = Object.keys(ships);
    const fleet = {}

    board.setComputerBoard = () => {
        chooseShip.forEach((x) => {
            while (!placed) {
                let direction = random(2);
                let row = direction === 1 ? random(10 - ships[x]) : random(10);
                let col = direction === 1 ? random(10) : random(10 - ships[x]);
                board.placeShip([row, col], x, ships[x], direction);
            }
            placed = false;
            fleet[x] = ship(ships[x]);
        });
    }
    board.stillAlive = 5;

    board.receiveAttack = (attackCell) => {
        if (board.cells[attackCell[0]][attackCell[1]] === 'null'
            || board.cells[attackCell[0]][attackCell[1]] === 'notNull') {
            board.cells[attackCell[0]][attackCell[1]] = 'didNotHit';
            return 'didNotHit';
        } else if (board.cells[attackCell[0]][attackCell[1]] === 'didNotHit') {
            return 'inactive';
        } else if (board.cells[attackCell[0]][attackCell[1]] === 'h') {
            return 'inactive';
        } else {
            fleet[board.cells[attackCell[0]][attackCell[1]]].hit();
            if (fleet[board.cells[attackCell[0]][attackCell[1]]].isSunk() === true) { board.stillAlive-- };
            board.cells[attackCell[0]][attackCell[1]] = 'hit' + board.cells[attackCell[0]][attackCell[1]];
            return board.cells[attackCell[0]][attackCell[1]].slice(3)
        }
    }
    return board;
};