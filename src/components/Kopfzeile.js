import React, { Component } from 'react'
import { View, StyleSheet, TouchableHighlight, TextInput, Text, Button } from 'react-native'
// import { SearchBar } from 'react-native-elements'
import _ from 'lodash'
// import { Icon } from 'react-native-elements'
import { Actions } from 'react-native-router-flux';
import { doSearch } from '../actions/searchActions'
import { connect } from 'react-redux'

// SearchBar: https://github.com/react-native-community/react-native-elements#search-bar
// erweitert TextInput: https://facebook.github.io/react-native/docs/textinput.html
// Debounce: http://stackoverflow.com/questions/23123138/perform-debounce-in-react-js

// Icons: https://github.com/react-native-community/react-native-elements#icons--icon-buttons
//   Material Icons: https://design.google.com/icons/

const styleIcon = {
    flex: 0.2,
    margin: 10,
    height: 55,
}

const styles = StyleSheet.create({
    container: {
        height: 55,
        backgroundColor: '#EFEFF2',
        padding: 10,
    },
    row: {
        flex: 1,
        flexDirection: 'row'
    },
    inputCont: {
        // height: 55,
        backgroundColor: 'white',
        borderRadius: 10,
        paddingLeft: 10,
        paddingRight: 10,
        flex: 1
    },
    inputText: {
        height: 35,
        color: 'black',
    },
    button: {
        width: 30,
        height: 55,
        backgroundColor: 'red',
    },
});

class Kopfzeile extends Component {
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
    if (term.length < 3) term = ''
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
            {/*<SearchBar
            lightTheme
            onChangeText={(term) => this.onChange(term)}
            placeholder='Name? Farbe? Hut? Unterseite? (mind. 3 Zeichen)'
            inputStyle={styles.inputText}
            containerStyle={styles.inputCont}
            value={this.state.searchterm} />*/}
          <View style={styles.inputCont}>
            <TextInput
              style={styles.inputText}
              onChangeText={term => this.onChange(term)}
              placeholder='Name? Farbe? Hut? Unterseite? (mind. 3 Zeichen)'
              value={this.state.searchterm}
              />
          </View>
          {/*<Button onPress={Actions.search} style={styles.button} title={"Suchen"}>*/}
          {/*<Icon
            iconStyle={styleIcon}
            name='details'
            color='darkgray'
            onPress={Actions.search} />*/}
        </View>
      </View>
    )
  }
}


const mapStateToProps = (state) => {
    return {
        activeSearch: state.search
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        doSearch: (term) => {
            dispatch(doSearch(term))
        }
    }
}

const ReduxKopfzeile = connect(
    mapStateToProps,
    mapDispatchToProps
)(Kopfzeile)

export default ReduxKopfzeile