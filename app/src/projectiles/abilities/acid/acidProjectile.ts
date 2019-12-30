import {
  TrajectoryType,
  IGenericProjectileData,
  ILoftedProjectile
} from '../../types';
import { dummyUnitCode } from '../../constants';
import { bounceGroundEffect } from '../groundEffects/bounceGroundEffect';

export const acidAbilityCode = FourCC('A00I');

export const acidProjectile: ILoftedProjectile<IGenericProjectileData> = {
  abilityCode: acidAbilityCode,
  sourceSound: 'Abilities\\Weapons\\AvengerMissile\\DestroyerMissile.wav', // TODO: find unique sound
  trajectoryType: TrajectoryType.LOFTED,
  unitCode: dummyUnitCode,
  groundEffect: bounceGroundEffect,
  gravity: true,
  spawnOffset: 15,
  terrainOffset: 15,
  maxDistance: 512,
  minDistance: 64,
  timedLife: 2,
  speed: 12
};
