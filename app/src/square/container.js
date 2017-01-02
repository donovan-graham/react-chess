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
  const startingSquare = squareKey(rank, file);

  return {
    onSelectSquare: () => {
      console.log("selectSquare:", startingSquare);
      dispatch(selectSquare(startingSquare));
    },
    onMoveToSquare: (endingSquare) => {
      console.log("moveToSquare:", startingSquare, endingSquare);
      dispatch(moveToSquare(startingSquare, endingSquare));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
