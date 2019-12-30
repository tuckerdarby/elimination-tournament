import { jumpProjectile } from './abilities/jump/jumpProjectile';
import { sniperProjectile } from './abilities/sniper/sniperProjectile';
import {
  IArcProjectile,
  ICustomProjectile,
  IGenericProjectileData,
  ILinearProjectile,
  ILoftedProjectile,
  ProjectileType
} from './types';
import {
  ILaserProjectile,
  laserProjectile
} from './abilities/laser/laserProjectile';
import { shrapnelProjectile } from './abilities/shrapnel/shrapnelProjectile';
import { acidProjectile } from './abilities/acid/acidProjectile';
import {
  minigunProjectile,
  minigunChannelTime
} from './abilities/minigun/minigunProjectile';
import { smgProjectile, smgChannelTime } from './abilities/smg/smgProjectile';

export type Projectiles =
  | ILinearProjectile<IGenericProjectileData>
  | IArcProjectile<IGenericProjectileData>
  | ILoftedProjectile<IGenericProjectileData>
  | ICustomProjectile<IGenericProjectileData>
  | ILaserProjectile;

type ProjectileMap = {
  [index in ProjectileType]: Projectiles;
};

export const projectileMap: ProjectileMap = {
  [ProjectileType.JUMP]: jumpProjectile,
  [ProjectileType.SNIPER]: sniperProjectile,
  [ProjectileType.LASER]: laserProjectile,
  [ProjectileType.SHRAPNEL]: shrapnelProjectile,
  [ProjectileType.ACID]: acidProjectile,
  [ProjectileType.MINIGUN]: minigunProjectile,
  [ProjectileType.SMG]: smgProjectile
};

interface IAbilityProjectiles {
  [index: number]: ProjectileType;
}

const effectAbilityProjectiles: IAbilityProjectiles = {
  [sniperProjectile.abilityCode]: ProjectileType.SNIPER,
  [laserProjectile.abilityCode]: ProjectileType.LASER,
  [shrapnelProjectile.abilityCode]: ProjectileType.SHRAPNEL,
  [acidProjectile.abilityCode]: ProjectileType.ACID
};

export const channelAbilityTimes: { [index: number]: number } = {
  [minigunProjectile.abilityCode]: minigunChannelTime,
  [smgProjectile.abilityCode]: smgChannelTime
};

export const channelAbilityProjectiles: IAbilityProjectiles = {
  [minigunProjectile.abilityCode]: ProjectileType.MINIGUN,
  [smgProjectile.abilityCode]: ProjectileType.SMG
};

const castAbilityProjectiles: IAbilityProjectiles = {
  [jumpProjectile.abilityCode]: ProjectileType.JUMP
};

export const abilityProjectiles: IAbilityProjectiles = {
  ...effectAbilityProjectiles,
  ...castAbilityProjectiles
};

export enum PlayerUnitEventType {
  SPELL_CAST = 'EVENT_PLAYER_UNIT_SPELL_CAST',
  SPELL_EFFECT = 'EVENT_PLAYER_UNIT_SPELL_EFFECT',
  SPELL_CHANNEL = 'EVENT_PLAYER_UNIT_SPELL_CHANNEL'
}

type ProjectileAbilityMap = {
  [index in PlayerUnitEventType]: IAbilityProjectiles;
};

export const projectileAbilities: ProjectileAbilityMap = {
  [PlayerUnitEventType.SPELL_CAST]: castAbilityProjectiles,
  [PlayerUnitEventType.SPELL_EFFECT]: effectAbilityProjectiles,
  [PlayerUnitEventType.SPELL_CHANNEL]: {}
};

type AbilityEventMap = {
  [index in PlayerUnitEventType]: playerunitevent;
};

export const playerUnitEventTypes: AbilityEventMap = {
  [PlayerUnitEventType.SPELL_CAST]: EVENT_PLAYER_UNIT_SPELL_CAST,
  [PlayerUnitEventType.SPELL_EFFECT]: EVENT_PLAYER_UNIT_SPELL_EFFECT,
  [PlayerUnitEventType.SPELL_CHANNEL]: EVENT_PLAYER_UNIT_SPELL_CHANNEL
};
