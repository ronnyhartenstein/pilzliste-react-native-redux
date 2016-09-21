import {createStore, combineReducers, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';
// import reducers from './reducers';
import searchReducer from './reducers/search';
import itemsReducer from './reducers/items';

const logger = createLogger();
const createStoreWithMiddleware = applyMiddleware(logger)(createStore);
const reducers = combineReducers([ searchReducer, itemsReducer ]);
const store = createStoreWithMiddleware(reducers);
export default store;
