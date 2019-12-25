import { IGenericProjectileData, ILinearProjectile } from '../types';
import { IVector } from '../../physics/vectors/types';
import { getTerrainAngle } from '../utils/getTerrainAngle';
import { createVector } from '../../physics/vectors/createVector';

export const getLinearVelocity = <T extends IGenericProjectileData>(
  projectile: ILinearProjectile<any>,
  path: IVector,
  facingAngle: number
): IVector => {
  const { speed } = projectile;

  const terrainAngle = getTerrainAngle(path);
  const vx = speed * CosBJ(facingAngle) * Cos(terrainAngle);
  const vy = speed * SinBJ(facingAngle) * Cos(terrainAngle);
  const vz = speed * Sin(terrainAngle);
  return createVector(vx, vy, vz);
};
