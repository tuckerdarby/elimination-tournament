import { Trigger } from '../jassOverrides/Trigger';
import {
  projectileMap,
  PlayerUnitEventType,
  playerUnitEventTypes,
  projectileAbilities,
  channelAbilityProjectiles,
  channelAbilityTimes
} from './projectiles';
import { handleProjectile } from './handleProjectile';
import { Log } from '../lib/Serilog/Serilog';
import { getSpellTargetPosition } from './utils/getSpellTargetPosition';

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
      const triggeringUnit = GetSpellAbilityUnit();
      const targetPosition = getSpellTargetPosition();
      handleProjectile(projectile, triggeringUnit, targetPosition);
    }
  });
  return abilityTrigger;
};

const createChannelTrigger = (): Trigger => {
  const channelingUnits: unit[] = [];
  const channelTrigger = new Trigger();
  const eventType = playerUnitEventTypes[PlayerUnitEventType.SPELL_CHANNEL];
  channelTrigger.RegisterAnyUnitEventBJ(eventType);
  channelTrigger.AddAction(() => {
    const spellAbilityId = GetSpellAbilityId();
    const projectileType = channelAbilityProjectiles[spellAbilityId];
    if (projectileType) {
      const triggeringUnit = GetSpellAbilityUnit();
      const targetPosition = getSpellTargetPosition();
      const projectile = projectileMap[projectileType];
      const periodicTrigger = new Trigger();
      const periodicTime = channelAbilityTimes[spellAbilityId];
      periodicTrigger.RegisterTimerEventPeriodic(periodicTime);
      periodicTrigger.AddAction(() => {
        handleProjectile(projectile, triggeringUnit, targetPosition);
      });
      const endChannelTrigger = new Trigger();
      endChannelTrigger.RegisterAnyUnitEventBJ(EVENT_PLAYER_UNIT_SPELL_ENDCAST);
      // endChannelTrigger.AddCondition(() => triggeringUnit === GetTriggerUnit());
      endChannelTrigger.AddAction(() => {
        periodicTrigger.Destroy();
      });
    }
  });
  return channelTrigger;
};

export const initProjectiles = (): void => {
  const castTrigger = createAbilityTrigger(PlayerUnitEventType.SPELL_CAST);
  const effectTrigger = createAbilityTrigger(PlayerUnitEventType.SPELL_EFFECT);
  const channelTrigger = createChannelTrigger();
};
