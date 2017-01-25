import { FEN_START } from '../utils/constants';
import { NEXT_FEN_BOARD } from './actions';

import {
  COLOR_WHITE,
  PIECE_WHITE_KING,
  PIECE_BLACK_KING,
} from '../utils/constants';

import {
  getBoardStateFromFEN,
  getActiveColorFromFEN,
} from '../utils/fen';

import {
  getBoardPosForPiece,
  getMoves,
  getAllMoves,
  getOppositeColor,
  isKingInCheck,
} from '../utils/moves';

import {
  SELECT_SQUARE,
} from '../square/actions';

import {
  MOVE_NEXT_BOARD,
  MOVE_TYPE_PAWN_TWO_STEPS,
} from '../utils/actions';

const startingBoard = getBoardStateFromFEN(FEN_START);
const startingMoves = getAllMoves({ board: startingBoard, color: COLOR_WHITE });

export const initialState = {
  board: startingBoard,
  history: [FEN_START,],
  activeColor: COLOR_WHITE,
  activeKing: PIECE_WHITE_KING,
  activeKingPos: 50,
  activeSquare: null,
  availableMoves: {},
  moves: startingMoves,
  isCheck: false,
  enPassantPos: null,
};

// TODO: the following moves
// whiteKingSideCastle: true
// whiteQquenSideCastle: true
// blackKingSideCastle: true
// blackQueenSideCastle: true
// stalemate ... by repetion

function reducer(state = initialState, action) {
  switch (action.type) {
    case NEXT_FEN_BOARD:
      const nextColor3 = getActiveColorFromFEN(action.fen);
      const board3 = getBoardStateFromFEN(action.fen);

      const king3 = (nextColor3 === COLOR_WHITE) ? PIECE_WHITE_KING : PIECE_BLACK_KING;
      const kingPos3 = getBoardPosForPiece(board3, king3);
      const isCheck3 =  isKingInCheck(board3, nextColor3, kingPos3);

      const nextMoves3 = getAllMoves({ board: board3, color: nextColor3 });

      return {
        ...initialState,
        history: [action.fen],
        board: board3,
        activeColor: nextColor3,
        activeKing: king3,
        activeKingPos: kingPos3,
        activeSquare: null,
        availableMoves: {},
        moves: nextMoves3,
        isCheck: isCheck3,
        enPassantPos: null,
      };

    case SELECT_SQUARE:
      const activeSquare = action.square;
      const availableMoves = getMoves({
        board: state.board,
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

      const king1 = (nextColor1 === COLOR_WHITE) ? PIECE_WHITE_KING : PIECE_BLACK_KING;
      const kingPos1 = getBoardPosForPiece(action.board, king1);
      const isCheck1 =  isKingInCheck(action.board, nextColor1, kingPos1);

      const nextMoves1 = getAllMoves({
        board: action.board,
        color: nextColor1
      });

      return {
        ...state,
        board: action.board,
        activeColor: nextColor1,
        activeKing: king1,
        activeKingPos: kingPos1,
        activeSquare: null,
        availableMoves: {},
        moves: nextMoves1,
        isCheck: isCheck1,
        enPassantPos: null,
      };

    case MOVE_TYPE_PAWN_TWO_STEPS:
      const nextColor2 = getOppositeColor(state.activeColor);

      // pass better state in ...
      const king2 = (nextColor2 === COLOR_WHITE) ? PIECE_WHITE_KING : PIECE_BLACK_KING;
      const kingPos2 = getBoardPosForPiece(action.board, king2);
      const isCheck2 =  isKingInCheck(action.board, nextColor2, kingPos2);
      const nextMoves2 = getAllMoves({
        board: action.board,
        color: nextColor2,
        enPassantPos: action.enPassantPos,
      });

      return {
        ...state,
        board: action.board,
        activeColor: nextColor2,
        activeKing: king2,
        activeKingPos: kingPos2,
        activeSquare: null,
        availableMoves: {},
        moves: nextMoves2,
        isCheck: isCheck2,
        enPassantPos: action.enPassantPos,
      };

    default:
      return state;
  }
}

export default reducer;
