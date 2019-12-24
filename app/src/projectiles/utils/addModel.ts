export const addModel = (unit: unit, abilityCode: number): void => {
  AddSpecialEffectTarget(
    GetAbilityEffectById(abilityCode, EFFECT_TYPE_MISSILE, 0),
    unit,
    'origin'
  );
};
