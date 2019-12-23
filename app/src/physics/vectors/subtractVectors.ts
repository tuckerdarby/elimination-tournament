import { IVector } from './types'
import { createVector } from './createVector'

export const subtractVectors = (vectorA: IVector, vectorB: IVector): IVector => {
    return createVector(vectorA.x - vectorB.x, vectorA.y - vectorB.y, vectorA.z - vectorB.z);
}
