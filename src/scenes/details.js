import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

// Router forward/backward?  https://github.com/aksonov/react-native-router-flux/blob/master/docs/MINI_TUTORIAL.md#going-forward-or-backwards

export default class DetailsScene extends Component {
    constructor(props) {
        super(props);
    }

  render() {
    return (
        <View style={styles.container}>
            <Text>{this.props.item.name}</Text>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
      marginTop: 80
  }
});
