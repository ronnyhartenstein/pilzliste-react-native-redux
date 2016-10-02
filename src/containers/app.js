import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import ReduxFusszeile from '../components/ReduxFusszeile'
import ReduxKopfzeile from '../components/ReduxKopfzeile'
import ReduxListe from '../components/ReduxListe'


export default class Pilzliste extends Component {
    constructor(props) {
        super(props);
    }

  render() {
    return (
        <View style={styles.container}>
            <ReduxKopfzeile />
            <ReduxListe />
            <ReduxFusszeile />
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  }
});
