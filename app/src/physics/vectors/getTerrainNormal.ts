import { IVector } from "./types";
import { createVector } from "./createVector";
import { getVectorProduct } from "./getVectorProduct";

export const getTerrainNormal = (
  x: number,
  y: number,
  diff: number
): IVector => {
  const leftZ = GetLocationZ(Location(x - diff, y));
  const rightZ = GetLocationZ(Location(x + diff, y));
  const upZ = GetLocationZ(Location(x, y - diff));
  const downZ = GetLocationZ(Location(x, y + diff));

  const xVector = createVector(2 * diff, 0, rightZ - leftZ);
  const yVector = createVector(0, 2 * diff, downZ - upZ);

  return getVectorProduct(xVector, yVector);
};
