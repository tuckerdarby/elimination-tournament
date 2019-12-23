import { IVector } from './types';
import { getScalarProduct } from './getScalarProduct';
import { scaleVector } from './scaleVector';
import { Log } from '../../lib/Serilog/Serilog';

export const projectVector = (vectorA: IVector, vectorB: IVector): IVector => {
    const r = getScalarProduct(vectorA, vectorB);
    const l = getScalarProduct(vectorB, vectorB);
    const scale = l === 0 ? 0 : r/l;
    if (l === 0) {
        Log.Debug(`projectVector: found 0 value`);
    }
    return scaleVector(vectorB, scale);
};
