import { jumpSettings } from './jump/jumpSettings';
import { sniperSettings } from './sniper/sniperSettings';
import { ProjectileType } from './types';

export const projectileSettings = {
  [ProjectileType.JUMP]: jumpSettings,
  [ProjectileType.SNIPER]: sniperSettings
};

const projectileEffectAbilities = {
  [sniperSettings.abilityCode]: ProjectileType.SNIPER
};

const projectileCastAbilities = {
  [jumpSettings.abilityCode]: ProjectileType.JUMP
};

export enum PlayerUnitEventType {
  SPELL_CAST = 'EVENT_PLAYER_UNIT_SPELL_CAST',
  SPELL_EFFECT = 'EVENT_PLAYER_UNIT_SPELL_EFFECT'
}

export const projectileAbilities = {
  [PlayerUnitEventType.SPELL_CAST]: projectileCastAbilities,
  [PlayerUnitEventType.SPELL_EFFECT]: projectileEffectAbilities
};

export const playerUnitEventTypes = {
  [PlayerUnitEventType.SPELL_CAST]: EVENT_PLAYER_UNIT_SPELL_CAST,
  [PlayerUnitEventType.SPELL_EFFECT]: EVENT_PLAYER_UNIT_SPELL_EFFECT
};
