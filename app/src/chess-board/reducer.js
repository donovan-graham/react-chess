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
  getAllMoves,
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
  moves: {},
  isCheckMate: false,
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
      const nextColor1 = getOppositeColor(state.activeColor);
      const nextMoves1 = getAllMoves({ board: action.board, color: nextColor1});
      const isCheckMate1 = Object.keys(nextMoves1).length === 0;
      return {
        ...state,
        pieces: action.board,
        activeColor: nextColor1,
        activeSquare: null,
        availableMoves: {},
        moves: nextMoves1,
        isCheckMate: isCheckMate1,
        enPassantPos: null,
      };

    case MOVE_TYPE_PAWN_TWO_STEPS:
      const nextColor2 = getOppositeColor(state.activeColor);
      const nextMoves2 = getAllMoves({ board: action.board, color: nextColor2});
      const isCheckMate2 = Object.keys(nextMoves2).length === 0;

      return {
        ...state,
        pieces: action.board,
        activeColor: nextColor2,
        activeSquare: null,
        availableMoves: {},
        moves: nextMoves2,
        isCheckMate: isCheckMate2,
        enPassantPos: action.enPassantPos,
      };

    default:
      return state;
  }
}

export default reducer;
