import * as React from 'react';
import { Text, View, Alert, TouchableOpacity } from 'react-native';
import globalStyle from '../styles/globalStyle';
import { supabase } from '../libs/supabase/supabase';
import CustomInput from '../components/CustomInput';
import { registerEmail } from '../libs/supabase/auth.services';

const RegisterScreen = ({ navigation }) => {
  /** states */
  const emailRef = React.useRef();
  const nameRef = React.useRef();
  const countryRef = React.useRef();
  const phoneRef = React.useRef();
  const passwordRef = React.useRef();
  const confirmPassRef = React.useRef();

  const registerHandler = async () => {
    try {
      if (emailRef.current?.getValue() && passwordRef.current?.getValue()) {
        const { session, user } = await registerEmail(
          emailRef.current?.getValue(),
          passwordRef.current?.getValue()
        );

        /** checking session and user if not needed to
         * confirm on mail then move to login
         */
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
            <CustomInput
              ref={nameRef}
              placeHolder="Enter your name"
              type="gmail"
            />
            <CustomInput
              ref={countryRef}
              placeHolder="Your country"
              type="gmail"
            />
            <CustomInput
              ref={phoneRef}
              placeHolder="Your phone number"
              type="gmail"
            />
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