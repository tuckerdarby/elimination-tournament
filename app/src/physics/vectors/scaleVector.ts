import { IVector } from './types';
import { createVector } from './createVector';

export const scaleVector = (vector: IVector, scale: number): IVector => {
    return createVector(vector.x * scale, vector.y * scale, vector.z * scale);
};
