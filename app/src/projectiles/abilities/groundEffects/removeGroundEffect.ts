import { createUnitSoundEffect } from '../../utils/createUnitSoundEffect';
import { GroundEffect, IParticle } from '../../../physics/engine/types';
import { particleEngine } from '../../../physics/engine/particleEngine';
import { IGenericProjectileData } from '../../types';

const metalTerrain = FourCC('Yblm');
const metalTerrain2 = FourCC('Ysqd');

export const removeGroundEffect: GroundEffect<IGenericProjectileData> = (
  particle: IParticle<IGenericProjectileData>
) => {
  const { position, unit } = particle;
  const terrainType = GetTerrainType(position.x, position.y);
  if (terrainType === metalTerrain || terrainType === metalTerrain2) {
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
