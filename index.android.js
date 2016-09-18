import React, { Component } from 'react'
import { AppRegistry, View, StyleSheet } from 'react-native'
import Fusszeile from './src/Fusszeile'
import Kopfzeile from './src/Kopfzeile'
import Liste from './src/Liste'

class Pilzliste extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Kopfzeile />
        <Liste />
        <Fusszeile />
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

AppRegistry.registerComponent('Pilzliste', () => Pilzliste)
