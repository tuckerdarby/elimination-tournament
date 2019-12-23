import {
  IProjectileSetting,
  IArcTrajectorySetting,
  TrajectoryType
} from '../projectileSettings';
import { jumpGroundEffect } from './jumpGroundEffect';

export const jumpAbilityCode = FourCC('A00C');

export const jumpTrajectory: IArcTrajectorySetting = {
  trajectoryType: TrajectoryType.ARC,
  groundEffect: jumpGroundEffect,
  spawnOffset: 0,
  terrainOffset: 15,
  arcScalar: 100,
  maxDistance: 100
};

export const jumpSettings: IProjectileSetting = {
  abilityCode: jumpAbilityCode,
  sourceSound: '',
  trajectory: jumpTrajectory
};
