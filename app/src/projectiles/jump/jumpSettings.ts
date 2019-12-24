import {
  IArcTrajectorySetting,
  TrajectoryType,
  IArcProjectileSetting
} from '../types';
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

export const jumpSettings: IArcProjectileSetting = {
  abilityCode: jumpAbilityCode,
  sourceSound: '',
  trajectoryType: TrajectoryType.ARC,
  trajectory: jumpTrajectory
};
