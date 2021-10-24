import { Board, EMPTY, Action, Cell, MinimaxPacket, O, X } from "./types";

/**
 * Accepts no argument and returns starting state of the board.
 */
export const initialState = (): Board => {
  return [
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY],
  ];
};

/**
 * Returns the player who has the next turn on a board.
 */
export const player = (board: Board): Cell => {
  let xCounter = 0;
  let oCounter = 0;

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      if (board[i][j] === X) {
        xCounter++;
      } else if (board[i][j] === O) {
        oCounter++;
      }
    }
  }

  if (xCounter > oCounter) {
    return O;
  } else {
    return X;
  }
};

/**
 * Returns set of all possible actions [i, j] available on the board.
 */
export const actions = (board: Board) => {
  let possibleActions: Array<Action> = [];

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      if (board[i][j] === EMPTY) {
        possibleActions.push([i, j]);
      }
    }
  }
  return possibleActions;
};

export const result = (board: Board, action: Action) => {
  let result = board.map((each) => each.slice());
  result[action[0]][action[1]] = player(board);
  return result as Board;
};

/**
 * Returns the winner of the game, if there is one, and null otherwise.
 */
export const winner = (board: Board): Cell => {
  const h = checkHorizontally(board);
  const v = checkVertically(board);
  const d = checkDiagonally(board);
  if (some(h, v, d)) {
    if (h === X || v === X || d === X) {
      return X;
    } else {
      return O;
    }
  } else {
    return EMPTY;
  }
};

/**
 * Returns `true` if the game is over, `false` otherwise.
 */
export const terminal = (board: Board) => {
  return winner(board) !== EMPTY || full(board);
};

/**
 * Returns 1 if X has won the game, -1 if O has won, 0 otherwise.
 */
export const utility = (board: Board) => {
  if (winner(board) === X) {
    return 1;
  } else if (winner(board) === O) {
    return -1;
  } else {
    return 0;
  }
};

export const scrubMove = (board: Board): Action => {
  const getRandom = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
  };

  let i;
  let j;
  do {
    i = getRandom(0, 3);
    j = getRandom(0, 3);
  } while (board[i][j] !== EMPTY);

  return [i, j];
};

/**
 * Returns the optimal action for the current player on the board.
 */
export const minimax = (board: Board) => {
  const currPlayer = player(board);
  if (terminal(board)) {
    return;
  }
  let empty = true;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      if (board[i][j] === X || board[i][j] === O) {
        empty = false;
      }
    }
  }
  if (empty) {
    return actions(board)[Math.floor(Math.random() * 10)];
  }
  const { action } = currPlayer === "X" ? maxValue(board) : minValue(board);
  return action;
};

/**
 * Gets the move with highest value for the given board
 * @param {Array} board
 */
export const maxValue = (board: Board): MinimaxPacket => {
  if (terminal(board)) {
    return {
      value: utility(board),
    };
  }

  let currBest: MinimaxPacket = {
    value: Number.NEGATIVE_INFINITY,
  };

  const possibleActions = actions(board);
  for (let i = 0; i < possibleActions.length; i++) {
    let action = possibleActions[i];
    const { value, action: opponentAction } = minValue(result(board, action));
    if (value > currBest.value) {
      currBest = { value, action };
      if (value === 1) {
        return currBest;
      }
    }
  }
  return currBest;
};

/**
 * Gets the move with lowest value for the given board
 */
export const minValue = (board: Board): MinimaxPacket => {
  if (terminal(board)) {
    return {
      value: utility(board),
    };
  }

  let currBest: MinimaxPacket = {
    value: Number.POSITIVE_INFINITY,
  };

  const possibleActions = actions(board);
  for (let i = 0; i < possibleActions.length; i++) {
    let action = possibleActions[i];
    const { value, action: opponentAction } = maxValue(result(board, action));
    if (value < currBest.value) {
      currBest = { value, action };
      if (value === -1) {
        return currBest;
      }
    }
  }

  return currBest;
};

/**
 * Returns `true` if the board is full, and `false` otherwise
 */
export const full = (board: Board) => {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      if (board[i][j] === EMPTY) {
        return false;
      }
    }
  }
  return true;
};

/**
 * Checks for any three-in-a-row horizontally, return the winner if there is one, null otherwise
 */
export const checkHorizontally = (board: Board) => {
  for (let i = 0; i < board.length; i++) {
    if (
      board[i][0] === board[i][1] &&
      board[i][1] === board[i][2] &&
      board[i][0] !== EMPTY
    ) {
      if (board[i][0] === X) {
        return X;
      } else {
        return O;
      }
    }
  }
  return EMPTY;
};

/**
 * Checks for any three-in-a-row vertically, return the winner if there is one, null otherwise
 */
export const checkVertically = (board: Board) => {
  for (let k = 0; k < board.length; k++) {
    if (
      board[0][k] === board[1][k] &&
      board[1][k] === board[2][k] &&
      board[0][k] !== EMPTY
    ) {
      if (board[0][k] === X) {
        return X;
      } else {
        return O;
      }
    }
  }
  return EMPTY;
};

/**
 * Checks for any three-in-a-row diagonally, return the winner if there is one, null otherwise
 * @param {Array} board
 */
export const checkDiagonally = (board: Board) => {
  if (
    board[0][0] === board[1][1] &&
    board[1][1] === board[2][2] &&
    board[0][0] !== EMPTY
  ) {
    return board[0][0];
  }
  if (
    board[0][2] === board[1][1] &&
    board[2][0] === board[0][2] &&
    board[0][2] !== EMPTY
  ) {
    return board[0][2];
  }
  return EMPTY;
};

const some = <T>(...args: T[]) => {
  for (let i = 0; i < args.length; i++) {
    if (args[i] !== null) {
      return true;
    }
  }
  return false;
};
