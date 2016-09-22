import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { SearchBar } from 'react-native-elements'

// SearchBar: https://github.com/react-native-community/react-native-elements#search-bar
// erweitert TextInput: https://facebook.github.io/react-native/docs/textinput.html
class Kopfzeile extends Component {
  propTypes = {
    doSearch: PropTypes.func.isRequired,
    activeSearch: PropTypes.string.isRequired
  }
  constructor(props) {
    super(props);
  }
  onChange(searchterm) {
    this.props.doSearch(searchterm);
  }
  render() {
    return (
      <View style={styles.kopfzeile}>
          <SearchBar
            lightTheme
            onChangeText={this.onChange}
            placeholder='Name? Farbe? Hut? Unterseite?'
            value={this.props.activeSearch} />
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
