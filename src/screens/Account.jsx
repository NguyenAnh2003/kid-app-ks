import React, { useEffect, useReducer, useRef, useState } from 'react';
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

/** reducer
 * username
 * gmail
 * country
 * phone
 */
const reducer = (state, action) => {
  switch (action.type) {
    case 'USER_DATA':
      /** return fetched data from api */
      return {
        username: action.payload.username,
        gmail: action.payload.gmail,
        country: action.payload.country,
        phone: action.payload.phone,
      };

    default:
      return state;
  }
};

const Account = ({ navigation }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [state, dispatch] = useReducer(reducer, {
    avatar: '',
    username: '',
    gmail: '',
    country: '',
    phone: '',
  });

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

  setTimeout(() => {
    const data = {
      avatar: '',
      username: 'nguyen anh',
      gmail: 'cunho@gmail.com',
      country: 'DN',
      phone: '01234567',
    };
    dispatch({ type: 'USER_DATA', payload: data });
  }, 2000);

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
    /**
     * @param name
     * @param gmail
     * @param country
     * @param phone
     */

    console.log({
      /** name */
      name: nameRef.current.getValue()
        ? nameRef.current.getValue()
        : state.username,
      /** gmail */
      gmail: gmailRef.current.getValue()
        ? gmailRef.current.getValue()
        : state.gmail,
      /** country */
      country: countryRef.current.getValue()
        ? countryRef.current.getValue()
        : state.country,
      /** phone */
      phone: phoneRef.current.getValue()
        ? phoneRef.current.getValue()
        : state.phone,
    });
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
          ref={nameRef}
          defauleVal={state && state.username}
          type="text"
        />
        <CustomInput
          ref={gmailRef}
          defauleVal={state && state.gmail}
          type="gmail"
        />
        <CustomInput
          ref={countryRef}
          defauleVal={state && state.country}
          type="text"
        />
        <CustomInput
          ref={phoneRef}
          defauleVal={state && state.phone}
          type="text"
        />
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

export default Account;
