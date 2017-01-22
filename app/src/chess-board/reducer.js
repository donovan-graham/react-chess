import { FEN_START } from '../utils/constants';
import { NEXT_FEN_BOARD } from './actions';

import {
  COLOR_WHITE,
} from '../utils/constants';

import {
  getBoardStateFromFEN,
  getActiveColorFromFEN,
} from '../utils/fen';

import {
  getMoves,
  getOppositeColor,
} from '../utils/moves';

import {
  SELECT_SQUARE,
} from '../square/actions';

import {
  MOVE_NEXT_BOARD,
  MOVE_TYPE_PAWN_TWO_STEPS,
} from '../utils/actions';

const startingBoard = getBoardStateFromFEN(FEN_START);

export const initialState = {
  pieces: startingBoard,
  history: [FEN_START,],
  activeColor: COLOR_WHITE,
  activeSquare: null,
  availableMoves: {},
  enPassantPos: null,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case NEXT_FEN_BOARD:
      return {
        ...initialState,
        pieces: getBoardStateFromFEN(action.fen),
        history: [...state.history, action.fen],
        activeColor: getActiveColorFromFEN(action.fen),
      };

    case SELECT_SQUARE:
      const activeSquare = action.square;
      const availableMoves = getMoves({
        board: state.pieces,
        fromPos: activeSquare,
        enPassantPos: state.enPassantPos,
      });
      return {
        ...state,
        activeSquare,
        availableMoves,
      };

    case MOVE_NEXT_BOARD:
      return {
        ...state,
        pieces: action.board,
        activeColor: getOppositeColor(state.activeColor),
        activeSquare: null,
        availableMoves: {},
        enPassantPos: null,
      };

    case MOVE_TYPE_PAWN_TWO_STEPS:
      return {
        ...state,
        pieces: action.board,
        activeColor: getOppositeColor(state.activeColor),
        activeSquare: null,
        availableMoves: {},
        enPassantPos: action.enPassantPos,
      };

    default:
      return state;
  }
}

export default reducer;
