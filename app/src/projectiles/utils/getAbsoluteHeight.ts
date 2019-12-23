export const getUnitAbsoluteFlyHeight = (unit: unit, z: number): number => {
  return z - GetLocationZ(GetUnitLoc(unit));
};
