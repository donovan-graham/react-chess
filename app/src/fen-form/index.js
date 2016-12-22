import React from 'react';
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form';
import { nextFenBoard } from '../chess-board/actions';

const fenForm = ({ handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <div>
      <label htmlFor="new_board">New board</label> <br />
      <Field name="new_board" component="input" type="text" size={60}/>
    </div>
    <button type="submit">Submit</button>
  </form>
);

const mapStateToProps = (state) => {
  return {
    initialValues: {
      new_board: state.chessBoard.history[state.chessBoard.history.length - 1],
    },
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (values) => {
      dispatch(nextFenBoard(values.new_board));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'fen' })(fenForm));
