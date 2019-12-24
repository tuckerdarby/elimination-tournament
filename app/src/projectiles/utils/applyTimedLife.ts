export const timedLifeDeathBuffCode = FourCC('BTLF');

export const applyTimedLife = (unit: unit, time: number): void => {
  UnitApplyTimedLife(unit, timedLifeDeathBuffCode, time);
};
