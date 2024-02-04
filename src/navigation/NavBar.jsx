import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Home';
import Account from '../screens/Account';

const Tab = createBottomTabNavigator();

const NavBar = (props) => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  );
};

export default NavBar;
