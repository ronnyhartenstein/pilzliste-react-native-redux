import React, { Component } from 'react'
import Liste from './Liste'
import { connect } from 'react-redux'
// import FuzzySearch from 'fuzzy-search'
import _ from 'lodash'

// Memoized Selectors -> http://redux.js.org/docs/recipes/ComputingDerivedData.html

const getVisibleItems = (items, search) => {
  if (_.isEmpty(search) || search.length < 3) {
    return { filteredItems: items }
  } else {
    const r = new RegExp(search, 'i')
    const filtered = _.filter(items, itm => ( r.test(itm.name) || r.test(itm.lat) ))
    console.log("Filtered: ", filtered)
    return filtered
  }
}

const mapStateToProps = (state) => {
  return {
    filteredItems: getVisibleItems(state.items, state.search)
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
