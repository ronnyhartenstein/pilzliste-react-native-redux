import React, { Component } from 'react'
import Sternliste from './Sternliste'
import { updateNumberItems, setStar, unsetStar } from '../actions/itemActions'
import { connect } from 'react-redux'
import getStaredItems from '../selectors/staredItems'  
import _ from 'lodash'

const mapStateToProps = (state) => {
  return {
    staredItems: getStaredItems(state)
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
    unsetStar: (item) => {
      dispatch(unsetStar(item.id))
    }
  }
}

const ReduxSternliste = connect(
  mapStateToProps,
  mapDispatchToProps
)(Sternliste);

export default ReduxSternliste
