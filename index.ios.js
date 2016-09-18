import React from 'react'
import { AppRegistry, View } from 'react-native'
import Fusszeile from './src/Fusszeile'
import Kopfzeile from './src/Kopfzeile'
import Liste from './src/Liste'

class Pilzliste extends Component {
  render() {
    return (
      <View style={style.container}>
        <Kopfzeile />
        <Liste />
        <Fusszeile />
      </View>
    )
  }
}

AppRegistry.registerComponent('Pilzliste', () => Pilzliste)
