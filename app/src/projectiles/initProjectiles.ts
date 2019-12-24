import { Trigger } from '../jassOverrides/Trigger';
import {
  projectileMap,
  PlayerUnitEventType,
  playerUnitEventTypes,
  projectileAbilities
} from './projectiles';
import { handleProjectile } from './handleProjectile';

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
      handleProjectile(projectileMap[projectileSettingsType]);
    }
  });
  return abilityTrigger;
};

export const initProjectiles = (): void => {
  const castTrigger = createAbilityTrigger(PlayerUnitEventType.SPELL_CAST);
  const effectTrigger = createAbilityTrigger(PlayerUnitEventType.SPELL_EFFECT);
};
