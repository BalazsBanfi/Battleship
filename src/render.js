import { gameboard } from "./factories/gameboard.js"

export const renderPage = () => {
    const playerInfoBox = document.getElementById('playerParagraph');
    const compInfoBox = document.getElementById('compParagraph');
    compInfoBox.innerHTML = "Target the enemies ships. 5 Ships remaining"
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
            cell.setAttribute("id", `p${i}${j}`);
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
            cell.setAttribute("id", `c${i}${j}`);
            compDiv.appendChild(cell);
        }
    }

    // Add event listener to the computer board cells
    const cellsComp = document.querySelectorAll(".computer");
    cellsComp.forEach((cell) => {
        cell.addEventListener("click", (e) => {
            if (e.target.classList.contains('computer')) {
                let cellContent = computersBoard.receiveAttack(cell.id.slice(1));
                let sunk = ''
                if (cellContent === 'didNotHit') {
                    e.target.classList.add('miss');
                    compInfoBox.innerHTML = `Mis! ${computersBoard.stillAlive} enemies ships remaining`

                } else {
                    e.target.classList.add('hit');
                    sunk = computersBoard.fleet[cellContent].isSunk()
                        ? `${cellContent} hitted and sunken!`
                        : `Enemies ship hitted!`
                    compInfoBox.innerHTML = `${sunk} ${computersBoard.stillAlive} ships remaining`
                }
                e.target.classList.remove('computer');
            }
            compMove();
        })
    })

    // Populate computer possible moves array and random AI moves on odd cells
    const cellsPlayer = document.querySelectorAll(".player");
    let targetArr = [];
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            if ((i + j) % 2 == 0) {
                targetArr.push(`${i}${j}`);
            }
        }

    }
    let firstShoots = [33, 35, 44, 46, 53, 55, 64, 66];

    // Return cross around the first shot without the missed cells
    let crossShoot = (id) => {
        let arr = []

        let directions = [-1, 1, -10, 10];
        let temp = 0;

        // horizontal section of the cross
        for (let i = 0; i < 2; i++) {
            let tempArr = [];
            for (let j = 1; j < 5; j++) {
                temp = +id + (directions[i] * j);
                if (Math.floor(id / 10) !== Math.floor(temp / 10)
                    || document.getElementById(`p${temp}`).classList.contains('miss')) {
                    break;
                } else {
                    tempArr.push(temp);
                }
            }
            arr.push(tempArr);
        }

        // vertical section of the cross
        for (let i = 2; i < 4; i++) {
            let tempArr = [];
            for (let j = 1; j < 5; j++) {
                temp = +id + (directions[i] * j);

                if (temp < 0 || temp > 99
                    || document.getElementById(`p${('0' + temp).slice(-2)}`).classList.contains('miss')) {
                    break;
                } else {
                    tempArr.push(temp);
                }
            }
            arr.push(tempArr);
        }
        console.table(arr)
        return arr;
    }
    let lastHit = false;
    let targetedShoots = [];
    const compMove = () => {

        let setHitted = (diagonal) => {
            // Removes from the possibilities the diagonals of the hitted cell
            let removes = [diagonal - 11, diagonal - 9, +diagonal + 9, +diagonal + 11];
            targetArr = [...targetArr.filter(x => !removes.includes(x))];
            firstShoots = [...firstShoots.filter(x => !removes.includes(x))];

            // Select the longest cross and hit the first
            targetedShoots.sort((a, b) => b.length - a.length);
            let tempP = targetedShoots[0].shift();
            console.log('tempP ', tempP)
            let eHitTarget = document.getElementById(`p${tempP}`)
            let cellContent2 = playersBoard.receiveAttack(('0' + eHitTarget.id).slice(-2));
            // Check if hitted or missed the ship
            if (cellContent2 === 'didNotHit' || cellContent2 === 'inactive') {
                eHitTarget.classList.add('miss');
                playerInfoBox.innerHTML = `Mis! ${playersBoard.stillAlive} enemies ships remaining`

            } else {
                eHitTarget.classList.add('hit');
                let sunk = '';
                console.log('cellcontent2 ', cellContent2);
                if (playersBoard.fleet[cellContent2].isSunk()) {
                    sunk = `${cellContent2} hitted and sunken!`;
                    lastHit = false;
                    targetedShoots = [];
                } else {
                    sunk = `Friendly ship hitted!`;
                    lastHit = ('0' + eHitTarget.id).slice(-2);
                }
                playerInfoBox.innerHTML = `${sunk} ${playersBoard.stillAlive} ships remaining`;

            }
            //         }
        }

        // After a hit calls the setHitted func
        if (lastHit) {
            setHitted(lastHit);

        } else {
            let sunk = '';
            // If the last shot missed, first tries the center of the board, later randomly the every second cell
            let attack = firstShoots.length > 0
                ? firstShoots[Math.floor(Math.random() * firstShoots.length)]
                : targetArr[Math.floor(Math.random() * targetArr.length)];

            // Attacks the cell
            let eTarget = document.getElementById(`p${attack}`)
            let cellContent = playersBoard.receiveAttack(eTarget.id.slice(1));

            // Check if hitted or missed the ship
            if (cellContent === 'didNotHit') {
                eTarget.classList.add('miss');
                playerInfoBox.innerHTML = `Mis! ${playersBoard.stillAlive} enemies ships remaining`

            } else {
                eTarget.classList.add('hit');
                sunk = playersBoard.fleet[cellContent].isSunk()
                    ? `${cellContent} hitted and sunken!`
                    : `Friendly ship hitted!`;
                playerInfoBox.innerHTML = `${sunk} ${playersBoard.stillAlive} ships remaining`;
                lastHit = ('0' + eHitTarget.id).slice(-2);
                targetedShoots = crossShoot(lastHit);
            }

            // Delete the targeted cell from the 2 array
            targetArr = [...targetArr.filter(x => x != eTarget.id.slice(1))];
            firstShoots = [...firstShoots.filter(x => x != eTarget.id.slice(1))];
        }
    }
}
