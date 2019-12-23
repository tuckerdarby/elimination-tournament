import { IVector } from '../../physics/vectors/types';

export const getFacingAngle = (vector: IVector, unit?: unit): number => {
  return unit && vector.x === 0 && vector.y === 0
    ? GetUnitFacing(unit)
    : Atan2BJ(vector.y, vector.x);
};
