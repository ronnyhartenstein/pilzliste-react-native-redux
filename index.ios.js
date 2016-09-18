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
  kopfzeile: {
    height: 50, 
    padding: 10,
    backgroundColor: 'powderblue'
  }
});

AppRegistry.registerComponent('Pilzliste', () => Pilzliste)
