import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native'
// import { List, ListItem } from 'react-native-elements'
import { thumbnailUri } from '../lib/imageUri'
import { Icon } from 'react-native-elements'
import { Actions } from 'react-native-router-flux';

// Text: https://facebook.github.io/react-native/docs/text.html
// Layout: https://facebook.github.io/react-native/docs/flexbox.html
// Colors: https://facebook.github.io/react-native/docs/colors.html

// Icons: https://github.com/react-native-community/react-native-elements#icons--icon-buttons 
//   Material Icons: https://design.google.com/icons/

export default class ListeItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stern: this.props.item.stern
    }
  }
  render() {
    const { item, design } = this.props
    const image_uri = thumbnailUri(item.name)
    // console.log("image: ", image_uri)
    const viewStyles = [styles.view]
    // console.log('render ListItem', item.name)
    return ( 
        <View style={viewStyles}>
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
                <View style={styles.name}>
                    <Text style={styles.nameText}>{item.name}</Text>
                    <Text style={styles.latText}>{item.lat}</Text>
                </View>
                <Icon
                    containerStyle={styleIconContainer}
                    iconStyle={styleIcon}
                    name={this.state.stern ? 'star' : 'star-border'} 
                    color={this.state.stern ? 'goldenrod' : 'gold'}
                    onPress={() => this.switchStern()} />
            </View>
          </TouchableOpacity>
        </View>
    )
  }

  switchStern() {
    if (!this.state.stern) {
      this.props.setStar(this.props.item)
    } else {
      this.props.unsetStar(this.props.item)
    }
    // in Sternliste sollen entsterne Items entfallen
    if (this.props.setStar !== null) {
      this.setState({
        stern: !this.state.stern
      })
    }
  }

  onPressItem() {
    const name = this.props.item.name
    Actions.details({title: name, item: this.props.item})
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
    // view: {
    // },
    image: {
      width: 40, 
      height: 40,
      marginRight: 10,
      borderRadius: 20
    },
    item: {
      flex: 1, 
      flexDirection: 'row',
      margin: 5
    },
    nameText: {
      marginTop: 8,
      color: 'black'
    },
    latText: {
      color: 'gray',
      fontSize: 10
    } 
});