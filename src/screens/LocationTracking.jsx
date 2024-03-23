import React, { useEffect, useState } from 'react';
import globalStyle from '../styles/globalStyle';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { View, StyleSheet, Text, PermissionsAndroid, Alert } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { check, request } from 'react-native-permissions';

const LocationTracking = () => {
  const [region, setRegion] = useState(null);

  useEffect(() => {

    // Request location permission
    const requestLocationPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Permission',
              message: 'This app needs access to your location.',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // If permission granted, get current location
          Geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              console.log(position.coords);
              setRegion({
                latitude, 
                longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              });
            },
            (error) => console.error(error),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
          );
        } else {
          Alert.alert("Location permission denied","Kiểm tra trong cài đặt")
        }
      } catch (err) {
        console.warn(err);
      }
    };

    requestLocationPermission();

    // Cleanup function
    return () => {
      // Clear watch position if any
      Geolocation.clearWatch();
    };
  }, []);

  return (
    <View style={globalStyle.container}>
      <Text style={globalStyle.h1}>Map</Text>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={StyleSheet.absoluteFill}
        region={region}
      >
        {region && (
          <Marker
            coordinate={{
              latitude: region.latitude,
              longitude: region.longitude,
            }}
            title="Current Location"
          />
        )}
      </MapView>
    </View>
  );
};

export default LocationTracking;