export const playSound = (soundFile: string) => {
  const sound = new Audio(soundFile);
  sound.play();
}
