import React, { Component } from 'react'
import { View, ScrollView, ListView, StyleSheet, Text, Image } from 'react-native'
// import { List, ListItem } from 'react-native-elements'
import { LazyloadScrollView, LazyloadView, LazyloadImage } from 'react-native-lazyload';

// https://github.com/react-native-community/React-Native-Elements#lists
// ListView https://facebook.github.io/react-native/docs/listview.html
// Lazy load https://github.com/magicismight/react-native-lazyload

class Liste extends Component {
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
      items: this.props.filteredItems
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

    renderRow (rowData, sectionID) {
        return (
            <ListItem
                onClick={itm => this.onClick(itm)}
                key={sectionID}
                title={rowData.name != "" ? rowData.name : "?"}
                subtitle={rowData.lat != "" ? rowData.lat : "?"}
            />
        )
    }
    onClick (itm) {
      console.log("click auf item", itm)
      // this.props.onItemClick();
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
        const name_escaped = item.name
            .replace(/ä/g, 'a%CC%88')
            .replace(/ü/g, 'u%CC%88')
            .replace(/ö/g, 'o%CC%88')
            .replace(/ß/g, '%C3%9F')
            .replace(/ /g, '%20')
        const image_uri = 'https://uli.rh-flow.de/pilzbilder_klein/' + name_escaped + '.jpg.png'
        // console.log("image: ", image_uri)
        return ( 
          <View
              key={i}
              style={styles.view}
          >
            <LazyloadView
                host="lazyload-list"
                style={styles.item}
            >
              <LazyloadImage
                  host="lazyload-list"
                  style={styles.image}
                  source={{uri: image_uri}}
                  // onLoad={() => console.log(item.nr, "loaded: ", item.name)}
                  // onLoadStart={() => console.log("onLoadStart", item.name)}
                  // onLoadEnd={() => console.log("onLoadEnd", item.name)}
                  onError={({nativeEvent: {error}}) => console.warn(image_uri, error)}
                  // onProgress={({nativeEvent: {loaded, total}}) => console.log("loading..",loaded,total)}
                />
              <View style={styles.name}>
                  <Text style={styles.nameText}>{item.name}</Text>
                  <Text style={styles.latText}>{item.lat}</Text>
              </View>
            </LazyloadView>
          </View>
          )
      }) }
      </LazyloadScrollView>
    );
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

export default Liste
