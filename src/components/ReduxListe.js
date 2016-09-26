import React, { Component } from 'react'
import Liste from './Liste'
import { connect } from 'react-redux'
// import FuzzySearch from 'fuzzy-search'
import _ from 'lodash'

const mapStateToProps = (state) => {
  console.log("from state", state)
  // https://www.npmjs.com/package/fuzzy-search
  // Error "couldn't find preset "es2015" relative to directory.."
//   const searchengine = () => ( new FuzzySearch(_.cloneDeep(state.items), ['name','lat']) );
  
//   console.log("INIT Liste Redux", state)
// if (_.isEmpty(state.search) || state.search.length < 3) {
//     return { filteredItems: state.items }
//   } else {
    const r = new RegExp(state.search, 'i')
    const filtered = _.filter(state.items, itm => ( r.test(itm.name) || r.test(itm.lat) ))
    console.log("Filtered: ", filtered)
    return { filteredItems: filtered }
  // }
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
