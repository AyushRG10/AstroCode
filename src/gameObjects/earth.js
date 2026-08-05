export const earth = {
  x: 0,
  y: 0,
  radius: 637100, // 6,371 km
  mass: 5.972e22, // 5.972 × 10^24 kg
}

export const landingPad = {
  x: 0,
  y: earth.y - earth.radius,
  width: 500,
  height: 20,
}

export function renderEarth(ctx) {
  // Landing Pad drawn first so Earth renders over it
  ctx.save();
  ctx.fillStyle = 'green';
  ctx.lineWidth = 4;
  ctx.strokeStyle = 'green';
  ctx.moveTo(landingPad.x - landingPad.width / 2, landingPad.y - landingPad.height);
  ctx.lineTo(landingPad.x + landingPad.width / 2, landingPad.y - landingPad.height);
  ctx.lineTo(landingPad.x + landingPad.width / 2, landingPad.y);
  ctx.lineTo(landingPad.x - landingPad.width / 2, landingPad.y);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.restore();

  // Earth drawn second so it renders on top of the landing pad
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
  const force = G * (earth.mass) / (distance ** 2);
  const angle = Math.atan2(earth.y - spacecraft.y, earth.x - spacecraft.x);
  const acceleration = {
    x: force * Math.cos(angle),
    y: force * Math.sin(angle),
  };
  return acceleration;
}

export function earthCollision(spacecraft) {
  const distanceSquared = (earth.x - spacecraft.x) ** 2 + (earth.y - spacecraft.y) ** 2;
  return distanceSquared <= (earth.radius + spacecraft.radius) ** 2;
}

export function landingCollision(spacecraft) {
  const padMinX = landingPad.x - landingPad.width / 2;
  const padMaxX = landingPad.x + landingPad.width / 2;
  const padMinY = landingPad.y - landingPad.height;
  const padMaxY = landingPad.y;

  const isInsidePad = (pt) => (
    pt.x >= padMinX && pt.x <= padMaxX && pt.y >= padMinY && pt.y <= padMaxY
  );

  const cos = Math.cos(spacecraft.angle);
  const sin = Math.sin(spacecraft.angle);

  const toWorldCords = (localX, localY) => ({
    x: spacecraft.x + (localX + cos - localY * sin),
    y: spacecraft.y + (localX * sin + localY + cos)
  });

  const noseTip = toWorldCords(0, -90);
  const leftFoot = toWorldCords(-30, 90);
  const rightFoot = toWorldCords(30, 90);

  if (isInsidePad(noseTip)) {
    return { landed: false, crashed: true, hitPoint: noseTip };
  }

  if (isInsidePad(leftFoot) || isInsidePad(rightFoot)) {
    const speed = Math.hypot(spacecraft.vx, spacecraft.vy);
    const normalizedAngle = Math.abs(Math.atan2(Math.sin(spacecraft.angle), Math.cos(spacecraft.angle)));

    const isAngleSafe = normalizedAngle <= (10 * Math.PI / 180);
    const isSpeedSafe = speed <= 5.0;

    if (isAngleSafe && isSpeedSafe) {
      return { landed: true, crashed: false, hitPoint: leftFoot };
    } else {
      return { landed: false, crashed: true, hitPoint: leftFoot };
    }
  }

  return { landed: false, crashed: false, hitPoint: null };
}
