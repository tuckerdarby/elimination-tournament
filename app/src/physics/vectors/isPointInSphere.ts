import { IVector } from './types'
import { subtractVectors } from './subtractVectors';
import { getScalarProduct } from './getScalarProduct';

export const isPointInSphere = (point: IVector, sherePoint: IVector, radius: number): boolean => {
    const difference = subtractVectors(point, sherePoint);
    const scalar = getScalarProduct(difference, difference);
    return scalar <= radius * radius;
};
