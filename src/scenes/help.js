import React, { Component } from 'react'
import { View, StyleSheet, Platform } from 'react-native'
import { List, ListItem } from 'react-native-elements'
import { Actions } from 'react-native-router-flux';

// Lists: https://github.com/react-native-community/react-native-elements#lists

const links = [
    { name: 'Speisepilze', link: 'https://de.m.wikipedia.org/wiki/Speisepilz' },
    { name: 'Hinweise zum Pilzesammeln', link: 'https://de.m.wikipedia.org/wiki/Wikipedia:Hinweise_zum_Pilzesammeln' }
]

export default class HelpScene extends Component {
    constructor(props) {
        super(props);
    }

  render() {
    return (
        <View style={styles.container}>
            <List containerStyle={{marginBottom: 20}}>
            { links.map((l, i) => (
                <ListItem
                    key={i}
                    title={l.name}
                    onPress={() => this.openLink(l)}
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
      marginTop: 65,
  }
});
