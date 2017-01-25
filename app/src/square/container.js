import { connect } from 'react-redux'

import { selectSquare } from './actions'
import Component from './component';

const mapStateToProps = (state) => {
  return {
    board: state.chessBoard.board,
    activeColor: state.chessBoard.activeColor,
    activePos: state.chessBoard.activeSquare,
    availableMoves: state.chessBoard.availableMoves,
    moves: state.chessBoard.moves,
  };
};

const mapDispatchToProps = (dispatch, { pos }) => {
  return {
    onSelect: () => {
      const action = selectSquare(pos);
      dispatch(action);
    },
    onMove: (moveAction) => {
      dispatch(moveAction);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
