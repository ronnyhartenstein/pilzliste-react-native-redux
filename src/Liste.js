import React, { Component } from 'react'
import { View, ScrollView, ListView, StyleSheet, Text } from 'react-native'

import daten from '../daten/pilze.json'

class Liste extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(daten)
    };
  }
  render() {
    return (
      <ScrollView style={styles.liste}>
        <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData) => <Text>{rowData.name}</Text>}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  liste: {
    flex: 1, 
    backgroundColor: 'skyblue',
    paddingTop: 22
  }
});

export default Liste
