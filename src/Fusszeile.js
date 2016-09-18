import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button } from 'react-native-elements'

class Fusszeile extends Component {
  render() {
    return (
      <View style={styles.fusszeile}>
          <Text>Menüicons...</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  fusszeile: {
    height: 50, 
    backgroundColor: 'steelblue'
  }
});

export default Fusszeile
