import * as actions from '../actions/actionTypes';

export default function searchReducer (term = "", action = {}) {
  switch (action.type) {
    case actions.DO_SEARCH:
      return term;
    case actions.CLEAR_SEARCH:
      return null;
    default:
      return term;
  }
}
