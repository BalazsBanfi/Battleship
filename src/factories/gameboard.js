// Factory function for create board
export const gameboard = () => {
    const board = [];
    // Creating a two-dimensional array with an object in it and fill with value: null
    for (let i = 0; i < 9; i++) {
        board[i] = [];
        for (let j = 0; j < 10; j++) {
            board[i].push("null");
        }
        board.push(board[i]);
    }
    return board;
}
