import { connect } from 'react-redux'

import Component from './component';

const mapStateToProps = (state) => {
  return {
    pieces: state.chessBoard.pieces,
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     onTodoClick: (id) => {
//       dispatch(toggleTodo(id))
//     }
//   }
// }

export default connect(mapStateToProps/* , mapDispatchToProps */)(Component);
