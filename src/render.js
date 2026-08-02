/**
 *  @param {CanvasRenderingContext2D} ctx
 *  @param {Object} keys
 *  @param {Object} spacecraft
 */

 /*
export function drawShip(ctx, spacecraft, keys) {
  ctx.save();
  ctx.rotate(spacecraft.angle);

  ctx.strokeStyle = 'white';
  ctx.lineWidth = 2;
  ctx.fillStyle = '#05050a';

  ctx.beginPath();
  ctx.moveTo(-15, -40);
  ctx.lineTo(0, -60);
  ctx.lineTo(15, -40);
  ctx.lineTo(20, 20);
  ctx.lineTo(-20, 20);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#4ade80';
  ctx.beginPath();
  ctx.arc(0, -25, 6, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath()
  ctx.moveTo(-20, 10);
  ctx.lineTo(-20, 10);
  ctx.lineTo(-35, 35);
  ctx.lineTo(-25, 35);
  ctx.lineTo(-35, 35);
  ctx.stroke();

  ctx.beginPath()
  ctx.moveTo(20, 10);
  ctx.lineTo(35, 35);
  ctx.lineTo(25, 35);
  ctx.lineTo(25, 35);
  ctx.lineTo(35, 35);
  ctx.stroke();

  if (keys.ArrowUp) {
    const flameLength = 25 + Math.random() * 15;

    ctx.fillStyle = '#f97316';
    ctx.beginPath();
    ctx.moveTo(-6, 28);
    ctx.lineTo(0, 28 + flameLength);
    ctx.lineTo(6, 28);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#facc15';
    ctx.beginPath();
    ctx.moveTo(-3, 28);
    ctx.lineTo(0, 28 + (flameLength * 0.6));
    ctx.lineTo(3, 28);
    ctx.closePath();
    ctx.fill();
  }

  ctx.restore();
}
*/

export function renderSpacecraft(ctx, spacecraft, keys) {
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
