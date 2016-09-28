import React, { Component } from 'react'
import { View, ScrollView, ListView, StyleSheet, Text, TouchableHighlight } from 'react-native'
// import { List, ListItem } from 'react-native-elements'
import { LazyloadScrollView, LazyloadView, LazyloadImage } from 'react-native-lazyload';
import ListeItemDetails from './ListeItemDetails'
import escapeUri from '../lib/escapeUri'

// https://github.com/react-native-community/React-Native-Elements#lists
// ListView https://facebook.github.io/react-native/docs/listview.html
// Lazy load https://github.com/magicismight/react-native-lazyload
// Layout: https://facebook.github.io/react-native/docs/flexbox.html

export default class Liste extends Component {
  // propTypes = {
  //   items:  PropTypes.arrayOf(PropTypes.shape({
  //     nr: PropTypes.number.isRequired,
  //     name: PropTypes.string.isRequired,
  //     lat: PropTypes.string.isRequired
  //   }).isRequired).isRequired,
  //   onItemClick: PropTypes.func.isRequired
  // }
  constructor(props) {
    super(props)
    this.state = {
      items: this.props.filteredItems,
      details: false
    }
  }

  // kein Neubau der Komponente bei Änderung
  // sondern per Props-Änderung 
  // https://github.com/reactjs/redux/issues/683
  componentWillReceiveProps (nextProps) {
    if (nextProps.filteredItems !== this.props.filteredItems) {
      this.setState({
        items: nextProps.filteredItems
      })
    }
  }

  render() {
        
    return (
      <LazyloadScrollView
          style={styles.container}
          contentContainerStyle={styles.content}
          name="lazyload-list"
      >
      { this.state.items.map((item, i) => {
        // escapeURIComponent, escape .. :(
        const image_uri = 'https://uli.rh-flow.de/pilzbilder_klein/' + escapeUri(item.name) + '.jpg.png'
        // console.log("image: ", image_uri)
        return ( 
          <View
              key={i}
              style={styles.view}
          >
            <TouchableHighlight onPress={() => this.onPressItem(i)}>
              <LazyloadView
                  host="lazyload-list"
              >
                <View style={styles.item}>
                  <LazyloadImage
                      host="lazyload-list"
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
                    {this.state.details === i ? <ListeItemDetails item={item} /> : <Text></Text>}
                  </View>
              </LazyloadView>
            </TouchableHighlight>
          </View>
          )
      }) }
      </LazyloadScrollView>
    );
  }

  onPressItem(i) {
    this.setState({
      details: this.state.details === i ? false : i
    })
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: 'white'
    },
    view: {
      borderTopWidth: 1,
      borderTopColor: "gray",
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
