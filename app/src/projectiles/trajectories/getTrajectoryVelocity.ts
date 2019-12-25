import { TrajectoryType } from '../types';
import { IVector } from '../../physics/vectors/types';
import { getLinearVelocity } from './getLinearVelocity';
import { getArcVelocity } from './getArcVelocity';
import { createVector } from '../../physics/vectors/createVector';
import { Projectiles } from '../projectiles';

export const getTrajectoryVelocity = (
  projectile: Projectiles,
  path: IVector,
  facingAngle: number
): IVector => {
  if (projectile.trajectoryType === TrajectoryType.LINEAR) {
    return getLinearVelocity(projectile, path, facingAngle);
  } else if (projectile.trajectoryType === TrajectoryType.ARC) {
    return getArcVelocity(projectile, path, facingAngle);
  }
  return createVector(0, 0, 0);
};
