import React, { Component } from 'react'
import { View, StyleSheet, Platform } from 'react-native'
import EnhancedSearch from '../components/EnhancedSearch'

export default class SearchScene extends Component {
    constructor(props) {
        super(props);
    }

  render() {
    return (
        <View style={styles.container}>
            <EnhancedSearch />
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
      marginTop: Platform.OS === 'ios' ? 64 : 54,
      backgroundColor: 'white',
      opacity: 0.7
  }
});
