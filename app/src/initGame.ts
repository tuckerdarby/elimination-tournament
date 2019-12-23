import { particleEngine } from './physics/engine/particleEngine';
import { Trigger } from './JassOverrides/Trigger';
import { fireSniper, sniperAbilityCode } from './projectiles/sniper';
import { jumpAbilityCode, jump } from './projectiles/jump';
import { Log } from './lib/Serilog/Serilog';

let cake = {
  r0: 150,
  r1: 150
};

export const initGame = (): void => {
  particleEngine.startEngine();
  const trig = new Trigger();
  trig.RegisterAnyUnitEventBJ(EVENT_PLAYER_UNIT_SPELL_CAST);
  // trig.AddCondition(() => {
  // return GetSpellAbilityId() === FourCC('A003');
  // });
  trig.AddAction(() => {
    if (GetSpellAbilityId() === sniperAbilityCode) {
      fireSniper();
    } else if (GetSpellAbilityId() === jumpAbilityCode) {
      jump(cake);
    }
  });

  const chatTrig = new Trigger();
  chatTrig.RegisterPlayerChatEvent(Player(0), '-', false);
  chatTrig.AddAction(() => {
    const message = GetEventPlayerChatString();
    const split = message.split(' ');
    const setting = split.length === 2 ? split[1] : '';
    if (split.length === 1 || split.length === 0) {
      return;
    }
    if (setting !== '' && split[0] === '-gravity') {
      try {
        const newGravity = S2I(setting);
        Log.Information(`gravity: ${newGravity}`);
        particleEngine.setGravity(newGravity);
      } catch {
        Log.Error(`Could not parse setting ${setting}`);
      }
    } else if (setting !== '' && split[0] === '-r0') {
      try {
        const newGravity = S2I(setting);
        Log.Information(`r0: ${newGravity}`);
        cake.r0 = newGravity;
      } catch {}
    } else if (setting !== '' && split[0] === '-r1') {
      try {
        const newGravity = S2I(setting);
        Log.Information(`r1: ${newGravity}`);
        cake.r1 = newGravity;
      } catch {}
    }
  });
};
