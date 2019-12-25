import {
  TrajectoryType,
  IGenericProjectileData,
  ILoftedProjectile
} from '../../types';
import { dummyUnitCode } from '../../constants';
import { shrapnelGroundEffect } from './shrapnelGroundEffect';

export const shrapnelAbilityCode = FourCC('A00D');

export const shrapnelProjectile: ILoftedProjectile<IGenericProjectileData> = {
  abilityCode: shrapnelAbilityCode,
  sourceSound: 'Abilities\\Weapons\\BoatMissile\\BoatAttack1.wav', // TODO: find unique sound
  trajectoryType: TrajectoryType.LOFTED,
  unitCode: dummyUnitCode,
  groundEffect: shrapnelGroundEffect,
  gravity: true,
  spawnOffset: 15,
  terrainOffset: 15,
  maxDistance: 1300,
  minDistance: 128,
  speed: 14
};

