import React, { Component } from 'react'
import { View, StyleSheet, Platform } from 'react-native'
import Fusszeile from '../components/Fusszeile'
import Kopfzeile from '../components/Kopfzeile'
import Liste from '../components/Liste'

export default class ListeScene extends Component {
    constructor(props) {
        super(props);
    }

  render() {
    return (
        <View style={styles.container}>
            <Kopfzeile />
            <Liste />
            <Fusszeile activeTab='liste' />
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
