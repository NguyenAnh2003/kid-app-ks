import * as React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  Padding,
  Border,
  Color,
  FontSize,
  FontFamily,
} from '../styles/globalStyle';
import { useState } from 'react';
import { supabase } from '../libs/supabase';
const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    console.log(error);
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      {/* navigate */}
      <View style={styles.com_navigate}>
        <View>
          <Text style={[styles.text_navigate, styles.text_navigate_choose]}>
            Login
          </Text>
        </View>
        <Pressable onPress={() => navigation.navigate('Register')}>
          <Text style={styles.text_navigate}>Register</Text>
        </Pressable>
      </View>
      {/*Logo  */}
      <View style={styles.con_title}>
        <Text style={styles.title}>Welcome to my App</Text>
      </View>
      {/* Form input */}
      <View style={styles.form}>
        <View style={styles.form_input}>
          <Image
            style={styles.form_input_icon}
            resizeMode="contain"
            source={require('../assets/vector2.png')}
          />
          <View>
            <TextInput
              value={email}
              autoCapitalize={'none'}
              onChangeText={(text) => {
                setEmail(text);
              }}
              style={styles.form_input_text}
              placeholder="Email/NumberPhone"
            ></TextInput>
          </View>
        </View>
        <View style={styles.form_input}>
          <Image
            style={styles.form_input_icon}
            resizeMode="contain"
            source={require('../assets/vector3.png')}
          />
          <View>
            <TextInput
              value={password}
              secureTextEntry={true}
              autoCapitalize={'none'}
              onChange={(text) => {
                setPassword(text);
              }}
              style={styles.form_input_text}
              placeholder="Password"
            ></TextInput>
          </View>
        </View>
        <View style={styles.forgot_pass}>
          <Pressable
            onPress={() => navigator.navigate('ForgotPasswordInputEmail')}
          >
            <Text style={styles.forgot_pass_text}> Forgot your password?</Text>
          </Pressable>
        </View>
        <View style={styles.com_btn}>
          <Pressable onPress={() => signInWithEmail()}>
            <Text style={styles.btn_text}>Login</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    padding: 12,
  },
  com_navigate: {
    flexDirection: 'row',
  },
  text_navigate: {
    FontFamily: FontFamily.interSemiBold14,
    color: Color.colorLightGrey8D8D8D,
    padding: 12,
    borderRadius: Border.br_7xs,
    marginLeft: 5,
  },
  text_navigate_choose: {
    borderColor: Color.colorLightBlue0D53FC,
    borderWidth: 1,
    color: Color.colorLightBlue0D53FC,
  },
  con_title: {
    marginTop: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#333', // You can adjust the color as needed
  },
  form: {
    marginTop: 100,
    flexDirection: 'column',
  },
  form_input: {
    flexDirection: 'row',
    margin: 5,
    padding: 5,
    backgroundColor: Color.neutralWhiteFFFFFF,
    borderWidth: 0.5,
    borderColor: Color.colorLightGrey8D8D8D,
  },
  form_input_icon: {
    width: 40,
    height: 30,
    marginTop: 8,
  },
  form_input_text: {
    fontSize: 20,
    marginLeft: 10,
  },
  forgot_pass: {
    marginTop: 30,
  },
  forgot_pass_text: {
    fontSize: 18,
    textAlign: 'right',
    color: Color.colorLightBlue0D53FC,
  },
  com_btn: {
    marginTop: 30,
    backgroundColor: Color.colorLightBlue0D53FC,
    borderRadius: Border.br_7xs,
    padding: 20,
  },
  btn_text: {
    textAlign: 'center',
    fontSize: 18,
    color: Color.neutralWhiteFFFFFF,
  },
  text_other: {
    marginTop: 20,
  },
  text_other_login: {
    textAlign: 'center',
    fontSize: 18,
  },
  com_social: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    width: ' 100%',
    justifyContent: 'space-evenly',
  },
  com_social_icon: {},
});

export default Login;
