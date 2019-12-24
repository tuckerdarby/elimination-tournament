import { IParticle, GroundEffect } from '../physics/engine/types';
import { createParticle } from '../physics/engine/createParticle';
import { IVector } from '../physics/vectors/types';
import { makeUnitFly } from './utils/makeUnitFly';
import { offsetPosition } from './utils/offsetPosition';

export const createProjectile = (
  unit: unit,
  position: IVector,
  velocity: IVector,
  facingAngle: number,
  groundEffect: GroundEffect,
  gravity: boolean,
  offset = 0,
  terrainOffset = 0
): IParticle => {
  // Prepare unit
  const particlePosition = offsetPosition(
    position,
    facingAngle,
    offset,
    terrainOffset
  );
  SetUnitFacingTimed(unit, facingAngle, 0);
  makeUnitFly(unit);
  SetUnitFlyHeight(unit, terrainOffset, 0);

  // Particle
  const particle = createParticle(
    unit,
    particlePosition,
    velocity,
    gravity,
    groundEffect
  );

  return particle;
};
