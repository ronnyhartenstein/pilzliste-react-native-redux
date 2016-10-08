import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import ReduxFusszeile from '../components/ReduxFusszeile'
import ReduxKopfzeile from '../components/ReduxKopfzeile'
import ReduxListSwitcher from '../components/ReduxListSwitcher'

export default class ListsScene extends Component {
    constructor(props) {
        super(props);
    }

  render() {
    return (
        <View style={styles.container}>
            <ReduxKopfzeile />
            <ReduxListSwitcher />
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
