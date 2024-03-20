import * as React from 'react';
/** bottom tab */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
/** stack screen */
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';

/** Screen */
import { AccountScreen, CreateChildScreen, HomeScreen, SingleChildScreen } from '../screens';

/** icons */
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

/** stack setup */
const Stack = createStackNavigator();

/** tab setup */
const Tab = createBottomTabNavigator();

/** home navigator */
const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="SingleChild" component={SingleChildScreen} />
      <Stack.Screen name="AddChild" component={CreateChildScreen} />
    </Stack.Navigator>
  );
};

const NavBar = (props) => {
  /** App navigator - nav bar */
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarLabel: '',
        tabBarIconStyle: { marginTop: 10 },
        tabBarStyle: { padding: 0, margin: 0 },
      }}
    >
      {/** home screen */}
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons
              name={focused ? 'account-child' : 'account-child-outline'}
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

export default NavBar;
