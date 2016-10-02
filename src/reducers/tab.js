import * as actions from '../actions/actionTypes';

export default function tabReducer (tab = 'liste', action = {}) {
  switch (action.type) {
    case actions.SWITCH_TAB:
      return action.tab;
    default:
      return tab;
  }
}
