import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { SearchBar } from 'react-native-elements'

// SearchBar: https://github.com/react-native-community/react-native-elements#search-bar
// erweitert TextInput: https://facebook.github.io/react-native/docs/textinput.html
class Kopfzeile extends Component {
  // propTypes = {
  //   doSearch: PropTypes.func.isRequired,
  //   activeSearch: PropTypes.string.isRequired
  // }
  constructor(props) {
    super(props);
    // console.log("Kopfzeile const", props)
  }
  onChange(searchterm) {
    // console.log("suche nach .. ", searchterm, this.props)
    this.props.doSearch(searchterm);
  }
  render() {
    // console.log("Kopf render", this.props)
    return (
      <View style={styles.kopfzeile}>
          <SearchBar
            lightTheme
            onChangeText={term => this.onChange(term)}
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
  },
  // input: {
  //   height: 30, 
  //   borderColor: 'gray', 
  //   borderWidth: 1,
  //   backgroundColor: 'white'
  // }
});

export default Kopfzeile
