import { jumpSettings } from './jump/jumpSettings';
import { sniperSettings } from './sniper/sniperSettings';
import { ProjectileType } from './types';

export const projectileSettings = {
  [ProjectileType.JUMP]: jumpSettings,
  [ProjectileType.SNIPER]: sniperSettings
};

export const projectileAbilitySettings = {
  [jumpSettings.abilityCode]: ProjectileType.JUMP,
  [sniperSettings.abilityCode]: ProjectileType.SNIPER
};
