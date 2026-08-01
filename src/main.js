import { render } from './render.js';
import { keys } from './input.js';


const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();

const THRUST = 0.15;

let spacecraft = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  velX: 0,
  velY: 0,
  angle: 0,
  angularVelocity: 0,
}

function updateSpacecraft() {
  if (keys.ArrowUp) {
    spacecraft.velX += THRUST * Math.sin(spacecraft.angle);
    spacecraft.velY -= THRUST * Math.cos(spacecraft.angle);
  }
  if (keys.ArrowLeft) {
    spacecraft.angle -= 0.1;
  }
  if (keys.ArrowRight) {
    spacecraft.angle += 0.1;
  }
  spacecraft.x += spacecraft.velX;
  spacecraft.y += spacecraft.velY;
}

function gameLoop() {
  updateSpacecraft();
  render(ctx, spacecraft, keys);
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
