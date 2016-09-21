import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import * as searchActions from '../actions/searchActions';
import * as itemActions from '../actions/itemActions';
import Fusszeile from '../components/Fusszeile'
import Kopfzeile from '../components/Kopfzeile'
import Liste from '../components/Liste'
import FuzzySearch from 'fuzzy-search'

// beim Laden befüllen..
import daten from '../daten/pilze.json'
daten.each(item => { store.dispatch(itemActions.loadItem(item)); });

// Mapping von Redux State auf Props
@connect(state => {
    // https://www.npmjs.com/package/fuzzy-search
    const searchengine = () => ( new FuzzySearch(_.cloneDeep(state.items), ['name','lat']) );
    return {
        items: _.isEmpty(state.search) ? state.items : searchengine().search(state.search)
        search: state.search
   };
});

export default class Pilzliste extends Component {
    constructor(props) {
        super(props);
    }

  render() {
    const {items, search} = this.props;
    return (
        <View style={styles.container}>
            <Kopfzeile 
                activeSearch={search} 
                {...bindActionCreators(searchActions, dispatch)}/>
            <Liste 
                activeSearch={search}
                items={items} 
                {...bindActionCreators(itemActions, dispatch)}/>
            <Fusszeile />
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  }
});
