import {
  COLOR_WHITE,
  COLOR_BLACK,
  COLOR_TO_PIECES_MAP,

  PIECE_WHITE_KING,
  PIECE_BLACK_KING,
  PIECE_WHITE_QUEEN,
  PIECE_BLACK_QUEEN,
  PIECE_WHITE_BISHOP,
  PIECE_BLACK_BISHOP,
  PIECE_WHITE_KNIGHT,
  PIECE_BLACK_KNIGHT,
  PIECE_WHITE_ROOK,
  PIECE_BLACK_ROOK,
  PIECE_WHITE_PAWN,
  PIECE_BLACK_PAWN,
} from './constants';

import {
  moveStandard,
  movePawnEnPassant,
  movePawnPromotion,
} from './actions';


export function getOpponentsColor(color) {
  return (color === COLOR_WHITE) ? COLOR_BLACK : COLOR_WHITE;
}

export function getCoordinatesFromPos(pos) {
  const x = Math.floor(pos / 10);
  const y = pos % 10;
  return { x, y };
}

export function getPieceAtPos(board, pos) {
  return board[pos];
}

export function isValidPos(pos) {
  const { x, y } = getCoordinatesFromPos(pos);
  return (0 <= x && x <=7 && 0 <= y && y <= 7);
}

export function isOpponentsPiece(piece, color) {
  const opponentColor = getOpponentsColor(color);
  return COLOR_TO_PIECES_MAP[opponentColor].indexOf(piece) !== -1;
}


export function getOccupiedState(board, pos, color) {
  const piece = getPieceAtPos(board, pos);
  if (!!piece) {
    return {
      isOccupied: true,
      isOpponent: isOpponentsPiece(piece, color),
    };
  }

  return {
    isOccupied: false,
    isOpponent: false,
  };
}

// export function isOccupiedPos(board, pos) {
//   return !!board[pos];
// }
//
// export function isCapturePos(board, pos, color) {
//   const piece = getPieceAtPos(board, pos);
//   if (!piece) return false;
//   const opponent = getOpponentsColor(color);
//   return COLOR_TO_PIECES_MAP[opponent].indexOf(piece) !== -1;
// }


// const diagonalLeft = -9;
// const diagonalRight = 11;
// const forward = 1;
// const back = -1;

// enPessantPos = 45 for testing
export function pawnMoves({ pos, board, color, enPessantPos}) {
  let offsets;
  let captures;
  let repeat;
  let yPromotion;
  const moves = {};

  const { y } = getCoordinatesFromPos(pos);

  if (color === COLOR_WHITE) {
    repeat = (y === 1) ? 2 : 1;
    offsets = [1];
    captures = [-9, 11];
    yPromotion = 6;
  } else {
    repeat = (y === 6) ? 2 : 1;
    offsets = [-1];
    captures = [9, -11];
    yPromotion = 1;
  }

  offsets.forEach(offset => {
    let i;
    let move = pos;

    for (i = 0; i < repeat; i++) {
      move += offset;
      if (!isValidPos(move)) break;

      const { isOccupied } = getOccupiedState(board, move, color);
      if (isOccupied) break;

      const moveAction = (y === yPromotion) ? movePawnPromotion : moveStandard;
      moves[move] = moveAction(pos, move);
    }
  });

  captures.forEach(capture => {
    const move = pos + capture;
    if (!isValidPos(move)) return;

    const { isOccupied, isOpponent } = getOccupiedState(board, move, color);
    if (!isOccupied && move === enPessantPos) {
      moves[move] = movePawnEnPassant(pos, move);
      return;
    }

    if (isOccupied && isOpponent) {
      const moveAction = (y === yPromotion) ? movePawnPromotion : moveStandard;
      moves[move] = moveAction(pos, move);
      return;
    }
  });

  return moves;
}


export function kingMoves({ pos, board, color }) {
  const offsets = [1, 10, -1, -10, -9, 11, 9, -11];
  const moves = {};

  offsets.forEach(offset => {
    const move = pos + offset;
    if (!isValidPos(move)) return;

    const { isOccupied, isOpponent } = getOccupiedState(board, move, color);
    if (!isOccupied || isOpponent) {
      moves[move] = moveStandard(pos, move);
    }
  });


/*
  const keys = Object.keys(moves);
  const safeKeys = keys.filter(nextPos => {
    const nextBoard = { ...board, [nextPos]: board[pos], [pos]: null };

    return !!isKingInCheck(board, pos, color);
  });
*/
  return moves;
}

