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
  squareCoOrdinates,
  squareKey,
} from '../square/utils';


function pawnMoves(pieces, square, color) {
  const moves = [];
  const { rank, file } = squareCoOrdinates(square);

  if (color === COLOR_WHITE) {
    moves.push(squareKey(rank + 1, file));
    moves.push(squareKey(rank + 2, file));
  } else {
    moves.push(squareKey(rank - 1, file));
    moves.push(squareKey(rank - 2, file));
  }
  console.log(moves);
  return moves;
}

export const PIECE_TO_MOVES_MAP = {
  [PIECE_WHITE_KING]: (pieces, square) => {
    return [];
  },
  [PIECE_BLACK_KING]: (pieces, square) => {
    return [];
  },
  [PIECE_WHITE_QUEEN]: (pieces, square) => {
    return [];
  },
  [PIECE_BLACK_QUEEN]: (pieces, square) => {
    return [];
  },
  [PIECE_WHITE_BISHOP]: (pieces, square) => {
    return [];
  },
  [PIECE_BLACK_BISHOP]: (pieces, square) => {
    return [];
  },
  [PIECE_WHITE_KNIGHT]: (pieces, square) => {
    return [];
  },
  [PIECE_BLACK_KNIGHT]: (pieces, square) => {
    return [];
  },
  [PIECE_WHITE_ROOK]: (pieces, square) => {
    return [];
  },
  [PIECE_BLACK_ROOK]: (pieces, square) => {
    return [];
  },

  [PIECE_WHITE_PAWN]: (pieces, square) => {
    return pawnMoves(pieces, square, COLOR_WHITE);
  },
  [PIECE_BLACK_PAWN]: (pieces, square) => {
    return pawnMoves(pieces, square, COLOR_BLACK);
  },
};
