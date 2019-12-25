import {
  TrajectoryType,
  ILinearProjectile,
  IGenericProjectileData
} from '../../types';
import { dummyUnitCode } from '../../constants';
import { laserBounceGroundEffect } from './laserBounceGroundEffect';
import { GroundEffect } from '../../../physics/engine/types';

export const laserAbilityCode = FourCC('A00G');

export interface ILaserData extends IGenericProjectileData {
  bounces: number;
}

const initializeLaserData = (): ILaserData => ({
  hits: [],
  bounces: 0,
  damage: 0
});

export interface ILaserProjectile extends ILinearProjectile<ILaserData> {
  groundEffect: GroundEffect<ILaserData>;
}

export const laserProjectile: ILaserProjectile = {
  abilityCode: laserAbilityCode,
  sourceSound: 'Abilities\\Weapons\\AvengerMissile\\DestroyerMissile.wav',
  trajectoryType: TrajectoryType.LINEAR,
  timedLife: 3.5,
  unitCode: dummyUnitCode,
  initializeData: initializeLaserData,
  groundEffect: laserBounceGroundEffect,
  speed: 10,
  gravity: false,
  spawnOffset: 15,
  terrainOffset: 15
};
