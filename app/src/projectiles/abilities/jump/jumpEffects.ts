import { PreProjectileEffect, PostProjectileEffect } from '../../types';
import { IParticle } from '../../../physics/engine/types';

const jumpPause = (unit: unit): void => {
  SetUnitAnimationByIndex(unit, 8);
  QueueUnitAnimation(unit, 'Stand');
};

export const preJumpEffect: PreProjectileEffect = (
  sourceUnit: unit
): void => {};

export const postJumpEffect: PostProjectileEffect = (
  sourceUnit: unit,
  particle: IParticle
): void => {
  PauseUnit(sourceUnit, true);
  IssueImmediateOrder(sourceUnit, 'stop');
  const pauseDelayTimer = CreateTimer();
  TimerStart(pauseDelayTimer, 0, false, () => jumpPause(sourceUnit));
};
