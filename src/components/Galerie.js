import React, { Component } from 'react'
import { StyleSheet, FlatList, View, Text } from 'react-native'
import GalerieItem from './GalerieItem'
import { updateNumberItems, setStar, unsetStar } from '../actions/itemActions'
import { connect } from 'react-redux'
import getVisibleItems from '../selectors/visibleItems'
import _ from 'lodash'

// ListView https://facebook.github.io/react-native/docs/listview.html
// Layout: https://facebook.github.io/react-native/docs/flexbox.html
// Grid-Layout in ListView: https://github.com/yelled3/react-native-grid-example

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: 'white'
    },
    list: {
      marginLeft: 5,
        flex: 1,
        justifyContent: 'space-around',
        flexDirection: 'row',
        //flexWrap: 'nowrap',
        //alignItems: 'flex-start'
      // borderColor: 'red',
      // borderWidth: 1,

    }
});

class Galerie extends Component {

  componentWillMount () {
    // hier weiß man wieviele Items wirklich im State sind
    this.props.updateNumberItems(this.props.filteredItems.length)
  }
  componentDidUpdate () {
    // und hier dann bei Updates über componentWillReceiveProps
    this.props.updateNumberItems(this.props.filteredItems.length)
  }

  getGalleriedList() {
    const items = []
    for (let i = 0; i < this.props.filteredItems.length; i+=2) {
      items.push({li: this.props.filteredItems[i], re: this.props.filteredItems[i+1]})
    }
    return items
  }

  render() {
    if (this.props.filteredItems.length === 0) {
      return (
        <View style={styles.empty}>
          <Text>Keine Pilze gefunden.</Text>
        </View>
      )
    } else {
      const items = this.getGalleriedList()
      console.log('render Liste', items)
      return (
        <FlatList
          data={items}
          renderItem={({item}) => this.renderRow(item)}
          // ItemSeparatorComponent={() => (<View style={{height: 5}}/>)}
          style={styles.container}
          keyExtractor={item => item.li.id}
        />
      )
    }
  }
  renderRow({li: item_li, re: item_re}) {
    // console.log("render itms", item_li, item_re)
    const { setStar, unsetStar } = this.props
    return (
      <View style={styles.list}>
        <GalerieItem item={item_li} setStar={setStar} unsetStar={unsetStar} />
        <GalerieItem item={item_re} setStar={setStar} unsetStar={unsetStar} />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        filteredItems: getVisibleItems(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // wirkliche Anzahl Ergebnisse in Store für Fusszeile zurückfunken
        updateNumberItems: (number) => {
            dispatch(updateNumberItems(number))
        },
        setStar: (item) => {
            dispatch(setStar(item.id))
        },
        unsetStar: (item) => {
            dispatch(unsetStar(item.id))
        }
    }
}

const ReduxGalerie = connect(
    mapStateToProps,
    mapDispatchToProps
)(Galerie);

export default ReduxGalerie
