export const NEXT_FEN_BOARD = 'chess-board/NEXT_FEN_BOARD';

export const nextFenBoard = (fen) => ({
  type: NEXT_FEN_BOARD,
  fen,
});
