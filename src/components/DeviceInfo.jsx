import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import DeviceInformation from 'react-native-device-info';
import globalStyle from '../styles/globalStyle';

const DeviceInfo = () => {
  const [androidDetails, setAndroidDetails] = useState();

  useEffect(() => {
    /** get android Id */
    const getDeviceInfo = async () => {
      const device = await DeviceInformation.getDeviceName();
      if (device) {
        console.log(device);
        setAndroidDetails(device);
      }
      else setAndroidDetails('');
    };
    getDeviceInfo();
  }, []);

  return (
    <View>
      {androidDetails ? (
        <Text style={globalStyle.text}>Your android Info {androidDetails}</Text>
      ) : (
        <Text>NOPE</Text>
      )}
    </View>
  );
};

export default DeviceInfo;
