import React, { Component } from 'react'
import { View, StyleSheet, Platform } from 'react-native'
import Fusszeile from '../components/Fusszeile'
import Sternliste from '../components/Sternliste'

export default class SterlisteScene extends Component {
    constructor(props) {
        super(props);
    }

  render() {
    return (
        <View style={styles.container}>
            <Sternliste />
            <Fusszeile activeTab='gesternt' />
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
