import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
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
      backgroundColor: 'yellow',
      marginTop: 65
  }
});
