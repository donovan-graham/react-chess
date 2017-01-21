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
  moveNext,
  movePawnTwoSteps,
} from './actions';


export const NORTH = 1;
export const EAST = 10;
export const SOUTH = -1;
export const WEST = -10;

export const NORTH_EAST = NORTH + EAST;
export const SOUTH_EAST = SOUTH + EAST;
export const SOUTH_WEST = SOUTH + WEST;
export const NORTH_WEST = NORTH + WEST;

export const NORTH_NORTH_EAST = NORTH + NORTH + EAST;
export const EAST_NORTH_EAST = EAST + NORTH + EAST;
export const EAST_SOUTH_EAST = EAST + SOUTH + EAST;
export const SOUTH_SOUTH_EAST = SOUTH + SOUTH + EAST;
export const SOUTH_SOUTH_WEST = SOUTH + SOUTH + WEST;
export const WEST_SOUTH_WEST = WEST + SOUTH + WEST;
export const WEST_NORTH_WEST = WEST + NORTH + WEST;
export const NORTH_NORTH_WEST = NORTH + NORTH + WEST;

export const STRAIGHT_OFFSETS = [
  NORTH,
  EAST,
  SOUTH,
  WEST,
];

export const DIAGONAL_OFFSETS = [
  NORTH_EAST,
  SOUTH_EAST,
  SOUTH_WEST,
  NORTH_WEST,
];

export const KING_OFFSETS = [ ...STRAIGHT_OFFSETS, ...DIAGONAL_OFFSETS ];
export const QUEEN_OFFSETS = [ ...STRAIGHT_OFFSETS, ...DIAGONAL_OFFSETS ];
export const BISHOP_OFFSETS = [ ...DIAGONAL_OFFSETS ];
export const ROOK_OFFSETS = [ ...STRAIGHT_OFFSETS ];
export const KNIGHT_OFFSETS = [
  NORTH_NORTH_EAST,
  EAST_NORTH_EAST,
  EAST_SOUTH_EAST,
  SOUTH_SOUTH_EAST,
  SOUTH_SOUTH_WEST,
  WEST_SOUTH_WEST,
  WEST_NORTH_WEST,
  NORTH_NORTH_WEST
];

export const PAWN_COLOR_OFFSETS = {
  [COLOR_WHITE]: [ NORTH ],
  [COLOR_BLACK]: [ SOUTH ],
};
export const PAWN_COLOR_CAPTURE_OFFSETS = {
  [COLOR_WHITE]: [ NORTH_EAST, NORTH_WEST ],
  [COLOR_BLACK]: [ SOUTH_EAST, SOUTH_WEST ],
};


export function getOppositeColor(color) {
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
  const oppositeColor = getOppositeColor(color);
  return COLOR_TO_PIECES_MAP[oppositeColor].indexOf(piece) !== -1;
}


export function getOccupiedState(board, pos, color) {
  const piece = getPieceAtPos(board, pos);
  if (!!piece) {
    return {
      isOccupied: true,
      isOpponent: isOpponentsPiece(piece, color),
      piece,
    };
  }

  return {
    isOccupied: false,
    isOpponent: false,
    piece
  };
}

export function getBoardPosForPiece(board, piece) {
  let pos;
  for (pos in board) {
    if(board[pos] === piece){
      return parseInt(pos, 10);
    }
  }
  return null;
}

export function getNextBoard(board, fromPos, toPos) {
  // this is missing special states.
  return { ...board, [toPos]: board[fromPos], [fromPos]: null };
}


export function flattenNestedMovesToBoard(arr) {
  /*
  [['x', 123], ['y', 345]].reduce((acc, t, i) => { acc[t[0]] = t[1]; return acc; }, {});
      => Object {x: 123, y: 345}
  */
  return arr.reduce((acc, child) => {
    acc[child[0]] = child[1]; return acc;
  }, {});
}


