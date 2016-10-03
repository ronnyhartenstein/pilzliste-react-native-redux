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

const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2,
  sectionHeaderHasChanged: (s1, s2) => s1 !== s2
});

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
      items: ds.cloneWithRowsAndSections(this.getSectionBlob(this.props.filteredItems)),
      numberItems: this.props.filteredItems.length,
      activeTab: this.props.activeTab
    }
  }
  getSectionBlob(items) {
    return _.groupBy(items, itm => ( itm.name.substr(0,1) ))
  }
  // kein Neubau der Komponente bei Änderung
  // sondern per Props-Änderung 
  // https://github.com/reactjs/redux/issues/683
  componentWillReceiveProps (nextProps) {
    if (nextProps.filteredItems !== this.props.filteredItems) {
      this.setState({
        items: ds.cloneWithRowsAndSections(this.getSectionBlob(nextProps.filteredItems)),
        numberItems: nextProps.filteredItems.length
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
    return (
      <ListView
          listSize={1000}
          pageSize={11}
          // "How early to start rendering rows before they come on screen, in pixels."
          scrollRenderAheadDistance={100}
          // offscreen child views are removed from their native backing superview when offscreen.
          removeClippedSubviews={true}
          
          dataSource={this.state.items}
          renderRow={(item, sectionID, rowID, highlightRow) => this.renderRow(item, sectionID, rowID, highlightRow)}
          renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}
          renderSeparator={this.renderSeparator}
          renderSectionHeader={this.renderSectionHeader}

          style={styles.container}
          contentContainerStyle={[styles.content, activeTab == 'galerie' && {
            justifyContent: 'center',
            flexDirection: 'row',
            flexWrap: 'wrap'}]}
          name="lazyload-list"
      />
    );
  }
  renderRow(item, sectionID, rowID, highlightRow) {
    const { setStar, unsetStar } = this.props
    const { activeTab } = this.state
    const key = `${sectionID}-${rowID}`
    switch (activeTab) {
      case 'liste': return <ListeItem key={key} item={item} setStar={setStar} unsetStar={unsetStar} />
      case 'galerie': return <GalerieItem key={key} item={item} setStar={setStar} unsetStar={unsetStar} />
      case 'gesternt': return item.stern ? <ListeItem key={key} item={item} setStar={setStar} unsetStar={unsetStar} /> : null
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
  renderSectionHeader(sectionData, sectionID) {
    console.log('sectionHeader', sectionData)
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
