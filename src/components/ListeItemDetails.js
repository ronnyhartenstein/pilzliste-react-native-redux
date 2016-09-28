import React, { Component } from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'

// Text: https://facebook.github.io/react-native/docs/text.html

export default class ListeItemDetails extends Component {
  constructor(props) {
    super(props);
  }
  render() {
      const item = this.props.item
    return (
        <View style={styles.details}>
            <View><Text>Gattung</Text><Text>{item.gattung}</Text></View>
            <View><Text>Hut oben</Text><Text>{item.hut_oben}</Text></View>
            <View><Text>Hut unten</Text><Text>{item.hut_unten}</Text></View>
            <View><Text>Stiel</Text><Text>{item.stiel}</Text></View>
            <View><Text>Fleisch</Text><Text>{item.fleisch}</Text></View>
            <View><Text>Vorkommen</Text><Text>{item.vorkommen}</Text></View>
            <View><Text>Zeitraum</Text><Text>{item.zeitraum}</Text></View>
            <View><Text>Bedeutung</Text><Text>{item.bedeutung}</Text></View>
            <View><Text>Merkmal</Text><Text>{item.merkmal}</Text></View>
        </View>
    )
  }
}


const styles = StyleSheet.create({
    details: {
      flex: 1,
      height: 200, 
      backgroundColor: 'lightgray'
    }
});
