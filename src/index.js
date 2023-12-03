import { player } from './factories/player.js';
import { renderPage } from "./render.js";

const playerOne = player('Balázs');
const computer = player('computer');

renderPage();
