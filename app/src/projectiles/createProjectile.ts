import { IParticle, GroundEffect } from '../physics/engine/types';
import { createParticle } from '../physics/engine/createParticle';
import { createVector } from '../physics/vectors/createVector';
import { IVector } from '../physics/vectors/types';
import { makeUnitFly } from './utils/makeUnitFly';
import { offsetPosition } from './utils/offsetPosition';

export const dummyUnitCode = FourCC('e001');

export const createProjectile = (
  player: player,
  position: IVector,
  speed: number,
  facingAngle: number,
  terrainAngle: number,
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

  // Velocity
  const vx = speed * CosBJ(facingAngle) * Cos(terrainAngle);
  const vy = speed * SinBJ(facingAngle) * Cos(terrainAngle);
  const vz = speed * Sin(terrainAngle);
  const velocity = createVector(vx, vy, vz);

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
