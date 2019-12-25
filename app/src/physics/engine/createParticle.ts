import { IVector } from '../vectors/types';
import { IParticle, GroundEffect, HitEffect } from './types';
import { createVector } from '../vectors/createVector';

export const createParticle = (
  unit: unit,
  position: IVector,
  velocity: IVector,
  gravity: boolean,
  data: any,
  groundEffect: GroundEffect<any>,
  hitEffect?: HitEffect<any>,
  radius = 1,
  hittable = true
): IParticle<any> => {
  return {
    unit,
    position,
    velocity,
    gravity,
    data,
    groundEffect,
    hitEffect,
    radius,
    hittable
  };
};

interface IOne {
  cake: string;
}

interface ITwo extends IOne {
  blep: number;
}

type k = ITwo | IOne;

const createOne = (cake: string, blep?: number): k => {
  if (blep) {
    return {
      cake,
      blep
    };
  }
  return {
    cake
  };
};

const addOnes = <T extends IOne>(one: T): T => {
  return one;
};
