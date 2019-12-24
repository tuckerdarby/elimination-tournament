import { IParticle, GroundEffect, HitEffect } from '../physics/engine/types';

export enum ProjectileType {
  JUMP = 'JUMP',
  SNIPER = 'SNIPER',
  LASER = 'LASER'
}

export type PreProjectileEffect = (sourceUnit: unit) => void;
export type PostProjectileEffect = (
  sourceUnit: unit,
  particle: IParticle
) => void;

export interface IProjectile {
  sourceSound?: string;
  abilityCode: number;
  trajectoryType: TrajectoryType;
  timedLife?: number;
  unitCode?: number; // No unit code uses the source/casting unit as the projectile!
  preEffect?: PreProjectileEffect;
  postEffect?: PostProjectileEffect;
  initializeData?: () => void;
  groundEffect: GroundEffect;
  hitEffect?: HitEffect;
  spawnOffset: number;
  terrainOffset: number;
  gravity: boolean;
}

export interface ILinearProjectile extends IProjectile {
  trajectoryType: TrajectoryType.LINEAR;
  speed: number;
}

export interface IArcProjectile extends IProjectile {
  trajectoryType: TrajectoryType.ARC;
  arcScalar: number;
  maxDistance: number;
}

export enum TrajectoryType {
  LINEAR = 'LINEAR',
  ARC = 'ARC'
}

export type Projectiles = ILinearProjectile | IArcProjectile;
