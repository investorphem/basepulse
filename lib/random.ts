export function pickRandomFive(list: string[]): string[] {
  const shuffled = [...list].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 5);
}
