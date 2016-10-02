import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { LazyloadScrollView } from 'react-native-lazyload'
import ListeItem from './ListeItem'
import GalerieItem from './GalerieItem'

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
      activeTab: this.props.activeTab
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
    this.props.updateNumberItems(this.state.items.length)
  }

  render() {
    const { items, activeTab } = this.state
    const { setStar, unsetStar } = this.props
    // console.log('render Liste', activeTab)
    return (
      <LazyloadScrollView
          style={styles.container}
          contentContainerStyle={[styles.content, activeTab == 'galerie' && {
            justifyContent: 'center',
            flexDirection: 'row',
            flexWrap: 'wrap'}]}
          name="lazyload-list"
      >
        { items.map((item, i) => {
          switch (activeTab) {
            case 'liste': return <ListeItem key={i} item={item} setStar={setStar} unsetStar={unsetStar} />
            case 'galerie': return <GalerieItem key={i} item={item} setStar={setStar} unsetStar={unsetStar} />
            case 'gesternt': return item.stern ? <ListeItem key={i} item={item} setStar={setStar} unsetStar={unsetStar} /> : null
          }
        }) }
      </LazyloadScrollView>
    );
  }

}

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: 'white'
    }
});
