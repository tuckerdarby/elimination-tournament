import { IVector } from './types';
import { createVector } from './createVector';
import { Log } from '../../lib/Serilog/Serilog';
import { getVectorLength } from './getVectorLength';
import { scaleVector } from './scaleVector';

export const setVectorLength = (vector: IVector, length: number): IVector => {
    const currentLength = getVectorLength(vector);
    if (currentLength === 0) {
        Log.Debug(`setVectorLength: setting vector length to 0 of vector {${vector.x}, ${vector.y}, ${vector.z}}`);
        return createVector(0,0,0);
    }
    return scaleVector(vector, length/currentLength);
};
