import { IParticle, GroundEffect, HitEffect } from '../physics/engine/types';

export interface IGenericProjectileData {
  hits: unit[];
  damage: number;
}

export enum ProjectileType {
  JUMP = 'JUMP',
  SNIPER = 'SNIPER',
  LASER = 'LASER',
  SHRAPNEL = 'SHRAPNEL',
  ACID = 'ACID',
  MINIGUN = 'MINIGUN',
  SMG = 'SMG'
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
  facingAccuracy?: number;
  terrainAccuracy?: number;
}

export interface IArcProjectile<T> extends IProjectile<T> {
  trajectoryType: TrajectoryType.ARC;
  arcScalar: number;
  maxDistance: number;
}

export interface ILoftedProjectile<T> extends IProjectile<T> {
  trajectoryType: TrajectoryType.LOFTED;
  maxDistance: number;
  minDistance: number;
  speed: number;
}

export interface ICustomProjectile<T> extends IProjectile<T> {
  trajectoryType: TrajectoryType.OTHER;
  unitCode: number;
}

export enum TrajectoryType {
  LINEAR = 'LINEAR',
  ARC = 'ARC',
  LOFTED = 'LOFTED',
  OTHER = 'OTHER'
}
