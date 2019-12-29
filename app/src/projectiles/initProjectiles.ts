import { Trigger } from '../jassOverrides/Trigger';
import {
  projectileMap,
  PlayerUnitEventType,
  playerUnitEventTypes,
  abilityProjectiles
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
    const projectileType = abilityProjectiles[spellAbilityId];
    Log.Debug(`WHAT WHAT ${projectileType}`)
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
