export const addModel = (unit: unit, abilityCode: number): void => {
  AddSpecialEffectTarget(
    GetAbilityEffectById(abilityCode, EFFECT_TYPE_MISSILE, 0),
    unit,
    'origin'
  );
};

export const addModelFromFile = (unit: unit, file: string): void => {
  AddSpecialEffectTarget(file, unit, 'origin');
};
