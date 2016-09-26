import {createStore, combineReducers, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';
// import reducers from './reducers';
import search from './reducers/search';
import items from './reducers/items';
import _ from 'lodash'
import { loadItem } from './actions/itemActions';

const logger = createLogger();
const createStoreWithMiddleware = applyMiddleware(logger)(createStore);

import daten from '../daten/pilze.json'
// erstmal nur Name und Lat und 3 wg. Log
// const daten_preload = _.map(_.take(daten, 10000), itm => ( { name: itm.name, lat: itm.lat } ))
// console.log("daten preload: ", daten_preload)

// beim Laden befüllen..
// http://stackoverflow.com/questions/33749759/read-stores-initial-state-in-redux-reducer#33791942
function reducers(state = {}, action) {
  return {
    search: search(state.search, action),
    items: items(state.items, action)
  };
}
const store = createStore(reducers, { items: daten });

export default store;
