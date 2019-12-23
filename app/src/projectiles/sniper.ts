import { createProjectile } from './createProjectile';
import { createVector } from '../physics/vectors/createVector';
import { IParticle, GroundEffect } from '../physics/engine/types';
import { getUnitPosition } from './utils/getUnitPosition';
import { getSpellTargetPosition } from './utils/getSpellTargetPosition';
import { subtractVectors } from '../physics/vectors/subtractVectors';
import { getFacingAngle } from './utils/getFacingAngle';
import { getTerrainAngle } from './utils/getTerrainAngle';
import { particleEngine } from '../physics/engine/particleEngine';
import { createUnitSoundEffect } from './utils/createUnitSoundEffect';

export const sniperAbilityCode = FourCC('A003');
export const timedLifeDeathBuffCode = FourCC('BTLF');

const groundEffect: GroundEffect = (particle: IParticle) => {
  const { position, unit } = particle;
  const terrainType = GetTerrainType(position.x, position.y);
  if (terrainType === FourCC('Yblm') || terrainType === FourCC('Ysqd')) {
    const soundFile = `Sound\\Units\\Combat\\MetalLightChopMetal${I2S(
      GetRandomInt(1, 3)
    )}.wav`;
    createUnitSoundEffect(unit, soundFile, 64);
    DestroyEffect(
      AddSpecialEffect(
        'Abilities\\Weapons\\MakuraMissile\\MakuraMissile.mdl',
        position.x,
        position.y
      )
    );
  }
  particleEngine.removeParticle(particle);
  RemoveUnit(unit);
};

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
    12,
    facingAngle,
    terrainAngle,
    groundEffect,
    false,
    1,
    20
  );

  projectile.groundEffect = groundEffect;

  //   SetUnitScale(projectile.unit, 200, 200, 200);

  AddSpecialEffectTarget(
    GetAbilityEffectById(sniperAbilityCode, EFFECT_TYPE_MISSILE, 0),
    projectile.unit,
    'origin'
  );
  UnitApplyTimedLife(projectile.unit, timedLifeDeathBuffCode, 12);
  createUnitSoundEffect(
    fireUnit,
    'Abilities\\Weapons\\BoatMissile\\BoatAttack1.wav',
    127
  );

  particleEngine.addParticle(projectile);
};
