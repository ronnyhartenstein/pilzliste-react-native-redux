import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, SectionList, TouchableOpacity } from 'react-native'
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

  renderSectionHeader(section) {
    // console.log('sectionHeader', section)
    return (
      <View style={styles.section}>
        <Text style={styles.sectionText}>{section.title}</Text>
      </View>
    )
  }

  render() {
    return (
        <View style={styles.container}>
            <SectionList
              renderItem={({item}) => <TouchableOpacity style={styles.item} onPress={() => this.openLink(item)}><Text>{item.name}</Text></TouchableOpacity> }
                renderSectionHeader={({section}) => this.renderSectionHeader(section)}
                sections={[
                  {data: links, title: 'Links'},
                  {data: demos, title: 'Demos'}
                ]}
                style={styles.list}
                keyExtractor={item => item.name}
                ItemSeparatorComponent={() => (<View style={{ height: 1, backgroundColor: '#CCCCCC'}}/>)}
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
  section: {
    backgroundColor: '#F0F0F0'
  },
  sectionText: {
    padding: 5,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  item: {
    padding: 10,
  }
});
