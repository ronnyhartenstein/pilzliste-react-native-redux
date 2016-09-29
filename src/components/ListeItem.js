import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native'
// import { List, ListItem } from 'react-native-elements'
import { LazyloadView } from 'react-native-lazyload';
import { thumbnailUri } from '../lib/imageUri'
import ListeItemDetails from './ListeItemDetails'

// Text: https://facebook.github.io/react-native/docs/text.html
// Lazy load https://github.com/magicismight/react-native-lazyload
// Layout: https://facebook.github.io/react-native/docs/flexbox.html
// Colors: https://facebook.github.io/react-native/docs/colors.html

export default class ListeItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: false
    }
  }
  render() {
    const item = this.props.item
    const image_uri = thumbnailUri(item.name)
    // console.log("image: ", image_uri)
    const viewStyles = [styles.view]
    if (this.state.details) {
        viewStyles.push(styles.viewDetailsAktiv)
    } else {
        viewStyles.push(styles.viewDetailsInaktiv)
    }
    return ( 
        <View style={viewStyles}>
        <TouchableOpacity onPress={() => this.onPressItem()}>
            <LazyloadView
                host="lazyload-list"
            >
                <View style={styles.item}>
                    <Image
                        style={styles.image}
                        source={{uri: image_uri}}
                        // onLoad={() => console.log(item.nr, "loaded: ", item.name)}
                        // onLoadStart={() => console.log("onLoadStart", item.name)}
                        // onLoadEnd={() => console.log("onLoadEnd", item.name)}
                        onError={({nativeEvent: {error}}) => console.log(image_uri, error)}
                        // onProgress={({nativeEvent: {loaded, total}}) => console.log("loading..",loaded,total)}
                    />
                    <View style={styles.name}>
                        <Text style={styles.nameText}>{item.name}</Text>
                        <Text style={styles.latText}>{item.lat}</Text>
                    </View>
                </View>
                <View>
                    {this.state.details ? <ListeItemDetails item={item} show={this.state.details} /> : <Text/>}
                </View>
            </LazyloadView>
        </TouchableOpacity>
        </View>
    )
  }

  onPressItem() {
    this.setState({
      details: !this.state.details
    })
  }
}

const styles = StyleSheet.create({
    view: {
      borderTopWidth: 1,
      borderColor: 'gray',
    //   height: 50
    },
    viewDetailsAktiv: {
        // height: 250,
        backgroundColor: 'burlywood'
    },
    viewDetailsInaktiv: {
        height: 50
    },
    image: {
      width: 30, 
      height: 30,
      marginRight: 10
    },
    item: {
      flex: 1, 
      flexDirection: 'row',
      margin: 10
    },
    // nameText: {
    //   fontSize: 12
    // },
    latText: {
      color: 'gray',
      fontSize: 10
    } 
});