export function getPosGroup(startPos, offset, steps = 7, acc = []) {
  const nextPos = startPos + offset;
  if (steps > 0 && isValidPos(nextPos)) {
    return getPosGroup(nextPos, offset, (steps - 1), [...acc, nextPos]);
  }
  return acc;
}


export function takePosUntilOccupied(board, group, color, acc = []) {
  if (!group || group.length <= 0) {
    return acc;
  }

  const [headPos, ...nextGroup] = [...group];
  const { isOccupied, isOpponent } = getOccupiedState(board, headPos, color);
  if (isOccupied && !isOpponent) {
    return acc;
  }

  const nextAcc = [...acc, headPos];
  if (isOccupied && isOpponent) {
    return nextAcc;
  }
  return takePosUntilOccupied(board, nextGroup, color, nextAcc);
}

export function takePosBeforeOccupied(board, group, color, acc = []) {
  if (!group || group.length <= 0) {
    return acc;
  }

  const [headPos, ...nextGroup] = [...group];
  const { isOccupied } = getOccupiedState(board, headPos, color);
  if (isOccupied) {
    return acc;
  }

  const nextAcc = [...acc, headPos];
  return takePosBeforeOccupied(board, nextGroup, color, nextAcc);
}



export function isKingInCheck(board, color, kingPos) {
  // const kingPos = getBoardPosForPiece(board, king);
  // const activeKing = (color === COLOR_WHITE) ? PIECE_WHITE_KING : PIECE_BLACK_KING;

  const oppositeKing = (color === COLOR_WHITE) ? PIECE_BLACK_KING : PIECE_WHITE_KING;
  const oppositeQueen = (color === COLOR_WHITE) ? PIECE_BLACK_QUEEN : PIECE_WHITE_QUEEN;
  const oppositeBishop = (color === COLOR_WHITE) ? PIECE_BLACK_BISHOP : PIECE_WHITE_BISHOP;
  const oppositeRook = (color === COLOR_WHITE) ? PIECE_BLACK_ROOK : PIECE_WHITE_ROOK;
  const oppositeKnight = (color === COLOR_WHITE) ? PIECE_BLACK_KNIGHT : PIECE_WHITE_KNIGHT;
  const oppositePawn = (color === COLOR_WHITE) ? PIECE_BLACK_PAWN: PIECE_WHITE_PAWN;

  /*
    1. get list of potential attack positions
    2. check those positions are valid
    3. check if thoese position has an oppoent piece that can make the attack
  */

  const isCheckOnDiagonal = DIAGONAL_OFFSETS
    .map(offset => getPosGroup(kingPos, offset))
    .map(group => group
      .map((pos, step) => ({
        step,
        ...getOccupiedState(board, pos, color),
      }))
      .find(state => state.isOccupied === true)
    ).some(state =>
      !!state && state.isOpponent &&
        ([oppositeBishop, oppositeQueen].includes(state.piece) ||
          (state.step === 1 && state.piece === oppositeKing)));

  if (isCheckOnDiagonal) return true;

  const isCheckOnStraight = STRAIGHT_OFFSETS
    .map(offset => getPosGroup(kingPos, offset))
    .map(group => group
      .map((pos, step) => ({
        step,
        ...getOccupiedState(board, pos, color),
      }))
      .find(state => state.isOccupied === true)
    ).some(state =>
      !!state && state.isOpponent &&
        ([oppositeRook, oppositeQueen].includes(state.piece) ||
          (state.step === 1 && state.piece === oppositeKing)));

  if (isCheckOnStraight) return true;

  const isCheckByKnight = KNIGHT_OFFSETS
    .map(offset => kingPos + offset)
    .filter(isValidPos)
    .map(pos => getOccupiedState(board, pos, color))
    .some(state => state.isOpponent && state.piece === oppositeKnight);

  if (isCheckByKnight) return true;

  // Pawn attack is inverted as we're looking at it from the kings perspective
  const isCheckByPawn = PAWN_COLOR_CAPTURE_OFFSETS[color]
    .map(offset => kingPos + offset)
    .filter(isValidPos)
    .map(pos => getOccupiedState(board, pos, color))
    .some(state => state.isOpponent && state.piece === oppositePawn);

  if (isCheckByPawn) return true;

  return false;
}


