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
  ChildSelectionScreen,
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
import { createNotification } from '../libs/supabase/notfication.services';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

/** lib foreground */
ReactNativeForegroundService.register();

const AppNavigator = () => {

  // const [isAuth, setIsAuth] = React.useState(false);
  /** currentSession - accessToken ... */
  const currentUser = useSelector((state) => state.userReducers?.user);

  const session = React.useMemo(() => {
    if (!currentUser) return;
    const { session } = currentUser;
    return session;
  }, [currentUser]);

  // session -> childId -> HomeTabs

  return (
    <Stack.Navigator>
      {session ? (
        <>
          {/**
           * <Stack.Screen
            name="Home"
            component={HomeTabs}
            options={{ headerShown: false }}
          ></Stack.Screen>
           */}
          {/** selection child to assign screen */}
          <Stack.Screen
            name="ChildSelection"
            component={ChildSelectionScreen}></Stack.Screen>
          <Stack.Screen
            name="SingleChild"
            component={SingleChildScreen}
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
  // React.useEffect(() => {
  //   const handleScreenStateChange = async (isScreenOn) => {
  //     const lastScreenState = await AsyncStorage.getItem('lastScreenState');
  //     if (lastScreenState === null || JSON.parse(lastScreenState) !== isScreenOn) {
  //       console.log(`Screen is ${isScreenOn ? 'ON' : 'OFF'}`);
  //       await AsyncStorage.setItem('lastScreenState', JSON.stringify(isScreenOn));
  //     }
  //   };

  //   ReactNativeForegroundService.add_task(
  //     async () => {
  //       PowerManager.isScreenOn(async (isScreenOn) => {

  //         handleScreenStateChange(isScreenOn);

  //         if (isScreenOn) {
  //           // Daily counting logic
  //           const today = new Date().toISOString().split('T')[0];
  //           let lastRecordedDate = await AsyncStorage.getItem('lastRecordedDate');
  //           if (lastRecordedDate !== today) {
  //             await AsyncStorage.setItem('elapsedTime', '0');
  //             await AsyncStorage.setItem('lastRecordedDate', today);
  //             lastRecordedDate = today;
  //           }

  //           let elapsedTime = parseInt(await AsyncStorage.getItem('elapsedTime')) || 0;
  //           elapsedTime += 1;
  //           console.log(elapsedTime);
  //           await AsyncStorage.setItem('elapsedTime', elapsedTime.toString());

  //           const timeLimit = parseInt(await AsyncStorage.getItem('timeLimit')) || 0;
  //           const notificationSent = JSON.parse(await AsyncStorage.getItem('notificationSent'));

  //           // Check timeLimit and Insert Supabase
  //           if (elapsedTime >= timeLimit && timeLimit > 0 && !notificationSent) {
  //             const parentId = '1baf7534-f582-403f-a5ef-f09464b5733e';
  //             const childId = 'b36a72b2-0e6b-4f2e-b530-dc7cb9f3dae6';
  //             const description = 'Time limit reached';
  //             const now = new Date();
  //             const date = now.toLocaleString(); // Convert to local date and time string

  //             console.log('Creating notification with:', { parentId, childId, description, date });
  //             try {
  //               const notificationStatus = await createNotification(parentId, childId, description, date);
  //               await AsyncStorage.setItem('notificationSent', JSON.stringify(true));
  //             } catch (error) {
  //               console.error('Error in notification process:', error);
  //             }
  //           }
  //         }
  //       });
  //     },
  //     {
  //       delay: 1000,
  //       onLoop: true,
  //       taskId: 'elapsedTimeTask',
  //       onError: (e) => console.log('Error logging:', e),
  //     }
  //   );

  //   ReactNativeForegroundService.start({
  //     id: 1244,
  //     title: 'Foreground Service',
  //     message: 'Tracking screen time',
  //     icon: 'ic_launcher',
  //     button: true,
  //     button2: true,
  //     buttonText: 'Stop',
  //     button2Text: 'Cancel',
  //     buttonOnPress: 'stopService',
  //     setOnlyAlertOnce: true,
  //     color: '#000000',
  //     progress: {
  //       max: 100,
  //       curr: 50,
  //     },
  //   });
  //   // return () => {
  //   //   ReactNativeForegroundService.stop();
  //   //   ReactNativeForegroundService.remove_task('elapsedTimeTask');
  //   // };
  // }, []);
  return (
    <Stack.Navigator
      initialRouteName="HomeTabs"
      screenOptions={{
        tabBarLabel: '',
        tabBarIconStyle: { marginTop: 10 },
        tabBarStyle: { padding: 0, margin: 0 },
      }}
    >
      {/** home screen -> usage screen */}
      <Stack.Screen
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
    </Stack.Navigator>
  );
};

export default AppNavigator;
