import { getUnitPosition } from './utils/getUnitPosition';
import { getSpellTargetPosition } from './utils/getSpellTargetPosition';
import { subtractVectors } from '../physics/vectors/subtractVectors';
import { getFacingAngle } from './utils/getFacingAngle';
import { particleEngine } from '../physics/engine/particleEngine';
import { createParticle } from '../physics/engine/createParticle';
import { createVector } from '../physics/vectors/createVector';
import { IParticle } from '../physics/engine/types';
import { makeUnitFly } from './utils/makeUnitFly';
import { getTerrainNormal } from '../physics/vectors/getTerrainNormal';
import { projectVector } from '../physics/vectors/projectVector';
import { scaleVector } from '../physics/vectors/scaleVector';
import { addVectors } from '../physics/vectors/addVectors';
import { getScalarProduct } from '../physics/vectors/getScalarProduct';
import { setVectorLength } from '../physics/vectors/setVectorLength';
import { moveParticle } from '../physics/engine/moveParticle';
import { Log } from '../lib/Serilog/Serilog';

export const jumpAbilityCode = FourCC('A00C');

const jumpGroundEffect = (particle: IParticle): void => {
  const { position, unit, velocity } = particle;
  const { x, y } = position;
  if (!IsTerrainPathable(x, y, PATHING_TYPE_WALKABILITY)) {
    particleEngine.removeParticle(particle);
    PauseUnit(unit, false);
    return;
  }
  const c3 = 150;
  const c4 = 650 * 650;
  const b10 = getTerrainNormal(x, y, 25);
  const b11 = projectVector(velocity, b10);

  const rest = scaleVector(velocity, 0.03);
  const place = subtractVectors(position, rest);

  const vs = scaleVector(b11, -2);
  const bounceVelocity = scaleVector(addVectors(velocity, b11), 0.5);

  const scaledBounceVelocity =
    getScalarProduct(bounceVelocity, bounceVelocity) > c4
      ? setVectorLength(bounceVelocity, Math.sqrt(c4))
      : bounceVelocity;

  if (getScalarProduct(bounceVelocity, bounceVelocity) < c3 * c3) {
    particleEngine.removeParticle(particle);
    PauseUnit(unit, false);
  } else {
    particle.velocity = bounceVelocity;
    particle.position = place;
  }
};

const jumpPause = (unit: unit): void => {
  SetUnitAnimationByIndex(unit, 8);
  QueueUnitAnimation(unit, 'Stand');
};

export const jump = (cake: { r0: number; r1: number }): void => {
  const fireUnit = GetSpellAbilityUnit();

  const fireUnitPosition = getUnitPosition(fireUnit);
  const targetPosition = getSpellTargetPosition();
  const pathVector = subtractVectors(targetPosition, fireUnitPosition);

  const facingAngle = getFacingAngle(pathVector, fireUnit);

  const { x, y } = pathVector;

  // if (UnitHasBuffBJ(fireUnit, FourCC('B001')) === false && UnitHasBuffBJ(fireUnit, FourCC('B004'))) {}

  const pauseDelayTimer = CreateTimer();

  const gravity = particleEngine.getGravity();
  const r0 = RMinBJ(cake.r0, Math.sqrt(x * x + y * y));
  const r1 = Math.sqrt(cake.r1 * gravity);
  const jumpAngle = Asin((r0 * gravity) / (r1 * r1)) / 2;

  const vx = Cos(jumpAngle) * CosBJ(facingAngle) * r1;
  const vy = Cos(jumpAngle) * SinBJ(facingAngle) * r1;
  const vz = r1 * Sin(jumpAngle);

  Log.Information(
    `${vx}, ${vy}, ${vz}, jumpAngle: ${jumpAngle}, r0: ${r0}, r1: ${r1}`
  );
  const velocity = createVector(vx, vy, vz);

  const particle = createParticle(
    fireUnit,
    fireUnitPosition,
    velocity,
    true,
    jumpGroundEffect
  );

  makeUnitFly(fireUnit);
  PauseUnit(fireUnit, true);
  IssueImmediateOrder(fireUnit, 'stop');

  particle.position.z += 50;

  TimerStart(pauseDelayTimer, 0, false, () => jumpPause(fireUnit));

  particleEngine.addParticle(particle);
  moveParticle(particle, gravity);
};
