import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'
import { List, ListItem } from 'react-native-elements'
import { Actions } from 'react-native-router-flux';

// Lists: https://github.com/react-native-community/react-native-elements#lists

const links = [
    { name: 'Speisepilze', link: 'https://de.m.wikipedia.org/wiki/Speisepilz' },
    { name: 'Hinweise zum Pilzesammeln', link: 'https://de.m.wikipedia.org/wiki/Wikipedia:Hinweise_zum_Pilzesammeln' }
]
const demos = [
    { name: 'Fehlermeldung', callback: () => Actions.error('Beispiel für eine Fehlermeldung') },
    { name: 'Login-Dialog', callback: () => Actions.demo_login() },
    { name: 'Material-Design-Kit', callback: () => Actions.demo_rnmk() }
]

export default class HelpScene extends Component {
    constructor(props) {
        super(props);
    }

  render() {
    return (
        <View style={styles.container}>
            <List containerStyle={styles.list}>
            { links.map((l, i) => (
                <ListItem
                    key={i}
                    title={l.name}
                    onPress={() => this.openLink(l)}
                />
                )) }
            </List>
            <Text style={styles.sectionHead}>Demos</Text>
            <List containerStyle={styles.list}>
            { demos.map((d, i) => (
                <ListItem
                    key={i}
                    title={d.name}
                    onPress={d.callback}
                />
                )) }
            </List>
        </View>
    )
  }

  openLink({ name, link } = item) {
      Actions.webview({ title: name, link })
  }
}

const styles = StyleSheet.create({
  container: {
      marginTop: Platform.OS === 'ios' ? 64 : 54,
  },
  list: {
      marginBottom: 20,
  },
  sectionHead: {
      fontWeight: 'bold',
      marginTop: 10,
      marginLeft: 20
  }
});
