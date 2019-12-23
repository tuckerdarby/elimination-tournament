export const createUnitSoundEffect = (
  unit: unit,
  fileName: string,
  volume: number
): void => {
  const sound = CreateSound(fileName, false, true, false, 10, 10, '');
  SetSoundPitch(sound, GetRandomReal(0.75, 1.25));
  SetSoundVolume(sound, volume);
  SetSoundDistances(sound, 6000, 60000);
  SetSoundDistanceCutoff(sound, 1000);
  AttachSoundToUnit(sound, unit);
  StartSound(sound);
  KillSoundWhenDone(sound);
};
