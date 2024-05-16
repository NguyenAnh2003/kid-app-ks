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
  EditChildScreen,
  HomeScreen,
  LoginScreen,
  RegisterScreen,
  SingleChildScreen,
} from '../screens';
import LocationTracking from '../screens/LocationTracking';
const Tab = createBottomTabNavigator(); // tab bar
const Stack = createStackNavigator(); // stack navigator

const AppNavigator = () => {

  /** currentSession - accessToken ... */
  const currentUser = useSelector((state) => state.userReducers?.user);

  const session = React.useMemo(() => {
    if (!currentUser) return;
    const { session } = currentUser;
    return session;
  }, [currentUser]);

  return (
    <Stack.Navigator>
      {session ? (
        <>
          <Stack.Screen
            name="Home"
            component={HomeTabs}
            options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="SingleChild"
            component={SingleChildScreen}
          ></Stack.Screen>
          <Stack.Screen
            name="AddChild"
            component={AddChildScreen}
          ></Stack.Screen>
          <Stack.Screen
            name="EditChild"
            component={EditChildScreen}
          ></Stack.Screen>
          <Stack.Screen
            name="LocationTracking"
            component={LocationTracking}
          ></Stack.Screen>
        </>
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
      {/** location screen */}
      {/* <Tab.Screen
        name="Location tracking"


        // lưu ý
        // truyền list id lấy từ database ở đây, t đang truyền 2 cái id1 và id2 đấy
        // đoạn này bị warning, kh rõ truyền cái list id ở đây ổn không

        component={() => <ListChildToTrack items={["id1","id2"]}/>}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons
              name={focused ? 'map' : 'map-outline'}
              size={24}
              color={'black'}
            />
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
};

export default AppNavigator;
