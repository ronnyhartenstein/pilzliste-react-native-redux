import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native'
// import { List, ListItem } from 'react-native-elements'
// import { LazyloadView } from 'react-native-lazyload'
import { thumbnailUri } from '../lib/imageUri'
import ListeItemDetails from './ListeItemDetails'
import { Icon } from 'react-native-elements'

// Text: https://facebook.github.io/react-native/docs/text.html
// Lazy load https://github.com/magicismight/react-native-lazyload
// Layout: https://facebook.github.io/react-native/docs/flexbox.html
// Colors: https://facebook.github.io/react-native/docs/colors.html

// Icons: https://github.com/react-native-community/react-native-elements#icons--icon-buttons 
//   Material Icons: https://design.google.com/icons/

export default class ListeItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: false,
      stern: this.props.item.stern
    }
  }
  render() {
    const { item, design } = this.props
    const image_uri = thumbnailUri(item.name)
    // console.log("image: ", image_uri)
    const viewStyles = [styles.view]
    if (this.state.details) {
        viewStyles.push(styles.viewDetailsAktiv)
    } else {
        viewStyles.push(styles.viewDetailsInaktiv)
    }
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
            <View>
                {this.state.details 
                    ? <ListeItemDetails item={item} show={this.state.details} /> 
                    : null}
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
    this.setState({
      stern: !this.state.stern
    })
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
    // view: {
    // },
    viewDetailsAktiv: {
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