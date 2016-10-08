import React, { Component } from 'react'
import { ScrollView, Text, StyleSheet } from 'react-native'
import ListeItemDetails from '../components/ListeItemDetails'

// Router forward/backward?  https://github.com/aksonov/react-native-router-flux/blob/master/docs/MINI_TUTORIAL.md#going-forward-or-backwards

export default class DetailsScene extends Component {
    constructor(props) {
        super(props);
    }

  render() {
    return (
        <ScrollView style={styles.container}>
            <ListeItemDetails item={this.props.item} />
        </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
      marginTop: 64,
      backgroundColor: 'bisque'
  }
});
