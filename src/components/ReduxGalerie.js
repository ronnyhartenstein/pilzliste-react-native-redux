import React, { Component } from 'react'
import Galerie from './Galerie'
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

const ReduxGalerie = connect(
  mapStateToProps,
  mapDispatchToProps
)(Galerie);

export default ReduxGalerie
