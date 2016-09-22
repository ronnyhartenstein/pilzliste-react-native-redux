import * as actions from '../actions/actionTypes';
import _ from 'lodash';

export default function itemsReducer (items = [], action = {}) {
  switch (action.type) {
    case actions.LOAD:
      // console.log("LOAD ", action)
      return [
        ...items,
        Object.assign({}, action.item)
      ];
    case actions.CREATE:
      const nr = parseInt(_.maxBy(items, n => ( n.nr )) + 1);
      return [
        ...items,
        Object.assign({}, action.item, { nr })
      ];
    case actions.UPDATE:
      var index = _.findIndex(items, (item) => item.nr === action.item.nr);
      if (index === -1) {
        return items;
      }
      return [
        ...items.slice(0, index),
        Object.assign({}, action.item),
        ...items.slice(index + 1)
      ];
    case actions.DELETE:
      var index = _.findIndex(items, (item) => item.nr === action.nr);
      if (index === -1) {
        return items;
      }
      return [
        ...items.slice(0, index),
        ...items.slice(index + 1)
      ];
    default:
      return items;
  }
}
