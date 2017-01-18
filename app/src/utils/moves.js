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


export function getOffsetGroup(pos, offset, steps = 7, acc = []) {
  const nextPos = pos + offset;
  if (steps > 0 && isValidPos(nextPos)) {
    return getOffsetGroup(nextPos, offset, (steps - 1), [...acc, nextPos]);
  } else {
    return acc;
  }
}


export function isKingInCheck(board, color, kingPos) {
  // const kingPos = getBoardPosForPiece(board, king);
  // const activeKing = (color === COLOR_WHITE) ? PIECE_WHITE_KING : PIECE_BLACK_KING;
  // const opponentKing = (color === COLOR_WHITE) ? PIECE_BLACK_KING : PIECE_WHITE_KING;

  const knight = (color === COLOR_WHITE) ? PIECE_BLACK_KNIGHT : PIECE_WHITE_KNIGHT;
  const queen = (color === COLOR_WHITE) ? PIECE_BLACK_QUEEN : PIECE_WHITE_QUEEN;
  const bishop = (color === COLOR_WHITE) ? PIECE_BLACK_BISHOP : PIECE_WHITE_BISHOP;
  const rook = (color === COLOR_WHITE) ? PIECE_BLACK_ROOK : PIECE_WHITE_ROOK;

  /*
  1. get list of potential attack positions
  2. check those positions are valid
  3. check if thoese position has an oppoent piece that can make the attack
  */
  const lshape = [12, -8, 21, 19, 8, -12, -21, -19];

  const check1 = lshape
    .map(offset => kingPos + offset)
    .filter(isValidPos) // isn't good enought ... we need to stop on invalid values, in the directions ...
    .map(pos => getOccupiedState(board, pos, color))
    .some(state => state.isOpponent && state.piece === knight);

  if (check1) return true;

  // diagonals: bishop, queen
  const diagonals = [11, -9, -11, 9];

  const check2 = diagonals
    .map(offset => getOffsetGroup(kingPos, offset))
    .map(group => group
      .map(pos => getOccupiedState(board, pos, color))
      .find(state => state.isOccupied === true)
    ).some(state =>
      !!state && state.isOpponent && [bishop, queen].includes(state.piece));

  if (check2) return true;


  // straights: rook, queen
  const straights = [1, 10, -1, -10];

  const check3 = straights
    .map(offset => getOffsetGroup(kingPos, offset))
    .map(group => group
      .map(pos => getOccupiedState(board, pos, color))
      .find(state => state.isOccupied === true)
    ).some(state =>
      !!state && state.isOpponent && [rook, queen].includes(state.piece));

  if (check3) return true;
  // king [1]
  // pawn [1]

  // pawn: front diagonal,
  //  promotion to queen
  //  en passant

  // king: 1 squared
  //  castle

  return false;
}

// const diagonalLeft = -9;
// const diagonalRight = 11;
// const forward = 1;
// const back = -1;

// enPassantPos = 45 for testing
export function pawnMoves({ board, pos, color, enPassantPos }) {
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
    if (!isOccupied && move === enPassantPos) {
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


export function kingMoves({ fromPos, board, color }) {
  const offsets = [1, 10, -1, -10, -9, 11, 9, -11];
  // nextBoard => moveStandard(fromPos, move);

  return offsets
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
      const [toPos, nextBoard] = move; // toPos === kingPos
      return !isKingInCheck(nextBoard, color, toPos);
    })
    .reduce((acc, move) => {
      const [toPos, nextBoard] = move;
      return { ...acc, [toPos]: moveNext(nextBoard) }
    }, {});
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


export function getMoves({ board, pos }) {
  const piece = getPieceAtPos(board, pos);
  let movesFn;
  let color;

  switch(piece) {
    case PIECE_WHITE_KING:
      movesFn = kingMoves;
      color = COLOR_WHITE;
      return movesFn({ fromPos: pos, board, color });
      // break;
    case PIECE_BLACK_KING:
      movesFn = kingMoves;
      color = COLOR_BLACK;
      return movesFn({ fromPos: pos, board, color });
      // break;
    case PIECE_WHITE_QUEEN:
      movesFn = queenMoves;
      color = COLOR_WHITE;
      break;
    case PIECE_BLACK_QUEEN:
      movesFn = queenMoves;
      color = COLOR_BLACK;
      break;
    case PIECE_WHITE_BISHOP:
      movesFn = bishopMoves;
      color = COLOR_WHITE;
      break;
    case PIECE_BLACK_BISHOP:
      movesFn = bishopMoves;
      color = COLOR_BLACK;
      break;
    case PIECE_WHITE_KNIGHT:
      movesFn = knightMoves;
      color = COLOR_WHITE;
      break;
    case PIECE_BLACK_KNIGHT:
      movesFn = knightMoves;
      color = COLOR_BLACK;
      break;
    case PIECE_WHITE_ROOK:
      movesFn = rookMoves;
      color = COLOR_WHITE;
      break;
    case PIECE_BLACK_ROOK:
      movesFn = rookMoves;
      color = COLOR_BLACK;
      break;
    case PIECE_WHITE_PAWN:
      movesFn = pawnMoves;
      color = COLOR_WHITE;
      break;
    case PIECE_BLACK_PAWN:
      movesFn = pawnMoves;
      color = COLOR_BLACK;
      break;
    default:
      console.error(`Moves not implements for "${piece}"`);
      break;
  }
  return movesFn({ pos, board, color });
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
