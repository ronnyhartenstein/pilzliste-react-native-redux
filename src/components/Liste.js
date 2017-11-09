import React, { Component } from 'react'
import { StyleSheet, ListView, View, RecyclerViewBackedScrollView, Text } from 'react-native'
import ListeItem from './ListeItem'
import { updateNumberItems, setStar, unsetStar } from '../actions/itemActions'
import { connect } from 'react-redux'
import getVisibleItems from '../selectors/visibleItems'
import _ from 'lodash'

// ListView https://facebook.github.io/react-native/docs/listview.html
// Layout: https://facebook.github.io/react-native/docs/flexbox.html
// ListView vs. ScrollView: http://stackoverflow.com/questions/9820679/difference-between-scrollview-and-listview
// SectionHeaders in ListView: http://richardkho.com/section-headers-in-react-native-listview-components/

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    section: {
        backgroundColor: '#F0F0F0'
    },
    sectionText: {
        padding: 5,
        fontWeight: 'bold',
        textAlign: 'center'
    }
});

class Liste extends Component {
  constructor(props) {
    super(props)
    // console.log("Liste constructor")
    const items = this.props.filteredItems
   const ds = new ListView.DataSource({
      rowHasChanged: (r1,r2) => this.rowHasChanged(r1,r2),
      sectionHeaderHasChanged: (s1,s2) => this.sectionHeaderHasChanged(s1,s2)
    });
    this.state = {
      dataSource: ds.cloneWithRowsAndSections(this.getSectionBlob(items)),
      numberItems: this.props.filteredItems.length
    }
  }
  getSectionBlob(items) {
    const items_grouped = _.groupBy(items, itm => ( itm.name.substr(0,1) ))
    // console.log('getSectionBlob', items_grouped)
    return items_grouped
  }
  // kein Neubau der Komponente bei Änderung
  // sondern per Props-Änderung 
  // https://github.com/reactjs/redux/issues/683
  componentWillReceiveProps (nextProps) {
    if (nextProps.filteredItems !== this.props.filteredItems) {
      // console.log("Liste componentWillReceiveProps", nextProps)
      const items = nextProps.filteredItems
      this.setState({
        dataSource: this.state.dataSource.cloneWithRowsAndSections(this.getSectionBlob(items)),
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

    // ==> Lösung vermutlich: separate Komponente für jeden Listentyp ..
    return (
      <ListView
          listSize={1000}
          pageSize={11}
          // "How early to start rendering rows before they come on screen, in pixels."
          scrollRenderAheadDistance={300}
          // offscreen child views are removed from their native backing superview when offscreen.
          removeClippedSubviews={true}
          
          dataSource={this.state.dataSource}
          renderRow={(item, sectionID, rowID, highlightRow) => this.renderRow(item, sectionID, rowID, highlightRow)}
          renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}
          renderSeparator={this.renderSeparator}
          renderSectionHeader={this.renderSectionHeader}

          style={styles.container}
          contentContainerStyle={styles.content}
      />
    );
  }
  rowHasChanged(r1, r2) {
    // ändert sich immer - vermutlich Immutable von Redux sei Dank
    return r1 !== r2

    // ==> Lösung vermutlich: separate Komponente für jeden Listentyp .. 

    // r1 und r2 sind gleich - warum? k.A.
    // console.log('rowHasChanged?', r1.id, r1.stern, r2.stern, r1, r2)
    // if (r1.stern !== r2.stern) console.log('rowHasChanged!', r1.id)
    // return r1.stern !== r2.stern

    // wir ändern eh keine daten - 
    // aber die Stern-Liste muss beräumt werden
    // if (this.state.activeTab == 'gesternt') {
    //   return r1 !== r2
    // }
    // return false    
  }
  renderRow(item, sectionID, rowID, highlightRow) {
    // console.log("render",sectionID, rowID)
    const { setStar, unsetStar } = this.props
    const key = `${sectionID}-${rowID}`
    return <ListeItem key={key} item={item} setStar={setStar} unsetStar={unsetStar} />
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
  sectionHeaderHasChanged(s1, s2) {
    return s1 !== s2
  }
  renderSectionHeader(sectionData, sectionID) {
    // console.log('sectionHeader', sectionData)
    return (
      <View style={styles.section}>
        <Text style={styles.sectionText}>{sectionID}</Text>
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
        // onItemClick: (nr) => {
        //   console.log("TODO zeige Details-Szene")
        //   //dispatch(showDetails(nr))
        // },
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

const ReduxListe = connect(
    mapStateToProps,
    mapDispatchToProps
)(Liste);

export default ReduxListe

