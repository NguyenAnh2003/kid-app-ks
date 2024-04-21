import { View, Text, ActivityIndicator } from 'react-native';
import React from 'react';

const SplashScreen = () => {
  /** loading screen */
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignContent: 'center',
      }}
    >
      <ActivityIndicator size={'large'} />
      <Text>SplashScreen</Text>
    </View>
  );
};

export default SplashScreen;
