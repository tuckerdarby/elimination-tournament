import { IVector } from '../vectors/types';

export interface IParticle<T> {
  unit: unit;
  position: IVector;
  velocity: IVector;
  //   acceleration: IVector;
  radius: number;
  hittable: boolean;
  gravity: boolean;
  data: T;
  groundEffect: GroundEffect<T>;
  hitEffect?: HitEffect<T>;
}

export type GroundEffect<T> = (particle: IParticle<T>) => void;

export type HitEffect<T> = (
  particle: IParticle<T>,
  hitParticle: IParticle<T>,
  data: T
) => void;
