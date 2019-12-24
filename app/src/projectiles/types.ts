import { IParticle, GroundEffect, HitEffect } from '../physics/engine/types';

export enum ProjectileType {
  JUMP = 'JUMP',
  SNIPER = 'SNIPER'
}

export interface IProjectileSetting {
  sourceSound?: string;
  abilityCode: number;
  trajectoryType: TrajectoryType;
  trajectory: TrajectorySettings;
  timedLife?: number;
  preEvent?: () => void;
  postEvent?: (particle: IParticle) => void;
}

export interface ILinearProjectileSetting extends IProjectileSetting {
  trajectoryType: TrajectoryType.LINEAR;
  trajectory: ILinearTrajectorySetting;
}

export interface IArcProjectileSetting extends IProjectileSetting {
  trajectoryType: TrajectoryType.ARC;
  trajectory: IArcTrajectorySetting;
}

export enum TrajectoryType {
  LINEAR = 'LINEAR',
  ARC = 'ARC'
}

interface ITrajectorySetting {
  groundEffect: GroundEffect;
  hitEffect?: HitEffect;
  trajectoryType: TrajectoryType;
  spawnOffset: number;
  terrainOffset: number;
}

export interface ILinearTrajectorySetting extends ITrajectorySetting {
  speed: number;
  gravity: boolean;
}

export interface IArcTrajectorySetting extends ITrajectorySetting {
  arcScalar: number;
  maxDistance: number;
}

export type ProjectileSettings =
  | ILinearProjectileSetting
  | IArcProjectileSetting;

export type TrajectorySettings =
  | ILinearTrajectorySetting
  | IArcTrajectorySetting;
