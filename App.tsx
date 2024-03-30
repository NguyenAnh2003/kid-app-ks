import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./src/screens/Login";
import Register from "./src/screens/Register";
import ForgotPasswordInputEmail from "./src/screens/ForgotPasswordInputEmail";
import ForgotPasswordInstruction from "./src/screens/ForgotPasswordInstruction";
import ForgotPasswordCreateNewP from "./src/screens/ForgotPasswordCreateNewP";
import { View, Text, Pressable, TouchableOpacity } from "react-native";
import { Session } from "@supabase/supabase-js";
import { useState, useEffect } from "react";
import { supabase } from "./src/libs/supabase";
import Home from "./src/screens/Home";

const Stack = createNativeStackNavigator();

const App = () => {
  const [hideSplashScreen, setHideSplashScreen] = React.useState(true);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const { data: session, error } = await supabase.auth.getSession();
      if (session) {
        setSession(session.session); // Extracting the 'session' property
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
