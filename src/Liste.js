import React, { Component } from 'react'
import { View, ListView, StyleSheet } from 'react-native'

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
      <View style={style.liste}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Text>{rowData.name}</Text>}
        />
      </View>
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
