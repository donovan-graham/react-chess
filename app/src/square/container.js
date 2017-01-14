import { connect } from 'react-redux'

import { selectSquare, moveToSquare } from './actions';
import Component from './component';
// import { squareKey } from './utils';

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
    onSelectSquare: () => {
      console.log("selectSquare:", pos);
      dispatch(selectSquare(pos));
    },
    onMoveToSquare: (endPos) => {
      console.log("moveToSquare:", pos, endPos);
      dispatch(moveToSquare(endPos));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
