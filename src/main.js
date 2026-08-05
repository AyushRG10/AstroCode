import { keys, gameReset } from "./input.js";
import { spacecraft, updatePhysics, resetSpacecraft, renderSpacecraft } from "./gameObjects/spacecraft.js";
import { renderMoon, moonCollision } from "./gameObjects/moon.js";
import { renderEarth, earthCollision, landingCollision } from "./gameObjects/earth.js";

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

let gameState = 'PLAYING'; //playing, landed, crashed

function resetGame() {
  resetSpacecraft();
  gameState = 'PLAYING';
}

resetGame();

window.addEventListener('keydown', (e) => {
  if ((e.key.toLowerCase() === 'r' || e.code === 'Space') && gameState !== 'PLAYING') {
    resetGame();
  }
});

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.save();
  ctx.translate(canvas.width / 2 - spacecraft.x, canvas.height / 2 - spacecraft.y);
  renderMoon(ctx);
  renderEarth(ctx);

  ctx.save();
  ctx.translate(spacecraft.x, spacecraft.y);
  renderSpacecraft(ctx, keys);
  ctx.restore();

  ctx.restore();

  drawUI();
}

function drawUI() {
  const dx = spacecraft.x;
  const dy = spacecraft.y;
  const distance = Math.hypot(dx, dy);

  const x = spacecraft.x;
  const y = spacecraft.y;
  const totalSpeed = Math.hypot(spacecraft.vx, spacecraft.vy);
  const normalizedAngle = Math.atan2(Math.sin(spacecraft.angle), Math.cos(spacecraft.angle));
  const pitchDegrees = (normalizedAngle * (180 / Math.PI)).toFixed(1);

  ctx.save();

  // Telemetry Box
  ctx.fillStyle = 'rgba(15, 23, 42, 0.75)';
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 1;
  ctx.fillRect(15, 15, 220, 150);
  ctx.strokeRect(15, 15, 220, 150);

  ctx.font = '12px monospace';
  ctx.fillStyle = '#94a4b8';
  ctx.fillText('FLIGHT TELEMETRY', 25, 33);

  ctx.font = '14px monospace';
  ctx.fillStyle = '#94a3b8';
  ctx.fillText(`X ${x.toFixed(1)} m`, 25, 50);
  ctx.fillText(`Y ${y.toFixed(1)} m`, 25, 68);
  ctx.fillText(`LAT VEL: ${spacecraft.vx.toFixed(2)} m/s`, 25, 88);
  ctx.fillText(`VERT VEL: ${spacecraft.vy.toFixed(2)} m/s`, 25, 108);

  ctx.fillStyle = '#4ade80';
  ctx.fillText(`SPEED: ${totalSpeed.toFixed(2)} m/s`, 25, 128);

  ctx.fillStyle = '#f87171';
  ctx.fillText(`PITCH: ${pitchDegrees}°`, 25, 148);
}

function gameStateHandler() {
  ctx.save();
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = '20px monospace';
  if (gameState === 'LANDED') {
    ctx.fillStyle = 'green';
    ctx.fillText("You successfully landed. Congrats!", canvas.width / 2, 20);
  } else if (gameState === 'CRASHED') {
    ctx.fillStyle = 'red';
    ctx.fillText("You have crashed! Try again!", canvas.width / 2, 20);
  }
  if (gameState != 'PLAYING') {
    ctx.fillStyle = 'white';
    ctx.fillText("Please click R to try again!", canvas.width / 2, 50);
    if (gameReset) {
      gameState = 'PLAYING';
      gameReset = false;
      resetGame();
    }
  }
  ctx.restore();
}

let lastTime = performance.now();
let accumulator = 0;

const TICKS_PER_SECOND = 60;
const TIME_STEP = 1000 / TICKS_PER_SECOND; // ~16.67 ms per update
const dt = 1 / TICKS_PER_SECOND;

function gameLoop(currentTime) {
  if (gameState === 'PLAYING') {
    let frameTime = currentTime - lastTime;
    lastTime = currentTime;

    if (frameTime > 250) {
      frameTime = 250;
    }

    accumulator += frameTime;

    while (accumulator >= TIME_STEP) {
      updatePhysics(dt);
      accumulator -= TIME_STEP;
    }

    render();
  }
  if (earthCollision(spacecraft) || moonCollision(spacecraft)) {
    gameState = 'CRASHED';
  }
  gameStateHandler();
  const landingResult = landingCollision(spacecraft).landed;
  console.log(landingResult);
  requestAnimationFrame(gameLoop);
}

// FIX 2: Start the game loop
requestAnimationFrame(gameLoop);
