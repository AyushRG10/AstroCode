export function renderSpacecraft(ctx, spacecraft) {
  ctx.save();
  ctx.translate(spacecraft.x, spacecraft.y);
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

  ctx.restore();
}
