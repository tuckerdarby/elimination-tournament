// import { getUnitPosition } from './getUnitPosition';
// import { dummyUnitCode } from '../createProjectile';
// import { makeUnitFly } from './makeUnitFly';
// import { createParticle } from '../../physics/engine/createParticle';
// import { createVector } from '../../physics/vectors/createVector';
// import { sniperAbilityCode } from '../sniper';

// export const makeHeightTest = () => {
//   const fireUnit = GetSpellAbilityUnit();
//   const firePlayer = GetOwningPlayer(fireUnit);

//   const fireUnitPosition = getUnitPosition(fireUnit);
//   const particleUnit = CreateUnit(
//     firePlayer,
//     dummyUnitCode,
//     fireUnitPosition.x,
//     fireUnitPosition.y,
//     0
//   );

//   const position = createVector(
//     fireUnitPosition.x,
//     fireUnitPosition.y,
//     GetLocationZ(GetUnitLoc(fireUnit)) + 30
//   );

//   makeUnitFly(particleUnit);
//   SetUnitFlyHeight(particleUnit, 0, 0);

//   const velocity = createVector(0, 0, 1);

//   const particle = createParticle(particleUnit, position, velocity, () => {});

//   AddSpecialEffectTarget(
//     GetAbilityEffectById(sniperAbilityCode, EFFECT_TYPE_MISSILE, 0),
//     particleUnit,
//     'origin'
//   );

//   return particle;
// };
