import { FEN_START } from '../utils/constants';
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
    default:
      return state;
  }
}

export default reducer;
