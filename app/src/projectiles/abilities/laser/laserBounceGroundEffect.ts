import { GroundEffect, IParticle } from '../../../physics/engine/types';
import { ILaserData } from './laserProjectile';
import { particleEngine } from '../../../physics/engine/particleEngine';
import { flatBounceGroundEffect } from '../groundEffects/flatBounceGroundEffect';

export const laserBounceGroundEffect: GroundEffect<ILaserData> = (
  particle: IParticle<ILaserData>
): void => {
  particle.data.bounces += 1;
  if (particle.data.bounces > 3) {
    KillUnit(particle.unit);
    particleEngine.removeParticle(particle);
    return;
  }
  flatBounceGroundEffect(particle);
};
