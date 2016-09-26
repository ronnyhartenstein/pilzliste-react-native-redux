import * as actions from '../actions/actionTypes';

export default function searchReducer (term = "", action = {}) {
  // console.log('reduce search', action)
  switch (action.type) {
    case actions.DO_SEARCH:
      // console.log("SEARCH!", action.term)
      return action.term;
    case actions.CLEAR_SEARCH:
      return null;
    default:
      return term;
  }
}
