import * as React from 'react';
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

import { useState } from 'react';
import { supabase } from '../libs/supabase';
import { Button } from 'react-native-elements';
import CustomInput from '../components/CustomInput';

const RegisterScreen = ({ navigation }) => {
  /** states */
  const emailRef = React.useRef();
  const passwordRef = React.useRef();
  const confirmPassRef = React.useRef();

  const registerHandler = async () => {
    try {
      if (emailRef.current?.getValue() && passwordRef.current?.getValue()) {
        const {
          data: { session, user },
          error,
        } = await supabase.auth.signUp({
          email: emailRef.current?.getValue(),
          password: passwordRef.current?.getValue(),
          options: {
            emailRedirectTo: 'https://example.com/welcome',
          },
        });

        if (error) Alert.alert(error.message);
        if (!session && !user) {
          const alertPedning = async () => {
            Alert.alert(
              'Confirmation',
              'Please check your inbox for email verification!',
              [
                {
                  text: 'ok',
                  onPress: () => {
                    navigation.navigate('SignIn');
                  },
                },
              ]
            );
          };
          await alertPedning();
        }
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };
  return (
    <>
      <View style={[globalStyle.container, { paddingTop: 130 }]}>
        <Text
          style={{
            color: 'black',
            marginBottom: 20,
            fontSize: 30,
            fontWeight: 700,
          }}
        >
          Create ur account
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
            {/** password */}
            <CustomInput
              ref={confirmPassRef}
              placeHolder="Confirm ur password"
              type="password"
            />
          </View>
          {/** submit handler */}
          <TouchableOpacity
            onPress={registerHandler}
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
              Register
            </Text>
          </TouchableOpacity>
          {/** navigate to signup */}
          <View style={{ flexDirection: 'row', marginTop: 15 }}>
            <Text style={{ fontSize: 13, color: 'black', fontWeight: 300 }}>
              Already have an account?{' '}
            </Text>
            <TouchableOpacity
              style={{}}
              onPress={() => {
                navigation.navigate('SignIn');
              }}
            >
              <Text style={{ fontSize: 13, color: 'black', fontWeight: 600 }}>
                Login Now
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

export default RegisterScreen;
