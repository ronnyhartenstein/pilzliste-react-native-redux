import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'
import { Actions } from 'react-native-router-flux';

// Lists: https://github.com/react-native-community/react-native-elements#lists

const links = [
    { name: 'Speisepilze', link: 'https://de.m.wikipedia.org/wiki/Speisepilz' },
    { name: 'Hinweise zum Pilzesammeln', link: 'https://de.m.wikipedia.org/wiki/Wikipedia:Hinweise_zum_Pilzesammeln' }
]
const demos = [
    { name: 'Fehlermeldung', callback: () => Actions.error('Beispiel für eine Fehlermeldung') },
]

export default class HelpScene extends Component {
    constructor(props) {
        super(props);
    }

  render() {
    return (
        <View style={styles.container}>
            <FlatList containerStyle={styles.list}
                data={links}
                renderItem={({item}) => <ListItem title={item.name} onPress={() => this.openLink(item)}/> }
            />
            <Text style={styles.sectionHead}>Demos</Text>
            <FlatList containerStyle={styles.list}
                      data={demo}
                      renderItem={({item}) => <ListItem title={item.name} onPress={item.callback}/> }
            />
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
