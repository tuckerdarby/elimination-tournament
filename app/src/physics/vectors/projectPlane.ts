import { IVector } from './types';
import { projectVector } from './projectVector';
import { subtractVectors } from './subtractVectors';

export const projectPlane = (vectorA: IVector, vectorB: IVector): IVector => {
    const projected = projectVector(vectorA, vectorB);
    return subtractVectors(vectorA, projected);
};
