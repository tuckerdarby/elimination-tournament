import { GroundEffect, IParticle } from '../../../physics/engine/types';
import { IGenericProjectileData } from '../../types';
import { getTerrainNormal } from '../../../physics/vectors/getTerrainNormal';
import { projectVector } from '../../../physics/vectors/projectVector';
import { scaleVector } from '../../../physics/vectors/scaleVector';
import { addVectors } from '../../../physics/vectors/addVectors';
import { subtractVectors } from '../../../physics/vectors/subtractVectors';
import { Log } from '../../../lib/Serilog/Serilog';

export const bounceGroundEffect: GroundEffect<IGenericProjectileData> = (
  particle: IParticle<IGenericProjectileData>
): void => {
  const { position, velocity } = particle;
  const terrainNormal = getTerrainNormal(position.x, position.y, 25);
  const projection = projectVector(velocity, terrainNormal);
  const bounceVelocity = scaleVector(
    addVectors(velocity, scaleVector(projection, -2)),
    0.7 //0.65 for acid
  );
  particle.velocity = bounceVelocity;
  const backtrackPosition = subtractVectors(
    position,
    scaleVector(velocity, 0.065) // need to rethink this and raycast back
  );
  particle.position = backtrackPosition;
};
