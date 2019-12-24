import { Trigger } from '../jassOverrides/Trigger';
import { getSpellTargetPosition } from './utils/getSpellTargetPosition';
import { getUnitPosition } from './utils/getUnitPosition';
import {
  projectileSettings,
  projectileAbilitySettings
} from './projectileSettings';
import { TrajectoryType, ProjectileSettings } from './types';
import { createLinearProjectile } from './trajectories/createLinearProjectile';
import { createArcProjectile } from './trajectories/createArcProjectile';
import { IParticle } from '../physics/engine/types';
import { addModel } from './utils/addModel';
import { applyTimedLife } from './utils/applyTimedLife';
import { createUnitSoundEffect } from './utils/createUnitSoundEffect';
import { particleEngine } from '../physics/engine/particleEngine';

const handleProjectile = (projectileSetting: ProjectileSettings): void => {
  const sourceUnit = GetSpellAbilityUnit();
  const sourcePlayer = GetOwningPlayer(sourceUnit);
  const sourcePosition = getUnitPosition(sourceUnit);
  const targetPosition = getSpellTargetPosition();
  const { preEvent, postEvent } = projectileSetting;
  if (preEvent) {
    preEvent();
  }
  let particle: IParticle | undefined = undefined;
  if (projectileSetting.trajectoryType === TrajectoryType.LINEAR) {
    particle = createLinearProjectile(
      sourcePlayer,
      sourcePosition,
      targetPosition,
      projectileSetting.trajectory
    );
  } else if (projectileSetting.trajectoryType === TrajectoryType.ARC) {
    particle = createArcProjectile(
      sourcePlayer,
      sourcePosition,
      targetPosition,
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
    if (postEvent) {
      postEvent(particle);
    }
    particleEngine.addParticle(particle);
  }
};

export const initProjectiles = (): void => {
  const spellEffectTrig = new Trigger();
  spellEffectTrig.RegisterAnyUnitEventBJ(EVENT_PLAYER_UNIT_SPELL_EFFECT);
  spellEffectTrig.AddAction(() => {
    const spellAbilityId = GetSpellAbilityId();
    const projectileSettingsType = projectileAbilitySettings[spellAbilityId];
    if (projectileSettingsType) {
      handleProjectile(projectileSettings[projectileSettingsType]);
    }
  });
};
