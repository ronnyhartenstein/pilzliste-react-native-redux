import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Image, Dimensions } from 'react-native'
// import { List, ListItem } from 'react-native-elements'
import { galerieUri } from '../lib/imageUri'
import { Icon } from 'react-native-elements'

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
    this.state = {
      details: false
    }
  }
  render() {
    const item = this.props.item
    const image_uri = galerieUri(item.name)
    // console.log("image: ", image_uri)
    const { height, width } = Dimensions.get('window');
    const halfWidth = parseInt(width / 2)

    const viewStyles = [styles.view]
    // if (this.state.details) {
    //     viewStyles.push(styles.viewDetailsAktiv)
    // } else {
    //     viewStyles.push(styles.viewDetailsInaktiv)
    // }
    viewStyles.push({width: halfWidth - 10, height: halfWidth - 10})
    
    const imgContainerWidth = halfWidth - 10
    // console.log("ImgContW", imgContainerWidth)
    const imageStyles = {
        height: imgContainerWidth,
        width: imgContainerWidth
    }
    // console.log('render GalerieItem', item.name)
    return ( 
        <View style={viewStyles}>
          <TouchableOpacity onPress={() => this.onPressItem()}>
            <View style={styles.item}>
                <Image
                    style={imageStyles}
                    source={{uri: image_uri}}
                    // onLoad={() => console.log(item.nr, "loaded: ", item.name)}
                    // onLoadStart={() => console.log("onLoadStart", item.name)}
                    // onLoadEnd={() => console.log("onLoadEnd", item.name)}
                    onError={({nativeEvent: {error}}) => console.log(image_uri, error)}
                    // onProgress={({nativeEvent: {loaded, total}}) => console.log("loading..",loaded,total)}
                />
                <Icon
                    containerStyle={styleIconContainer}
                    iconStyle={styleIcon}
                    name={item.stern ? 'star' : 'star-border'} 
                    color={item.stern ? 'yellow' : 'goldenrod'}
                    onPress={() => this.switchStern()} />
                <View style={[styles.name, {width: halfWidth - 10}]}>
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
    this.setState({
      details: !this.state.details
    })
  }
}


const styleIcon = {
  margin: 5
}
const styleIconContainer = {
  position: 'absolute',
  top: 0,
  right: 0
} 

const styles = StyleSheet.create({
    view: {
      margin: 5
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
        bottom: 0,
        left: 1,
        // opacity: 0.8
        backgroundColor: 'black'
    },
    // item: {
    //   flex: 1, 
    //   flexDirection: 'row',
    //   margin: 10
    // },
    nameText: {
      paddingTop: 5,
      paddingLeft: 5,
      color: 'white'
    },
    latText: {
      color: 'white',
      fontSize: 10,
      paddingBottom: 5,
      paddingLeft: 5
    } 
});