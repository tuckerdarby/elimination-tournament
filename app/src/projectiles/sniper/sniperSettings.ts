import {
  IProjectileSetting,
  ILinearTrajectorySetting,
  TrajectoryType,
  ILinearProjectileSetting
} from '../types';
import { removeGroundEffect } from '../groundEffects/removeGroundEffect';
import { dummyUnitCode } from '../constants';

export const sniperAbilityCode = FourCC('A003');

export const sniperTrajectory: ILinearTrajectorySetting = {
  groundEffect: removeGroundEffect,
  trajectoryType: TrajectoryType.LINEAR,
  speed: 12,
  gravity: false,
  spawnOffset: 15,
  terrainOffset: 15
};

export const sniperSettings: ILinearProjectileSetting = {
  abilityCode: sniperAbilityCode,
  sourceSound: 'Abilities\\Weapons\\BoatMissile\\BoatAttack1.wav',
  trajectoryType: TrajectoryType.LINEAR,
  trajectory: sniperTrajectory,
  timedLife: 1.8,
  unitCode: dummyUnitCode
};
