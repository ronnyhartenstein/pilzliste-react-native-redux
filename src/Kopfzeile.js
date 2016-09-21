import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { SearchBar } from 'react-native-elements'

class Kopfzeile extends Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }
  render() {
    return (
      <View style={styles.kopfzeile}>
          <SearchBar
            lightTheme
            onChangeText={(text) => this.setState({text})}
            placeholder='Name? Farbe? Hut? Unterseite?' />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  kopfzeile: {
    height: 48,
    marginTop: 30, 
    //padding: 10,
    backgroundColor: 'powderblue'
  }
});

export default Kopfzeile
