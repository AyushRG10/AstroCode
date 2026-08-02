const moon = {
  x: 0,
  y: -384400000, // 384,400 km distance from earth in meters
  radius: 1737000, // 1,737 km radius in meters
};

export function renderMoon(ctx) {
  ctx.save();
  ctx.fillStyle = '#94a3b8'; // Slate grey moon color
  ctx.strokeStyle = '#cbd5e1'; // Lighter grey rim outline
  ctx.lineWidth = 4;

  ctx.beginPath();
  ctx.arc(moon.x, moon.y, moon.radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}
