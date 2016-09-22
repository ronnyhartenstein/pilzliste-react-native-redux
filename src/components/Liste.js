import React, { Component } from 'react'
import { View, ScrollView, ListView, StyleSheet, Text } from 'react-native'
import { List, ListItem } from 'react-native-elements'

// https://github.com/react-native-community/React-Native-Elements#lists

class Liste extends Component {
  propTypes = {
    items:  PropTypes.arrayOf(PropTypes.shape({
      nr: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      lat: PropTypes.string.isRequired
    }).isRequired).isRequired,
    onItemClick: PropTypes.func.isRequired
  }
  constructor(props) {
    super(props)
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      })
    }
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    if (this.props.items) {
      this.state.dataSource = this.state.dataSource.cloneWithRows({
        dataSource: ds.cloneWithRows(this.props.items)
      })
    }
  }

    renderRow (rowData, sectionID) {
        return (
            <ListItem
                onClick={this.props.onItemClick}
                key={sectionID}
                title={rowData.name != "" ? rowData.name : "?"}
                subtitle={rowData.lat != "" ? rowData.lat : "?"}
            />
        )
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
