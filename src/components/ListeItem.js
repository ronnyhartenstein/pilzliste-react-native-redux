import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native'
// import { List, ListItem } from 'react-native-elements'
import { LazyloadView } from 'react-native-lazyload';
import escapeUri from '../lib/escapeUri'
import ListeItemDetails from './ListeItemDetails'

// Text: https://facebook.github.io/react-native/docs/text.html
// Lazy load https://github.com/magicismight/react-native-lazyload
// Layout: https://facebook.github.io/react-native/docs/flexbox.html
// Colors: https://facebook.github.io/react-native/docs/colors.html
// Image cachen mit prefetch() https://facebook.github.io/react-native/docs/image.html#prefetch


export default class ListeItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      details: false,
      startLoadPrefetched: false,
      mountTime: new Date(),
    }
  }

  componentWillMount() {
    this.setState({mountTime: new Date()});
  }

  render() {
    const item = this.props.item
    const image_uri = 'https://uli.rh-flow.de/pilzbilder_klein/' + escapeUri(item.name) + '.jpg.png'
    // console.log("image: ", image_uri)

    const prefetchTask = Image.prefetch(image_uri)


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
                        onLoadStart={() => this._loadEventFired(`✔ (prefetched) onLoadStart (+${new Date() - mountTime}ms) for ${image_uri}`)}
                        onLoad={(event) => this._loadEventFired(`✔ (prefetched) onLoad (+${new Date() - mountTime}ms) for ${image_uri}`)}
                        onLoadEnd={() => {
                                    this._loadEventFired(`✔ onLoadEnd (+${new Date() - mountTime}ms) for ${image_uri}`);
                                    this.setState({startLoadPrefetched: true}, () => {
                                    prefetchTask.then(() => {
                                        this._loadEventFired(`✔ Prefetch OK (+${new Date() - mountTime}ms) for ${image_uri}`);
                                    }, error => {
                                        this._loadEventFired(`✘ Prefetch failed (+${new Date() - mountTime}ms) for ${image_uri}`);
                                    });
                                    });
                                }}
                        onError={({nativeEvent: {error}}) => this._loadEventFired(`✘ onError ${error} (+${new Date() - mountTime}ms) for ${image_uri}`)}
                    />
                    <View style={styles.name}>
                        <Text style={styles.nameText}>{item.name}</Text>
                        <Text style={styles.latText}>{item.lat}</Text>
                    </View>
                </View>
                <View>
                    {this.state.details ? <ListeItemDetails item={item} show={this.state.details} /> : null}
                </View>
            </LazyloadView>
        </TouchableOpacity>
        </View>
    )
  }

  _loadEventFired(event) {
    this.setState((state) => {
      return state.events = [...state.events, event];
    });
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
      borderColor: 'black',
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
      marginRight: 10,
      borderRadius: 5
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