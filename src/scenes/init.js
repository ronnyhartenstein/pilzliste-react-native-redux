import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'

export default class InitScene extends Component {
    constructor(props) {
        super(props);
    }

  render() {
    return (
        <View style={styles.container}>
            <Text>Lade Daten..</Text>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
