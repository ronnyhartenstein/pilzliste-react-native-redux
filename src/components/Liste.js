import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { LazyloadScrollView } from 'react-native-lazyload';
import ListeItem from './ListeItem'

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

  render() {
    return (
      <LazyloadScrollView
          style={styles.container}
          contentContainerStyle={styles.content}
          name="lazyload-list"
      >
        { this.state.items.map((item, i) => ( 
          <ListeItem key={i} item={item} /> 
        )) }
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
