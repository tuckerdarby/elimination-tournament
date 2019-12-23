import { removeGroundEffect } from './../groundEffects/removeGroundEffect';
import { createProjectile } from '../createProjectile';
import { getUnitPosition } from '../utils/getUnitPosition';
import { getSpellTargetPosition } from '../utils/getSpellTargetPosition';
import { subtractVectors } from '../../physics/vectors/subtractVectors';
import { getFacingAngle } from '../utils/getFacingAngle';
import { getTerrainAngle } from '../utils/getTerrainAngle';
import { particleEngine } from '../../physics/engine/particleEngine';
import { createUnitSoundEffect } from '../utils/createUnitSoundEffect';
import { sniperAbilityCode, sniperSettings } from './sniperSettings';

export const timedLifeDeathBuffCode = FourCC('BTLF');

export const fireSniper = (): void => {
  const fireUnit = GetSpellAbilityUnit();
  const firePlayer = GetOwningPlayer(fireUnit);

  const fireUnitPosition = getUnitPosition(fireUnit);
  const targetPosition = getSpellTargetPosition();
  const pathVector = subtractVectors(targetPosition, fireUnitPosition);

  const facingAngle = getFacingAngle(pathVector, fireUnit);
  const terrainAngle = getTerrainAngle(pathVector);

  const projectile = createProjectile(
    firePlayer,
    fireUnitPosition,
    sniperSettings.speed,
    facingAngle,
    terrainAngle,
    removeGroundEffect,
    false,
    1,
    20
  );

  AddSpecialEffectTarget(
    GetAbilityEffectById(sniperAbilityCode, EFFECT_TYPE_MISSILE, 0),
    projectile.unit,
    'origin'
  );
  UnitApplyTimedLife(
    projectile.unit,
    timedLifeDeathBuffCode,
    sniperSettings.timedLife
  );
  createUnitSoundEffect(fireUnit, sniperSettings.fireSound, 127);

  particleEngine.addParticle(projectile);
};
