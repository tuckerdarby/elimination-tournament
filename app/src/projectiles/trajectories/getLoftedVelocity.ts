import { IGenericProjectileData, ILoftedProjectile } from '../types';
import { IVector } from '../../physics/vectors/types';
import { particleEngine } from '../../physics/engine/particleEngine';
import { createVector } from '../../physics/vectors/createVector';

export const getLoftedVelocity = <T extends IGenericProjectileData>(
  projectile: ILoftedProjectile<T>,
  path: IVector,
  facingAngle: number
): IVector => {
  const { speed, maxDistance, minDistance, spawnOffset } = projectile;

  const { x, y, z } = path;

  const distance = Math.max(
    minDistance,
    Math.min(maxDistance, Math.sqrt(x * x + y * y) + 1) - spawnOffset
  );

  const gravity = Math.abs(particleEngine.getGravity());
  const vx = CosBJ(facingAngle) * speed;
  const vy = SinBJ(facingAngle) * speed;
  const vz = (gravity * (distance / speed)) / 2 + z / (distance / speed);

  return createVector(vx, vy, vz);
};
