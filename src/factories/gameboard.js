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
    const goodPlace = (row, col, direction, length, placed) => {
        for (let i = 0; i < length; i++) {

        }
    }

    // Try to place the ships on random cells
    const placeShip = () => {

        Object.keys(ships).forEach((ship => {
            let placed = false;
            while (!placed) {
                let row = random(10);
                let col = random(10);
                let direction = random(2);

            }


        }));



    }

    return board;
}
