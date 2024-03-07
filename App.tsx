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

const { UsageStats } = NativeModules;

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

  useEffect(() => {
    /** check current app state func activate
     * this function when having change */
    /** get usage list */
    const getUsageList = async () => {
      const startTime = 1647388800000; // 24 hours ago
      const endTime = 1647475200000;

      const result = await UsageStats.getUsagesList(
        UsageStats.INTERVAL_DAILY,
        startTime,
        endTime
      );

      return result;
    };

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

    /** usage stats function */
    const usageStats = async () => {
      await UsageStats.testUsage()
        .then((stats: any) => {
          console.log(stats);
        })
        .catch((err: any) => {
          console.log(err);
        });
    };

    /** call usage stats function */
    usageStats(); //

    const usageList = getUsageList();
    console.log('haha', usageList);

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
