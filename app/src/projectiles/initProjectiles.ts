import { Trigger } from '../jassOverrides/Trigger';
import { getSpellTargetPosition } from './utils/getSpellTargetPosition';
import { getUnitPosition } from './utils/getUnitPosition';
import {
  projectileSettings,
  projectileAbilitySettings,
  TrajectoryType,
  IProjectileSetting
} from './projectileSettings';
import { createLinearProjectile } from './trajectories/createLinearProjectile';
import { createArcProjectile } from './trajectories/createArcProjectile';
import { IParticle } from '../physics/engine/types';

const handleProjectile = (projectileSetting: IProjectileSetting): void => {
  const sourceUnit = GetSpellAbilityUnit();
  const sourcePlayer = GetOwningPlayer(sourceUnit);
  const sourcePosition = getUnitPosition(sourceUnit);
  const targetPosition = getSpellTargetPosition();
  const { trajectory, preEvent, postEvent } = projectileSetting;

  if (preEvent) {
    preEvent();
  }

  let particle: IParticle | undefined = undefined;
  if (trajectory.trajectoryType === TrajectoryType.LINEAR) {
    particle = createLinearProjectile(
      sourcePlayer,
      sourcePosition,
      targetPosition,
      trajectory
    );
  } else if (trajectory.trajectoryType === TrajectoryType.ARC) {
    particle = createArcProjectile(
      sourcePlayer,
      sourcePosition,
      targetPosition,
      trajectory
    );
  }

  if (postEvent && particle) {
    postEvent(particle);
  }
};

export const initProjectiles = (): void => {
  const trig = new Trigger();
  trig.RegisterAnyUnitEventBJ(EVENT_PLAYER_UNIT_SPELL_CAST);
  trig.AddAction(() => {
    const spellAbilityId = GetSpellAbilityId();
    const projectileSettingsType = projectileAbilitySettings[spellAbilityId];
    if (projectileSettingsType) {
      handleProjectile(projectileSettings[projectileSettingsType]);
    }
  });
};
