import React, { Component } from 'react'
import Liste from './Liste'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import _ from 'lodash'
import fuzzy from 'fuzzy'

// Memoized Selectors: http://redux.js.org/docs/recipes/ComputingDerivedData.html
// Fuzzy Search: https://github.com/mattyork/fuzzy

const getSearch = (state) => state.search
const getItems = (state) => state.items

const getVisibleItems = createSelector(
  [ getSearch, getItems ],
  (search, items) => {
    if (_.isEmpty(search) || search.length < 3) {
      return items
    } else {
      const r = new RegExp(search, 'i')
      const result = fuzzy.filter('bcn', items, { extract: item => (_.join(_.values(item), ' ')) })
      const indexes = _.map(result, res => (res.index))
      const founded = _.filter(items, (itm, idx) => _.indexOf(indexes, idx) !== -1) 
      console.log(indexes.length, "found", founded)
      return founded
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
