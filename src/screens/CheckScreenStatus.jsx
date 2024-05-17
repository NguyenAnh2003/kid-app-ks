import React, { useEffect } from 'react';
import { View, Text, NativeEventEmitter, NativeModules } from 'react-native';

const { PowerManager } = NativeModules;

const CheckScreenStatus = () => {
  useEffect(() => {
    const eventEmitter = new NativeEventEmitter(PowerManager);
    const subscription = eventEmitter.addListener('onScreenStatusChanged', (isScreenOn) => {
      console.log(isScreenOn ? 'Screen is on' : 'Screen is off');
    });

    // Cleanup subscription on unmount
    return () => subscription.remove();
  }, []);

  return (
    <View>
      <Text>Screen Status Detection Example</Text>
    </View>
  );
};

export default CheckScreenStatus;
