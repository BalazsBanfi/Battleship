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
    const board = [];

    // Creating a two-dimensional array with an object in it and fill with value: null
    for (let i = 0; i < 100; i++) {
        board.push('null');
    }


    // Check if the cell are free to place the ship
    const goodPlace = (shipType, length, direction, startCoord) => {
        const coordinates = [];

        while (coordinates.length < 1) {

            // Check the free cell in a row
            if (direction === 0) {
                if (startCoord % 10 + length > 9) {
                    return false;
                }
                if (board.slice(startCoord, startCoord + length).every((x) => x === 'null')) {
                    for (let i = 0; i < length; i++) {
                        board[startCoord + i] = shipType;
                        coordinates.push(startCoord + i);
                    }
                } else {
                    return false;
                }
            }

            // Check the free cell in a row

            // Check the free cell in a row
            if (direction === 0) {
                if (Math.floor(startCoord / 10) + length > 9) {
                    return false;
                }
                let tempArr = [];
                for (let i = 0; i < length; i++) {
                    tempArr.push(board[Math.floor(startCoord / 10) + i * 10]);
                }
                if (tempArr.every((x) => x === 'null')) {
                    for (let i = 0; i < length; i++) {
                        board[startCoord + (i * 10)] = shipType;
                        coordinates.push(startCoord + (i * 10));
                    }
                } else {
                    return false;
                }
            }

        }
        return coordinates;
    }

    // Try to place the ships on random cells
    const placeShip = () => {

        Object.keys(ships).forEach((ship => {
            let arr = goodPlace(ship, ships[ship]);
            arr.forEach((coord) => {
                board[coord[0]][coord[1]] = ship;
            })
        }));
    }
    return board;
}
