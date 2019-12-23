import { IVector } from './types';

export const getScalarProduct = (vectorA: IVector, vectorB: IVector): number => {
    return vectorA.x * vectorB.x + vectorA.y * vectorB.y + vectorA.z * vectorB.z;
};
