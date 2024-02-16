/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import NavBar from './src/navigation/NavBar';
import { Provider } from 'react-redux';
import { configStore, persistor } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import NetInfo from '@react-native-community/netinfo';
import { Alert } from 'react-native';

function App(): React.JSX.Element {
  /** net info https://www.youtube.com/watch?v=QkyU9LYGRsM */
  const unsucbscribe = NetInfo.addEventListener((state) => {
    if (state.isConnected === false) {
      Alert.alert('NO INTERNET CONNECTION');
    }
  });

  useEffect(() => {
    unsucbscribe();
  }, []);

  return (
    <Provider store={configStore}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <NavBar />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
export default App;
