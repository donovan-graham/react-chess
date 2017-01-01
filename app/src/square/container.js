import { connect } from 'react-redux'

import { selectSquare, moveToSquare } from './actions';
import Component from './component';
import { squareKey } from './utils';

const mapStateToProps = (state) => {
  return {
    pieces: state.chessBoard.pieces,
    activeColor: state.chessBoard.activeColor,
    activeSquare: state.chessBoard.activeSquare,
    availableMoves: ['d3', 'd4'],
  };
};

const mapDispatchToProps = (dispatch, { rank, file }) => {
  const square = squareKey(rank, file);

  return {
    onSelectSquare: (square) => {
      console.log("selectSquare:", square);
      dispatch(selectSquare(square));
    },
    onMoveToSquare: (square) => {
      console.log("moveToSquare:", square);
      dispatch(moveToSquare(square));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
