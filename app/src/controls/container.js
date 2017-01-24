import { connect } from 'react-redux'

import Component from './component';
import { changeView } from './actions';

const mapStateToProps = (state) => {
  return {
    activeColor: state.chessBoard.activeColor,
    isCheckMate: state.chessBoard.isCheckMate,
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
