import { Trigger } from '../jassOverrides/Trigger';
import { getSpellTargetPosition } from './utils/getSpellTargetPosition';
import { getUnitPosition } from './utils/getUnitPosition';
import {
  projectileSettings,
  PlayerUnitEventType,
  playerUnitEventTypes,
  projectileAbilities
} from './projectileSettings';
import { TrajectoryType, ProjectileSettings } from './types';
import { createLinearProjectile } from './trajectories/createLinearProjectile';
import { createArcProjectile } from './trajectories/createArcProjectile';
import { IParticle } from '../physics/engine/types';
import { addModel } from './utils/addModel';
import { applyTimedLife } from './utils/applyTimedLife';
import { createUnitSoundEffect } from './utils/createUnitSoundEffect';
import { particleEngine } from '../physics/engine/particleEngine';
import { subtractVectors } from '../physics/vectors/subtractVectors';
import { getFacingAngle } from './utils/getFacingAngle';

const handleProjectile = (projectileSetting: ProjectileSettings): void => {
  const sourceUnit = GetSpellAbilityUnit();
  const sourcePosition = getUnitPosition(sourceUnit);
  const targetPosition = getSpellTargetPosition();
  const { preEffect, postEffect, unitCode } = projectileSetting;
  if (preEffect) {
    preEffect(sourceUnit);
  }

  const pathVector = subtractVectors(targetPosition, sourcePosition);
  const facingAngle = getFacingAngle(pathVector);

  const particleUnit = unitCode
    ? CreateUnit(
        GetOwningPlayer(sourceUnit),
        unitCode,
        sourcePosition.x,
        sourcePosition.y,
        facingAngle
      )
    : sourceUnit;
  let particle: IParticle | undefined = undefined;
  if (projectileSetting.trajectoryType === TrajectoryType.LINEAR) {
    particle = createLinearProjectile(
      particleUnit,
      sourcePosition,
      pathVector,
      facingAngle,
      projectileSetting.trajectory
    );
  } else if (projectileSetting.trajectoryType === TrajectoryType.ARC) {
    particle = createArcProjectile(
      particleUnit,
      sourcePosition,
      pathVector,
      facingAngle,
      projectileSetting.trajectory
    );
  }
  if (particle) {
    addModel(particle.unit, projectileSetting.abilityCode);
    if (projectileSetting.timedLife) {
      applyTimedLife(particle.unit, projectileSetting.timedLife);
    }
    if (projectileSetting.sourceSound) {
      createUnitSoundEffect(sourceUnit, projectileSetting.sourceSound, 127);
    }
    if (postEffect) {
      postEffect(particle);
    }
    particleEngine.addParticle(particle);
  }
};

const createAbilityTrigger = (
  playerUnitEventType: PlayerUnitEventType
): Trigger => {
  const abilityTrigger = new Trigger();
  abilityTrigger.RegisterAnyUnitEventBJ(
    playerUnitEventTypes[playerUnitEventType]
  );
  abilityTrigger.AddAction(() => {
    const abilities = projectileAbilities[playerUnitEventType];
    const spellAbilityId = GetSpellAbilityId();
    const projectileSettingsType = abilities[spellAbilityId];
    if (projectileSettingsType) {
      handleProjectile(projectileSettings[projectileSettingsType]);
    }
  });
  return abilityTrigger;
};

export const initProjectiles = (): void => {
  const castTrigger = createAbilityTrigger(PlayerUnitEventType.SPELL_CAST);
  const effectTrigger = createAbilityTrigger(PlayerUnitEventType.SPELL_EFFECT);
};
