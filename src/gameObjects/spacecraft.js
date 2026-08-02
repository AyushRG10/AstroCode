import { keys } from "../input.js";
import { moonGravity } from "./moon.js";
import { earthGravity } from "./earth.js";

export let spacecraft = {
  x: 0,
  y: -384400000 + 6372000,
  angle: 0,
  vx: 0,
  vy: 0,
  accelX: 0,
  accelY: 0,
  // Values based off apolo spacecraft while in transit to the moon
  thrust: 97860, // newtons
  mass: 45000 //kg
};

export function resetSpacecraft() {
  spacecraft.x = 0;
  spacecraft.y = -384400000 + 6372000;
  spacecraft.angle = 0;
  spacecraft.vx = 0;
  spacecraft.vy = 0;
  spacecraft.accelX = 0;
  spacecraft.accelY = 0;
}

export function updatePhysics(dt) {
  let inputAccelX = 0;
  let inputAccelY = 0;

  if (keys.ArrowLeft)  spacecraft.angle -= 0.02;
  if (keys.ArrowRight) spacecraft.angle += 0.02;
  if (keys.ArrowUp) {
    inputAccelX = spacecraft.thrust * Math.sin(spacecraft.angle) / spacecraft.mass;
    inputAccelY = -spacecraft.thrust * Math.cos(spacecraft.angle) / spacecraft.mass;
  }

  const moonAccel = moonGravity(spacecraft);
  const earthAccel = earthGravity(spacecraft);

  spacecraft.accelX = inputAccelX + moonAccel.x + earthAccel.x;
  spacecraft.accelY = inputAccelY + moonAccel.y + earthAccel.y;

  spacecraft.vx += spacecraft.accelX * dt;
  spacecraft.vy += spacecraft.accelY * dt;

  spacecraft.x += spacecraft.vx * dt;
  spacecraft.y += spacecraft.vy * dt;
}

/**
 * Spacecraft Image
 *  @param {CanvasRenderingContext2D} ctx
 *  @param {Object} keys
 */
export function renderSpacecraft(ctx, keys) {
  ctx.save();
  ctx.rotate(spacecraft.angle);

  // basic set up
  ctx.lineWidth = 2;
  ctx.strokeStyle = 'white';
  ctx.fillStyle = 'white';

  //draw Main Body
  ctx.beginPath();
  ctx.moveTo(-20, -60);
  ctx.lineTo(-20, 60);
  ctx.lineTo(20, 60);
  ctx.lineTo(20, -60);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  //draw Nose Cone
  ctx.fillStyle = 'red';
  ctx.beginPath();
  ctx.moveTo(-20, -60);
  ctx.lineTo(-20, -70);
  ctx.lineTo(0, -90);
  ctx.lineTo(20, -70);
  ctx.lineTo(20, -60);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Stabilizers
  // Left
  ctx.beginPath();
  ctx.moveTo(-20, 40);
  ctx.lineTo(-30, 60);
  ctx.lineTo(-30, 90);
  ctx.lineTo(-20, 60);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  // Right
  ctx.beginPath();
  ctx.moveTo(20, 40);
  ctx.lineTo(30, 60);
  ctx.lineTo(30, 90);
  ctx.lineTo(20, 60);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Engine
  ctx.fillStyle = 'grey';
  ctx.beginPath();
  ctx.moveTo(-10, 60);
  ctx.lineTo(-10, 65);
  ctx.lineTo(-5, 65);
  ctx.lineTo(-15, 85);
  ctx.lineTo(15, 85);
  ctx.lineTo(5, 65);
  ctx.lineTo(10, 65);
  ctx.lineTo(10, 60);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  if (keys.ArrowUp) {
    const flameHeight = Math.random() * 5 + 25;
    ctx.fillStyle = `red`;
    ctx.beginPath();
    ctx.moveTo(-15, 85);
    ctx.lineTo(0, 85 + flameHeight);
    ctx.lineTo(15, 85);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = 'yellow';
    ctx.beginPath();
    ctx.moveTo(-15, 85);
    ctx.lineTo(0, 70 + flameHeight);
    ctx.lineTo(15, 85);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  ctx.restore();
}
