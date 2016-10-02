import * as actions from '../actions/actionTypes';

export default function numberItemsReducer (number = 0, action = {}) {
  switch (action.type) {
    case actions.NUMBER_ITEMS:
      return action.number;
    default:
      return number;
  }
}
