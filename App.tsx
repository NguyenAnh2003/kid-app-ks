/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NavBar from './src/navigation/NavBar';
import { Provider } from 'react-redux';
import store from './src/redux/store.config';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <NavBar />
      </NavigationContainer>
    </Provider>
  );
}
export default App;
