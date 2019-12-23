import { IVector } from '../../physics/vectors/types';
import { getFacingAngle } from '../utils/getFacingAngle';
import { getTerrainAngle } from '../utils/getTerrainAngle';
import { subtractVectors } from '../../physics/vectors/subtractVectors';
import { createProjectile } from '../createProjectile';
import { createVector } from '../../physics/vectors/createVector';
import { IParticle } from '../../physics/engine/types';
import { ILinearTrajectorySetting } from '../projectileSettings';

export const createLinearProjectile = (
  player: player,
  origin: IVector,
  target: IVector,
  trajectory: ILinearTrajectorySetting
): IParticle => {
  const {
    gravity,
    groundEffect,
    speed,
    spawnOffset,
    terrainOffset
  } = trajectory;

  // Path
  const pathVector = subtractVectors(target, origin);
  const facingAngle = getFacingAngle(pathVector);
  const terrainAngle = getTerrainAngle(pathVector);

  // Velocity
  const vx = speed * CosBJ(facingAngle) * Cos(terrainAngle);
  const vy = speed * SinBJ(facingAngle) * Cos(terrainAngle);
  const vz = speed * Sin(terrainAngle);
  const velocity = createVector(vx, vy, vz);

  const projectile = createProjectile(
    player,
    origin,
    velocity,
    facingAngle,
    groundEffect,
    gravity,
    spawnOffset,
    terrainOffset
  );

  return projectile;
};