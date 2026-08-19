export function tremorOffset(time: number, intensity: number) {
  return intensity === 0 ? 0 : Math.sin(time / 40) * intensity;
}
