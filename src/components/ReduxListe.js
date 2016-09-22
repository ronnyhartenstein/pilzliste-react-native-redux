import React, { Component } from 'react'
import Liste from './Liste'
import { connect } from 'react-redux'
// import FuzzySearch from 'fuzzy-search'
import _ from 'lodash'

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
//   console.log("INIT Liste Redux", state)
  return {
    items: _.isEmpty(state.search) || state.search.length < 3 ? state.items : searchengine().search(state.search)
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
