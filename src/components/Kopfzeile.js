import React, { Component } from 'react'
import { View, StyleSheet, Platform } from 'react-native'
import { SearchBar } from 'react-native-elements'
import _ from 'lodash'

// SearchBar: https://github.com/react-native-community/react-native-elements#search-bar
// erweitert TextInput: https://facebook.github.io/react-native/docs/textinput.html
// Debounce: http://stackoverflow.com/questions/23123138/perform-debounce-in-react-js

class Kopfzeile extends Component {
  // propTypes = {
  //   doSearch: PropTypes.func.isRequired,
  //   activeSearch: PropTypes.string.isRequired
  // }
  constructor(props) {
    super(props); 
    this.state = {
      activeSearch: this.props.activeSearch
    }
  }
  componentWillMount() {
    this.doSearch = _.debounce(this.doSearch, 1000)
  }
  onChange(term) {
    this.setState({ activeSearch: term })
    this.doSearch(term)
  }
  doSearch(term) {
    // console.log("suche nach .. ", term, this.props)
    this.props.doSearch(term);      
  }
  render() {
    return (
      <View style={styles.kopfzeile}>
          <SearchBar
            lightTheme
            onChangeText={(term) => this.onChange(term)}
            placeholder='Name? Farbe? Hut? Unterseite? (mind. 3 Zeichen)'
            inputStyle={styles.inputText}
            containerStyle={styles.inputCont}
            value={this.state.searchterm} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  kopfzeile: {
    height: 55,
    marginTop: Platform.OS === 'ios' ? 25 : 0, 
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
