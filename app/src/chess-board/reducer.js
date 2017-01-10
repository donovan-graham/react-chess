import { FEN_START } from '../utils/constants';
import { NEXT_FEN_BOARD } from './actions';

import {
  COLOR_WHITE,
  COLOR_BLACK,
} from '../utils/constants';

import {
  getBoardStateFromFEN,
  getActiveColorFromFEN,
} from '../utils/fen';

import {
  PIECE_TO_MOVES_MAP,
} from '../utils/moves';

import {
  SELECT_SQUARE,
  MOVE_TO_SQUARE,
} from '../square/actions';


function generateAvaiableMovesFromSquare(pieces, square) {
  const piece = pieces[square];
  return PIECE_TO_MOVES_MAP[piece](pieces, square);
}


export const initalState = {
  pieces: getBoardStateFromFEN(FEN_START),
  history: [FEN_START,],
  activeColor: getActiveColorFromFEN(FEN_START),
  activeSquare: null,
  availableMoves: [],
};

function reducer(state = initalState, action) {
  switch (action.type) {
    case NEXT_FEN_BOARD:
      return {
        ...initalState,
        pieces: getBoardStateFromFEN(action.fen),
        history: [...state.history, action.fen],
        activeColor: getActiveColorFromFEN(action.fen),
      };

    case SELECT_SQUARE:
      const activeSquare = action.square;
      const availableMoves = generateAvaiableMovesFromSquare(state.pieces, activeSquare);
      return {
        ...state,
        activeSquare,
        availableMoves,
      };

    case MOVE_TO_SQUARE:
      // DONE - swap piece position
      // DONE - get active color
      // DONE - reset activeSquare, and availableMoves
      // generate fen for history

      const nextPieces = { ...state.pieces };
      const piece = state.pieces[state.activeSquare];
      delete nextPieces[state.activeSquare];
      nextPieces[action.square] = piece;

      const nextColor = (state.activeColor === COLOR_WHITE) ? COLOR_BLACK : COLOR_WHITE;

      return {
        ...state,
        pieces: nextPieces,
        activeColor: nextColor,
        activeSquare: null,
        availableMoves: [],
      };

    default:
      return state;
  }
}

export default reducer;