export function kingMoves({ fromPos, board, color }) {
  const moves = KING_OFFSETS
    .map(offset => fromPos + offset)
    .filter(isValidPos)
    .filter(toPos => {
      const { isOccupied, isOpponent } = getOccupiedState(board, toPos, color);
      return !isOccupied || isOpponent;
    })
    .map(toPos => {
      const nextBoard = getNextBoard(board, fromPos, toPos);
      return [toPos, nextBoard];
    })
    .filter(move => {
      const [toPos, nextBoard] = move; // King's toPos === kingPos
      return !isKingInCheck(nextBoard, color, toPos);
    })
    .reduce((acc, move) => {
      const [toPos, nextBoard] = move;
      return { ...acc, [toPos]: moveNext(nextBoard) };
    }, {});

    return moves;
}


export function queenMoves({ fromPos, board, color }) {
  const king = (color === COLOR_WHITE) ? PIECE_WHITE_KING : PIECE_BLACK_KING;
  const kingPos = getBoardPosForPiece(board, king);

  const moveGroups = QUEEN_OFFSETS
    .map(offset => getPosGroup(fromPos, offset))
    .map(group => takePosUntilOccupied(board, group, color))
    .map(group => group
      .map(toPos => {
        const nextBoard = getNextBoard(board, fromPos, toPos);
        return [toPos, nextBoard];
      })
      .filter(move => {
        const [, nextBoard] = move;
        return !isKingInCheck(nextBoard, color, kingPos);
      })
      .reduce((acc, move) => {
        const [toPos, nextBoard] = move;
        return { ...acc, [toPos]: moveNext(nextBoard) };
      }, {}));

  return Object.assign({}, ...moveGroups);
}


export function rookMoves({ fromPos, board, color }) {
  const king = (color === COLOR_WHITE) ? PIECE_WHITE_KING : PIECE_BLACK_KING;
  const kingPos = getBoardPosForPiece(board, king);

  const moveGroups = ROOK_OFFSETS
    .map(offset => getPosGroup(fromPos, offset))
    .map(group => takePosUntilOccupied(board, group, color))
    .map(group => group
      .map(toPos => {
        const nextBoard = getNextBoard(board, fromPos, toPos);
        return [toPos, nextBoard];
      })
      .filter(move => {
        const [, nextBoard] = move;
        return !isKingInCheck(nextBoard, color, kingPos);
      })
      .reduce((acc, move) => {
        const [toPos, nextBoard] = move;
        return { ...acc, [toPos]: moveNext(nextBoard) };
      }, {}));

  return Object.assign({}, ...moveGroups);
}


export function bishopMoves({ fromPos, board, color }) {
  const king = (color === COLOR_WHITE) ? PIECE_WHITE_KING : PIECE_BLACK_KING;
  const kingPos = getBoardPosForPiece(board, king);

  const moveGroups = BISHOP_OFFSETS
    .map(offset => getPosGroup(fromPos, offset))
    .map(group => takePosUntilOccupied(board, group, color))
    .map(group => group
      .map(toPos => {
        const nextBoard = getNextBoard(board, fromPos, toPos);
        return [toPos, nextBoard];
      })
      .filter(move => {
        const [, nextBoard] = move;
        return !isKingInCheck(nextBoard, color, kingPos);
      })
      .reduce((acc, move) => {
        const [toPos, nextBoard] = move;
        return { ...acc, [toPos]: moveNext(nextBoard) };
      }, {}));

  return Object.assign({}, ...moveGroups);
}


