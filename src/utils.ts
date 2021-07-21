export function getRandomInArray<T>(arr: T[]): T {
  return arr[(Math.floor(Math.random() * arr.length))]
}

export function getRandomInt(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}
