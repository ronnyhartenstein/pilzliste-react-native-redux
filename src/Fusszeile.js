import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button } from 'react-native-elements'

class Fusszeile extends Component {
  render() {
    return (
      <View style={style.fusszeile}>
          <Text>Menüicons...</Text>
          <Button
            raised
            icon={{name: 'cached'}}
            title='RAISED WITH ICON' />
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