export function knightMoves({ fromPos, board, color }) {
  const king = (color === COLOR_WHITE) ? PIECE_WHITE_KING : PIECE_BLACK_KING;
  const kingPos = getBoardPosForPiece(board, king);

  return KNIGHT_OFFSETS
    .map(offset => fromPos + offset)
    .filter(isValidPos)
    .filter(toPos => {
      const { isOccupied, isOpponent } = getOccupiedState(board, toPos, color);
      return !isOccupied || isOpponent;
    })
    .map(toPos => {
      const nextBoard = getNextBoard(board, fromPos, toPos);
      return [toPos, nextBoard];
    })
    .filter(move => {
      const [, nextBoard] = move;
      return !isKingInCheck(nextBoard, color, kingPos);
    })
    .reduce((acc, move) => {
      const [toPos, nextBoard] = move;
      return { ...acc, [toPos]: moveNext(nextBoard) };
    }, {});
}


// enPassantPos = 45 for testing
export function pawnMoves({ board, fromPos, color, enPassantPos }) {
  const king = (color === COLOR_WHITE) ? PIECE_WHITE_KING : PIECE_BLACK_KING;
  const kingPos = getBoardPosForPiece(board, king);

  const { y } = getCoordinatesFromPos(fromPos);

  const isFirstMoveWhite = (color === COLOR_WHITE && y === 1);
  const isFirstMoveBlack = (color === COLOR_BLACK && y === 6);
  const moveSteps = (isFirstMoveWhite || isFirstMoveBlack) ? 2 : 1

  let piece;
  if (color === COLOR_WHITE) {
    piece = (y === 6) ? PIECE_WHITE_QUEEN : PIECE_WHITE_PAWN;
  } else {
    piece = (y === 1) ? PIECE_BLACK_QUEEN : PIECE_BLACK_PAWN;
  }

  // promote to queen
  const moveBoard = { ...board, [fromPos]: piece };

  const moveGroups = PAWN_COLOR_OFFSETS[color]
    .map(offset => getPosGroup(fromPos, offset, moveSteps))
    .map(group => takePosBeforeOccupied(moveBoard, group, color))
    .map(group => group
      .map(toPos => {
        const nextBoard = getNextBoard(moveBoard, fromPos, toPos);
        return [toPos, nextBoard];
      })
      .filter(move => {
        const [, nextBoard] = move;
        return !isKingInCheck(nextBoard, color, kingPos);
      })
      .reduce((acc, move, i) => {
        const [toPos, nextBoard] = move;
        if (i === 0) {
          return { ...acc, [toPos]: moveNext(nextBoard) };
        }
        const oppositeColor = getOppositeColor(color);
        const capturePos = toPos + PAWN_COLOR_OFFSETS[oppositeColor][0];
        return { ...acc, [toPos]: movePawnTwoSteps(nextBoard, capturePos) };
      }, {}));

  const captures = PAWN_COLOR_CAPTURE_OFFSETS[color]
    .map(offset => fromPos + offset)
    .filter(isValidPos)
    .filter(toPos => {
      if (toPos === enPassantPos) {
        return true;
      }
      const { isOccupied, isOpponent } = getOccupiedState(moveBoard, toPos, color);
      return isOccupied && isOpponent;
    })
    .map(toPos => {
      if (toPos === enPassantPos) {
        const oppositeColor = getOppositeColor(color);
        const capturePos = toPos + PAWN_COLOR_OFFSETS[oppositeColor][0];
        const captureBoard = { ...moveBoard, [capturePos]: null };
        const nextCaptureBoard = getNextBoard(captureBoard, fromPos, toPos);
        return [toPos, nextCaptureBoard];
      }
      const nextBoard = getNextBoard(moveBoard, fromPos, toPos);
      return [toPos, nextBoard];
    })
    .filter(move => {
      const [, nextBoard] = move;
      return !isKingInCheck(nextBoard, color, kingPos);
    })
    .reduce((acc, move) => {
      const [toPos, nextBoard] = move;
      return { ...acc, [toPos]: moveNext(nextBoard) };
    }, {});

  return Object.assign({}, ...moveGroups, captures);
}


