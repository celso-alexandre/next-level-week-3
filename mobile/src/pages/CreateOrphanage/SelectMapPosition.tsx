import React, { useState } from 'react';
import {
  View, StyleSheet, Dimensions, Text,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import MapView, { MapEvent, Marker } from 'react-native-maps';

import mapMarkerImg from '../../images/map-marker.png';

const SelectMapPosition = () => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const navigation = useNavigation();

  const handleNextStep = () => {
    navigation.navigate('OrphanageData', { latitude, longitude });
  };

  const handleSelectMap = (event: MapEvent) => {
    setLatitude(event.nativeEvent.coordinate.latitude);
    setLongitude(event.nativeEvent.coordinate.longitude);
  };

  return (
    <View style={styles.container}>
      <MapView
        initialRegion={{
          latitude: -27.2092052,
          longitude: -49.6401092,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
        style={styles.mapStyle}
        onPress={handleSelectMap}
      >
        <Marker
          icon={mapMarkerImg}
          coordinate={{ latitude, longitude }}
        />
      </MapView>

      <RectButton
        style={[styles.nextButton, (latitude !== 0 || longitude !== 0 ? {} : (styles.disabledButton))]}
        onPress={handleNextStep}
        enabled={latitude !== 0 || longitude !== 0}
      >
        <Text style={styles.nextButtonText}>Próximo</Text>
      </RectButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },

  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  nextButton: {
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,

    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 40,
  },

  disabledButton: {
    opacity: 0.4,
  },

  nextButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: '#FFF',
  },
});

export default SelectMapPosition;
