import { IParticle, GroundEffect, HitEffect } from '../physics/engine/types';

export interface IGenericProjectileData {
  hits: unit[];
  damage: number;
}

export enum ProjectileType {
  JUMP = 'JUMP',
  SNIPER = 'SNIPER',
  LASER = 'LASER'
}

export type PreProjectileEffect = (sourceUnit: unit) => void;
export type PostProjectileEffect = (
  sourceUnit: unit,
  particle: IParticle<unknown>
) => void;

export interface IProjectile<T> {
  sourceSound?: string;
  abilityCode: number;
  trajectoryType: TrajectoryType;
  timedLife?: number;
  unitCode?: number; // No unit code uses the source/casting unit as the projectile!
  preEffect?: PreProjectileEffect;
  postEffect?: PostProjectileEffect;
  initializeData?: () => T;
  groundEffect: GroundEffect<T>;
  hitEffect?: HitEffect<T>;
  spawnOffset: number;
  terrainOffset: number;
  gravity: boolean;
}

export interface ILinearProjectile<T> extends IProjectile<T> {
  trajectoryType: TrajectoryType.LINEAR;
  speed: number;
}

export interface IArcProjectile<T> extends IProjectile<T> {
  trajectoryType: TrajectoryType.ARC;
  arcScalar: number;
  maxDistance: number;
}

export enum TrajectoryType {
  LINEAR = 'LINEAR',
  ARC = 'ARC'
}
