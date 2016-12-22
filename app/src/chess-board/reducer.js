import { FEN_START } from '../utils/constants';
import { NEXT_FEN_BOARD } from './actions';

import {
  getBoardStateFromFEN,
  getActiveColorFromFEN,
} from '../utils/fen';

export const initalState = {
  pieces: getBoardStateFromFEN(FEN_START),
  history: [FEN_START,],
  activeColor: getActiveColorFromFEN(FEN_START),
}

function reducer(state = initalState, action) {
  switch (action.type) {
    case NEXT_FEN_BOARD:
      return {
        pieces: getBoardStateFromFEN(action.fen),
        history: [...state.history, action.fen],
        activeColor: getActiveColorFromFEN(action.fen),
      }
    default:
      return state;
  }
}

export default reducer;
