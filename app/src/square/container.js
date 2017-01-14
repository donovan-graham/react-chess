import { connect } from 'react-redux'

import { selectSquare } from './actions'
import Component from './component';

const mapStateToProps = (state) => {
  return {
    pieces: state.chessBoard.pieces,
    activeColor: state.chessBoard.activeColor,
    activeSquare: state.chessBoard.activeSquare,
    availableMoves: state.chessBoard.availableMoves,
  };
};

const mapDispatchToProps = (dispatch, { pos }) => {
  return {
    onSelect: () => {
      const action = selectSquare(pos);
      console.log("dispatch:", action);
      dispatch(action);
    },
    onMove: (moveAction) => {
      console.log("dispatch:", moveAction);
      dispatch(moveAction);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
