import { TrajectoryType, IArcProjectile, IGenericProjectileData } from '../../types';
import { jumpGroundEffect } from './jumpGroundEffect';
import { preJumpEffect, postJumpEffect } from './jumpEffects';

export const jumpAbilityCode = FourCC('A00C');

export const jumpProjectile: IArcProjectile<IGenericProjectileData> = {
  abilityCode: jumpAbilityCode,
  sourceSound: '',
  trajectoryType: TrajectoryType.ARC,
  preEffect: preJumpEffect,
  postEffect: postJumpEffect,
  groundEffect: jumpGroundEffect,
  spawnOffset: 0,
  terrainOffset: 15,
  arcScalar: 100,
  maxDistance: 100,
  gravity: true
};
