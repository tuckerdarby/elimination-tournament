import { IParticle } from '../physics/engine/types';
import { createParticle } from '../physics/engine/createParticle';
import { IVector } from '../physics/vectors/types';
import { makeUnitFly } from './utils/makeUnitFly';
import { offsetPosition } from './utils/offsetPosition';
import { getTrajectoryVelocity } from './trajectories/getTrajectoryVelocity';
import { initializeGenericProjectileData, Projectiles } from './projectiles';

export const createProjectile = (
  unit: unit,
  position: IVector,
  velocity: IVector,
  facingAngle: number,
  projectile: Projectiles
): IParticle<any> => {
  const { gravity, groundEffect, spawnOffset, terrainOffset } = projectile;


  // Prepare unit
  const particlePosition = offsetPosition(
    position,
    facingAngle,
    spawnOffset,
    terrainOffset
  );
  SetUnitFacingTimed(unit, facingAngle, 0);
  makeUnitFly(unit);
  SetUnitFlyHeight(unit, terrainOffset, 0);

  const data = projectile.initializeData
    ? projectile.initializeData()
    : initializeGenericProjectileData();

  // Particle
  const particle = createParticle(
    unit,
    particlePosition,
    velocity,
    gravity,
    data,
    groundEffect
  );

  return particle;
};
