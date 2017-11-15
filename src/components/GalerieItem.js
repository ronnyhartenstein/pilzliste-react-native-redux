import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Image, Dimensions } from 'react-native'
// import { List, ListItem } from 'react-native-elements'
import { galerieUri } from '../lib/imageUri'
// import { Icon } from 'react-native-elements'
import { Actions } from 'react-native-router-flux';

// Text: https://facebook.github.io/react-native/docs/text.html
// Layout: https://facebook.github.io/react-native/docs/flexbox.html
// Colors: https://facebook.github.io/react-native/docs/colors.html
// Dimensions: https://facebook.github.io/react-native/docs/dimensions.html

// Layout Beispiel Loginscreen: https://github.com/browniefed/react-native-screens
//   Code: https://github.com/browniefed/react-native-screens/blob/master/app/screens/login/login1.js
// Layout Spielwiese: http://www.reactnativeexpress.com/flexbox

// Icons: https://github.com/react-native-community/react-native-elements#icons--icon-buttons 
//   Material Icons: https://design.google.com/icons/

// Grid-Layout: https://github.com/yelled3/react-native-grid-example


export default class GalerieItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const item = this.props.item
    const image_uri = galerieUri(item.name)
    // console.log("image: ", image_uri)
    // console.log('render GalerieItem', item.name)
    return ( 
        <View style={styles.view}>
          <TouchableOpacity onPress={() => this.onPressItem()}>
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
                <TouchableOpacity onPress={() => this.switchStern()} style={styles.iconContainer}>
                    <Text style={[styles.iconText, {color: item.stern ? 'goldenrod' : 'gold'}]}>{item.stern ? '★' : '☆'}</Text>
                </TouchableOpacity>
                {/*<Icon
                    containerStyle={styleIconContainer}
                    iconStyle={styleIcon}
                    name={item.stern ? 'star' : 'star-border'} 
                    color={item.stern ? 'yellow' : 'goldenrod'}
                    onPress={() => this.switchStern()} />*/}
                <View style={styles.name}>
                    <Text style={styles.nameText}>{item.name}</Text>
                    <Text style={styles.latText}>{item.lat}</Text>
                </View>
            </View>
          </TouchableOpacity>
        </View>
    )
  }

  switchStern() {
    if (!this.props.item.stern) {
      this.props.setStar(this.props.item)
    } else {
      this.props.unsetStar(this.props.item)
    }
  }

  onPressItem() {
    const name = this.props.item.name
    Actions.details({title: name, item: this.props.item})
  }
}


const { height, width } = Dimensions.get('window')
const halfWidth = parseInt(width / 2)
const containerSize = halfWidth - 5  // padding

const styles = StyleSheet.create({
    view: {
      // padding: 5,
      width: halfWidth, 
      height: halfWidth
    },
    name: {
        position: 'absolute',
        bottom: 0,
        left: 1,
        opacity: 0.7,
        backgroundColor: 'black',
        width: containerSize - 1
    },
    image: {
        height: containerSize,
        width: containerSize
    },
    // item: {
    //   flex: 1, 
    //   flexDirection: 'row',
    //   margin: 10
    // },
    nameText: {
      paddingTop: 5,
      paddingLeft: 5,
      color: 'rgba(255,255,255,1)',
    },
    latText: {
      color: 'rgba(255,255,255,1)',
      fontSize: 10,
      paddingBottom: 5,
      paddingLeft: 5
    },
    iconContainer: {
      position: 'absolute',
      top: 0,
      right: 5,
      // borderRadius: 10,
      backgroundColor: 'transparent',

    },
    iconText: {
      margin: 5,
      fontSize: 20,
    }
});