import React, { Component } from 'react'
import ListSwitcher from './ListSwitcher'
import { connect } from 'react-redux'
import _ from 'lodash'


const mapStateToProps = (state) => {
  return {
    activeTab: state.tab
  } 
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

const ReduxListSwitcher = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListSwitcher);

export default ReduxListSwitcher
