import React, { Component } from 'react'
import { View, ScrollView, ListView, StyleSheet, Text } from 'react-native'
import { List, ListItem } from 'react-native-elements'

import daten from '../daten/pilze.json'

// https://github.com/react-native-community/React-Native-Elements#lists

class Liste extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(daten)
    };
  }

    renderRow (rowData, sectionID) {
        return (
            <ListItem
                key={sectionID}
                title={rowData.name != "" ? rowData.name : "?"}
                subtitle={rowData.lat != "" ? rowData.lat : "?"}
            />
        )
    }

  render() {
    return (
      <ScrollView style={styles.container}>
        <List style={styles.liste}>
            <ListView
                renderRow={this.renderRow}
                dataSource={this.state.dataSource}
            />
        </List>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
    container: {
    },
  liste: {
    flex: 1, 
    backgroundColor: 'skyblue',
  }
});

export default Liste
