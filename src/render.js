import { gameboard } from "./factories/gameboard.js"

export const renderPage = () => {
    const infoBox = document.getElementById('pathParagraph');
    infoBox.innerHTML = "Target the enemies ships. 5 Ships remaining"
    // Prepare player board, place the boats randomly
    const playersBoard = gameboard();
    playersBoard.setComputerBoard();
    const playerDiv = document.getElementById('playersBoard');

    // Prepare computer board, place the boats randomly
    const computersBoard = gameboard();
    computersBoard.setComputerBoard();
    const compDiv = document.getElementById('computersBoard');

    // Render the board of the player with random ships
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            let cell = document.createElement("div");
            cell.classList.add(i === 0 && 'firstRow');
            cell.classList.add(j === 0 && 'firstColumn');
            cell.classList.add("cellNull", "player", `${playersBoard.cells[i][j]}`);
            cell.setAttribute("id", `${i}${j}`);
            playerDiv.appendChild(cell);
        }
    }

    // Render the board of the computer
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            let cell = document.createElement("div");
            cell.classList.add(i === 0 && 'firstRow');
            cell.classList.add(j === 0 && 'firstColumn');
            cell.classList.add("cellNull", "computer", `${computersBoard.cells[i][j]}`);
            cell.setAttribute("id", `${i}${j}`);
            compDiv.appendChild(cell);
        }
    }

    // Add event listener to the computer board cells
    const cellsComp = document.querySelectorAll(".computer");
    cellsComp.forEach((cell) => {
        cell.addEventListener("click", (e) => {
            if (e.target.classList.contains('computer')) {
                let cellContent = computersBoard.receiveAttack(cell.id);
                let sunk = ''
                if (cellContent === 'didNotHit') {
                    e.target.classList.add('miss');
                    infoBox.innerHTML = `Mis! ${computersBoard.stillAlive} enemies ships remaining`

                } else {
                    e.target.classList.add('hit');
                    sunk = computersBoard.fleet[cellContent].isSunk()
                        ? `${cellContent} hitted and sunken!`
                        : `Enemies ship hitted!`
                    infoBox.innerHTML = `${sunk} ${computersBoard.stillAlive} ships remaining`
                }
                e.target.classList.remove('computer');
            }
            compMove();
        })
    })

    // Populate computer possible moves array and random AI moves on odd cells
    const cellsPlayer = document.querySelectorAll(".player");
    const targetArr = [...Array(50).keys()].map(x => x * 2 + 1);
    const compMove = () => {
        let attack = Math.floor(Math.random() * targetArr.length)
    }

}