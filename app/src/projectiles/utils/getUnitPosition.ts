import { IVector } from '../../physics/vectors/types';
import { createVector } from '../../physics/vectors/createVector';

export const getUnitPosition = (unit: unit): IVector => {
  const x = GetUnitX(unit);
  const y = GetUnitY(unit);
  const z = GetLocationZ(GetUnitLoc(unit));
  return createVector(x, y, z);
};
