import React, { Component } from 'react'
import { View, ScrollView, ListView, StyleSheet, Text } from 'react-native'
import { List, ListItem } from 'react-native-elements'

// https://github.com/react-native-community/React-Native-Elements#lists

class Liste extends Component {
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
    console.log("Liste props", this.props)
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      })
    }
    if (this.props.filteredItems) {
      this.state.dataSource = this.state.dataSource.cloneWithRows(this.props.filteredItems)
    }
    // console.log("Liste dataSource", this.state.dataSource)
  }

    renderRow (rowData, sectionID) {
      // console.log("renderRow", rowData)
        return (
            <ListItem
                onClick={itm => this.onClick(itm)}
                key={sectionID}
                title={rowData.name != "" ? rowData.name : "?"}
                subtitle={rowData.lat != "" ? rowData.lat : "?"}
            />
        )
    }
    onClick (itm) {
      console.log("click auf item", itm)
      // this.props.onItemClick();
    }

  render() {
    return (
      <ScrollView style={styles.container}>
        <List style={styles.liste}>
            <ListView
                renderRow={this.renderRow}
                dataSource={this.state.dataSource}
            />
        </List>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
    container: {
    },
  liste: {
    flex: 1, 
    backgroundColor: 'skyblue',
  }
});

export default Liste
