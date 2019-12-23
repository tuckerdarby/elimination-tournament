import { IVector } from './types';

export const createVector = (x: number, y: number, z: number): IVector => {
    return { x, y, z };
};
