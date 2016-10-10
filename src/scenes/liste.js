import React, { Component } from 'react'
import { View, StyleSheet, Platform } from 'react-native'
import ReduxFusszeile from '../components/ReduxFusszeile'
import ReduxKopfzeile from '../components/ReduxKopfzeile'
import ReduxListe from '../components/ReduxListe'

export default class ListeScene extends Component {
    constructor(props) {
        super(props);
    }

  render() {
    return (
        <View style={styles.container}>
            <ReduxKopfzeile />
            <ReduxListe />
            <ReduxFusszeile activeTab='liste' />
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'ios' ? 25 : 0,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  }
});
