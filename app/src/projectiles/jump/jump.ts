import { jumpGroundEffect } from './jumpGroundEffect';
import { getUnitPosition } from '../utils/getUnitPosition';
import { getSpellTargetPosition } from '../utils/getSpellTargetPosition';
import { subtractVectors } from '../../physics/vectors/subtractVectors';
import { getFacingAngle } from '../utils/getFacingAngle';
import { particleEngine } from '../../physics/engine/particleEngine';
import { createParticle } from '../../physics/engine/createParticle';
import { createVector } from '../../physics/vectors/createVector';
import { makeUnitFly } from '../utils/makeUnitFly';
import { moveParticle } from '../../physics/engine/moveParticle';
import { jumpSettings } from './jumpSettings';

const jumpPause = (unit: unit): void => {
  SetUnitAnimationByIndex(unit, 8);
  QueueUnitAnimation(unit, 'Stand');
};

export const jump = (): void => {
  const fireUnit = GetSpellAbilityUnit();

  const fireUnitPosition = getUnitPosition(fireUnit);
  const targetPosition = getSpellTargetPosition();
  const pathVector = subtractVectors(targetPosition, fireUnitPosition);

  const facingAngle = getFacingAngle(pathVector);

  const { x, y } = pathVector;
  const { maxDistance, arcScalar } = jumpSettings.trajectory;

  // if (UnitHasBuffBJ(fireUnit, FourCC('B001')) === false && UnitHasBuffBJ(fireUnit, FourCC('B004'))) {}
  const gravity = Math.abs(particleEngine.getGravity());
  const distance = RMinBJ(maxDistance, Math.sqrt(x * x + y * y));
  const arc = Math.sqrt(arcScalar * gravity);
  const jumpAngle = Asin((distance * gravity) / (arc * arc)) / 2; // (bj_PI/2)

  const vx = Cos(jumpAngle) * CosBJ(facingAngle) * arc;
  const vy = Cos(jumpAngle) * SinBJ(facingAngle) * arc;
  const vz = arc * Sin(jumpAngle);

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

  const pauseDelayTimer = CreateTimer();
  TimerStart(pauseDelayTimer, 0, false, () => jumpPause(fireUnit));
  particleEngine.addParticle(particle);
  moveParticle(particle, gravity);
};
