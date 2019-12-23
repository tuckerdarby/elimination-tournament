import { IVector } from '../vectors/types';

export interface IParticle {
  unit: unit;
  position: IVector;
  velocity: IVector;
  //   acceleration: IVector;
  radius: number;
  hittable: boolean;
  gravity: boolean;
  groundEffect: GroundEffect;
  hitEffect?: HitEffect;
}

export type GroundEffect = (particle: IParticle) => void;

export type HitEffect = (particle: IParticle, hitParticle: IParticle) => void;
