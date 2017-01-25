import { connect } from 'react-redux'

import Component from './component';
import { changeView } from './actions';

const mapStateToProps = (state) => {
  return {
    activeColor: state.chessBoard.activeColor,
    isCheck: state.chessBoard.isCheck,
    moves: state.chessBoard.moves,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleToggle: () => {
      dispatch(changeView())
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
