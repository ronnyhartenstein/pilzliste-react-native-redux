import React, { Component } from 'react'
import { View, StyleSheet, Platform } from 'react-native'
import { List, ListItem } from 'react-native-elements'

// Test: List Grid
// http://stackoverflow.com/questions/29394297/listview-grid-in-react-native#29395686
// https://github.com/yelled3/react-native-grid-example

export default class TestsScene extends Component {
    constructor(props) {
        super(props);
    }

  render() {
    return (
        <View style={styles.container}>
            ?
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
      marginTop: Platform.OS === 'ios' ? 64 : 54,
  }
});
