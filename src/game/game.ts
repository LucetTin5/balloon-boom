import { ERROR_MSGS } from './errors';
import { Cell, GameStatus, Group } from './types';

export class BalloonGame {
  #board: boolean[][];
  readonly #size: number;
  #status: GameStatus;
  #error: string;
  #currentMaxGroupSize: number;
  #groups: Group[];
  #positionsToGroupIndex: Map<string, number>;

  constructor(initialBoard: boolean[][]) {
    this.#board = initialBoard.map((row) => row.slice());
    this.#size = this.#board.length;
    this.#status = GameStatus.PLAYING;
    this.#error = '';

    this.#groups = this.#findAllGroups();
    this.#groups.sort((a, b) => b.size - a.size);
    this.#currentMaxGroupSize = this.#groups[0].size;

    this.#positionsToGroupIndex = new Map();
    this.#groups.forEach((group, index) => {
      group.cells.forEach(([row, col]) => {
        this.#positionsToGroupIndex.set(`${row},${col}`, index);
      });
    });
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

    const clickedGroupIndex = this.#positionsToGroupIndex.get(`${row},${col}`);

    if (!clickedGroupIndex) {
      return;
    }

    const clickedGroup = this.#groups[clickedGroupIndex];

    if (clickedGroup.size < this.#currentMaxGroupSize) {
      this.#error = ERROR_MSGS.SMALLER_GROUP_SELECTED;
      this.#status = GameStatus.LOST;
      return;
    }

    this.#error = '';
    this.#popGroup(clickedGroup, clickedGroupIndex);
  }

  #findAllGroups() {
    const visited = Array.from({ length: this.#size }, () =>
      Array(this.#size).fill(false),
    );
    const groups: Group[] = [];

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

  #bfs(startRow: number, startCol: number, visited: boolean[][]) {
    const queue: Cell[] = [];
    const result: Cell[] = [];
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

  #popGroup(group: Group, groupIndex: number) {
    group.cells.forEach(([row, col]) => {
      this.#board[row][col] = false;
      this.#positionsToGroupIndex.delete(`${row},${col}`);
    });

    this.#groups.splice(groupIndex, 1);

    if (this.#groups.length === 0) {
      this.#status = GameStatus.WON;
      return;
    }

    if (groupIndex === 0) {
      this.#currentMaxGroupSize = this.#groups[0].size;
    }
  }

  #isValidPosition(row: number, col: number): boolean {
    return row >= 0 && row < this.#size && col >= 0 && col < this.#size;
  }
}
