import { IParticle } from './types';
import { addVectors } from '../vectors/addVectors';
import { getUnitAbsoluteFlyHeight } from '../../projectiles/utils/getAbsoluteHeight';

export const moveParticle = (
  particle: IParticle<unknown>,
  gravitySpeed: number
): void => {
  const { gravity, position, unit, velocity } = particle;
  const nextPosition = addVectors(position, velocity);
  SetUnitPosition(unit, nextPosition.x, nextPosition.y);
  SetUnitFlyHeight(unit, getUnitAbsoluteFlyHeight(unit, nextPosition.z), 0);
  if (gravity) {
    velocity.z += gravitySpeed;
  }
  particle.position = nextPosition;
};
