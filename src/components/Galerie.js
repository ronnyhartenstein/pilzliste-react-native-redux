import React, { Component } from 'react'
import { StyleSheet, ListView, View, RecyclerViewBackedScrollView, Text } from 'react-native'
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
        flex: 1,
        // justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start'
    }
});

class Galerie extends Component {
  constructor(props) {
    super(props)
    // console.log("Liste constructor")
    const items = this.props.filteredItems
   const ds = new ListView.DataSource({
      rowHasChanged: (r1,r2) => this.rowHasChanged(r1,r2)
    });
    this.state = {
      dataSource: ds.cloneWithRows(items),
      numberItems: this.props.filteredItems.length
    }
  }
  // kein Neubau der Komponente bei Änderung
  // sondern per Props-Änderung 
  // https://github.com/reactjs/redux/issues/683
  componentWillReceiveProps (nextProps) {
    if (nextProps.filteredItems !== this.props.filteredItems) {
      // console.log("Liste componentWillReceiveProps", nextProps)
      const items = nextProps.filteredItems
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items),
        numberItems: nextProps.filteredItems.length,
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
    const { items, activeTab } = this.state
    // console.log('render Liste', activeTab)
    return (
      <ListView
          listSize={1000}
          pageSize={8}
          // "How early to start rendering rows before they come on screen, in pixels."
          scrollRenderAheadDistance={200}
          // offscreen child views are removed from their native backing superview when offscreen.
          removeClippedSubviews={true}
          
          dataSource={this.state.dataSource}
          renderRow={(item, sectionID, rowID, highlightRow) => this.renderRow(item, sectionID, rowID, highlightRow)}
          renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}

          style={styles.container}
          contentContainerStyle={styles.list}
      />
    );
  }
  rowHasChanged(r1, r2) {
    // ändert sich immer - vermutlich Immutable von Redux sei Dank
    return r1 !== r2
  }
  renderRow(item, sectionID, rowID, highlightRow) {
    // console.log("render",sectionID, rowID)
    const { setStar, unsetStar } = this.props
    const key = `${sectionID}-${rowID}`
    return <GalerieItem key={key} item={item} setStar={setStar} unsetStar={unsetStar} />
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
