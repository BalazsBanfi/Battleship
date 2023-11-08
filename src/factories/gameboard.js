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
    for (let i = 0; i < 9; i++) {
        board[i] = [];
        for (let j = 0; j < 10; j++) {
            board[i].push(`${i}${j}`);
        }
        board.push(board[i]);
    }


    // Check if the cell are free to place the ship
    const goodPlace = (shipName, length) => {
        const coordinates = [];
        while (coordinates.length < 1) {
            let row = random(10);
            let col = random(10);
            let direction = random(2);

            // Check the free cell in a row
            if (direction === 0 && row + length < 10) {
                for (let i = col; i < col + length; i++) {
                    if (typeof board[row][i] === 'number') {
                        coordinates.push(`${row}${i}`);
                    } else {
                        coordinates = [];
                        break;
                    }
                }
            }

            // Check the free cell in a row
            if (direction === 1 && col + length < 10) {
                for (let i = col; i < col + length; i++) {
                    if (typeof board[i][col] === 'number') {
                        coordinates.push(`${i}${col}`);
                    } else {
                        coordinates = [];
                        break;
                    }
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
