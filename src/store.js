import {createStore, combineReducers, applyMiddleware} from 'redux';
// import createLogger from 'redux-logger';
import search from './reducers/search';
import items from './reducers/items';
import _ from 'lodash'
import { loadItem } from './actions/itemActions';

// Logging Redux
// const logger = createLogger();
// const createStoreWithMiddleware = applyMiddleware(logger)(createStore);

import daten from '../daten/pilze.json'
// erstmal nur Name und Lat und 3 wg. Log
// const daten_preload = daten
const daten_preload = _.take(daten, 10)
// console.log("daten preload: ", daten_preload)

// beim Laden befüllen..
// http://stackoverflow.com/questions/33749759/read-stores-initial-state-in-redux-reducer#33791942
function reducers(state = {}, action) {
  return {
    search: search(state.search, action),
    items: items(state.items, action)
  };
}
const store = createStore(reducers, { items: daten_preload });

export default store;
