export const moon = {
  x: 0,
  y: -38440000, // 384,400 km distance from earth in meters
  radius: 173700, // 1,737 km radius in meters
  mass: 7.34767309e20, // 7.34767309 x 10^22 kg
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

export function moonGravity(spacecraft) {
  const G = 6.67430e-11; // Gravitational constant in m^3 kg^-1 s^-2
  const distance = Math.sqrt((moon.x - spacecraft.x) ** 2 + (moon.y - spacecraft.y) ** 2);
  const force = (G * moon.mass * spacecraft.mass) / (distance ** 2);
  const angle = Math.atan2(moon.y - spacecraft.y, moon.x - spacecraft.x);
  const acceleration = {
    x: force * Math.cos(angle),
    y: force * Math.sin(angle)
  };
  return acceleration;
}

export function moonCollision(spacecraft) {
  const distanceSquared = (moon.x - spacecraft.x) ** 2 + (moon.y - spacecraft.y) ** 2;
  return distanceSquared <= (moon.radius + spacecraft.radius) ** 2;
}
