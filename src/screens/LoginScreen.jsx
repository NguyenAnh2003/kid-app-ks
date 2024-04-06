import {
  Image,
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import globalStyle, {
  Padding,
  Border,
  Color,
  FontSize,
  FontFamily,
} from '../styles/globalStyle';
import { useReducer, useRef, useState } from 'react';
import { supabase } from '../libs/supabase';
import CustomInput from '../components/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../redux/actions/actions';

const styles = StyleSheet.create({});

const LoginScreen = ({ navigation }) => {
  /** */
  const dispatch = useDispatch();
  const passwordRef = useRef();
  const emailRef = useRef();
  const currentSession = useSelector((state) => state.userReducers?.user);

  const loginHandler = async () => {
    try {
      if (emailRef.current.getValue() && passwordRef.current.getValue()) {
        const {
          error,
          data: { session, user },
        } = await supabase.auth.signInWithPassword({
          email: emailRef.current?.getValue(),
          password: passwordRef.current?.getValue(),
        });
        if (session && user) {
          dispatch(userLogin(JSON.stringify(session)));
        }
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <View style={[globalStyle.container, { paddingTop: 130 }]}>
      <Text
        style={{
          color: 'black',
          marginBottom: 20,
          fontSize: 30,
          fontWeight: 700,
        }}
      >
        Welcome Back
      </Text>
      {/** input */}
      <View style={{ flexDirection: 'column', gap: 10 }}>
        <View style={{ flexDirection: 'column', gap: 10 }}>
          {/** email */}
          <CustomInput
            ref={emailRef}
            placeHolder="Enter your email"
            type="gmail"
          />
          {/** password */}
          <CustomInput
            ref={passwordRef}
            placeHolder="Your password"
            type="password"
          />
        </View>
        {/** forgot password */}
        <TouchableOpacity
          style={{ alignItems: 'flex-end', marginVertical: 12 }}
        >
          <Text style={{ fontSize: 13, color: 'black', fontWeight: 600 }}>
            Forgot password?
          </Text>
        </TouchableOpacity>
        {/** submit handler */}
        <TouchableOpacity
          onPress={loginHandler}
          style={{
            backgroundColor: 'black',
            padding: 10,
            borderRadius: 5,
          }}
        >
          <Text
            style={{
              color: '#ffff',
              textAlign: 'center',
              fontSize: 15,
              fontWeight: 700,
            }}
          >
            Login
          </Text>
        </TouchableOpacity>
        {/** navigate to signup */}
        <View style={{ flexDirection: 'row', marginTop: 15 }}>
          <Text style={{ fontSize: 13, color: 'black', fontWeight: 300 }}>
            Don't have an account?{' '}
          </Text>
          <TouchableOpacity
            style={{}}
            onPress={() => {
              // navigation.navigate('SignUp');
              console.log(currentSession ? currentSession : 'NOPE');
            }}
          >
            <Text style={{ fontSize: 13, color: 'black', fontWeight: 600 }}>
              Signup Now
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
