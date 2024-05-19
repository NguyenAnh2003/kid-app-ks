import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
/** import screens folder */
import {
  ChildSelectionScreen,
  HomeScreen,
  LoginScreen,
  RegisterScreen,
} from '../screens';
import { useBackgroundTask } from '../hooks';

const Stack = createStackNavigator();

const AppNavigator = () => {
  // const [isAuth, setIsAuth] = React.useState(false);
  /** currentSession - accessToken ... */
  const currentUser = useSelector((state) => state.userReducers?.user);
  const currentChild = useSelector((state) => state.kidReducers?.kid);

  const kidAppData = React.useMemo(() => {
    const { childId, hourUsage, minuteUsage } = JSON.parse(currentChild);
    return { childId, hourUsage, minuteUsage };
  }, [currentChild]);

  const session = React.useMemo(() => {
    if (!currentUser) return;
    const { session } = currentUser;
    return session;
  }, [currentUser]);

  // session -> Assign child mobile -> childId -> HomeStack
  const { childId, parentId } = {
    childId: kidAppData.childId,
    parentId: JSON.parse(currentUser.session).user.id, // parentId taken from session
  };

  return (
    <Stack.Navigator>
      {session ? (
        childId ? (
          <>
            {/**
             *
             */}
            <Stack.Screen
              name="Home"
              component={HomeStack}
              initialParams={{ kidAppData, parentId }}
              options={{ headerShown: false }}
            ></Stack.Screen>
          </>
        ) : (
          <>
            <Stack.Screen
              name="ChildSelection"
              component={ChildSelectionScreen}
            ></Stack.Screen>
          </>
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

const HomeStack = ({ route }) => {
  const { kidAppData, parentId } = route.params;

  const { childId, hourUsage, minuteUsage } = kidAppData;

  /** useBackground hook */
  useBackgroundTask(parentId, childId, hourUsage, minuteUsage);

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarLabel: '',
        tabBarIconStyle: { marginTop: 10 },
        tabBarStyle: { padding: 0, margin: 0 },
      }}
    >
      {/** home screen -> usage screen */}
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
