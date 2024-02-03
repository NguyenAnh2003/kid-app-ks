/**
 * @format
 */

import {AppRegistry} from 'react-native';
import React from 'react';
import App from './App';
import HomeScreen from './src/screens/HomeScreen';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => () => (
  <HomeScreen user={'nguyen anh'} />
));
