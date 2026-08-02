import { keys } from "./input.js";
import { renderSpacecraft } from "./render.js";

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

let spacecraft;
let gameState = 'PLAYING'; //playing, landed, crashed

function resetGame() {
  spacecraft = {
    x: 0,
    y: 0,
    angle: 0,
    vx: 0,
    vy: 0,
    thrust: 0.15,
  };
  gameState = 'PLAYING';
}

resetGame();

window.addEventListener('keydown', (e) => {
  if ((e.key.toLowerCase() === 'r' || e.code === 'Space') && gameState !== 'PLAYING') {
    resetGame();
  }
});

function updatePhysics() {
  if (gameState !== 'PLAYING') return;

  if (keys.ArrowLeft)  spacecraft.angle -= 0.02;
  if (keys.ArrowRight) spacecraft.angle += 0.02;
  if (keys.ArrowUp) {
    spacecraft.vx -= spacecraft.thrust * Math.cos(spacecraft.angle + Math.PI / 2);
    spacecraft.vy -= spacecraft.thrust * Math.sin(spacecraft.angle + Math.PI / 2);
  }

  spacecraft.x += spacecraft.vx;
  spacecraft.y += spacecraft.vy;
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.save();
  ctx.translate(canvas.width / 2 - spacecraft.x, canvas.height / 2 - spacecraft.y);

  ctx.save();
  ctx.translate(spacecraft.x, spacecraft.y);
  renderSpacecraft(ctx, spacecraft, keys);
  ctx.restore();

  ctx.restore();

  drawUI();
}

function drawUI() {
  const dx = spacecraft.x;
  const dy = spacecraft.y;
  const distance = Math.hypot(dx, dy);

  const altitude = Math.max(0, distance).toFixed(1);
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
  ctx.fillText(`ALTITUDE ${altitude} m`, 25, 50);
  ctx.fillText(`LAT VEL: ${spacecraft.vx.toFixed(2)} m/s`, 25, 78);
  ctx.fillText(`VERT VEL: ${spacecraft.vy.toFixed(2)} m/s`, 25, 98);

  ctx.fillStyle = '#4ade80';
  ctx.fillText(`SPEED: ${totalSpeed.toFixed(2)} m/s`, 25, 118);

  ctx.fillStyle = '#f87171';
  ctx.fillText(`PITCH: ${pitchDegrees}°`, 25, 138);
}

let lastTime = performance.now();
let accumulator = 0;

const TICKS_PER_SECOND = 60;
const TIME_STEP = 1000 / TICKS_PER_SECOND; // ~16.67 ms per update

function gameLoop(currentTime) {
  let frameTime = currentTime - lastTime;
  lastTime = currentTime;

  if (frameTime > 250) {
    frameTime = 250;
  }

  accumulator += frameTime;

  while (accumulator >= TIME_STEP) {
    updatePhysics();
    accumulator -= TIME_STEP;
  }

  render();

  requestAnimationFrame(gameLoop);
}

// FIX 2: Start the game loop
requestAnimationFrame(gameLoop);
