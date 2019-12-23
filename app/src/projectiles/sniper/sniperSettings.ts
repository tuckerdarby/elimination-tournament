import {
  IProjectileSetting,
  ILinearTrajectorySetting,
  TrajectoryType
} from '../projectileSettings';
import { removeGroundEffect } from '../groundEffects/removeGroundEffect';

export const sniperAbilityCode = FourCC('A003');

export const sniperTrajectory: ILinearTrajectorySetting = {
  groundEffect: removeGroundEffect,
  trajectoryType: TrajectoryType.LINEAR,
  speed: 12,
  gravity: false,
  spawnOffset: 15,
  terrainOffset: 15
};

export const sniperSettings: IProjectileSetting = {
  abilityCode: sniperAbilityCode,
  sourceSound: 'Abilities\\Weapons\\BoatMissile\\BoatAttack1.wav',
  trajectory: sniperTrajectory,
  timedLife: 1.8
};
