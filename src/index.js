import { player } from "./factories/player.js";
import { renderPage } from "./render.js";
import "./style.css";

const computer = player("computer");
const playerOne = player("player");
const newGame = document.getElementById("newGame");
newGame.addEventListener("submit", (e) => {
  e.preventDefault();
  const playerOne = player(document.getElementById("name").value);
  const myBoard = document.getElementById("myBoard");
  myBoard.innerHTML = `${playerOne.name}'s board`;
  const controller = document.getElementById("controllers");
  controller.style.display = "none";
  renderPage();
});
