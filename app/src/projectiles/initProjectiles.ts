import { Trigger } from '../jassOverrides/Trigger';
import {
  projectileMap,
  PlayerUnitEventType,
  playerUnitEventTypes,
  projectileAbilities
} from './projectiles';
import { handleProjectile } from './handleProjectile';
import { Log } from '../lib/Serilog/Serilog';

const createAbilityTrigger = (
  playerUnitEventType: PlayerUnitEventType
): Trigger => {
  const abilityTrigger = new Trigger();
  abilityTrigger.RegisterAnyUnitEventBJ(
    playerUnitEventTypes[playerUnitEventType]
  );
  abilityTrigger.AddAction(() => {
    const spellAbilityId = GetSpellAbilityId();
    const abilityEventProjectiles = projectileAbilities[playerUnitEventType];
    const projectileType = abilityEventProjectiles[spellAbilityId];
    if (projectileType) {
      const projectile = projectileMap[projectileType];
      handleProjectile(projectile);
    }
  });
  return abilityTrigger;
};

export const initProjectiles = (): void => {
  Log.Debug('INIT PROJECTILES')
  const castTrigger = createAbilityTrigger(PlayerUnitEventType.SPELL_CAST);
  const effectTrigger = createAbilityTrigger(PlayerUnitEventType.SPELL_EFFECT);
};
