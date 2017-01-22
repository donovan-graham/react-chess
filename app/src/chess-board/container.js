import { connect } from 'react-redux'

import Component from './component';

const mapStateToProps = (state) => {
  return {
    view: state.controls.view,
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

export default connect(mapStateToProps/* , mapDispatchToProps */)(Component);
