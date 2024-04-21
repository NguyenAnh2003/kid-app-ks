import React, { useEffect, useReducer, useRef, useState } from 'react';
import { StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import globalStyle from '../styles/globalStyle';
import CustomInput, { InputHandle } from '../components/CustomInput';
import Entypo from 'react-native-vector-icons/Entypo';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from '../libs/supabase/parent.services';
import SplashScreen from './SplashScreen';

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
        avatar: action.payload.avatarUrl,
        username: action.payload.username,
        gmail: action.payload.gmail,
        country: action.payload.country,
        phone: JSON.stringify(action.payload.phone),
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

  const dispatchFetching = useDispatch();

  const currentUserSession = useSelector((state) => state.userReducers?.user);

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
    const fetchDataaa = async () => {
      const userData = JSON.parse(currentUserSession.session);
      if (userData) {
        const { id } = userData.user;
        const data = await getCurrentUser(id);
        if (data) {
          console.log(data[0]);
          dispatch({ type: 'USER_DATA', payload: data[0] });
        }
      }
    };

    fetchDataaa();

    /** remove state */
    return () => {
      setSelectedImage('');
    };
  }, [navigation]);

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
        ? parseInt(phoneRef.current.getValue())
        : parseInt(state.phone),
    });
  };

  return state.isFetching ? (
    <SplashScreen />
  ) : (
    <View style={[styles.profileContainer, globalStyle.container]}>
      {/** image view */}
      <View style={[styles.profile]}>
        <View style={[styles.avatar]}>
          {/** image uri read from user info fetch from service */}
          {state && (
            <Image
              style={styles.avatarImage}
              resizeMode="cover"
              /**  */
              source={{
                uri: selectedImage ? selectedImage : state.avatar,
              }}
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
