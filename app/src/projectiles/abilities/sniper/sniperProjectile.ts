import { TrajectoryType, ILinearProjectile, IGenericProjectileData } from '../../types';
import { removeGroundEffect } from '../groundEffects/removeGroundEffect';
import { dummyUnitCode } from '../../constants';

export const sniperAbilityCode = FourCC('A003');

export const sniperProjectile: ILinearProjectile<IGenericProjectileData> = {
  abilityCode: sniperAbilityCode,
  sourceSound: 'Abilities\\Weapons\\BoatMissile\\BoatAttack1.wav',
  trajectoryType: TrajectoryType.LINEAR,
  timedLife: 1.8,
  unitCode: dummyUnitCode,
  groundEffect: removeGroundEffect,
  speed: 12,
  gravity: false,
  spawnOffset: 15,
  terrainOffset: 15
};
