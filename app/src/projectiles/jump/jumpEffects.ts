import { PreProjectileEffect, PostProjectileEffect } from '../types';
import { IParticle } from '../../physics/engine/types';

export const preJumpEffect: PreProjectileEffect = (unit: unit): void => {};

export const postJumpEffect: PostProjectileEffect = (
  particle: IParticle
): void => {};
