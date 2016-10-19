import React, { Component } from 'react'
import { View, ScrollView, Text, StyleSheet, Image } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { getTheme, setTheme,
  MKButton, MKColor, 
  MKProgress, MKSpinner, MKSwitch, MKIconToggle,
  MKTextField
 } from 'react-native-material-kit'

// Material Design Kit: https://github.com/xinthink/react-native-material-kit
// RNMK Demo App: https://github.com/xinthink/rnmk-demo

const theme = getTheme();

// setTheme({checkboxStyle: {
//   fillColor: MKColor.Teal,
//   borderOnColor: MKColor.Teal,
//   borderOffColor: MKColor.Teal,
//   rippleColor: `rgba(${MKColor.RGBTeal},.15)`,
// }});

export default class DemoMaterialKitScene extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    // const SliderWithValue = mdl.Slider.slider()
    //       .withStyle(styles.slider)
    //       .withMin(10)
    //       .withMax(100)
    //       .build();
          
    // const SliderWithRange = mdl.RangeSlider.slider()
    //       .withStyle(styles.slider)
    //       .withMin(10)
    //       .withMax(100)
    //       .withMinValue(30)
    //       .withMaxValue(50)
    //       .build();

    // const Textfield = MKTextField.textfield()
    //   .withPlaceholder('Text...')
    //   .withStyle(styles.textfield)
    //   .build();

    const menu = (
      <MKIconToggle
        checked={true}
        onCheckedChange={this._onIconChecked}
        onPress={this._onIconClicked}
        >
        <Text pointerEvents="none"
              style={styles.toggleTextOff}>Off</Text>
        <Text state_checked={true}
              pointerEvents="none"
              style={[styles.toggleText, styles.toggleTextOn]}>On</Text>
      </MKIconToggle>
    )

    const button = (
        <MKButton
            backgroundColor={MKColor.Teal}
            shadowRadius={2}
            shadowOffset={{width:0, height:2}}
            shadowOpacity={.7}
            shadowColor="black"
            onPress={() => {
              console.log('hi, raised button!');
            }}
          >
          <Text pointerEvents="none"
                style={{color: 'white', fontWeight: 'bold',}}>
            RAISED BUTTON
          </Text>
        </MKButton>
    )

    const card = (
      <View style={theme.cardStyle}>
          <Image source={{uri : 'https://pilze.rh-flow.de/thumbnails/Alkalischer%20Saftling.jpg'}} style={theme.cardImageStyle} />
          <Text style={theme.cardTitleStyle}>Welcome</Text>
          <Text style={theme.cardContentStyle}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Mauris sagittis pellentesque lacus eleifend lacinia...
          </Text>
          <View style={theme.cardMenuStyle}>{menu}</View>
          <Text style={theme.cardActionStyle}>My Action</Text>
        </View>
    )

    const progress = (
      <MKProgress
          style={styles.progress}
          progress={0.2}
        />
    )

    const spinner = (
      <MKSpinner />
    )

    // const sliderWithValue = (
    //     <SliderWithValue
    //       ref="sliderWithValue"
    //       onChange={(curValue) => this.setState({curValue})}
    //     />
    // )

    // const sliderWithRange = (
    //     <SliderWithRange
    //       ref="sliderWithRange"
    //       onChange={(curValue) => this.setState({
    //         min: curValue.min,
    //         max: curValue.max,
    //         })
    //       }
    //       onConfirm={(curValue) => {
    //         console.log("Slider drag ended");
    //         console.log(curValue);
    //       }}
    //     />
    // )

    const textfield = (
        <MKTextField
          tintColor={MKColor.Lime}
          textInputStyle={{color: MKColor.Orange}}
          placeholder="Text…"
          style={styles.textfield}
        />
    )

    const icontoggle = (
        <MKIconToggle
          checked={true}
          onCheckedChange={this._onIconChecked}
          onPress={this._onIconClicked}
        >
          <Text
            pointerEvents="none"
            style={styles.toggleTextOff}>Off</Text>
          <Text state_checked={true}
                pointerEvents="none"
                style={[styles.toggleText, styles.toggleTextOn]}>On</Text>
        </MKIconToggle>
    )

    const switcho = (
        <MKSwitch
          style={styles.appleSwitch}
          onColor="rgba(255,152,0,.3)"
          thumbOnColor={MKColor.Orange}
          rippleColor="rgba(255,152,0,.2)"
          onPress={() => console.log('orange switch pressed')}
          onCheckedChange={(e) => console.log('orange switch checked', e)}
        />
    )

    return (
        <ScrollView style={styles.container}>
          <View style={styles.box}>{button}</View>
          <View style={styles.box}>{card}</View>
          <View style={styles.box}>{progress}</View>
          <View style={styles.box}>{spinner}</View>
          {/*<View style={styles.box}>{sliderWithValue}</View>
          <View style={styles.box}>{sliderWithRange}</View>*/}
          <View style={styles.box}>{textfield}</View>
          <View style={styles.box}>{icontoggle}</View>
          <View style={styles.box}>{switcho}</View>
      </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  box: {
    //height:300
    borderTopWidth: 1,
    borderColor: 'black',
    padding: 10
  },
  container: {
    flex: 1, 
    flexDirection: 'column',
    marginTop: 50
  }
})
