/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { Provider } from 'react-redux';
import { configStore, persistor } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Text } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';

function App(): React.JSX.Element {

  useEffect(() => {
    setInterval(() => {
      console.log('running hahah');
    }, 1000);
  }, [appStateVisible]);

  return (
    <Provider store={configStore}>
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
export default App;