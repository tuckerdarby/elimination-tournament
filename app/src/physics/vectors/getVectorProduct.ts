import { IVector } from './types';
import { createVector } from './createVector';

export const getVectorProduct = (vectorA: IVector, vectorB: IVector): IVector => {
    const { x: aX, y: aY, z: aZ } = vectorA;
    const { x: bX, y: bY, z: bZ } = vectorB;
    return createVector(
        aY*bZ-aZ*bY,
        aZ*bX-aX*bZ,
        aX*bY-aY*bX
    );
};
