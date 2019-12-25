import {
  ICustomProjectile,
  IGenericProjectileData,
  TrajectoryType
} from '../../types';
import { dummyUnitCode } from '../../constants';
import { removeGroundEffect } from '../groundEffects/removeGroundEffect';

export const shrapnelChildAbilityCode = FourCC('A00D');

export const shrapnelChildProjectile: ICustomProjectile<IGenericProjectileData> = {
  abilityCode: shrapnelChildAbilityCode,
  trajectoryType: TrajectoryType.OTHER,
  unitCode: dummyUnitCode,
  groundEffect: removeGroundEffect,
  gravity: true,
  spawnOffset: 0,
  terrainOffset: 0
};
