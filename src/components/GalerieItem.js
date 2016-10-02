import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Image, Dimensions } from 'react-native'
// import { List, ListItem } from 'react-native-elements'
import { LazyloadView } from 'react-native-lazyload'
import { imageUri } from '../lib/imageUri'
// import ListeItemDetails from './ListeItemDetails'

// Text: https://facebook.github.io/react-native/docs/text.html
// Lazy load https://github.com/magicismight/react-native-lazyload
// Layout: https://facebook.github.io/react-native/docs/flexbox.html
// Colors: https://facebook.github.io/react-native/docs/colors.html

// Layout Beispiel Loginscreen: https://github.com/browniefed/react-native-screens
//   Code: https://github.com/browniefed/react-native-screens/blob/master/app/screens/login/login1.js

export default class GalerieItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: false
    }
  }
  render() {
    const item = this.props.item
    const image_uri = imageUri(item.name)
    // console.log("image: ", image_uri)

    const viewStyles = [styles.view]
    // if (this.state.details) {
    //     viewStyles.push(styles.viewDetailsAktiv)
    // } else {
    //     viewStyles.push(styles.viewDetailsInaktiv)
    // }
    
    const { height, width } = Dimensions.get('window');
    const imgContainerWidth = parseInt(width / 2) - 25
    // console.log("ImgContW", imgContainerWidth)
    const stylesImage = {
        height: imgContainerWidth,
        width: imgContainerWidth
    }
    console.log('render GalerieItem', item.name)
    return ( 
        <View style={viewStyles}>
        <TouchableOpacity onPress={() => this.onPressItem()}>
            <LazyloadView
                host="lazyload-list"
            >
                <View style={styles.item}>
                    <Image
                        style={stylesImage}
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
      flex: 0.5,
      borderWidth: 1,
      borderColor: 'gray',
      margin: 5
    //   height: 50
    },
    // viewDetailsAktiv: {
    //     // height: 250,
    //     backgroundColor: 'burlywood'
    // },
    // viewDetailsInaktiv: {
    //     height: 50
    // },
    name: {
        position: 'absolute',
        bottom: 10,
        left: 10
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