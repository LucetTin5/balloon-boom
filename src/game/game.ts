import { ERROR_MSGS } from './errors';
import { GameStatus } from './types';

export class BalloonGame {
  #board: boolean[][];
  readonly #size: number;
  #status: GameStatus;
  #error: string;

  constructor(initialBoard: boolean[][]) {
    this.#board = initialBoard.map((row) => row.slice());
    this.#size = this.#board.length;
    this.#status = GameStatus.PLAYING;
    this.#error = '';
  }

  get status() {
    return this.#status;
  }

  get error() {
    return this.#error;
  }

  getBoard() {
    return this.#board.map((row) => row.slice());
  }

  clickBalloon(row: number, col: number) {
    if (this.#status !== GameStatus.PLAYING) {
      this.#error = ERROR_MSGS.GAME_ALREADY_FINISHED;
      return;
    }

    if (!this.#isValidPosition(row, col) || !this.#board[row][col]) {
      return;
    }

    const allGroups = this.#findAllGroups();
    const maxGroupSize = Math.max(...allGroups.map((group) => group.size));

    const clickedGroup = this.#findGroupByPosition(row, col);

    if (!clickedGroup) {
      return;
    }

    if (clickedGroup.size < maxGroupSize) {
      this.#error = ERROR_MSGS.SMALLER_GROUP_SELECTED;
      this.#status = GameStatus.LOST;
      return;
    }

    this.#error = '';
    this.#popGroup(clickedGroup.cells);

    const remainingBalloons = this.#board.some((row) =>
      row.some((cell) => cell),
    );
    if (!remainingBalloons) {
      this.#status = GameStatus.WON;
    }
  }

  #findAllGroups() {
    const visited = Array.from({ length: this.#size }, () =>
      Array(this.#size).fill(false),
    );
    const groups: Array<{ size: number; cells: Array<[number, number]> }> = [];

    for (let row = 0; row < this.#size; row++) {
      for (let col = 0; col < this.#size; col++) {
        if (this.#board[row][col] && !visited[row][col]) {
          const groupCells = this.#bfs(row, col, visited);
          groups.push({ size: groupCells.length, cells: groupCells });
        }
      }
    }

    return groups;
  }

  #findGroupByPosition(row: number, col: number) {
    if (!this.#isValidPosition(row, col) || !this.#board[row][col]) {
      return null;
    }

    const visited = Array.from({ length: this.#size }, () =>
      Array(this.#size).fill(false),
    );
    const groupCells = this.#bfs(row, col, visited);

    return { size: groupCells.length, cells: groupCells };
  }

  #bfs(startRow: number, startCol: number, visited: boolean[][]) {
    const queue: Array<[number, number]> = [];
    const result: Array<[number, number]> = [];
    const directions = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ];

    queue.push([startRow, startCol]);
    visited[startRow][startCol] = true;

    while (queue.length > 0) {
      const [r, c] = queue.shift()!;
      result.push([r, c]);

      for (const [dr, dc] of directions) {
        const nextR = r + dr;
        const nextC = c + dc;
        if (
          this.#isValidPosition(nextR, nextC) &&
          this.#board[nextR][nextC] &&
          !visited[nextR][nextC]
        ) {
          visited[nextR][nextC] = true;
          queue.push([nextR, nextC]);
        }
      }
    }

    return result;
  }

  #popGroup(cells: Array<[number, number]>) {
    cells.forEach(([row, col]) => {
      this.#board[row][col] = false;
    });
  }

  #isValidPosition(row: number, col: number): boolean {
    return row >= 0 && row < this.#size && col >= 0 && col < this.#size;
  }
}
