import { IParticle } from '../../../physics/engine/types';
import { particleEngine } from '../../../physics/engine/particleEngine';
import { getTerrainNormal } from '../../../physics/vectors/getTerrainNormal';
import { projectVector } from '../../../physics/vectors/projectVector';
import { scaleVector } from '../../../physics/vectors/scaleVector';
import { subtractVectors } from '../../../physics/vectors/subtractVectors';
import { addVectors } from '../../../physics/vectors/addVectors';
import { getScalarProduct } from '../../../physics/vectors/getScalarProduct';
import { setVectorLength } from '../../../physics/vectors/setVectorLength';
import { IGenericProjectileData } from '../../types';

export const jumpGroundEffect = <T extends IGenericProjectileData>(
  particle: IParticle<T>
): void => {
  const { position, unit, velocity } = particle;
  const { x, y } = position;
  // IsTerrainPathable seems to be reversed for walkability?
  if (!IsTerrainPathable(x, y, PATHING_TYPE_WALKABILITY)) {
    particleEngine.removeParticle(particle);
    PauseUnit(unit, false);
    SetUnitPathing(unit, true);
    return;
  }
  const c3 = 0.1;
  const c4 = 650 * 650;
  const b10 = getTerrainNormal(x, y, 25); // was 25
  const b11 = projectVector(velocity, b10);

  const rest = scaleVector(velocity, 0.03);
  const place = subtractVectors(position, rest);

  const vs = scaleVector(b11, -2);
  const bounceVelocity = scaleVector(addVectors(velocity, vs), 0.5);

  const scaledBounceVelocity =
    getScalarProduct(bounceVelocity, bounceVelocity) > c4
      ? setVectorLength(bounceVelocity, Math.sqrt(c4))
      : bounceVelocity;

  if (getScalarProduct(scaledBounceVelocity, scaledBounceVelocity) < c3 * c3) {
    particleEngine.removeParticle(particle);
    SetUnitPathing(unit, true);
    PauseUnit(unit, false);
  } else {
    particle.velocity = scaledBounceVelocity;
    particle.position = place;
  }
};
