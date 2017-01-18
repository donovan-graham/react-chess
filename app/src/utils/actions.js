export const MOVE_NEXT_BOARD = 'MOVE_NEXT_BOARD';
export const MOVE_TYPE_STANDARD = 'MOVE_TYPE_STANDARD';
export const MOVE_TYPE_PAWN_EN_PASSANT = 'MOVE_TYPE_PAWN_EN_PASSANT';
export const MOVE_TYPE_PAWN_PROMOTION = 'MOVE_TYPE_PAWN_PROMOTION';


/*
// TO DO: CURRY ALL THE THINGS
export const moveAction = (type, fromPos, toPos) => ({
 type, fromPos, toPos,
});
*/

export const moveNext = (board) => ({
  type: MOVE_NEXT_BOARD,
  board,
});


export const moveStandard = (fromPos, toPos) => ({
  type: MOVE_TYPE_STANDARD,
  fromPos,
  toPos,
});

export const movePawnEnPassant = (fromPos, toPos) => ({
  type: MOVE_TYPE_PAWN_EN_PASSANT,
  fromPos,
  toPos,
});

export const movePawnPromotion = (fromPos, toPos) => ({
  type: MOVE_TYPE_PAWN_PROMOTION,
  fromPos,
  toPos,
});
