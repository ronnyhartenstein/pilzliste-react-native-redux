import React, { Component } from 'react'
import { loadItem } from '../actions/itemActions';
import Liste from './Liste'
import { connect } from 'react-redux'
// import FuzzySearch from 'fuzzy-search'
import _ from 'lodash'

// beim Laden befüllen..
import daten from '../../daten/pilze.json'
_.each(daten, item => {
    store.dispatch(loadItem(item)) 
});

const mapStateToProps = (state) => {
  // https://www.npmjs.com/package/fuzzy-search
  // Error "couldn't find preset "es2015" relative to directory.."
//   const searchengine = () => ( new FuzzySearch(_.cloneDeep(state.items), ['name','lat']) );
  const searchengine = () => { 
      return {
          search: (term) => {
            const r = new RegExp(term, 'i')
            return _.filter(state.items, (itm) => ( r.test(itm.name) || r.test(itm.lat) ))
          }
      }
  } 
  return {
    items: _.isEmpty(state.search) ? state.items : searchengine().search(state.search)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onItemClick: (nr) => {
        console.log("TODO zeige Details-Szene")
      //dispatch(showDetails(nr))
    }
  }
}

const ReduxListe = connect(
  mapStateToProps,
  mapDispatchToProps
)(Liste);

export default ReduxListe
