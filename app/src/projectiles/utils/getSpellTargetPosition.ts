import { IVector } from '../../physics/vectors/types';
import { createVector } from '../../physics/vectors/createVector';

export const getSpellTargetPosition = (): IVector => {
  const x = GetSpellTargetX();
  const y = GetSpellTargetY();
  const z = GetLocationZ(GetSpellTargetLoc());
  return createVector(x, y, z);
};
