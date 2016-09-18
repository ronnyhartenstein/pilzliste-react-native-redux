import React, { Component } from 'react'
import { View, ScrollView, ListView, StyleSheet, Text } from 'react-native'
import { List, ListItem } from 'react-native-elements'

import daten from '../daten/pilze.json'

class Liste extends Component {
  constructor(props) {
    super(props);
    // const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    // this.state = {
    //   dataSource: ds.cloneWithRows(daten)
    // };
  }
  render() {
    return (
      <ScrollView style={styles.liste}>
        <List containerStyle={{marginBottom: 20}}>
            {
                daten.map((l, i) => (
                    <ListItem
                        key={i}
                        title={l.name}
                    />
                ))
            }
        </List>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  liste: {
    flex: 1, 
    //backgroundColor: 'skyblue',
    //marginTop: 0,
    //paddingTop: 0
  }
});

export default Liste
