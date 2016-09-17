/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  ListView,
  TextInput,
  Text,
  View
} from 'react-native';

class PilzeApp extends Component {
  render() {
    return (
      <View style={style.container}>
        <Kopfzeile />
        <Liste />
        <Fusszeile />
      </View>
    )
  }
}

class Kopfzeile extends Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }
  render() {
    return (
      <View style={style.kopfzeile}>
          <TextInput
            style={{height: 40}}
            placeholder="Name? Farbe? Hut? Unterseite?"
            onChangeText={(text) => this.setState({text})}
          />
      </View>
    )
  }
}

class Fusszeile extends Component {
  render() {
    return (
      <View style={style.fusszeile}>
          <Text>Menüicons...</Text>
      </View>
    )
  }
}

class Liste extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([
        'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin'
      ])
    };
  }
  render() {
    return (
      <View style={style.liste}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Text>{rowData}</Text>}
        />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  kopfzeile: {
    height: 50, 
    padding: 10,
    backgroundColor: 'powderblue'
  },
  fusszeile: {
    height: 50, 
    backgroundColor: 'steelblue'
  },
  liste: {
    flex: 1, 
    backgroundColor: 'skyblue',
    paddingTop: 22
  }
});

AppRegistry.registerComponent('Pilzliste', () => PilzeApp);
