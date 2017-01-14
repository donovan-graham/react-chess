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


function getOpponentsColor(color) {
  return (color === COLOR_WHITE) ? COLOR_BLACK : COLOR_WHITE;
}

function getCoordinatesFromPos(pos) {
  const x = Math.floor(pos / 10);
  const y = pos % 10;
  return { x, y };
}

function getPieceAtPos(board, pos) {
  return board[pos];
}

function isValidPos(pos) {
  const { x, y } = getCoordinatesFromPos(pos);
  return (0 <= x && x <=7 && 0 <= y && y <= 7);
}

function isOccupiedPos(board, pos) {
  return !!board[pos];
}

function isCapturePos(board, pos, color) {
  const piece = getPieceAtPos(board, pos);
  if (!piece) return false;
  const opponent = getOpponentsColor(color);
  return COLOR_TO_PIECES_MAP[opponent].indexOf(piece) !== -1;
}

// enPessantPos = 45 for testing
function pawnMoves({ pos, board, color, enPessantPos}) {
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
      if (isOccupiedPos(board, move)) break;

      const moveAction = (y === yPromotion) ? movePawnPromotion : moveStandard;
      moves[move] = moveAction(pos, move);
    }
  });

  captures.forEach(capture => {
    const move = pos + capture;
    if (!isValidPos(move)) return;

    if (move === enPessantPos) {
      moves[move] = movePawnEnPassant(pos, move);
    } else if (isCapturePos(board, move, color)) {
      const moveAction = (y === yPromotion) ? movePawnPromotion : moveStandard;
      moves[move] = moveAction(pos, move);
    }
  });

  return moves;
}

export const PIECE_TO_MOVES_MAP = {
  [PIECE_WHITE_KING]: (pos, board) => {
    console.log("moves for PIECE_WHITE_KING missing");
    return {};
  },
  [PIECE_BLACK_KING]: (pos, board) => {
    console.log("moves for PIECE_BLACK_KING missing");
    return {};
  },
  [PIECE_WHITE_QUEEN]: (pos, board) => {
    console.log("moves for PIECE_WHITE_QUEEN missing");
    return {};
  },
  [PIECE_BLACK_QUEEN]: (pos, board) => {
    console.log("moves for PIECE_BLACK_QUEEN missing");
    return {};
  },
  [PIECE_WHITE_BISHOP]: (pos, board) => {
    console.log("moves for PIECE_WHITE_BISHOP missing");
    return {};
  },
  [PIECE_BLACK_BISHOP]: (pos, board) => {
    console.log("moves for PIECE_BLACK_BISHOP missing");
    return {};
  },
  [PIECE_WHITE_KNIGHT]: (pos, board) => {
    console.log("moves for PIECE_WHITE_KNIGHT missing");
    return {};
  },
  [PIECE_BLACK_KNIGHT]: (pos, board) => {
    console.log("moves for PIECE_BLACK_KNIGHT missing");
    return {};
  },
  [PIECE_WHITE_ROOK]: (pos, board) => {
    console.log("moves for PIECE_WHITE_ROOK missing");
    return {};
  },
  [PIECE_BLACK_ROOK]: (pos, board) => {
    console.log("moves for PIECE_BLACK_ROOK missing");
    return {};
  },
  [PIECE_WHITE_PAWN]: (pos, board) => {
    return pawnMoves({ pos, board, color: COLOR_WHITE });
  },
  [PIECE_BLACK_PAWN]: (pos, board) => {
    return pawnMoves({ pos, board, color: COLOR_BLACK });
  },
};
