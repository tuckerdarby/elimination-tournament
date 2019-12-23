import { IVector } from '../../physics/vectors/types';
import { createVector } from '../../physics/vectors/createVector';

export const offsetPosition = (
  vector: IVector,
  angle: number,
  offset: number,
  terrainOffset = 0
): IVector => {
  const { x, y, z } = vector;
  const nx = x + CosBJ(angle) * offset + SinBJ(angle) * offset;
  const ny = y + SinBJ(angle) * offset + CosBJ(angle) * offset;
  const nz = z + terrainOffset;
  return createVector(nx, ny, nz);
};
