import React, { useEffect, useRef, useState } from 'react';
import {
  Button,
  StyleSheet,
  Image,
  Text,
  View,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import globalStyle from '../styles/globalStyle';
import CustomInput, { InputHandle } from '../components/CustomInput';
import Entypo from 'react-native-vector-icons/Entypo';
import { Form, TextValidator } from 'react-native-validator-form';

const AddChild = ({ navigation }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [mail, setMail] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneInvalid, setPhoneInvalid] = useState(false);
  /**
   * @field avatar
   * @field username
   * @field gmail
   * @field country
   * @field phone numer
   */

  const { navigate } = navigation;

  /** state ; ref */
  const nameRef = useRef();
  const gmailRef = useRef();
  const countryRef = useRef();
  const phoneRef = useRef();

  const imageHandler = async () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setSelectedImage(imageUri);
      }
    });
  };

  const submitHandler = async () => {
    console.log(
      nameRef.current.getValue(),
      gmailRef.current.getValue(),
      phoneRef.current.getValue()
    );
  };

  const validateEmail = (text) => {
    setMail(text);
    console.log(mail);
    regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (regex.test(text)) {
      console.log('valid email');
      setEmailInvalid(false);
    } else {
      setEmailInvalid(true);
      console.log('invalid email');
    }
  };

  const validatePhone = (text) => {
    setPhone(text);
    console.log(phone);
    regex = /^(\+?84|0)(\d{9,10})$/;
    if (regex.test(text)) {
      console.log('valid phone');
      setPhoneInvalid(false);
    } else {
      setPhoneInvalid(true);
      console.log('invalid phone');
    }
  };

  useEffect(() => {
    return () => {
      setSelectedImage('');
    };
  }, []);

  return (
    <View style={[styles.profileContainer, globalStyle.container]}>
      {/** image view */}
      <View style={[styles.profile]}>
        <View style={[styles.avatar]}>
          {/** image uri read from user info fetch from service */}
          <Image
            style={styles.avatarImage}
            resizeMode="cover"
            source={require('../assets/avatar.png')}
          />
          {/** choose image button */}
          <Entypo
            name={'edit'}
            size={20}
            color="black"
            style={styles.avatarEditor}
            onPress={imageHandler}
          />
        </View>
        <Text style={[styles.accountName]}>Nomnom</Text>
      </View>
      {/** from view */}
      <View style={styles.profileInformation}>
        <CustomInput
          style={{}}
          ref={nameRef}
          type="text"
          placeHolder="Enter your name"
        />
        <CustomInput
          ref={gmailRef}
          placeHolder="Enter your email"
          type="mail"
          value={mail}
          onChangeText={validateEmail}
        />
        {emailInvalid && <Text style={{ color: 'red' }}>Invalid input</Text>}
        <CustomInput
          ref={countryRef}
          type="text"
          placeHolder="Enter your address"
        />
        <CustomInput
          ref={phoneRef}
          type="phone"
          placeHolder="Enter your phone"
          value={phone}
          onChangeText={validatePhone}
        />
        {phoneInvalid && <Text style={{ color: 'red' }}>Invalid input</Text>}
        {/** save button */}
        <TouchableOpacity
          style={{
            backgroundColor: 'black',
            padding: 10,
            alignSelf: 'flex-end',
            borderRadius: 5,
          }}
          onPress={submitHandler}
        >
          <Text style={{ color: '#fff', fontSize: 15, fontWeight: 700 }}>
            Save
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  alignCenter: {
    display: 'flex',
    flexDirection: 'row',
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  avatar: {
    position: 'relative',
  },

  avatarImage: {
    width: 120,
    height: 120,
    borderRadius: 90,
  },

  avatarEditor: {
    padding: 3,
    paddingLeft: 5,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#333',
  },

  accountName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    marginLeft: 20,
  },
  profileInformation: {
    flex: 1,
    flexDirection: 'column',
    gap: 10,
  },
});

export default AddChild;
