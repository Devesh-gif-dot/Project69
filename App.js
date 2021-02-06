import React, { Component } from 'react';
import { Text, View, StyleSheet, Button,Image } from 'react-native';
import Constants from 'expo-constants';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import {BarCodeScanner} from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';

export default class App extends Component {
  constructor(){
    super();
    this.state = {
      hasCameraPermission: null,
      scanned:false,
      scannedData:'',
      buttonState:'normal'
    };
  }

  getCamerPermission = async () => {
    const {status} = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission:status==="granted",
      buttonState :'clicked',
      scanned:false
    }) 
  }
  handleBarCodeScanned = async({type,data}) => {
    this.setState({
      scanned:true,
      buttonState:'normal',
      scannedData:data
    })
  }

  
  render() {
    const hasCameraPermission = this.state.hasCameraPermission;
    const scanned = this.state.scanned;
    const buttonState = this.state.buttonState;

    if(hasCameraPermission && buttonState==='clicked')
    {
      return (
        <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />)
    }


    return (
      <View style={{ flex: 1 }}>
      <Text style={styles.text}> QR and BAR Code Scanner</Text>
        <Image 
        style={styles.image} 
        source={require("./scan.png")} />
        <Button title='Bar & QR Code Scanner' onPress={this.getCamerPermission} />
        <Text>{this.state.scannedData}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image:{
    alignSelf:"center",
    width:100,
    height:100,
    marginTop:30,
    marginBottom:40
  },
  text:{
    color:'red',
    fontSize:25,
    alignSelf:'center'
  }
})
