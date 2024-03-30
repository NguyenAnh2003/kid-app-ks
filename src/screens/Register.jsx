import * as React from "react";
import { Image, StyleSheet, Text, View, Pressable, TextInput, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Padding, FontFamily, FontSize, Color, Border } from "../../GlobalStyles";
import { useState } from "react";
import { supabase } from '../libs/supabase'
import { Button } from "react-native-elements";
const Register = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm_pass, setConfirmPass] = useState('')
  const [loading, setLoading] = useState(false)


  async function signUpWithEmail() {
    setLoading(true)
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        emailRedirectTo: 'https://example.com/welcome',
      },
    })

    if (error) Alert.alert(error.message)
    if (!session) Alert.alert('Please check your inbox for email verification!')
    setLoading(false)
  }
  return (
    <>
      <View style={styles.container}>
        {/* navigate */}
        <View style={styles.com_navigate} >
          <Pressable
            onPress={() => navigation.navigate("Login")}>
            <Text style={styles.text_navigate}>Login</Text>
          </Pressable>
          <View>
            <Text style={[styles.text_navigate, styles.text_navigate_choose]} >Register</Text>
          </View>
        </View>
        {/*Logo  */}
        <View style={styles.con_title}>
          <Text style={styles.title}>
            Create your account now!
          </Text>
        </View>
        {/* Form input */}
        <View>
          <View style={styles.form}>
            <View style={styles.form_input}>
              <Image
                style={styles.form_input_icon}
                resizeMode="contain"
                source={require("../assets/vector2.png")}
              />
              <View>
                <TextInput value={email} onChange={() => { setEmail(email) }} style={styles.form_input_text} placeholder="Email/NumberPhone">

                </TextInput>
              </View>
            </View>
            <View style={styles.form_input}>
              <Image
                style={styles.form_input_icon}
                resizeMode="contain"
                source={require("../assets/vector3.png")}
              />
              <View>
                <TextInput value={password} onChange={() => { setPassword(password) }} style={styles.form_input_text} placeholder="Password">

                </TextInput>
              </View>
            </View>
            <View style={styles.form_input}>
              <Image
                style={styles.form_input_icon}
                resizeMode="contain"
                source={require("../assets/vector3.png")}
              />
              <View>
                <TextInput value={confirm_pass} onChange={() => { setConfirmPass(confirm_pass) }} style={styles.form_input_text} placeholder="Confirm Password">

                </TextInput>
              </View>
            </View>

            <View style={styles.com_btn}>
              <Pressable
                onPress={() => signUpWithEmail()}
              >
                <Text style={styles.btn_text}>
                  Register
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
        {/* Login khác */}
        <View style={styles.text_other}>
          <Text style={styles.text_other_login}>
            Or login by social media
          </Text>
        </View>
        <View style={styles.com_social}>

          <View style={styles.com_social_icon}>
            <Image

              resizeMode="contain"
              source={require("../assets/facebook.png")}
            />
          </View>
          <View style={styles.com_social_icon}>
            <Image

              resizeMode="contain"
              source={require("../assets/icon--button--google-plus.png")}
            />
          </View>

        </View>
      </View>
    </>
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
    marginLeft: 5
  },
  text_navigate_choose: {
    borderColor: Color.colorLightBlue0D53FC,
    borderWidth: 1,
    color: Color.colorLightBlue0D53FC,
  },
  con_title: {
    marginTop: 30,
  },
  title: {
    fontSize: 33,
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#333', // You can adjust the color as needed
  },
  form: {
    marginTop: 80,
    flexDirection: 'column'
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
    marginTop: 8
  },
  form_input_text: {
    fontSize: 20,
    marginLeft: 10
  },
  forgot_pass: {
    marginTop: 30
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
    padding: 20
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
    fontSize: 18
  },
  com_social: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    width: ' 100%',
    justifyContent: 'space-evenly',
  },
  com_social_icon: {
  }
});

export default Register;
