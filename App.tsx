import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./src/screens/LoginScreen";
import Register from "./src/screens/RegisterScreen";
import ForgotPasswordInputEmail from "./src/screens/ForgotPasswordInputEmail";
import ForgotPasswordInstruction from "./src/screens/ForgotPasswordInstruction";
import ForgotPasswordCreateNewP from "./src/screens/CreateNewPasswordScreen";
import { View, Text, Pressable, TouchableOpacity } from "react-native";
import { Session } from "@supabase/supabase-js";
import { useState, useEffect } from "react";
import { supabase } from "./src/libs/supabase";
import Home from "./src/screens/Home";

<<<<<<< HEAD
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
=======
const Stack = createNativeStackNavigator();

const App = () => {
  const [hideSplashScreen, setHideSplashScreen] = React.useState(true);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const { data: session, error } = await supabase.auth.getSession();
      if (session) {
        setSession(session.session); // Extracting the 'session' property
>>>>>>> d5b78089dda1739b262efc7be6850d0343aebb1a
      } else {
        setSession(null);
      }
      setHideSplashScreen(false);
    };

    fetchSession();

    const authListener = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setSession(session); // Extracting the 'session' property
      } else {
        setSession(null);
      }
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
      authListener.data.subscription.unsubscribe();
    };
  }, []);

  return (
    <>
      {hideSplashScreen ? null : (
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {session ? (
              <Stack.Screen name="Home">
                {props => <Home {...props} session={session} />}
              </Stack.Screen>
            ) : (
              <>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen
                  name="ForgotPasswordInputEmail"
                  component={ForgotPasswordInputEmail}
                />
                <Stack.Screen
                  name="ForgotPasswordInstruction"
                  component={ForgotPasswordInstruction}
                />
                <Stack.Screen
                  name="ForgotPasswordCreateNewP"
                  component={ForgotPasswordCreateNewP}
                />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </>
  );
};

export default App;
