import {
  COLOR_WHITE,
  COLOR_BLACK,
} from '../utils/constants';

import {
  CHANGE_VIEW
} from './actions';

export const initialState = {
  view: COLOR_WHITE
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_VIEW:
      return {
        ...state,
        view: (state.view === COLOR_WHITE) ? COLOR_BLACK : COLOR_WHITE,
      };
    default:
      return state;
  }
}

export default reducer;
