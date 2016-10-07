import React, { Component } from 'react'
import Liste from './Liste'
import { updateNumberItems, setStar, unsetStar } from '../actions/itemActions'
import { connect } from 'react-redux'
import getVisibleItems from '../selectors/visibleItems'  
import _ from 'lodash'

const mapStateToProps = (state) => {
  return {
    filteredItems: getVisibleItems(state)
  } 
}

const mapDispatchToProps = (dispatch) => {
  return {
    // onItemClick: (nr) => {
    //   console.log("TODO zeige Details-Szene")
    //   //dispatch(showDetails(nr))
    // },
    // wirkliche Anzahl Ergebnisse in Store für Fusszeile zurückfunken
    updateNumberItems: (number) => {
      dispatch(updateNumberItems(number))
    },
    setStar: (item) => {
      dispatch(setStar(item.id))
    },
    unsetStar: (item) => {
      dispatch(unsetStar(item.id))
    }
  }
}

const ReduxListe = connect(
  mapStateToProps,
  mapDispatchToProps
)(Liste);

export default ReduxListe
