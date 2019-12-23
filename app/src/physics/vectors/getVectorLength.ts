import { IVector } from './types';

export const getVectorLength = (vector: IVector): number => {
    const { x, y, z } = vector;
    return Math.sqrt(x * x + y * y + z * z);
};