export function queenMoves({ pos, board, color }) {
  const offsets = [1, 10, -1, -10, -9, 11, 9, -11];
  const repeat = 7;
  const moves = {};

  offsets.forEach(offset => {
    let i;
    let move = pos;

    for (i = 0; i < repeat; i++) {
      move += offset;
      if (!isValidPos(move)) break;

      const { isOccupied, isOpponent } = getOccupiedState(board, move, color);
      if (!isOccupied || isOpponent) {
        moves[move] = moveStandard(pos, move);
      }
      if (isOccupied) break;
    }
  });

  return moves;
}


export function rookMoves({ pos, board, color }) {
  const offsets = [1, 10, -1, -10];
  const repeat = 7;
  const moves = {};

  offsets.forEach(offset => {
    let i;
    let move = pos;

    for (i = 0; i < repeat; i++) {
      move += offset;
      if (!isValidPos(move)) break;

      const { isOccupied, isOpponent } = getOccupiedState(board, move, color);
      if (!isOccupied || isOpponent) {
        moves[move] = moveStandard(pos, move);
      }
      if (isOccupied) break;
    }
  });

  return moves;
}


export function bishopMoves({ pos, board, color }) {
  const offsets = [-9, 11, 9, -11];
  const repeat = 7;
  const moves = {};

  offsets.forEach(offset => {
    let i;
    let move = pos;

    // TODO:  implement as tail recursion....
    for (i = 0; i < repeat; i++) {
      move += offset;
      if (!isValidPos(move)) break;

      const { isOccupied, isOpponent } = getOccupiedState(board, move, color);
      if (!isOccupied || isOpponent) {
        moves[move] = moveStandard(pos, move);
      }
      if (isOccupied) break;
    }
  });

  return moves;
}


export function knightMoves({ pos, board, color }) {
  const offsets = [12, -8, 21, 19, 8, -12, -21, -19];
  const moves = {};

  offsets.forEach(offset => {
    const move = pos + offset;
    if (!isValidPos(move)) return;

    const { isOccupied, isOpponent } = getOccupiedState(board, move, color);
    if (!isOccupied || isOpponent) {
      moves[move] = moveStandard(pos, move);
    }
  });

  return moves;
}


export const PIECE_TO_MOVES_MAP = {
  [PIECE_WHITE_KING]: ({ board, pos }) =>
    kingMoves({ board, pos, color: COLOR_WHITE }),
  [PIECE_BLACK_KING]: ({ board, pos }) =>
    kingMoves({ board, pos, color: COLOR_BLACK }),
  [PIECE_WHITE_QUEEN]: ({ board, pos }) =>
    queenMoves({ board, pos, color: COLOR_WHITE }),
  [PIECE_BLACK_QUEEN]: ({ board, pos }) =>
    queenMoves({ board, pos, color: COLOR_BLACK }),
  [PIECE_WHITE_BISHOP]: ({ board, pos }) =>
    bishopMoves({ board, pos, color: COLOR_WHITE }),
  [PIECE_BLACK_BISHOP]: ({ board, pos }) =>
    bishopMoves({ board, pos, color: COLOR_BLACK }),
  [PIECE_WHITE_KNIGHT]: ({ board, pos }) =>
    knightMoves({ board, pos, color: COLOR_WHITE }),
  [PIECE_BLACK_KNIGHT]: ({ board, pos }) =>
    knightMoves({ board, pos, color: COLOR_BLACK }),
  [PIECE_WHITE_ROOK]: ({ board, pos }) =>
    rookMoves({ board, pos, color: COLOR_WHITE }),
  [PIECE_BLACK_ROOK]: ({ board, pos }) =>
    rookMoves({ board, pos, color: COLOR_BLACK }),
  [PIECE_WHITE_PAWN]: ({ board, pos }) =>
    pawnMoves({ pos, board, color: COLOR_WHITE }),
  [PIECE_BLACK_PAWN]: ({ board, pos }) =>
    pawnMoves({ pos, board, color: COLOR_BLACK }),
};


export function getMoves({ board, pos }) {
  const piece = getPieceAtPos(board, pos);
  return PIECE_TO_MOVES_MAP[piece]({ board, pos });
}
