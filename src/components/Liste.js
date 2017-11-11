import React, { Component } from 'react'
import { StyleSheet, SectionList, View, RecyclerViewBackedScrollView, Text } from 'react-native'
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
    this.props.updateNumberItems(this.props.filteredItems.length)
  }

  getSectionizedList() {
      const items = {}
      this.props.filteredItems.forEach((item) => {
          const buchstabe = item.name.substr(0, 1).toUpperCase()
          if (typeof items[buchstabe] === 'undefined') items[buchstabe] = []
          items[buchstabe].push(item)
      })
      const finaleItems = []
      _.keys(items).forEach((buchstabe) => {
          finaleItems.push({ title: buchstabe, data: items[buchstabe] })
      })
      return finaleItems
  }

  render() {
      const items = this.getSectionizedList()
      // console.log('render Liste', items)

    return (
      <SectionList
          renderItem={({item}) => this.renderRow(item)}
          renderSectionHeader={({section}) => this.renderSectionHeader(section)}
          sections={items}
          style={styles.container}
          ItemSeparatorComponent={() => (<View style={{ height: 1, backgroundColor: '#CCCCCC'}}/>)}
          keyExtractor={item => item.id}
          // contentContainerStyle={styles.content}
      />
    );
  }

  renderRow(item) {
    // console.log("render",item)
    const { setStar, unsetStar } = this.props
    // const key = `${sectionID}-${rowID}`
    return <ListeItem item={item} setStar={setStar} unsetStar={unsetStar} />
  }

  renderSectionHeader(section) {
    // console.log('sectionHeader', section)
    return (
      <View style={styles.section}>
        <Text style={styles.sectionText}>{section.title}</Text>
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

