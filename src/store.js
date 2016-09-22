import {createStore, combineReducers, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';
// import reducers from './reducers';
import search from './reducers/search';
import items from './reducers/items';
import _ from 'lodash'
import { loadItem } from './actions/itemActions';

import daten from '../daten/pilze.json'

const logger = createLogger();
const createStoreWithMiddleware = applyMiddleware(logger)(createStore);
const reducers = combineReducers({ search, items });
const store = createStoreWithMiddleware(reducers);

// beim Laden befüllen..
_.each(_.take(daten, 10), item => {
    store.dispatch(loadItem(item)) 
});

export default store;
