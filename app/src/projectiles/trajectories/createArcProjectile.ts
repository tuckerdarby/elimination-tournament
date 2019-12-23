import { IVector } from '../../physics/vectors/types';
import { IParticle } from '../../physics/engine/types';
import { subtractVectors } from '../../physics/vectors/subtractVectors';
import { getFacingAngle } from '../utils/getFacingAngle';
import { particleEngine } from '../../physics/engine/particleEngine';
import { IArcTrajectorySetting } from '../projectileSettings';
import { createProjectile } from '../createProjectile';
import { createVector } from '../../physics/vectors/createVector';

export const createArcProjectile = (
  player: player,
  origin: IVector,
  target: IVector,
  trajectory: IArcTrajectorySetting
): IParticle => {
  const {
    arcScalar,
    maxDistance,
    groundEffect,
    spawnOffset,
    terrainOffset
  } = trajectory;
  const pathVector = subtractVectors(target, origin);
  const facingAngle = getFacingAngle(pathVector);

  const { x, y } = pathVector;

  const gravity = Math.abs(particleEngine.getGravity());
  const distance = RMinBJ(maxDistance, Math.sqrt(x * x + y * y));
  const arc = Math.sqrt(arcScalar * gravity);
  const jumpAngle = Asin((distance * gravity) / (arc * arc)) / 2; // (bj_PI/2)

  const vx = Cos(jumpAngle) * CosBJ(facingAngle) * arc;
  const vy = Cos(jumpAngle) * SinBJ(facingAngle) * arc;
  const vz = arc * Sin(jumpAngle);

  const velocity = createVector(vx, vy, vz);

  const particle = createProjectile(
    player,
    origin,
    velocity,
    facingAngle,
    groundEffect,
    true,
    spawnOffset,
    terrainOffset
  );

  return particle;
};