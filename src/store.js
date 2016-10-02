import {createStore, combineReducers, applyMiddleware} from 'redux';
import React from 'react'
import { Platform } from 'react-native'
// import createLogger from 'redux-logger';
import search from './reducers/search';
import items from './reducers/items';
import numberItems from './reducers/numberItems';
import tab from './reducers/tab';
import _ from 'lodash'
import { loadItem } from './actions/itemActions';

// Logging Redux
// const logger = createLogger();
// const createStoreWithMiddleware = applyMiddleware(logger)(createStore);

import daten from '../daten/pilze.json'
// erstmal nur Name und Lat und 3 wg. Log
// const daten_preload = daten
const daten_preload = _.take(daten, 100)
// const daten_preload = _.filter(daten, itm => /rasling/.test(itm.name))
// console.log("daten preload: ", daten_preload)

// Sortieren und Dubletten entfernen...
daten_preload = _.sortedUniqBy(daten_preload, itm => ( itm.name ))
// ID hinzu
daten_preload = _.map(daten_preload, (itm, idx) => { 
  itm.id = idx+1
  return itm 
}) 
// Favouriten: testweise sternen
daten_preload = _.map(daten_preload, (itm, idx) => {
  itm.stern = idx % 5 == 0 // jeden 20. Pilz = 50 
  return itm 
})


// Image Prefetch
import { thumbnailUri } from './lib/imageUri'
import prefetchImages from './lib/prefetchImages'
// unter Android Fehler "ImagePipelineFactory was not initialized!"
// erstmal deaktiviert bis die URLs alle funktionieren (JPG->jpg, Sonderzeichen)  
// if (Platform.OS === 'ios') {
//   const imageUriList = _.map(daten_preload, (itm) => {
//     return thumbnailUri(itm.name)
//   })
//   prefetchImages(imageUriList)
// }

// beim Laden befüllen..
// http://stackoverflow.com/questions/33749759/read-stores-initial-state-in-redux-reducer#33791942
function reducers(state = {}, action) {
  return {
    search: search(state.search, action),
    items: items(state.items, action),
    numberItems: numberItems(state.numberItems, action),
    tab: tab(state.tab, action)
  };
}
const store = createStore(reducers, { 
  search: '',
  items: daten_preload, 
  numberItems: 0,
  tab: 'liste'
});

export default store;
