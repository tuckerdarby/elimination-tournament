import {
  TrajectoryType,
  ILinearProjectile,
  IGenericProjectileData
} from '../../types';
import { removeGroundEffect } from '../groundEffects/removeGroundEffect';
import { dummyUnitCode } from '../../constants';

export const smgAbilityCode = FourCC('A007');

export const smgChannelTime = 0.05;

export const smgProjectile: ILinearProjectile<IGenericProjectileData> = {
  abilityCode: smgAbilityCode,
  sourceSound:
    'Units\\Human\\Gyrocopter\\GyrocopterImpactHit' +
    I2S(GetRandomInt(1, 2)) +
    '.wav', // TODO: make better sound
  trajectoryType: TrajectoryType.LINEAR,
  timedLife: 0.75,
  unitCode: dummyUnitCode,
  groundEffect: removeGroundEffect,
  speed: 8,
  gravity: false,
  spawnOffset: 25,
  terrainOffset: 15,
  facingAccuracy: 10,
  terrainAccuracy: 0.1
};
