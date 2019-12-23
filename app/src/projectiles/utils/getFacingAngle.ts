import { IVector } from '../../physics/vectors/types';

export const getFacingAngle = (vector: IVector): number => {
  return Atan2BJ(vector.y, vector.x);
};
