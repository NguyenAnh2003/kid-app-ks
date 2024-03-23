import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Account from '../screens/Account';
import LocationTracking from '../screens/LocationTracking';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CreateSthScreen from '../screens/CreateSthScreen';

const Tab = createBottomTabNavigator();

const NavBar = (props) => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarLabel: '',
        tabBarIconStyle: { marginTop: 10 },
        tabBarStyle: { padding: 0, margin: 0 },
      }}
    >
      {/** home screen */}
      <Tab.Screen
        name="Home"
        component={Home}
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
      {/** location screen */}
      <Tab.Screen
        name="Location tracking"
        component={LocationTracking}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons
              name={focused ? 'map' : 'map-outline'}
              size={24}
              color={'black'}
            />
          ),
        }}
      />
      {/** create something screen */}
      <Tab.Screen
        name="Create"
        component={CreateSthScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'add-circle' : 'add-circle-outline'}
              size={24}
              color={'black'}
            />
          ),
        }}
      />
      {/** account screen */}
      <Tab.Screen
        name="Account"
        component={Account}
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
