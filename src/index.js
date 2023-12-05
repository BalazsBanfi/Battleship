import { player } from "./factories/player.js";
import { renderPage } from "./render.js";

const playerOne = player("Balázs");
const computer = player("computer");

const newGame = document.getElementById("newGame");
newGame.addEventListener("submit", (e) => {
  e.preventDefault();
  const controller = document.getElementById("controllers");
  controller.style.display = "none";
  renderPage();
});
