import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Icon } from 'react-native-elements'
import { Actions } from 'react-native-router-flux';

// Flex Layout: https://facebook.github.io/react-native/docs/flexbox.html
//   alle Props: https://facebook.github.io/react-native/docs/layout-props.html
// Icons: https://github.com/react-native-community/react-native-elements#icons--icon-buttons 
//   Material Icons: https://design.google.com/icons/

export default class Fusszeile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedTab: this.props.activeTab,
      numberItems: this.props.numberItems
    }
  }
  // kein Neubau der Komponente bei Änderung
  // sondern per Props-Änderung 
  // https://github.com/reactjs/redux/issues/683
  componentWillReceiveProps (nextProps) {
    this.setState({
      selectedTab: nextProps.activeTab,
      numberItems: nextProps.numberItems
    })
  }

  render() {
    const { numberItems, selectedTab } = this.state
    const colActive = '#f50'
    const colInactive = 'gray'
    // console.log('render Fusszeile', selectedTab)
    return (
      <View style={styles.container}>
        <View style={styles.iconRow}>
          <Icon
            iconStyle={styleIcon}
            name='view-list'
            color={selectedTab === 'liste' ? colActive : colInactive}
            onPress={() => this.changeTab('liste')} />
          <Icon
            iconStyle={styleIcon}
            name='view-module'
            color={selectedTab === 'galerie' ? colActive : colInactive}
            onPress={() => this.changeTab('galerie')} />
          <Icon
            iconStyle={styleIcon}
            name='star'
            color={selectedTab === 'gesternt' ? colActive : colInactive}
            onPress={() => this.changeTab('gesternt')} />
          <Icon
            iconStyle={styleIcon}
            name='help-outline'
            color={colInactive}
            onPress={Actions.help} />
          <Icon
            iconStyle={styleIcon}
            name='error-outline'
            color={colInactive}
            onPress={() => Actions.error('Beispiel für eine Fehlermeldung')} />

          <Text style={styles.treffer}>{numberItems} Pilze</Text>
        </View>
      </View>
    )
  }

  changeTab(selectedTab) {
    // console.log("Tab", selectedTab)
    // this.setState({selectedTab})
    this.props.switchTab(selectedTab)
  }
}

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
  }
});
