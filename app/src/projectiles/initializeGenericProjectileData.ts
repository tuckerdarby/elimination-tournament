import { IGenericProjectileData } from "./types";

export const initializeGenericProjectileData = (): IGenericProjectileData => {
    return {
        hits: [],
        damage: 0
    };
};