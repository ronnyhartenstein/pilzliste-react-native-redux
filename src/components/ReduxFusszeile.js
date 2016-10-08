import React, { Component } from 'react'
import Fusszeile from './Fusszeile'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  return {
    numberItems: state.numberItems,
    routes: state.routes
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

const ReduxFusszeile = connect(
  mapStateToProps,
  mapDispatchToProps
)(Fusszeile)

export default ReduxFusszeile