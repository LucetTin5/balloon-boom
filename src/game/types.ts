export enum GameStatus {
  PLAYING = 'PLAYING',
  WON = 'WON',
  LOST = 'LOST',
}

export type Cell = [number, number];
export type Group = { size: number; cells: Cell[] };
