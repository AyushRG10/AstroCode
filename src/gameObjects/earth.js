export const earth = {
  x: 0,
  y: 0,
  radius: 637100, // 6,371 km
  mass: 5.972e22, // 5.972 × 10^24 kg
}

export function renderEarth(ctx) {
  ctx.save();
  ctx.lineWidth = 4;
  ctx.fillStyle = 'blue'
  ctx.strokeStyle = 'green'
  ctx.beginPath();
  ctx.arc(earth.x, earth.y, earth.radius, 0, 2 * Math.PI);
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}

export function earthGravity(spacecraft) {
  const G = 6.67430e-11; // gravitational constant
  const distance = Math.sqrt((earth.x - spacecraft.x) ** 2 + (earth.y - spacecraft.y) ** 2);
  const force = G * (earth.mass * spacecraft.mass) / (distance ** 2);
  const angle = Math.atan2(earth.y - spacecraft.y, earth.x - spacecraft.x);
  const acceleration = {
    x: force * Math.cos(angle),
    y: force * Math.sin(angle),
  };
  return acceleration;
}

export function earthCollision(spacecraft) {
  console.log("running");
  const distanceSquared = (earth.x - spacecraft.x) ** 2 + (earth.y - spacecraft.y) ** 2;
  return distanceSquared <= (earth.radius + spacecraft.radius) ** 2;
}
