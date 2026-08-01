import { renderSpacecraft } from './render.js';
import { keys } from './input.js';


const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();

const MAX_SPEED = 1;

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
    spacecraft.velX += MAX_SPEED * Math.cos(spacecraft.angle - Math.PI / 2);
    spacecraft.velY -= MAX_SPEED * Math.sin(spacecraft.angle + Math.PI / 2);
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
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  updateSpacecraft();
  renderSpacecraft(ctx, spacecraft);
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
