import { sniperProjectile } from '../projectiles/abilities/sniper/sniperProjectile';
import { shrapnelProjectile } from '../projectiles/abilities/shrapnel/shrapnelProjectile';
import { acidProjectile } from '../projectiles/abilities/acid/acidProjectile';
import { laserProjectile } from '../projectiles/abilities/laser/laserProjectile';
import { minigunProjectile } from '../projectiles/abilities/minigun/minigunProjectile';
import { smgProjectile } from '../projectiles/abilities/smg/smgProjectile';

export const weaponItems: { [index: number]: number } = {
  [FourCC('I002')]: sniperProjectile.abilityCode,
  [FourCC('I00C')]: shrapnelProjectile.abilityCode,
  [FourCC('I00I')]: acidProjectile.abilityCode,
  [FourCC('I00H')]: laserProjectile.abilityCode,
  [FourCC('I006')]: minigunProjectile.abilityCode,
  [FourCC('I009')]: smgProjectile.abilityCode, // smg
  [FourCC('I001')]: 0 // shotgun
};
