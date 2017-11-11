import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
// import { Icon } from 'react-native-elements'
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux'

// Flex Layout: https://facebook.github.io/react-native/docs/flexbox.html
//   alle Props: https://facebook.github.io/react-native/docs/layout-props.html
// Icons: https://github.com/react-native-community/react-native-elements#icons--icon-buttons 
//   Material Icons: https://design.google.com/icons/

const styleIcon = {
    margin: 5,
    marginLeft: 10,
    marginRight: 10
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        backgroundColor: 'oldlace',
        borderTopWidth: 1,
        borderColor: 'olive'
    },
    iconRow: {
        flex: 1,
        flexDirection: 'row',
    },
    treffer: {
        color: 'gray',
        flex: 1,
        textAlign: 'right',
        marginTop: 15,
        marginRight: 10
    },
    icon: {
      margin: 10,
      marginTop: 15,
    }
});

class Fusszeile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      numberItems: this.props.numberItems
    }
  }
  // kein Neubau der Komponente bei Änderung
  // sondern per Props-Änderung 
  // https://github.com/reactjs/redux/issues/683
  componentWillReceiveProps (nextProps) {
    this.setState({
      numberItems: nextProps.numberItems
    })
  }

  render() {
    const { numberItems } = this.state
    const { activeTab } = this.props
    const colActive = '#f50'
    const colInactive = 'gray'
    // console.log('render Fusszeile', activeTab)
    return (
      <View style={styles.container}>
        <View style={styles.iconRow}>
          {/*<Icon
            iconStyle={styleIcon}
            name='view-list'
            color={activeTab === 'liste' ? colActive : colInactive}
            onPress={() => Actions.liste()} />*/}
          <TouchableOpacity style={styles.icon} onPress={() => Actions.liste()}>
            <Text style={{color: activeTab === 'liste' ? colActive : colInactive}}>Liste</Text>
          </TouchableOpacity>
          {/*<Icon
            iconStyle={styleIcon}
            name='view-module'
            color={activeTab === 'galerie' ? colActive : colInactive}
            onPress={() => Actions.galerie()} />*/}
          <TouchableOpacity style={styles.icon} onPress={() => Actions.galerie()}>
            <Text style={{color: activeTab === 'galerie' ? colActive : colInactive}}>Galerie</Text>
          </TouchableOpacity>
          {/*<Icon
            iconStyle={styleIcon}
            name='star'
            color={activeTab === 'gesternt' ? colActive : colInactive}
            onPress={() => Actions.sternliste()} />*/}
          <TouchableOpacity style={styles.icon} onPress={() => Actions.sternliste()}>
            <Text style={{color: activeTab === 'gesternt' ? colActive : colInactive}}>Sterne</Text>
          </TouchableOpacity>
          {/*<Icon
            iconStyle={styleIcon}
            name='help-outline'
            color={colInactive}
            onPress={Actions.help} />*/}
          <TouchableOpacity style={styles.icon} onPress={() => Actions.help()}>
            <Text style={{color: colInactive}}>Hilfe</Text>
          </TouchableOpacity>

          <Text style={styles.treffer}>{numberItems} Pilze</Text>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        numberItems: state.numberItems,
        routes: state.routes
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

const ReduxFusszeile = connect(
    mapStateToProps,
    mapDispatchToProps
)(Fusszeile)

export default ReduxFusszeile