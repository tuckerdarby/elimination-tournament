import { Projectiles } from './types';
import { getUnitPosition } from './utils/getUnitPosition';
import { getSpellTargetPosition } from './utils/getSpellTargetPosition';
import { subtractVectors } from '../physics/vectors/subtractVectors';
import { getFacingAngle } from './utils/getFacingAngle';
import { addModel } from './utils/addModel';
import { applyTimedLife } from './utils/applyTimedLife';
import { createUnitSoundEffect } from './utils/createUnitSoundEffect';
import { particleEngine } from '../physics/engine/particleEngine';
import { createProjectile } from './createProjectile';

export const handleProjectile = (projectile: Projectiles): void => {
  const sourceUnit = GetSpellAbilityUnit();
  const sourcePosition = getUnitPosition(sourceUnit);
  const targetPosition = getSpellTargetPosition();
  const { preEffect, postEffect, unitCode } = projectile;
  if (preEffect) {
    preEffect(sourceUnit);
  }

  const path = subtractVectors(targetPosition, sourcePosition);
  const facingAngle = getFacingAngle(path);

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
    path,
    facingAngle,
    projectile
  );

  if (particle) {
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
  }
};