export function getMoves({ board, fromPos, enPassantPos }) {
  const piece = getPieceAtPos(board, fromPos);

  switch(piece) {
    case PIECE_WHITE_KING:
      return kingMoves({ board, fromPos, enPassantPos, color: COLOR_WHITE });
    case PIECE_BLACK_KING:
      return kingMoves({ board, fromPos, enPassantPos, color: COLOR_BLACK });
    case PIECE_WHITE_QUEEN:
      return queenMoves({ board, fromPos, enPassantPos, color: COLOR_WHITE });
    case PIECE_BLACK_QUEEN:
      return queenMoves({ board, fromPos, enPassantPos, color: COLOR_BLACK });
    case PIECE_WHITE_BISHOP:
      return bishopMoves({ board, fromPos, enPassantPos, color: COLOR_WHITE });
    case PIECE_BLACK_BISHOP:
      return bishopMoves({ board, fromPos, enPassantPos, color: COLOR_BLACK });
    case PIECE_WHITE_KNIGHT:
      return knightMoves({ board, fromPos, enPassantPos, color: COLOR_WHITE });
    case PIECE_BLACK_KNIGHT:
      return knightMoves({ board, fromPos, enPassantPos, color: COLOR_BLACK });
    case PIECE_WHITE_ROOK:
      return rookMoves({ board, fromPos, enPassantPos, color: COLOR_WHITE });
    case PIECE_BLACK_ROOK:
      return rookMoves({ board, fromPos, enPassantPos, color: COLOR_BLACK });
    case PIECE_WHITE_PAWN:
      return pawnMoves({ board, fromPos, enPassantPos, color: COLOR_WHITE });
    case PIECE_BLACK_PAWN:
      return pawnMoves({ board, fromPos, enPassantPos, color: COLOR_BLACK });
    default:
      console.error(`Moves not implements for "${piece}"`);
      return [];
  }
}


// export const PIECE_TO_MOVES_MAP = {
//   [PIECE_WHITE_KING]: ({ board, pos }) =>
//     kingMoves({ board, pos, color: COLOR_WHITE }),
//   [PIECE_BLACK_KING]: ({ board, pos }) =>
//     kingMoves({ board, pos, color: COLOR_BLACK }),
//   [PIECE_WHITE_QUEEN]: ({ board, pos }) =>
//     queenMoves({ board, pos, color: COLOR_WHITE }),
//   [PIECE_BLACK_QUEEN]: ({ board, pos }) =>
//     queenMoves({ board, pos, color: COLOR_BLACK }),
//   [PIECE_WHITE_BISHOP]: ({ board, pos }) =>
//     bishopMoves({ board, pos, color: COLOR_WHITE }),
//   [PIECE_BLACK_BISHOP]: ({ board, pos }) =>
//     bishopMoves({ board, pos, color: COLOR_BLACK }),
//   [PIECE_WHITE_KNIGHT]: ({ board, pos }) =>
//     knightMoves({ board, pos, color: COLOR_WHITE }),
//   [PIECE_BLACK_KNIGHT]: ({ board, pos }) =>
//     knightMoves({ board, pos, color: COLOR_BLACK }),
//   [PIECE_WHITE_ROOK]: ({ board, pos }) =>
//     rookMoves({ board, pos, color: COLOR_WHITE }),
//   [PIECE_BLACK_ROOK]: ({ board, pos }) =>
//     rookMoves({ board, pos, color: COLOR_BLACK }),
//   [PIECE_WHITE_PAWN]: ({ board, pos }) =>
//     pawnMoves({ pos, board, color: COLOR_WHITE }),
//   [PIECE_BLACK_PAWN]: ({ board, pos }) =>
//     pawnMoves({ pos, board, color: COLOR_BLACK }),
// };
//
//  export function getMoves({ board, pos }) {
//    const piece = getPieceAtPos(board, pos);
//   return PIECE_TO_MOVES_MAP[piece]({ board, pos });
// }
