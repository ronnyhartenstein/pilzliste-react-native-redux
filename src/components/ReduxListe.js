import React, { Component } from 'react'
import Liste from './Liste'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import _ from 'lodash'

// Memoized Selectors -> http://redux.js.org/docs/recipes/ComputingDerivedData.html

const getSearch = (state) => state.search
const getItems = (state) => state.items

const getVisibleItems = createSelector(
  [ getSearch, getItems ],
  (search, items) => {
    if (_.isEmpty(search) || search.length < 3) {
      return items
    } else {
      const r = new RegExp(search, 'i')
      return _.filter(items, itm => ( 
           r.test(itm.name) 
        || r.test(itm.lat)
        || r.test(itm.gattung)
        || r.test(itm.hut_oben)
        || r.test(itm.hut_unten)
        || r.test(itm.stiel)
        || r.test(itm.fleisch)
        || r.test(itm.vorkommen)
        || r.test(itm.zeitraum)
        || r.test(itm.bedeutung)
        || r.test(itm.merkmal) 
        ))
    }
  }
)

const mapStateToProps = (state) => {
  return {
    filteredItems: getVisibleItems(state)
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
