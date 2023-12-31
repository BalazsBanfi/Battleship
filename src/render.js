import { gameboard } from "./factories/gameboard.js";

export const renderPage = () => {
  const playerInfoBox = document.getElementById("playerParagraph");
  const compInfoBox = document.getElementById("compParagraph");
  const controller = document.getElementById("controllers");
  const result = document.getElementById("result");
  const infoBox = (player, message) => {
    player.innerHTML = message;
  };

  infoBox(compInfoBox, `Shoot now! 5 ships remaining.`);
  infoBox(playerInfoBox, `You have 5 ships remaining.`);

  // Prepare player board, place the boats randomly
  const playersBoard = gameboard();
  playersBoard.setComputerBoard();
  const playerDiv = document.getElementById("playersBoard");
  while (playerDiv.firstChild) {
    playerDiv.removeChild(playerDiv.firstChild);
  }

  // Prepare computer board, place the boats randomly
  const computersBoard = gameboard();
  computersBoard.setComputerBoard();
  const compDiv = document.getElementById("computersBoard");
  while (compDiv.firstChild) {
    compDiv.removeChild(compDiv.firstChild);
  }
  // Populate the two board's cells
  const populateCells = (oneDiv, player) => {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        let cell = document.createElement("div");
        cell.classList.add(
          "cellNull",
          player,
          `${player === "player" && playersBoard.cells[i][j]}`,
          i === 0 && "firstRow",
          j === 0 && "firstColumn"
        );
        cell.setAttribute("id", `${player === "player" ? "p" : "c"}${i}${j}`);
        oneDiv.appendChild(cell);
      }
    }
  };

  populateCells(compDiv, "computer");
  populateCells(playerDiv, "player");

  // Store the hitted boats on the computer board
  let boats = {};
  const storeHittedBoats = (boat, cellID) => {
    if (boats.hasOwnProperty(boat)) {
      boats[boat].push(cellID);
    } else {
      boats[boat] = [cellID];
    }
  };

  // If a boat is Sunken, add css border to the cells of the boat
  const showSunkenBoat = (boat) => {
    for (let i = 0; i < boats[boat].length; i++) {
      document.getElementById(boats[boat][i]).classList.add(boat);
    }
  };

  // Add event listener to the players moves
  const cellsComp = document.querySelectorAll(".computer");
  cellsComp.forEach((cell) => {
    cell.addEventListener("click", function eventHandler(e) {
      if (
        e.target.classList.contains("computer") &&
        computersBoard.stillAlive > 0 &&
        playersBoard.stillAlive > 0
      ) {
        let cellContent = computersBoard.receiveAttack(cell.id.slice(1));
        let sunk = "";
        if (cellContent === "didNotHit") {
          e.target.classList.add("miss");
          sunk = "Miss!";
        } else {
          e.target.classList.add("hit");
          storeHittedBoats(cellContent, cell.id);
          if (computersBoard.fleet[cellContent].isSunk()) {
            showSunkenBoat(cellContent);
          }
          sunk = computersBoard.fleet[cellContent].isSunk()
            ? `${cellContent} is hit and sunk!`
            : `Hit!`;
        }
        infoBox(
          compInfoBox,
          `${sunk} ${computersBoard.stillAlive} ships remaining.`
        );
        e.target.classList.remove("computer");

        if (computersBoard.stillAlive === 0) {
          setTimeout(() => {
            infoBox(compInfoBox, `All enemy ships were destroyed, you won!`);
          }, 2000);
          setTimeout(() => {
            controller.style.display = "grid";
            result.innerHTML = `All enemy ships were destroyed, you won! <br>Start new game`;
          }, 4000);
        } else {
          setTimeout(() => {
            compMove();
          }, 750);
        }
      }
    });
  });

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
    let arr = [];

    let directions = [-1, 1, -10, 10];
    let temp = 0;

    // horizontal section of the cross
    for (let i = 0; i < 2; i++) {
      let tempArr = [];
      for (let j = 1; j < 5; j++) {
        temp = +id + directions[i] * j;
        if (
          Math.floor(id / 10) !== Math.floor(temp / 10) ||
          document
            .getElementById(`p${("0" + temp).slice(-2)}`)
            .classList.contains("miss") ||
          document
            .getElementById(`p${("0" + temp).slice(-2)}`)
            .classList.contains("hit")
        ) {
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
        temp = +id + directions[i] * j;
        if (
          temp < 0 ||
          temp > 99 ||
          document
            .getElementById(`p${("0" + temp).slice(-2)}`)
            .classList.contains("miss") ||
          document
            .getElementById(`p${("0" + temp).slice(-2)}`)
            .classList.contains("hit")
        ) {
          break;
        } else {
          tempArr.push(temp);
        }
      }
      arr.push(tempArr);
    }
    return arr;
  };
  let lastHit = false;
  let targetedShoots = [];

  const compMove = () => {
    // Set the cell value inactive around the ship
    const removeNeighbours = (squareAround) => {
      let removeCell = 0;
      for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
          removeCell = +squareAround + i + j * 10;
          if (
            (i === -1 && removeCell % 10 == 0) ||
            (i === 1 && removeCell % 9 == 0) ||
            removeCell < 0 ||
            removeCell > 99
          ) {
            continue;
          } else {
            targetArr = [...targetArr.filter((x) => !(+x == removeCell))];
            firstShoots = [...firstShoots.filter((x) => !(+x == removeCell))];
          }
        }
      }
    };

    // Delete the elements from the targetedShoots array is the direction is found
    const deleteWrongDirection = (firstShoot, currentShoot) => {
      let shootDirection =
        Math.abs(firstShoot - currentShoot) < 6 ? "horizontal" : "vertical";
      for (let i = 0; i < targetedShoots.length; i++) {
        if (targetedShoots[i][0]) {
          if (
            (Math.abs(targetedShoots[i][0] - firstShoot) < 6 &&
              shootDirection === "vertical") ||
            (Math.abs(targetedShoots[i][0] - firstShoot) > 5 &&
              shootDirection === "horizontal")
          ) {
            targetedShoots[i] = [];
          }
        }
      }
    };

    let sunk = "";
    // After a hit calls the setHitted func
    if (lastHit) {
      removeNeighbours(lastHit);
      // Select the longest cross and hit the first
      targetedShoots.sort((a, b) => b.length - a.length);
      let tempP = ("0" + targetedShoots[0].shift()).slice(-2);
      let eHitTarget = document.getElementById(`p${tempP}`);
      let cellContent2 = playersBoard.receiveAttack(
        ("0" + eHitTarget.id).slice(-2)
      );

      // Check if hit or miss
      if (cellContent2 === "didNotHit" || cellContent2 === "inactive") {
        eHitTarget.classList.add("miss");
        targetedShoots[0] = [];
        sunk = "Miss!";
      } else {
        eHitTarget.classList.add("hit");
        if (playersBoard.fleet[cellContent2].isSunk()) {
          sunk = `${cellContent2} is hit and sunk!`;
          lastHit = false;
          targetedShoots = [];
        } else {
          sunk = `Hit!`;
          deleteWrongDirection(lastHit, ("0" + eHitTarget.id).slice(-2));
          lastHit = ("0" + eHitTarget.id).slice(-2);
        }
      }
    } else {
      // If the last shot missed, first tries the center of the board, later randomly every second  cell
      let attack =
        firstShoots.length > 0
          ? firstShoots[Math.floor(Math.random() * firstShoots.length)]
          : targetArr[Math.floor(Math.random() * targetArr.length)];

      // Attacks the cell
      let eTarget = document.getElementById(`p${attack}`);

      let cellContent = playersBoard.receiveAttack(
        ("0" + eTarget.id).slice(-2)
      );
      // Check if hitted or missed the ship
      if (cellContent === "didNotHit") {
        eTarget.classList.add("miss");
        sunk = "Miss!";
      } else {
        eTarget.classList.add("hit");
        sunk = playersBoard.fleet[cellContent].isSunk()
          ? `${cellContent} is hit and sunk!`
          : `Hit!`;

        lastHit = ("0" + eTarget.id).slice(-2);
        removeNeighbours(lastHit);
        targetedShoots = crossShoot(lastHit);
      }

      // Delete the targeted cell from the 2 array
      targetArr = [
        ...targetArr.filter((x) => x != ("0" + eTarget.id).slice(-2)),
      ];
      firstShoots = [
        ...firstShoots.filter((x) => x != ("0" + eTarget.id).slice(-2)),
      ];
    }
    infoBox(
      playerInfoBox,
      `${sunk} ${playersBoard.stillAlive} ships remaining`
    );
    if (playersBoard.stillAlive === 0) {
      setTimeout(() => {
        infoBox(
          playerInfoBox,
          `The computer has destroyed all your ships and won!`
        );
      }, 2000);
      setTimeout(() => {
        controller.style.display = "grid";
        result.innerHTML = `All your ships are destroyed, you lost! <br>Start new game`;
      }, 4000);
    }
  };
};
