import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { SearchBar } from 'react-native-elements'
import _ from 'lodash'
import { Icon } from 'react-native-elements'
import { Actions } from 'react-native-router-flux';

// SearchBar: https://github.com/react-native-community/react-native-elements#search-bar
// erweitert TextInput: https://facebook.github.io/react-native/docs/textinput.html
// Debounce: http://stackoverflow.com/questions/23123138/perform-debounce-in-react-js

// Icons: https://github.com/react-native-community/react-native-elements#icons--icon-buttons 
//   Material Icons: https://design.google.com/icons/

export default class Kopfzeile extends Component {
  constructor(props) {
    super(props); 
    this.state = {
      activeSearch: this.props.activeSearch
    }
  }
  componentWillMount() {
    this.doSearch = _.debounce(this.doSearch, 300)
  }
  onChange(term) {
    this.setState({ activeSearch: term })
    this.doSearch(term)
  }
  doSearch(term) {
    this.props.doSearch(term);      
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <SearchBar
            lightTheme
            onChangeText={(term) => this.onChange(term)}
            placeholder='Name? Farbe? Hut? Unterseite? (mind. 3 Zeichen)'
            inputStyle={styles.inputText}
            containerStyle={styles.inputCont}
            value={this.state.searchterm} />
          <Icon
            iconStyle={styleIcon}
            name='details'
            color='darkgray'
            onPress={Actions.search} />
        </View>
      </View>
    )
  }
}

const styleIcon = {
    flex: 0.2,
    margin: 10,
    height: 55,
}

const styles = StyleSheet.create({
  container: {
    height: 55,
    backgroundColor: 'white',
  },
  row: {
    flex: 1,
    flexDirection: 'row'
  },
  inputText: {
    height: 35,
    color: 'black',
    backgroundColor: 'white'
  },
  inputCont: {
    height: 55,
    backgroundColor: '#EFEFF2',
    flex: 1
  },
});
