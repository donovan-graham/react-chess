export const COLOR_WHITE = 'color/white';
export const COLOR_BLACK = 'color/black';

export const BOARD_FILES = Array.from('abcdefgh');
export const BOARD_RANKS = Array.of(1, 2, 3, 4, 5, 6, 7, 8);

export const FEN_START = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

export const PIECE_WHITE_KING = 'K';
export const PIECE_BLACK_KING = 'k';
export const PIECE_WHITE_QUEEN = 'Q';
export const PIECE_BLACK_QUEEN = 'q';
export const PIECE_WHITE_BISHOP = 'B';
export const PIECE_BLACK_BISHOP = 'b';
export const PIECE_WHITE_KNIGHT = 'N';
export const PIECE_BLACK_KNIGHT = 'n';
export const PIECE_WHITE_ROOK = 'R';
export const PIECE_BLACK_ROOK = 'r';
export const PIECE_WHITE_PAWN = 'P';
export const PIECE_BLACK_PAWN = 'p';

export const SYMBOL_WHITE_KING = '\u2654';
export const SYMBOL_BLACK_KING = '\u265A';
export const SYMBOL_WHITE_QUEEN = '\u2655';
export const SYMBOL_BLACK_QUEEN = '\u265B';
export const SYMBOL_WHITE_BISHOP = '\u2657';
export const SYMBOL_BLACK_BISHOP = '\u265D';
export const SYMBOL_WHITE_KNIGHT = '\u2658';
export const SYMBOL_BLACK_KNIGHT = '\u265E';
export const SYMBOL_WHITE_ROOK = '\u2656';
export const SYMBOL_BLACK_ROOK = '\u265C';
export const SYMBOL_WHITE_PAWN = '\u2659';
export const SYMBOL_BLACK_PAWN = '\u265F';

export const PIECE_TO_SYMBOL_MAP = {
  [PIECE_WHITE_KING]: SYMBOL_WHITE_KING,
  [PIECE_BLACK_KING]: SYMBOL_BLACK_KING,
  [PIECE_WHITE_QUEEN]: SYMBOL_WHITE_QUEEN,
  [PIECE_BLACK_QUEEN]: SYMBOL_BLACK_QUEEN,
  [PIECE_WHITE_BISHOP]: SYMBOL_WHITE_BISHOP,
  [PIECE_BLACK_BISHOP]: SYMBOL_BLACK_BISHOP,
  [PIECE_WHITE_KNIGHT]: SYMBOL_WHITE_KNIGHT,
  [PIECE_BLACK_KNIGHT]: SYMBOL_BLACK_KNIGHT,
  [PIECE_WHITE_ROOK]: SYMBOL_WHITE_ROOK,
  [PIECE_BLACK_ROOK]: SYMBOL_BLACK_ROOK,
  [PIECE_WHITE_PAWN]: SYMBOL_WHITE_PAWN,
  [PIECE_BLACK_PAWN]: SYMBOL_BLACK_PAWN,
};
