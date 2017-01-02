import { FEN_START } from '../utils/constants';
import { NEXT_FEN_BOARD } from './actions';

import {
  getBoardStateFromFEN,
  getActiveColorFromFEN,
} from '../utils/fen';

import {
  SELECT_SQUARE,
  MOVE_TO_SQUARE,
} from '../square/actions';

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
      return {
        ...state,
        activeSquare: action.square,
        // availableMoves: generateAvaiableMovesFromSquare(action.square),
      };

    case MOVE_TO_SQUARE:
      // swap piece position
      // generate fen for history
      // get active color
      // reset activeSquare, and availableMoves

      return state;

    default:
      return state;
  }
}

export default reducer;
