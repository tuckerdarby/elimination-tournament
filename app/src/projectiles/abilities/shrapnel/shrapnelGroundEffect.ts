import { GroundEffect, IParticle } from '../../../physics/engine/types';
import { IGenericProjectileData } from '../../types';
import { getTerrainNormal } from '../../../physics/vectors/getTerrainNormal';
import { projectVector } from '../../../physics/vectors/projectVector';
import { subtractVectors } from '../../../physics/vectors/subtractVectors';
import { scaleVector } from '../../../physics/vectors/scaleVector';
import { addVectors } from '../../../physics/vectors/addVectors';
import { getFacingAngle } from '../../utils/getFacingAngle';
import { getTerrainAngle } from '../../utils/getTerrainAngle';
import { createProjectile } from '../../createProjectile';
import { createVector } from '../../../physics/vectors/createVector';
import { shrapnelChildProjectile } from './shrapnelChildProjectile';
import { particleEngine } from '../../../physics/engine/particleEngine';
import { createUnitSoundEffect } from '../../utils/createUnitSoundEffect';
import { createExplosionEffect } from '../effects/createExplosionEffect';
import { addModelFromFile } from '../../utils/addModel';
import { makeUnitFly } from '../../utils/makeUnitFly';
import { getUnitAbsoluteFlyHeight } from '../../utils/getAbsoluteHeight';

export const shrapnelGroundEffect: GroundEffect<IGenericProjectileData> = (
  particle: IParticle<IGenericProjectileData>
): void => {
  const { position, unit, velocity } = particle;
  const terrainNormal = getTerrainNormal(position.x, position.y, 25);
  const projected = projectVector(velocity, terrainNormal);

  // DamageArea(u,20,p,150.,true,false,false)
  const backtrackPosition = subtractVectors(
    position,
    scaleVector(velocity, 0.03)
  );
  const reversedVelocity = scaleVector(
    addVectors(velocity, scaleVector(projected, -2)),
    0.65
  );
  const facingAngle = getFacingAngle(reversedVelocity);
  const terrainAngle = getTerrainAngle(reversedVelocity);
  const explosionModel =
    'Abilities\\Weapons\\FlyingMachine\\FlyingMachineImpact.mdl';
  createExplosionEffect(
    GetOwningPlayer(unit),
    explosionModel,
    position,
    facingAngle,
    2,
    5
  );

  for (let i = 0; i < 4; i++) {
    const childFacingAngle = facingAngle + GetRandomReal(-20, 20);
    const childTerrainAngle = terrainAngle + GetRandomReal(-0.3, 0.3);
    const vx =
      GetRandomReal(6, 12) * CosBJ(childFacingAngle) * Cos(childTerrainAngle);
    const vy =
      GetRandomReal(6, 12) * SinBJ(childFacingAngle) * Cos(childTerrainAngle);
    const vz = GetRandomReal(6, 12) * Sin(childTerrainAngle);
    const childVelocity = createVector(vx, vy, vz);
    const particleUnit = CreateUnit(
      GetOwningPlayer(unit),
      shrapnelChildProjectile.unitCode,
      backtrackPosition.x,
      backtrackPosition.y,
      childFacingAngle
    );

    SetUnitFacingTimed(particleUnit, facingAngle, 0);
    makeUnitFly(particleUnit);
    SetUnitFlyHeight(
      particleUnit,
      getUnitAbsoluteFlyHeight(particleUnit, backtrackPosition.z),
      0
    );
    const projectile = createProjectile(
      particleUnit,
      backtrackPosition,
      childVelocity,
      facingAngle,
      shrapnelChildProjectile
    );
    addModelFromFile(
      particleUnit,
      'Abilities\\Weapons\\MakuraMissile\\MakuraMissile.mdl'
    );
    particleEngine.addParticle(projectile);
  }
  const sound = `Abilities\\Weapons\\CannonTowerMissile\\CannonTowerMissile${I2S(
    GetRandomInt(1, 3)
  )}.wav`;
  createUnitSoundEffect(unit, sound, 127);
  particleEngine.removeParticle(particle);
  RemoveUnit(unit);
};
