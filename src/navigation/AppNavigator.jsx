import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import ListChildToTrack from '../screens/ListChildToTrack';
import ChildTest from '../screens/ChildTest';
/** import screens folder */
import {
  AccountScreen,
  AddChildScreen,
  EditChildScreen,
  HomeScreen,
  LoginScreen,
  RegisterScreen,
  SingleChildScreen,
  StateApp,
} from '../screens';
import ReactNativeForegroundService from '@supersami/rn-foreground-service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SetOnScreenTimeLimit from '../screens/SetOnScreenTimeLimit';
import { NativeModules } from 'react-native';
const { PowerManager } = NativeModules;

const Tab = createBottomTabNavigator(); // tab bar
const Stack = createStackNavigator(); // stack navigator

/** lib foreground */
ReactNativeForegroundService.register();

const AppNavigator = () => {
  React.useEffect(() => {
    ReactNativeForegroundService.add_task(
      async () => {
        PowerManager.isScreenOn(async (isScreenOn) => {
          if (isScreenOn) {
            let elapsedTime = parseInt(await AsyncStorage.getItem('elapsedTime')) || 0;
            elapsedTime += 1;
            await AsyncStorage.setItem('elapsedTime', elapsedTime.toString());
            console.log('Elapsed Time:', elapsedTime);
          }
        });
      },
      {
        delay: 1000,
        onLoop: true,
        taskId: 'elapsedTimeTask',
        onError: (e) => console.log('Error logging:', e),
      }
    );

    ReactNativeForegroundService.start({
      id: 1244,
      title: 'Foreground Service',
      message: 'Tracking screen time',
      icon: 'ic_launcher',
      button: true,
      button2: true,
      buttonText: 'Stop',
      button2Text: 'Cancel',
      buttonOnPress: 'stopService',
      setOnlyAlertOnce: true,
      color: '#000000',
      progress: {
        max: 100,
        curr: 50,
      },
    });
    // return () => {
    //   ReactNativeForegroundService.stop();
    //   ReactNativeForegroundService.remove_task('elapsedTimeTask');
    // };
  }, []);

  // const [isAuth, setIsAuth] = React.useState(false);
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
      <Tab.Screen
        name="Location tracking"
        // lưu ý
        // truyền list id lấy từ database ở đây, t đang truyền 2 cái id1 và id2 đấy
        // đoạn này bị warning, kh rõ truyền cái list id ở đây ổn không

        component={() => <ListChildToTrack items={['id1', 'id2']} />}
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
      {/** test screen */}
      <Tab.Screen
        name="ChildTest"
        component={ChildTest}
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
      <Tab.Screen
        name="TimeLimitTest"
        component={SetOnScreenTimeLimit}
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
    </Tab.Navigator>
  );
};

export default AppNavigator;
