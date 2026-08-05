import { keys } from "../input.js";
import { moonGravity, moon } from "./moon.js";
import { earthGravity, earth } from "./earth.js";

export let spacecraft = {
  // Basic Information
  x: 0,
  y: earth.y - earth.radius - 2000,
  angle: 0,
  vx: 0,
  vy: 0,
  accelX: 0,
  accelY: 0,
  angularVelocity: 0,
  // Values based off apolo spacecraft while in transit to the moon
  thrust: 97860, // newtons
  mass: 450, //kg. For now use 450 but then use 45000 after implemented saturn v rocket
  //Side Thruster Values required for rotation calc
  sideThursterTorque: 40, // newtons
  inertia: 120000,
  // Spacecraft Design Specifications
  radius: 90
};

export function resetSpacecraft() {
  spacecraft.x = 0;
  spacecraft.y = earth.y - earth.radius - 2000;
  spacecraft.angle = 0;
  spacecraft.vx = 0;
  spacecraft.vy = 0;
  spacecraft.accelX = 0;
  spacecraft.accelY = 0;
  spacecraft.angularVelocity = 0;
}

export function updatePhysics(dt) {
  let forwardAccelX = 0;
  let forwardAccelY = 0;
  let angularAccel = 0;

  if (keys.ArrowLeft) {
    angularAccel -= spacecraft.sideThursterTorque / spacecraft.inertia;
  }
  if (keys.ArrowRight) {
    angularAccel += spacecraft.sideThursterTorque / spacecraft.inertia;
  }
  spacecraft.angularVelocity += angularAccel / dt;
  spacecraft.angle += spacecraft.angularVelocity * dt;
  if (keys.ArrowUp) {
    forwardAccelX = spacecraft.thrust * Math.sin(spacecraft.angle) / spacecraft.mass;
    forwardAccelY = -spacecraft.thrust * Math.cos(spacecraft.angle) / spacecraft.mass;
  }

  const moonAccel = moonGravity(spacecraft);
  const earthAccel = earthGravity(spacecraft);

  spacecraft.accelX = forwardAccelX + moonAccel.x + earthAccel.x;
  spacecraft.accelY = forwardAccelY + moonAccel.y + earthAccel.y;

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
  // Side Thrusters
  // Left
  ctx.fillStyle = 'grey';
  ctx.beginPath();
  ctx.moveTo(-20, -50);
  ctx.lineTo(-30, -50);
  ctx.lineTo(-40, -20);
  ctx.lineTo(-30, -11);
  ctx.lineTo(-20, -30);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  if (keys.ArrowRight) {
    ctx.fillStyle = 'yellow';
    const flameHeight = Math.random() * 5 + 10;
    ctx.beginPath();
    ctx.moveTo(-40, -20);
    ctx.lineTo(-35, -20 + flameHeight);
    ctx.lineTo(-30, -11);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }
  // Right
  ctx.fillStyle = 'grey';
  ctx.beginPath();
  ctx.moveTo(20, -50);
  ctx.lineTo(30, -50);
  ctx.lineTo(40, -20);
  ctx.lineTo(30, -11);
  ctx.lineTo(20, -30);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  if (keys.ArrowLeft) {
    ctx.fillStyle = 'yellow';
    const flameHeight = Math.random() * 5 + 10;
    ctx.beginPath();
    ctx.moveTo(40, -20);
    ctx.lineTo(35, -20 + flameHeight);
    ctx.lineTo(30, -11);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  ctx.restore();
}
