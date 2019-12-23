import { IParticle, GroundEffect } from '../physics/engine/types';
import { createParticle } from '../physics/engine/createParticle';
import { IVector } from '../physics/vectors/types';
import { makeUnitFly } from './utils/makeUnitFly';
import { offsetPosition } from './utils/offsetPosition';

export const dummyUnitCode = FourCC('e001');

export const createProjectile = (
  player: player,
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
  const particleUnit = CreateUnit(
    player,
    dummyUnitCode,
    particlePosition.x,
    particlePosition.y,
    facingAngle
  );
  SetUnitFacingTimed(particleUnit, facingAngle, 0);
  makeUnitFly(particleUnit);
  SetUnitFlyHeight(particleUnit, terrainOffset, 0);

  // Particle
  const particle = createParticle(
    particleUnit,
    particlePosition,
    velocity,
    gravity,
    groundEffect
  );

  return particle;
};
