import React, { Component } from 'react'
import { StyleSheet, FlatList, View, Text } from 'react-native'
import ListeItem from './ListeItem'
import { updateNumberItems, setStar, unsetStar } from '../actions/itemActions'
import { connect } from 'react-redux'
import getStaredItems from '../selectors/staredItems'
import _ from 'lodash'

// ListView https://facebook.github.io/react-native/docs/listview.html
// Layout: https://facebook.github.io/react-native/docs/flexbox.html

class Sternliste extends Component {

  render() {
    // console.log('render Sternliste', activeTab)
    if (this.props.staredItems.length == 0) {
      return (
        <View style={styles.empty}>
          <Text>Bislang wurden noch</Text>
          <Text>keine Pilze gesternt.</Text>
        </View>
      )
    } else {
      return (
        <FlatList
            data={this.props.staredItems}
            renderItem={({item}) => this.renderRow(item)}
            ItemSeparatorComponent={() => (<View style={{ height: 1, backgroundColor: '#CCCCCC'}}/>)}
            style={styles.container}
            keyExtractor={item => item.id}
        />
      )
    }
  }
  renderRow(item, sectionID, rowID, highlightRow) {
    // console.log("render",sectionID, rowID)
    const { unsetStar } = this.props
    const key = `${sectionID}-${rowID}`
    return <ListeItem key={key} item={item} setStar={null} unsetStar={unsetStar} />
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: 'white'
    },
    empty: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    } 
});


const mapStateToProps = (state) => {
    return {
        staredItems: getStaredItems(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // wirkliche Anzahl Ergebnisse in Store für Fusszeile zurückfunken
        updateNumberItems: (number) => {
            dispatch(updateNumberItems(number))
        },
        unsetStar: (item) => {
            dispatch(unsetStar(item.id))
        }
    }
}

const ReduxSternliste = connect(
    mapStateToProps,
    mapDispatchToProps
)(Sternliste);

export default ReduxSternliste
