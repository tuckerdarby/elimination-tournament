import { IVector } from '../../../physics/vectors/types';
import { dummyUnitCode } from '../../constants';
import { makeUnitFly } from '../../utils/makeUnitFly';
import { getUnitAbsoluteFlyHeight } from '../../utils/getAbsoluteHeight';

export const createExplosionEffect = (
  player: player,
  model: string,
  position: IVector,
  facingAngle: number,
  scale: number,
  duration: number
): void => {
  const { x, y, z } = position;
  const unit = CreateUnit(player, dummyUnitCode, x, y, facingAngle);
  makeUnitFly(unit);
  SetUnitAnimationByIndex(unit, 90);
  SetUnitScale(unit, scale, scale, scale);
  SetUnitFlyHeight(unit, getUnitAbsoluteFlyHeight(unit, z), 0);
  const effect = AddSpecialEffectTarget(model, unit, 'origin');
  if (scale === 0) {
    DestroyEffect(effect);
  } else {
    KillUnit(unit);
    const timer = CreateTimer();
    TimerStart(timer, duration, false, () => {
      DestroyEffect(effect);
      DestroyTimer(timer);
    });
  }
};
