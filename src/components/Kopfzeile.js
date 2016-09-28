import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { SearchBar } from 'react-native-elements'
import _ from 'lodash'

// SearchBar: https://github.com/react-native-community/react-native-elements#search-bar
// erweitert TextInput: https://facebook.github.io/react-native/docs/textinput.html
class Kopfzeile extends Component {
  // propTypes = {
  //   doSearch: PropTypes.func.isRequired,
  //   activeSearch: PropTypes.string.isRequired
  // }
  constructor(props) {
    super(props);
  }
  onChange(searchterm) {
    // console.log("suche nach .. ", searchterm, this.props)
    this.props.doSearch(searchterm);
  }
  render() {
    return (
      <View style={styles.kopfzeile}>
          <SearchBar
            lightTheme
            onChangeText={term => this.onChange(term)}
            placeholder='Name? Farbe? Hut? Unterseite? (mind. 3 Zeichen)'
            inputStyle={styles.inputText}
            containerStyle={styles.inputCont}
            value={this.props.activeSearch} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  kopfzeile: {
    height: 55,
    marginTop: 25, 
    backgroundColor: 'white'
  },
  inputText: {
    height: 35,
    color: 'black'
  },
  inputCont: {
    height: 55
  }
});

export default Kopfzeile
