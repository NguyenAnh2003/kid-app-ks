import React, { useEffect, useState } from 'react';
import globalStyle from '../styles/globalStyle';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { View, StyleSheet, Text, PermissionsAndroid, Alert } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { check, request } from 'react-native-permissions';
import io from 'socket.io-client';
const socket = io.connect('http://192.168.1.13:3001/');

const ChildTest = () => {
  const [region, setRegion] = useState(null);

  useEffect(() => {
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
          Geolocation.watchPosition(
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
    
    // cleanup function
    return () => {
      // clear watch position if any
      Geolocation.clearWatch();
    };
  }, []);

  
  console.log("childtest:" ,region);
  socket.on('requestLocationToSpecificDevice',(childId)=>{
    console.log(childId+" may child");
    if(childId=="id1"){
      socket.emit('locationChild',region)
    }
    else if(childId=="id2"){
      const testregion={
        latitude:10, 
        longitude:10,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
      socket.emit('locationChild',testregion)
  }
  });
    useEffect(()=>{
      console.log("childtest trong hook:" ,region);
      socket.on('requestLocationToSpecificDevice',(childId)=>{
        console.log(childId+" may child");
        if(childId=="id1"){
          socket.emit('locationChild',region)
        }
        else if(childId=="id2"){
          const testregion={
            latitude:10, 
            longitude:10,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          };
          socket.emit('locationChild',testregion)
      }
      });
        }, [region])
  return (
    <View style={globalStyle.container}>
      <Text style={globalStyle.h1}></Text>
    </View>
  );
};

export default ChildTest;
