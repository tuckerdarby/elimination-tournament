import { IVector } from '../vectors/types';
import { IParticle, GroundEffect, HitEffect } from './types';
import { createVector } from '../vectors/createVector';

export const createParticle = (
  unit: unit,
  position: IVector,
  velocity: IVector,
  gravity: boolean,
  groundEffect: GroundEffect,
  hitEffect?: HitEffect,
  radius = 1,
  hittable = true
): IParticle => {
  return {
    unit,
    position,
    velocity,
    gravity,
    groundEffect,
    hitEffect,
    radius,
    hittable
  };
};
