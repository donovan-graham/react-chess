import { FEN_START } from '../utils/constants';
import { NEXT_FEN_BOARD } from './actions';

import {
  COLOR_WHITE,
  COLOR_BLACK,
  PIECE_WHITE_QUEEN,
  PIECE_BLACK_QUEEN,
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
} from '../square/actions';

import {
  MOVE_TYPE_STANDARD,
  MOVE_TYPE_PAWN_EN_PASSANT,
  MOVE_TYPE_PAWN_PROMOTION,
} from '../utils/actions';




function getMoves(board, pos) {
  const piece = board[pos];
  return PIECE_TO_MOVES_MAP[piece](pos, board);
}


export const initalState = {
  pieces: getBoardStateFromFEN(FEN_START),
  history: [FEN_START,],
  activeColor: getActiveColorFromFEN(FEN_START),
  activeSquare: null,
  availableMoves: {},
  enPassantPos: null,
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
      const availableMoves = getMoves(state.pieces, activeSquare);
      return {
        ...state,
        activeSquare,
        availableMoves,
      };

    case MOVE_TYPE_STANDARD:
    case MOVE_TYPE_PAWN_EN_PASSANT:
    case MOVE_TYPE_PAWN_PROMOTION:
      // TODO: SPLIT MOVES In A Move Reducers

      // DONE - swap piece position
      // DONE - get active color
      // DONE - reset activeSquare, and availableMoves
      // generate fen for history
      let piece = state.pieces[action.fromPos];

      if (action.type === MOVE_TYPE_PAWN_PROMOTION && state.activeColor === COLOR_WHITE) {
        piece = PIECE_WHITE_QUEEN;
      }
      if (action.type === MOVE_TYPE_PAWN_PROMOTION && state.activeColor === COLOR_BLACK) {
        piece = PIECE_BLACK_QUEEN;
      }

      const nextBoard = {
        ...state.pieces,
        [action.toPos]: piece,
        [action.fromPos]: null,
      };


      if (action.type === MOVE_TYPE_PAWN_EN_PASSANT && state.activeColor === COLOR_WHITE) {
        nextBoard[action.toPos - 1] = null;
      }
      if (action.type === MOVE_TYPE_PAWN_EN_PASSANT && state.activeColor === COLOR_BLACK) {
        nextBoard[action.toPos + 1] = null;
      }

      const nextColor = (state.activeColor === COLOR_WHITE) ? COLOR_BLACK : COLOR_WHITE;

      return {
        ...state,
        pieces: nextBoard,
        activeColor: nextColor,
        activeSquare: null,
        availableMoves: {},
        enPassantPos: null,
      };

    default:
      return state;
  }
}

export default reducer;
