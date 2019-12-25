import { IArcProjectile, IGenericProjectileData } from '../types';
import { IVector } from '../../physics/vectors/types';
import { createVector } from '../../physics/vectors/createVector';
import { particleEngine } from '../../physics/engine/particleEngine';

export const getArcVelocity = <T extends IGenericProjectileData>(
  projectile: IArcProjectile<T>,
  path: IVector,
  facingAngle: number
): IVector => {
  const { arcScalar, maxDistance } = projectile;

  const { x, y } = path;

  const gravity = Math.abs(particleEngine.getGravity());
  const distance = RMinBJ(maxDistance, Math.sqrt(x * x + y * y));
  const arc = Math.sqrt(arcScalar * gravity);
  const jumpAngle = Asin((distance * gravity) / (arc * arc)) / 2; // (bj_PI/2)

  const vx = Cos(jumpAngle) * CosBJ(facingAngle) * arc;
  const vy = Cos(jumpAngle) * SinBJ(facingAngle) * arc;
  const vz = arc * Sin(jumpAngle);

  return createVector(vx, vy, vz);
};
