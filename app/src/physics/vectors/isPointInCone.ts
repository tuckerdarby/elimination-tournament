import { IVector } from "./types";
import { getVectorLength } from "./getVectorLength";
import { Log } from "../../lib/Serilog/Serilog";
import { subtractVectors } from "./subtractVectors";
import { projectPlane } from "./projectPlane";
import { getScalarProduct } from "./getScalarProduct";

export const isPointInCone = (
  vectorA: IVector,
  vectorB: IVector,
  vectorC: IVector,
  radius: number
): boolean => {
  const vectorCLength = getVectorLength(vectorC);

  if (vectorCLength === 0) {
    Log.Debug(`isPointInCone: vector length of 0`);
  }

  const vectorDifferenceAB = subtractVectors(vectorA, vectorB);
  const vectorDifferenceABC = subtractVectors(vectorDifferenceAB, vectorC);
  const plane = projectPlane(vectorDifferenceAB, vectorC);

  return (
    getScalarProduct(vectorDifferenceAB, vectorC) >= 0 &&
    getScalarProduct(vectorDifferenceABC, vectorC) <= 0 &&
    getScalarProduct(plane, plane) <= radius * radius
  );
};
