import { gameboard } from "./factories/gameboard.js"

export const renderPage = () => {

    // Prepare computer board, place the boats randomly
    const boardComp = gameboard();
    boardComp.setComputerBoard();
    const compDiv = document.getElementById('boardComputer')

    
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
    
}