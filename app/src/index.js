import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import App from './App';
import './index.css';

import { reducer as chessBoardReducer } from './chess-board';

const reducers = {
  chessBoard: chessBoardReducer,
  form: formReducer
}
const reducer = combineReducers(reducers);
const store = createStore(reducer);


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
