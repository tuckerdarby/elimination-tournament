import { Trigger } from '../jassOverrides/Trigger';
import { playerWeapons } from '../player/playerWeapons';
import { weaponItems } from './weaponItems';

const changeWeapon = () => {
  const itemWeaponId = GetItemTypeId(GetManipulatedItem());
  const triggeringUnit = GetManipulatingUnit();
  const playerId = GetPlayerId(GetOwningPlayer(triggeringUnit));
  const currentWeapon = playerWeapons[playerId];
  UnitRemoveAbility(triggeringUnit, currentWeapon);
  const changeToWeapon = weaponItems[itemWeaponId];
  if (changeToWeapon) {
    playerWeapons[playerId] = changeToWeapon;
    UnitAddAbility(triggeringUnit, changeToWeapon);
    DestroyEffect(
      AddSpecialEffectTarget(
        'Objects\\InventoryItems\\tomeGreen\\tomeGreen.mdl',
        triggeringUnit,
        'origin'
      )
    );
  }
};

const isItemWeaponType = (): boolean => {
  return GetItemType(GetManipulatedItem()) == ITEM_TYPE_CHARGED;
};

export const initWeaponShop = (): Trigger => {
  const changeWeaponTrigger = new Trigger();
  changeWeaponTrigger.RegisterAnyUnitEventBJ(EVENT_PLAYER_UNIT_PICKUP_ITEM);
  changeWeaponTrigger.AddCondition(isItemWeaponType);
  changeWeaponTrigger.AddAction(changeWeapon);
  return changeWeaponTrigger;
};
