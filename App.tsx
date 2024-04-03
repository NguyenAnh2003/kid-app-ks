/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import NavBar from './src/navigation/NavBar';
import { Provider } from 'react-redux';
import { configStore, persistor } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import NetInfo from '@react-native-community/netinfo';
import { AppState } from 'react-native';
import { Alert, Text } from 'react-native';
import { NativeModules, Linking } from 'react-native';

function App(): React.JSX.Element {
  /** net info using USB to connect phone (using adb connect not working) */
  // const unsucbscribe = NetInfo.addEventListener((state) => {
  //   if (state.isConnected === false) {
  //     Alert.alert('NO INTERNET CONNECTION');
  //   } else {
  //     Alert.alert("CONNECTED")
  //   }
  // });

  // useEffect(() => {
  //   unsucbscribe();
  // }, []);

  /** open settings */
  // Linking.openSettings()

  /** app state */
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [usageList, setUsageList] = useState();
  const [eusage, setEUsage] = useState();

  useEffect(() => {
    /** check current app state func activate
     * this function when having change */
    const { UsageStats } = NativeModules;

    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('App come to foreground and move to active');
      } else {
        console.log(`Current state ${nextAppState}`);
      }
      appState.current = nextAppState; //
      setAppStateVisible(appState.current);
    });

    /** check permission */
    const checkPermission = async () => {
      const isGranted = await UsageStats.checkUsageDataAccess();
      console.log('permission isGranted', isGranted);
    };

    /** call usage stats function */
    console.log('const', UsageStats.getConstants());
    checkPermission(); // permission isGranted

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <Provider store={configStore}>
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
        <NavigationContainer>
          <NavBar />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
export default App;