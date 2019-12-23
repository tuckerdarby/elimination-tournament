import { jumpSettings } from './jump/jumpSettings';
import { sniperSettings } from './sniper/sniperSettings';
import { GroundEffect, HitEffect, IParticle } from '../physics/engine/types';

export enum ProjectileType {
  JUMP = 'JUMP',
  SNIPER = 'SNIPER'
}

export const projectileSettings = {
  [ProjectileType.JUMP]: jumpSettings,
  [ProjectileType.SNIPER]: sniperSettings
};

export const projectileAbilitySettings = {
  [jumpSettings.abilityCode]: ProjectileType.JUMP,
  [sniperSettings.abilityCode]: ProjectileType.SNIPER
};

export interface IProjectileSetting {
  sourceSound?: string;
  abilityCode: number;
  trajectory: TrajectorySettings;
  timedLife?: number;
  preEvent?: () => void;
  postEvent?: (particle: IParticle) => void;
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
  trajectoryType: TrajectoryType.LINEAR;
  speed: number;
  gravity: boolean;
}

export interface IArcTrajectorySetting extends ITrajectorySetting {
  trajectoryType: TrajectoryType.ARC;
  arcScalar: number;
  maxDistance: number;
}

export type TrajectorySettings =
  | ILinearTrajectorySetting
  | IArcTrajectorySetting;
