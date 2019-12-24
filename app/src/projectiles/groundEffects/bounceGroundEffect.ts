import { GroundEffect, IParticle } from '../../physics/engine/types';
import { getTerrainNormal } from '../../physics/vectors/getTerrainNormal';
import { projectVector } from '../../physics/vectors/projectVector';
import { scaleVector } from '../../physics/vectors/scaleVector';
import { subtractVectors } from '../../physics/vectors/subtractVectors';
import { addVectors } from '../../physics/vectors/addVectors';

export const bounceGroundEffect: GroundEffect = (particle: IParticle): void => {
  const { position, velocity } = particle;
  const terrainNormal = getTerrainNormal(position.x, position.y, 25);
  if (
    IsTerrainPathable(position.x, position.y, PATHING_TYPE_WALKABILITY) &&
    (terrainNormal.x !== 0 || terrainNormal.y !== 0)
  ) {
    terrainNormal.z = 0;
  }
  const projection = projectVector(velocity, terrainNormal);
  const backtrackPosition = subtractVectors(
    position,
    scaleVector(velocity, 0.03)
  );
  const bounceVelocity = addVectors(velocity, scaleVector(projection, -2));

  particle.position = backtrackPosition;
  particle.velocity = bounceVelocity;
};
