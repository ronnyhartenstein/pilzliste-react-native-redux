import React, { Component } from 'react'
import { View, StyleSheet, Platform } from 'react-native'
import Fusszeile from '../components/Fusszeile'
import Kopfzeile from '../components/Kopfzeile'
import Galerie from '../components/Galerie'

export default class GalerieScene extends Component {
    constructor(props) {
        super(props);
    }

  render() {
    return (
        <View style={styles.container}>
            <Kopfzeile />
            <Galerie />
            <Fusszeile activeTab='galerie' />
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
