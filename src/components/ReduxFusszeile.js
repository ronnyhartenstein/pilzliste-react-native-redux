import React, { Component } from 'react'
import { switchTab } from '../actions/tabActions'
import Fusszeile from './Fusszeile'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  return {
    activeTab: state.tab,
    numberItems: state.numberItems
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    switchTab: (tab) => {
      dispatch(switchTab(tab))
    }
  }
}

const ReduxFusszeile = connect(
  mapStateToProps,
  mapDispatchToProps
)(Fusszeile)

export default ReduxFusszeile