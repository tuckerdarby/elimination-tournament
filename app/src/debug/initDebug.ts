import { particleEngine } from '../physics/engine/particleEngine';
import { Log } from '../lib/Serilog/Serilog';
import { Trigger } from '../jassOverrides/Trigger';
import { projectileSettings } from '../projectiles/projectileSettings';
import { ProjectileType } from '../projectiles/types';

const setGravity = (gravityString: string): void => {
  const gravity = S2R(gravityString);
  particleEngine.setGravity(gravity);
  Log.Information(`gravity: ${gravity}`);
};

const setProjectileSetting = (
  projectile: string,
  setting: string,
  value: string
) => {
  const projectileAccessor = projectile.toUpperCase() as ProjectileType;
  const settings = projectileSettings[projectileAccessor];
  if (settings && setting in settings) {
    // @ts-ignore;
    const currentValue = settings[setting];
    if (typeof currentValue === 'string') {
      // @ts-ignore;
      settings[setting] = value;
    } else {
      // @ts-ignore;
      settings[setting] = S2R(value);
    }
    Log.Information(
      `Setting projectile ${projectile} setting ${setting} value ${value}`
    );
  } else {
    Log.Error(
      `No projectile settings for ${settings}, for setting ${setting} with value ${value}`
    );
  }
};

export const initDebug = () => {
  // const chatTrig = new Trigger();
  // chatTrig.RegisterPlayerChatEvent(Player(0), '-', false);
  // chatTrig.AddCondition(() => {
  //   return GetPlayerName(GetTriggerPlayer()) === 'WorldEdit';
  // });
  // chatTrig.AddAction(() => {
  //   const message = GetEventPlayerChatString();
  //   const split = message.split(' ');
  //   if (split.length < 2) {
  //     return;
  //   }
  //   const setting = split[0].substring(1);
  //   const settingValue = split[1];
  //   try {
  //     if (setting === 'gravity') {
  //       setGravity(settingValue);
  //     } else if (split.length > 2) {
  //       setProjectileSetting(setting, split[1], split[2]);
  //     }
  //   } catch {
  //     Log.Error(`Could not parse setting ${setting} of message ${message}`);
  //   }
  // });
};
