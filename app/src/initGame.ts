import { particleEngine } from './physics/engine/particleEngine';
import { initDebug } from './debug/initDebug';
import { initProjectiles } from './projectiles/initProjectiles';

export const initGame = (): void => {
  particleEngine.startEngine();
  initDebug();
  initProjectiles();
};
