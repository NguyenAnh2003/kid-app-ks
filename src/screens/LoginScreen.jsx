import {
  Image,
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
} from 'react-native';
import globalStyle from '../styles/globalStyle';
import { useReducer, useRef, useState } from 'react';
import { supabase } from '../libs/supabase/supabase';
import CustomInput from '../components/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../redux/actions/actions';
import { loginEmail } from '../libs/supabase/auth.services';

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
        const { session, user } = await loginEmail(
          emailRef.current?.getValue(),
          passwordRef.current?.getValue()
        );
        if (session && user) {
          dispatch(userLogin(JSON.stringify(session)));
        }
      }
    } catch (error) {
      Alert.alert();
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
              navigation.navigate('SignUp');
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
