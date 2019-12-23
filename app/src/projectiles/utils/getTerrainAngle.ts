import { IVector } from '../../physics/vectors/types';

export const getTerrainAngle = (vector: IVector): number => {
  const { x, y, z } = vector;
  return Atan2(z, Math.sqrt(x * x + y * y));
};
