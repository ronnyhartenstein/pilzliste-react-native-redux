import React, { Component } from 'react'
import { doSearch } from '../actions/searchActions'
import Kopfzeile from './Kopfzeile'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  return {
    activeSearch: state.search
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    doSearch: (term) => {
      dispatch(doSearch(term))
    }
  }
}

const ReduxKopfzeile = connect(
  mapStateToProps,
  mapDispatchToProps
)(Kopfzeile)

export default ReduxKopfzeile