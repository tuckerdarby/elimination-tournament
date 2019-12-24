import { TrajectoryType, ILinearProjectile } from '../../types';
import { dummyUnitCode } from '../../constants';
import { bounceGroundEffect } from '../../groundEffects/bounceGroundEffect';

export const laserAbilityCode = FourCC('A00G');

interface ILaserData {
  hits: unit[];
  bounces: number;
}

const initializeLaserData = (): ILaserData => ({
  hits: [],
  bounces: 0
});

export const laserSettings: ILinearProjectile = {
  abilityCode: laserAbilityCode,
  sourceSound: 'Abilities\\Weapons\\AvengerMissile\\DestroyerMissile.wav',
  trajectoryType: TrajectoryType.LINEAR,
  timedLife: 3.5,
  unitCode: dummyUnitCode,
  initializeData: initializeLaserData,
  groundEffect: bounceGroundEffect,
  speed: 10,
  gravity: false,
  spawnOffset: 15,
  terrainOffset: 15
};
