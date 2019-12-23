export const makeUnitFly = (unit: unit): void => {
  UnitAddAbility(unit, FourCC('Amrf'));
  UnitRemoveAbility(unit, FourCC('Amrf'));
};
