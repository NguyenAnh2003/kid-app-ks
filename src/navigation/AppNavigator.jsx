import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';

/** import screens folder */
import {
  AccountScreen,
  AddChildScreen,
  HomeScreen,
  LoginScreen,
  RegisterScreen,
} from '../screens';
import SplashScreen from '../screens/SplashScreen';

const Tab = createBottomTabNavigator(); // tab bar
const Stack = createStackNavigator(); // stack navigator

const AppNavigator = () => {
  // const [isAuth, setIsAuth] = React.useState(false);
  /** currentSession - accessToken ... */
  const currentUser = useSelector((state) => state.userReducers?.user);
  const isFetching = useSelector((state) => state.loadingReducers);
  

  const session = React.useMemo(() => {
    if (!currentUser) return;
    const { session } = currentUser;
    return session;
  }, [currentUser]);

  return (
    <Stack.Navigator>
      {session ? (
        !isFetching ? (
          <Stack.Screen
            name="Home"
            component={HomeTabs}
            options={{ headerShown: false }}
          ></Stack.Screen>
        ) : (
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{ headerShown: false }}
          ></Stack.Screen>
        )
      ) : (
        <>
          <Stack.Screen
            name="SignIn"
            component={LoginScreen}
            options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="SignUp"
            component={RegisterScreen}
            options={{ headerShown: false }}
          ></Stack.Screen>
        </>
      )}
    </Stack.Navigator>
  );
};

const HomeTabs = (props) => {
  return (
    <Tab.Navigator
      initialRouteName="HomeTabs"
      screenOptions={{
        tabBarLabel: '',
        tabBarIconStyle: { marginTop: 10 },
        tabBarStyle: { padding: 0, margin: 0 },
      }}
    >
      {/** home screen */}
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={24}
              color={'black'}
            />
          ),
        }}
      />
      {/** account screen */}
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons
              name={focused ? 'account' : 'account-outline'}
              size={24}
              color={'black'}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
