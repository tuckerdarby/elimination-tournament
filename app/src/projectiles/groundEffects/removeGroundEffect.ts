import { createUnitSoundEffect } from './../utils/createUnitSoundEffect';
import { GroundEffect, IParticle } from '../../physics/engine/types';
import { particleEngine } from '../../physics/engine/particleEngine';

export const removeGroundEffect: GroundEffect = (particle: IParticle) => {
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
