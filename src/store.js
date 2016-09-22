import {createStore, combineReducers, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';
// import reducers from './reducers';
import searchReducer from './reducers/search';
import itemsReducer from './reducers/items';
import _ from 'lodash'
import { loadItem } from './actions/itemActions';

import daten from '../daten/pilze.json'

const logger = createLogger();
const createStoreWithMiddleware = applyMiddleware(logger)(createStore);
const reducers = combineReducers([ searchReducer, itemsReducer ]);
const store = createStoreWithMiddleware(reducers);

// beim Laden befüllen..
_.each(daten, item => {
    store.dispatch(loadItem(item)) 
});

export default store;
