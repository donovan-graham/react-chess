export const SELECT_SQUARE = 'SELECT_SQUARE';
export const MOVE_TO_SQUARE = 'MOVE_TO_SQUARE';

export const selectSquare = (square) => ({
  type: SELECT_SQUARE,
  square,
});

export const moveToSquare = (square) => ({
  type: MOVE_TO_SQUARE,
  square,
});
