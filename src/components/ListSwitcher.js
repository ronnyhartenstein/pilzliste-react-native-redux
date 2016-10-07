import React, { Component } from 'react'
// import { View, StyleSheet } from 'react-native'
import ReduxListe from './ReduxListe'
import ReduxGalerie from './ReduxGalerie'
import ReduxSternliste from './ReduxSternliste'


export default class ListSwitcher extends Component {
    constructor(props) {
        super(props);
    }

  render() {
    switch(this.props.activeTab) {
      case 'galerie': return <ReduxGalerie />
      case 'gesternt': return <ReduxSternliste />
      case 'liste':
      default: return <ReduxListe /> 
    }
  }
}
