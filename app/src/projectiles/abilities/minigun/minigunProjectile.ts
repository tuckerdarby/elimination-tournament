import {
  TrajectoryType,
  ILinearProjectile,
  IGenericProjectileData,
  PostProjectileEffect
} from '../../types';
import { removeGroundEffect } from '../groundEffects/removeGroundEffect';
import { dummyUnitCode } from '../../constants';
import { IParticle } from '../../../physics/engine/types';
import { createUnitSoundEffect } from '../../utils/createUnitSoundEffect';

export const minigunAbilityCode = FourCC('A004');

const minigunPostEffect: PostProjectileEffect = (
  sourceUnit: unit,
  particle: IParticle<unknown>
) => {
  SetUnitAnimation(sourceUnit, 'Attack');
  SetUnitBlendTime(sourceUnit, 0.5);
  createUnitSoundEffect(
    sourceUnit,
    'Units\\Human\\Rifleman\\RiflemanAttack' + I2S(GetRandomInt(1, 2)) + '.wav',
    96
  );
};

export const minigunChannelTime = 0.2;

export const minigunProjectile: ILinearProjectile<IGenericProjectileData> = {
  abilityCode: minigunAbilityCode,
  trajectoryType: TrajectoryType.LINEAR,
  timedLife: 0.9,
  unitCode: dummyUnitCode,
  groundEffect: removeGroundEffect,
  speed: 8,
  gravity: false,
  spawnOffset: 25,
  terrainOffset: 15,
  facingAccuracy: 10,
  terrainAccuracy: 0.08,
  postEffect: minigunPostEffect
};
