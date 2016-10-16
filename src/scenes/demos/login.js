import React, { Component } from 'react'
import { View, Text, TextInput, Image, StyleSheet, Dimensions } from 'react-native'
import { Actions } from 'react-native-router-flux'

// Login-Screen Demo: https://github.com/browniefed/react-native-screens

const windowSize = Dimensions.get('window');
const imgPath = './img/';

export default class LoginDemoScene extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let bgImg = require('../../../images/demo_login/background.jpg')
    let headerImg = require('../../../images/demo_login/header.png');
    let userImg = require('../../../images/demo_login/user.png')
    let pwdImg = require('../../../images/demo_login/password.png')
    return (
        <View style={styles.container}>
            <Image style={styles.bg} source={bgImg} />
            <View style={styles.header}>
                <Image style={styles.mark} source={headerImg} />
            </View>
            <View style={styles.inputs}>
                <View style={styles.inputContainer}>
                    <Image style={styles.inputUsername} source={userImg}/>
                    <TextInput 
                        style={[styles.input, styles.whiteFont]}
                        placeholder="Anmeldename"
                        placeholderTextColor="#FFF"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Image style={styles.inputPassword} source={pwdImg}/>
                    <TextInput
                        password={true}
                        style={[styles.input, styles.whiteFont]}
                        placeholder="Paswort"
                        placeholderTextColor="#FFF"
                    />
                </View>
                <View style={styles.forgotContainer}>
                    <Text style={styles.greyFont}>Passwort vergessen</Text>
                </View>
            </View>
            <View style={styles.signin}>
                <Text style={styles.whiteFont} onPress={Actions.pop}>Anmelden</Text>
            </View>
            <View style={styles.signup}>
                <Text style={styles.greyFont}>Noch keinen Account?<Text style={styles.whiteFont}>  Registrieren</Text></Text>
            </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      flex: 1,
      backgroundColor: 'transparent'
    },
    bg: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: windowSize.width,
        height: windowSize.height
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: .5,
        backgroundColor: 'transparent'
    },
    mark: {
        width: 150,
        height: 150
    },
    signin: {
        backgroundColor: '#FF3366',
        padding: 20,
        alignItems: 'center'
    },
    signup: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: .15
    },
    inputs: {
        marginTop: 10,
        marginBottom: 10,
        flex: .25
    },
    inputPassword: {
        marginLeft: 15,
        width: 20,
        height: 21
    },
    inputUsername: {
      marginLeft: 15,
      width: 20,
      height: 20
    },
    inputContainer: {
        padding: 10,
        borderWidth: 1,
        borderBottomColor: '#CCC',
        borderColor: 'transparent'
    },
    input: {
        position: 'absolute',
        left: 61,
        top: 12,
        right: 0,
        height: 20,
        fontSize: 14
    },
    forgotContainer: {
      alignItems: 'flex-end',
      padding: 15,
    },
    greyFont: {
      color: '#D8D8D8'
    },
    whiteFont: {
      color: '#FFF'
    }
})
