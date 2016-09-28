import React, { Component } from 'react'
import { ScrollView, View, StyleSheet, Text } from 'react-native'
import escapeUri from '../lib/escapeUri'
import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';

// Text: https://facebook.github.io/react-native/docs/text.html
// Image: https://facebook.github.io/react-native/docs/images.html
// Stylesheet: https://facebook.github.io/react-native/docs/stylesheet.html
// Progress: https://github.com/oblador/react-native-progress
// Image Progress: https://github.com/oblador/react-native-image-progress


class Infozeile extends Component {
  render() {
    if (this.props.text == '' || this.props.text == '.') {
      return <View style={{height:0}} />
    }
    return ( 
      <View style={styles.infozeile}>
        <Text style={styles.zeileLabel}>{this.props.label}</Text>
        <Text style={styles.zeileText}>{this.props.text}</Text>
      </View> 
      )
  }
}

export default class ListeItemDetails extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const item = this.props.item
    const image_uri = 'https://uli.rh-flow.de/pilzbilder/' + escapeUri(item.name) + '.jpg'
    return (
        <View style={styles.details}>
            <Infozeile label='Gattung' text={item.gattung} />
            <Infozeile label='Hut oben' text={item.hut_oben} />
            <Infozeile label='Hut unten' text={item.hut_unten} />
            <Infozeile label='Stiel' text={item.stiel} />
            <Infozeile label='Fleisch' text={item.fleisch} />
            <Infozeile label='Vorkommen' text={item.vorkommen} />
            <Infozeile label='Zeitraum' text={item.zeitraum} />
            <Infozeile label='Bedeutung' text={item.bedeutung} />
            <Infozeile label='Merkmal' text={item.merkmal} />
            <Image 
              style={styles.image} 
              source={{uri: image_uri}}
              indicator={ProgressBar} 
              />
                    
        </View>
    )
  }
}


const styles = StyleSheet.create({
    infozeile: {
      marginLeft: 10,
      marginTop: 5,
      marginBottom: 5,
      marginRight: 10
    },
    zeileLabel: {
      color: 'gray',
      fontSize: 10
    },
    image: {
      // width: 300,
      height: 300,
      margin: 10
    },
    // text {  
    // }
    details: {
      flex: 1,
      // height: 200, 
      backgroundColor: 'bisque'
      // color: 'white'
    }
});
