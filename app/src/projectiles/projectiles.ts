import { jumpProjectile } from './abilities/jump/jumpProjectile';
import { sniperProjectile } from './abilities/sniper/sniperProjectile';
import {
  IArcProjectile,
  IGenericProjectileData,
  ILinearProjectile,
  ProjectileType
} from './types';
import {
  ILaserProjectile,
  laserProjectile
} from './abilities/laser/laserProjectile';

export const initializeGenericProjectileData = (): IGenericProjectileData => {
  return {
    hits: [],
    damage: 0
  };
};

export type Projectiles =
  | ILinearProjectile<IGenericProjectileData>
  | IArcProjectile<IGenericProjectileData>
  | ILaserProjectile;

type ProjectileMap = {
  [index in ProjectileType]: Projectiles;
};

export const projectileMap: ProjectileMap = {
  [ProjectileType.JUMP]: jumpProjectile,
  [ProjectileType.SNIPER]: sniperProjectile,
  [ProjectileType.LASER]: laserProjectile
};

interface IAbilityProjectiles {
  [index: number]: ProjectileType;
}

const effectAbilityProjectiles: IAbilityProjectiles = {
  [sniperProjectile.abilityCode]: ProjectileType.SNIPER,
  [laserProjectile.abilityCode]: ProjectileType.LASER
};

const castAbilityProjectiles: IAbilityProjectiles = {
  [jumpProjectile.abilityCode]: ProjectileType.JUMP
};

export enum PlayerUnitEventType {
  SPELL_CAST = 'EVENT_PLAYER_UNIT_SPELL_CAST',
  SPELL_EFFECT = 'EVENT_PLAYER_UNIT_SPELL_EFFECT'
}

type ProjectileAbilityMap = {
  [index in PlayerUnitEventType]: IAbilityProjectiles;
};

export const projectileAbilities: ProjectileAbilityMap = {
  [PlayerUnitEventType.SPELL_CAST]: castAbilityProjectiles,
  [PlayerUnitEventType.SPELL_EFFECT]: effectAbilityProjectiles
};

type AbilityEventMap = {
  [index in PlayerUnitEventType]: playerunitevent;
};

export const playerUnitEventTypes: AbilityEventMap = {
  [PlayerUnitEventType.SPELL_CAST]: EVENT_PLAYER_UNIT_SPELL_CAST,
  [PlayerUnitEventType.SPELL_EFFECT]: EVENT_PLAYER_UNIT_SPELL_EFFECT
};
