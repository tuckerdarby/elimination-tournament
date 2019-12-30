import { particleEngine } from './physics/engine/particleEngine';
import { initDebug } from './debug/initDebug';
import { initProjectiles } from './projectiles/initProjectiles';
import { initWeaponShop } from './shop/initWeaponShop';

export const initGame = (): void => {
  particleEngine.startEngine();
  initDebug();
  initProjectiles();
  initWeaponShop();
};
