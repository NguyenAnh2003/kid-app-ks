import * as React from 'react';
/** bottom tab */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
/** stack screen */
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';

/** Screen */
import {
  AccountScreen,
  CreateChildScreen,
  HomeScreen,
  SingleChildScreen,
} from '../screens';

/** icons */
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { IconButton } from 'react-native-paper';

/** stack setup */
const Stack = createStackNavigator();

/** tab setup */
const Tab = createBottomTabNavigator();

/** home navigator */
const HomeStack = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Yourfamily"
        component={HomeScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="SingleChild"
        component={SingleChildScreen}
        options={{
          headerTitleStyle: { fontSize: 15, fontWeight: '100' },
          headerLeft: () => (
            <IconButton
              icon="arrow-left"
              onPress={() => navigation.goBack()}
              color="#fff" // Change color according to your design
            />
          ),
        }}
      />
      <Stack.Screen
        name="AddChild"
        component={CreateChildScreen}
        options={{
          headerLeft: () => (
            <IconButton
              icon="arrow-left"
              onPress={() => navigation.goBack()}
              color="#fff" // Change color according to your design
            />
          ),
        }}
      />
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

export default NavBar;
