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
import { useSelector } from 'react-redux';

/** reducer
 * @param username
 * @param gmail
 * @param country
 * @param phone
 */
const reducer = (state, action) => {
  switch (action.type) {
    case 'USER_DATA':
      /** return fetched data from api */
      return {
        avatar: action.payload.avatar,
        username: action.payload.username,
        gmail: action.payload.gmail,
        country: action.payload.country,
        phone: action.payload.phone,
        isFetching: false,
      };

    default:
      return state;
  }
};

const AccountScreen = ({ navigation }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [state, dispatch] = useReducer(reducer, {
    isFetching: true,
    avatar: '',
    username: '',
    gmail: '',
    country: '',
    phone: '',
  });

  const currentUser = useSelector((state) => state.userReducers?.user);

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

  useEffect(() => {
    /** fetch data from service */
    const fetchDataa = async () => {};

    /** function call */
    fetchDataa();

    /** remove state */
    return () => {
      setSelectedImage('');
    };
  }, [navigation]);

  setTimeout(() => {
    const data = {
      avatar:
        'https://scontent.fdad4-1.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeG9i1qn6l43gkgamWlIFfcBso2H55p0AlGyjYfnmnQCUWkluqxxNCGvGVG1PVYHXNR6aK5qtqLm_qilNbC_bMV0&_nc_ohc=RKGYlzhnRFYAb6v0RvL&_nc_ht=scontent.fdad4-1.fna&oh=00_AfDwBYskRsDG8Rp8j04chjwA73YA4ZgZT0maDJtZxZuyUA&oe=663B5A38',
      username: 'nguyen anh',
      gmail: 'cunho@gmail.com',
      country: 'DN',
      phone: '01234567',
    };
    dispatch({ type: 'USER_DATA', payload: data });
  }, 2000);

  const imageHandler = async () => {
    /** options */
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    /** launch lib */
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

  return (
    <View style={[styles.profileContainer, globalStyle.container]}>
      {/** image view */}
      <View style={[styles.profile]}>
        <View style={[styles.avatar]}>
          {/** image uri read from user info fetch from service */}
          {state && (
            <Image
              style={styles.avatarImage}
              resizeMode="cover"
              source={require('../assets/avatar.png')}
              /**  */
              // source={{
              //   uri: selectedImage ? selectedImage : state.avatar,
              // }}
            />
          )}
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

export default AccountScreen;
