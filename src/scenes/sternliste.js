import React, { Component } from 'react'
import { View, StyleSheet, Platform } from 'react-native'
import ReduxFusszeile from '../components/ReduxFusszeile'
import ReduxSternliste from '../components/ReduxSternliste'

export default class SterlisteScene extends Component {
    constructor(props) {
        super(props);
    }

  render() {
    return (
        <View style={styles.container}>
            <ReduxSternliste />
            <ReduxFusszeile activeTab='gesternt' />
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
