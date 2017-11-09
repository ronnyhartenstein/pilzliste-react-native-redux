import React, { Component } from 'react'
import { StyleSheet, ListView, View, RecyclerViewBackedScrollView, Text } from 'react-native'
import ListeItem from './ListeItem'
import { updateNumberItems, setStar, unsetStar } from '../actions/itemActions'
import { connect } from 'react-redux'
import getStaredItems from '../selectors/staredItems'
import _ from 'lodash'

// ListView https://facebook.github.io/react-native/docs/listview.html
// Layout: https://facebook.github.io/react-native/docs/flexbox.html

class Sternliste extends Component {
  constructor(props) {
    super(props)
    // console.log("Sternliste constructor")
    const items = this.props.staredItems
    const ds = new ListView.DataSource({
      rowHasChanged: (r1,r2) => ( r1 !== r2 )
    });
    this.state = {
      dataSource: ds.cloneWithRows(items),
      numberItems: this.props.staredItems.length
    }
  }
  // kein Neubau der Komponente bei Änderung
  // sondern per Props-Änderung 
  // https://github.com/reactjs/redux/issues/683
  componentWillReceiveProps (nextProps) {
    if (nextProps.staredItems !== this.props.staredItems) {
      // console.log("Sternliste componentWillReceiveProps", nextProps)
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.staredItems),
        numberItems: nextProps.staredItems.length,
      })
      this.updateNumberItems()  
    }
  }
  componentWillMount () {
    // hier weiß man wieviele Items wirklich im State sind
    this.updateNumberItems()
  }
  componentDidUpdate () {
    // und hier dann bei Updates über componentWillReceiveProps
    this.updateNumberItems()
  }
  updateNumberItems() {
    // für Fusszeile die akt. Anzahl Items melden
    this.props.updateNumberItems(this.state.numberItems)
  }

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
      <ListView
          listSize={this.props.staredItems.length}
          pageSize={11}
          dataSource={this.state.dataSource}
          renderRow={(item, sectionID, rowID, highlightRow) => this.renderRow(item, sectionID, rowID, highlightRow)}
          renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}
          renderSeparator={this.renderSeparator}
          style={styles.container}
          contentContainerStyle={styles.content}
      />
      );
    }
  }
  renderRow(item, sectionID, rowID, highlightRow) {
    // console.log("render",sectionID, rowID)
    const { unsetStar } = this.props
    const key = `${sectionID}-${rowID}`
    return <ListeItem key={key} item={item} setStar={null} unsetStar={unsetStar} />
  }
  renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
    return (
      <View
        key={`${sectionID}-${rowID}`}
        style={{
          height: adjacentRowHighlighted ? 4 : 1,
          backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC',
        }}
      />
    )
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
        // onItemClick: (nr) => {
        //   console.log("TODO zeige Details-Szene")
        //   //dispatch(showDetails(nr))
        // },
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
