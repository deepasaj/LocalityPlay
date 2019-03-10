// @flow

import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

type Props = {};
type State = {
  latitude: number,
  longitude: number,
  latitudeDelta: number,
  longitudeDelta: number
};

export default class App extends Component<Props, State> {
  state = {
    region: {
      latitude: 52.520008,
      longitude: 13.404954,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1
    }
  };

  onMapPress = (event) => {
    const newCoords = event.nativeEvent.coordinate
    this.setState(prevState => ({region: {...prevState.region, latitude: newCoords.latitude, longitude: newCoords.longitude}}))
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView provider={PROVIDER_GOOGLE} style={styles.map} 
                 region={this.state.region} onPress={this.onMapPress}/>
        <Text style={styles.textContainer}>{this.state.region.latitude}</Text>
        <Text style={styles.textContainer}>{this.state.region.longitude}</Text>
        <Text style={styles.textContainer}>{this.state.region.latitudeDelta}</Text>
        <Text style={styles.textContainer}>{this.state.region.longitudeDelta}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   backgroundColor: 'white'
  },
  map: {
    flex: 0.8
  },
  textContainer: {

  }
});
