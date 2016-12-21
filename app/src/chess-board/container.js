import { connect } from 'react-redux'

import ChessBoard from './component';

const mapStateToProps = (state) => {
  return {
    pieces: state.pieces,
  }
}
//
// const mapDispatchToProps = (dispatch) => {
//   return {
//     onTodoClick: (id) => {
//       dispatch(toggleTodo(id))
//     }
//   }
// }

export default connect(mapStateToProps/* , mapDispatchToProps */)(ChessBoard);
