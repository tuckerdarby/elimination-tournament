import { sniperProjectile } from '../projectiles/abilities/sniper/sniperProjectile';

interface IPlayerWeapons {
  [index: number]: number;
}

const getInitialPlayerWeapons = (playerCount: number): IPlayerWeapons => {
  const playerWeapons: IPlayerWeapons = {};
  for (let i = 0; i < playerCount; i++) {
    playerWeapons[i] = sniperProjectile.abilityCode;
  }
  return playerWeapons;
};

export const playerWeapons: IPlayerWeapons = getInitialPlayerWeapons(12);
