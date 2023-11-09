import { gameboard } from "./factories/gameboard.js"

export const renderPage = () => {

    // Prepare player board, place the boats randomly
    const boardPlayer = gameboard();
    boardPlayer.setComputerBoard();
    const playerDiv = document.getElementById('boardPlayer');

    // Prepare computer board, place the boats randomly
    const boardComp = gameboard();
    boardComp.setComputerBoard();
    const compDiv = document.getElementById('boardComputer');

    // Render the board of the player with random ships
    for (let i = 0; i < 100; i++) {
        let cell = document.createElement("div");
        if (i < 10) {
            cell.classList.add('firstRow')
        }
        if (i % 10 === 0) {
            cell.classList.add('firstColumn')
        }

        cell.classList.add("cellNull");
        cell.classList.add("player");
        cell.classList.add(`${boardPlayer.cells[i]}`)
        cell.setAttribute("id", `${i}`);
        playerDiv.appendChild(cell);
    }


    // Render the board of the computer
    for (let i = 0; i < 100; i++) {
        let cell = document.createElement("div");
        if (i < 10) {
            cell.classList.add('firstRow')
        }
        if (i % 10 === 0) {
            cell.classList.add('firstColumn')
        }

        cell.classList.add("cellNull");
        cell.classList.add("comp");
        cell.classList.add(`${boardComp.cells[i]}`)
        cell.setAttribute("id", `${i}`);
        compDiv.appendChild(cell);
    }

    // Add event listener to the combuter board cells
    const cellsComp = document.querySelectorAll(".comp");
    cellsComp.forEach((square) => {
        square.addEventListener("click", () => {
            console.log(square.id)
        })

    })


}