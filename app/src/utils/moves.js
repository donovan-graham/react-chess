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



function getCoordinatesFromPos(pos) {
  const x = Math.floor(pos / 10);
  const y = pos % 10;
  return { x, y };
}

function isValidPos(pos) {
  const { x, y } = getCoordinatesFromPos(pos);
  return (0 <= x && x <=7 && 0 <= y && y <= 7);
}

function pawnMoves(pos, board, color) {
  let offsets;
  let captures;
  let repeat;
  const moves = [];

  const opponentColor = (color === COLOR_WHITE) ? COLOR_BLACK : COLOR_WHITE;
  const { y } = getCoordinatesFromPos(pos);

  if (color === COLOR_WHITE) {
    repeat = (y === 1) ? 2 : 1;
    offsets = [1];
    captures = [-9, 11];
  } else {
    repeat = (y === 6) ? 2 : 1;
    offsets = [-1];
    captures = [9, -11];
  }

  offsets.forEach(offset => {
    let i;
    let move = pos;

    for (i = 0; i < repeat; i++) {
      move += offset;
      if (!isValidPos(move)) break;
      if (board[move]) break;
      moves.push(move);
    }
  });

  captures.forEach(capture => {
    const move = pos + capture;
    if (!isValidPos(move)) return;

    const piece = board[move];
    if (!piece) return;

    if (COLOR_TO_PIECES_MAP[opponentColor].indexOf(piece) === -1) return;
    moves.push(move);
  });

  return moves;
}

export const PIECE_TO_MOVES_MAP = {
  [PIECE_WHITE_KING]: (pos, board) => {
    return [];
  },
  [PIECE_BLACK_KING]: (pos, board) => {
    return [];
  },
  [PIECE_WHITE_QUEEN]: (pos, board) => {
    return [];
  },
  [PIECE_BLACK_QUEEN]: (pos, board) => {
    return [];
  },
  [PIECE_WHITE_BISHOP]: (pos, board) => {
    return [];
  },
  [PIECE_BLACK_BISHOP]: (pos, board) => {
    return [];
  },
  [PIECE_WHITE_KNIGHT]: (pos, board) => {
    return [];
  },
  [PIECE_BLACK_KNIGHT]: (pos, board) => {
    return [];
  },
  [PIECE_WHITE_ROOK]: (pos, board) => {
    return [];
  },
  [PIECE_BLACK_ROOK]: (pos, board) => {
    return [];
  },

  [PIECE_WHITE_PAWN]: (pos, board) => {
    return pawnMoves(pos, board, COLOR_WHITE);
  },
  [PIECE_BLACK_PAWN]: (pos, board) => {
    return pawnMoves(pos, board, COLOR_BLACK);
  },
};
