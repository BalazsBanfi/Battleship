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
    const setInactive = (coord, lengthCoords) => {
        for (let i = -1; i <= lengthCoords; i++)
            for (let j = -1; j < 2; j++) {
                if (board.cells[i + coord[0]][j + coord[1]] && board.cells[i + coord[0]][j + coord[1]] === 'null') {
                    board.cells[i + coord[0]][j + coord[1]] = 'notNull';
                }
            }
    }


    let coords = []
    board.placeShip = (startCoord, shipType, length, direction) => {

        // Check if the cell are free to place a ship

        coords = [];
        if ((direction === 0 && startCoord[0] + length < 10)
            || (direction === 1 && startCoord[1] + length < 10)) {
            for (let i = 0; i < length; i += 1) {
                coords.push(direction === 0 ? board.cells[i + startCoord[0], startCoord[1]] : board.cells[startCoord[0], i + startCoord[1]])
            }
        } else {
            return 'Cannot place there!!';
        }

        if ((coords.flat(2).filter((x) => x === 'null') || []).length === length) {
            let j = 0;
            let k = 0;
            for (let i = 0; i < length; i++) {
                board.cells[j + startCoord[0]][k + startCoord[1]] = shipType;
                setInactive(board.cells[j + startCoord[0]][k + startCoord[1]], length);
                if (direction === 0) {
                    j++;
                } else {
                    k++;
                }
            }

        }

        // Check if the ship placed longer than the board edge
        placed = true;
    }

    const chooseShip = Object.keys(ships);
    const fleet = {}

    board.setComputerBoard = () => {
        chooseShip.forEach((x) => {
            while (!placed) {
                board.placeShip([random(10), random(10)], x, ships[x], random(2));
            }
            placed = false;
            fleet[x] = ship(ships[x]);
        });
    }
    board.stillAlive = 5;
    board.receiveAttack = (attackCell) => {
        if (board.cells[attackCell] === 'null' || board.cells[attackCell] === 'notNull') {
            board.cells[attackCell] = 'didNotHit';
            return 'didNotHit';
        } else if (board.cells[attackCell] === 'didNotHit') {
            return 'inactive';
        } else if (board.cells[attackCell][0] === 'h') {
            return 'inactive';
        } else {
            fleet[board.cells[attackCell]].hit();
            if (fleet[board.cells[attackCell]].isSunk() === true) { board.stillAlive-- };
            board.cells[attackCell] = 'hit' + board.cells[attackCell];
            return board.cells[attackCell].slice(3)
        }
    }

    return board;
};