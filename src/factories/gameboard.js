// Ship types and lengths
const ships = {
    Carrier: 5,
    Battleship: 4,
    Cruiser: 3,
    Submarine: 3,
    Destroyer: 2
}

const random = (x) => Math.floor(math.random() * x);

// Factory function for create board
export const gameboard = () => {
    const board = {};
    let placed = false;

    // Creating a two-dimensional array with an object in it and fill with value: null
    board.cells = [];
    for (let i = 0; i < 100; i++) {
        board.cells.push('null');
    }

    const setInactive = (coord) => {
        if (board.cells[coord]) {
            board.cells[coord] = 'notNull';
        }
    }

    board.placeShip = (startCoord, shipType, length, direction) => {
        placed = false;
        // Check if the cell are free to place a ship
        let coords = [];
        for (let i = 0; i < length * direction; i += direction) {
            if (board.cells[startCoord + i] && board.cells[startCoord + i] === 'null') { coords.push(board.cells[startCoord + i]) };
        }

        // Check if the ship placed longer than the board edge
        if ((coords.length === length)
            && ((direction === 1 && startCoord % 10 + (length * direction) < 10)
                || (direction === 10 && startCoord + (length * direction) < 100))) {
            // Horizontal ship set inactive
            if (direction === 1) {
                if (startCoord % 10 > 0) {
                    setInactive(startCoord - 1);
                    setInactive(startCoord - 11);
                    setInactive(startCoord + 9);
                };
                if (startCoord + length % 10 < 9) {
                    setInactive(startCoord + length + 1);
                    setInactive(startCoord + length + 11);
                    setInactive(startCoord + length - 9);
                };
                for (let j = startCoord; j < startCoord + length; j++) {
                    setInactive(j - 10);
                    setInactive(j + 10);
                }
            }

            // Vertical ship set inactive
            if (direction === 10) {
                if (startCoord > 9) {
                    setInactive(startCoord - 12);
                    setInactive(startCoord - 11);
                    setInactive(startCoord - 10);
                };
                if (startCoord + (length * 10) < 90) {
                    setInactive(startCoord + length + 9);
                    setInactive(startCoord + length + 10);
                    setInactive(startCoord + length + 11);
                };
                for (let j = startCoord; j < startCoord + (length * direction); j++) {
                    setInactive(j - 10);
                    setInactive(j + 10);
                }
            }
            // Set the cell value to ship name depends on direction
            for (let i = startCoord; i < startCoord + (length * direction); i += direction) {
                board.cells[i] = shipType;
            }
            placed = true;
        }
    }

    const chooseShip = Object.keys(ships);
    chooseShip.forEach((x) => {
        while (!placed) {
            placeShip(random(100), x, ships[x], random(2))
        }
    });

    return board;
};