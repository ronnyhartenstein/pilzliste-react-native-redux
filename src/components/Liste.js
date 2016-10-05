import React, { Component } from 'react'
import { StyleSheet, ListView, View, RecyclerViewBackedScrollView, Text } from 'react-native'
// import { LazyloadScrollView } from 'react-native-lazyload'
import ListeItem from './ListeItem'
import GalerieItem from './GalerieItem'
import _ from 'lodash'

// https://github.com/react-native-community/React-Native-Elements#lists
// ListView https://facebook.github.io/react-native/docs/listview.html
// Lazy load https://github.com/magicismight/react-native-lazyload
// Layout: https://facebook.github.io/react-native/docs/flexbox.html
// ListView vs. ScrollView: http://stackoverflow.com/questions/9820679/difference-between-scrollview-and-listview
// SectionHeaders in ListView: http://richardkho.com/section-headers-in-react-native-listview-components/
// Grid-Layout in ListView: https://github.com/yelled3/react-native-grid-example

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
    // console.log("Liste constructor")
    const items = this.props.activeTab == 'gesternt' 
        ? this.onlyStaredItems(this.props.filteredItems) 
        : this.props.filteredItems
   const ds = new ListView.DataSource({
      // TODO hier kommt er nicht vorbei um zu checken?!!
      rowHasChanged: (r1,r2) => this.rowHasChanged(r1,r2),
      sectionHeaderHasChanged: (s1,s2) => this.sectionHeaderHasChanged(s1,s2)
    });
    this.state = {
      dataSource: this.props.activeTab == 'liste' 
              ? ds.cloneWithRowsAndSections(this.getSectionBlob(items)) 
              : ds.cloneWithRows(items),
      numberItems: this.props.filteredItems.length,
      activeTab: this.props.activeTab
    }
  }
  getSectionBlob(items) {
    const items_grouped = _.groupBy(items, itm => ( itm.name.substr(0,1) ))
    // console.log('getSectionBlob', items_grouped)
    return items_grouped
  }
  onlyStaredItems(items) {
    return _.filter(items, itm => ( itm.stern ))
  }
  // kein Neubau der Komponente bei Änderung
  // sondern per Props-Änderung 
  // https://github.com/reactjs/redux/issues/683
  componentWillReceiveProps (nextProps) {
    if (nextProps.filteredItems !== this.props.filteredItems
    || nextProps.activeTab !== this.props.activeTab
    ) {
      // console.log("Liste componentWillReceiveProps", nextProps)
      const items = nextProps.activeTab == 'gesternt' 
          ? this.onlyStaredItems(nextProps.filteredItems) 
          : nextProps.filteredItems;
      this.setState({
        dataSource: nextProps.activeTab == 'liste' 
              ? this.state.dataSource.cloneWithRowsAndSections(this.getSectionBlob(items))
              : this.state.dataSource.cloneWithRows(items),
        numberItems: nextProps.filteredItems.length,
      })
      this.updateNumberItems()  
    }
    if (nextProps.activeTab !== this.props.activeTab) {
      this.setState({
        activeTab: nextProps.activeTab
      })
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
          scrollRenderAheadDistance={100}
          // offscreen child views are removed from their native backing superview when offscreen.
          removeClippedSubviews={true}
          
          dataSource={this.state.dataSource}
          renderRow={(item, sectionID, rowID, highlightRow) => this.renderRow(item, sectionID, rowID, highlightRow)}
          renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}
          renderSeparator={this.renderSeparator}
          renderSectionHeader={activeTab == 'liste' ? this.renderSectionHeader : null}

          style={styles.container}
          contentContainerStyle={[styles.content, activeTab == 'galerie' && {
            justifyContent: 'center',
            flexDirection: 'row',
            flexWrap: 'wrap'}]}
          name="lazyload-list"
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
    const { activeTab } = this.state
    const key = `${sectionID}-${rowID}`
    switch (activeTab) {
      case 'gesternt':
      case 'liste': return <ListeItem key={key} item={item} setStar={setStar} unsetStar={unsetStar} />
      case 'galerie': return <GalerieItem key={key} item={item} setStar={setStar} unsetStar={unsetStar} />
    }
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
