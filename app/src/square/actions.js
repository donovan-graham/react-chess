export const SELECT_SQUARE = 'chess-square/SELECT_SQUARE';
export const MOVE_TO_SQUARE = 'chess-square/MOVE_TO_SQUARE';

export const selectSquare = (square) => ({
  type: SELECT_SQUARE,
  square,
});

export const moveToSquare = (square) => ({
  type: MOVE_TO_SQUARE,
  square,
});
