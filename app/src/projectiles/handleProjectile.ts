import { getUnitPosition } from './utils/getUnitPosition';
import { getSpellTargetPosition } from './utils/getSpellTargetPosition';
import { subtractVectors } from '../physics/vectors/subtractVectors';
import { getFacingAngle } from './utils/getFacingAngle';
import { addModel } from './utils/addModel';
import { applyTimedLife } from './utils/applyTimedLife';
import { createUnitSoundEffect } from './utils/createUnitSoundEffect';
import { particleEngine } from '../physics/engine/particleEngine';
import { createProjectile } from './createProjectile';
import { Projectiles } from './projectiles';
import { getTrajectoryVelocity } from './trajectories/getTrajectoryVelocity';
import { projectVector } from '../physics/vectors/projectVector';
import { IVector } from '../physics/vectors/types';

export const handleProjectile = (
  projectile: Projectiles,
  sourceUnit: unit,
  targetPosition: IVector
): void => {
  const sourcePosition = getUnitPosition(sourceUnit);
  const { preEffect, postEffect, unitCode } = projectile;
  if (preEffect) {
    preEffect(sourceUnit);
  }

  const path = subtractVectors(targetPosition, sourcePosition);
  let facingAngle = getFacingAngle(path);
  if ('facingAccuracy' in projectile && projectile.facingAccuracy) {
    facingAngle += GetRandomReal(
      -projectile.facingAccuracy,
      projectile.facingAccuracy
    );
  }
  const velocity = getTrajectoryVelocity(projectile, path, facingAngle);

  const particleUnit = unitCode
    ? CreateUnit(
        GetOwningPlayer(sourceUnit),
        unitCode,
        sourcePosition.x,
        sourcePosition.y,
        facingAngle
      )
    : sourceUnit;

  const particle = createProjectile(
    particleUnit,
    sourcePosition,
    velocity,
    facingAngle,
    projectile
  );

  addModel(particle.unit, projectile.abilityCode);
  if (projectile.timedLife) {
    applyTimedLife(particle.unit, projectile.timedLife);
  }
  if (projectile.sourceSound) {
    createUnitSoundEffect(sourceUnit, projectile.sourceSound, 127);
  }
  if (postEffect) {
    postEffect(sourceUnit, particle);
  }
  particleEngine.addParticle(particle);
};
