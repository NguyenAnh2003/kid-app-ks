import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import globalStyle from '../styles/globalStyle';
import CustomInput, { InputHandle } from '../components/CustomInput';
import Entypo from 'react-native-vector-icons/Entypo';
import { useSelector } from 'react-redux';
import { updateUserData } from '../libs/supabase/parent.services';
import { supabase } from '../libs/supabase/supabase';
import SplashScreen from './SplashScreen';
import { getImageUrl } from '../libs';
import getCurrentuserInfo from '../libs/getCurrentUser';

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
    case 'UPLOAD_IMAGE':
      return { ...state, isFetching: true };
    case 'UPLOAD_IMAGE_SUCCESS':
      return { ...state, avatar: action.payload, isFetching: false };
    case 'PROCESSING_UPDATE_DATA':
      return { ...state, isFetching: true };
    case 'UPDATE_COMPLETED':
      return { ...state, isFetching: false };
    default:
      return state;
  }
};

const AccountScreen = ({ navigation }) => {
  /**
   * @field avatar
   * @field username
   * @field gmail
   * @field country
   * @field phone numer
   */

  const currentUserSession = useSelector((state) => state.userReducers?.user);
  const [refresh, setRefresh] = useState(false);
  const [state, dispatch] = useReducer(reducer, {
    isFetching: true,
    avatar: '',
    username: '',
    gmail: '',
    country: '',
    phone: '',
  });

  /** state ; ref */
  const nameRef = useRef();
  const gmailRef = useRef();
  const countryRef = useRef();
  const phoneRef = useRef();

  useEffect(() => {
    const fetchDataaa = async () => {
      const data = await getCurrentuserInfo(currentUserSession);
      if (data) dispatch({ type: 'USER_DATA', payload: data[0] });
    };

    fetchDataaa();
  }, [navigation]);

  const onRefresh = useCallback(() => {
    setRefresh(true);
    const fetchDataaa = async () => {
      const data = await getCurrentuserInfo(currentUserSession);
      if (data) dispatch({ type: 'USER_DATA', payload: data[0] });
    };

    fetchDataaa();
    setRefresh(false);
  }, []);

  const uploadImage = async (imageUri) => {
    try {
      dispatch({ type: 'UPLOAD_IMAGE' });
      const { data, error } = await supabase.storage
        .from('avatars')
        .upload(`public/${Date.now()}.jpg`, {
          uri: imageUri,
        });
      if (data) {
        const avatarUrl = getImageUrl(data.path);
        if (avatarUrl)
          dispatch({ type: 'UPLOAD_IMAGE_SUCCESS', payload: avatarUrl });
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

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
        uploadImage(imageUri);
      }
    });
  };

  const submitHandler = async () => {
    /**
     * @param userId
     * @param name
     * @param gmail
     * @param country
     * @param phone
     * @param avatarUrl
     */
    try {
      dispatch({ type: 'PROCESSING_UPDATE_DATA' });
      /** */
      const userId = JSON.parse(currentUserSession.session).user.id;
      /** name */
      const name = nameRef.current.getValue()
        ? nameRef.current.getValue()
        : state.username;
      /** gmail */
      const gmail = gmailRef.current.getValue()
        ? gmailRef.current.getValue()
        : state.gmail;
      /** country */
      const country = countryRef.current.getValue()
        ? countryRef.current.getValue()
        : state.country;
      /** phone */
      const phone = phoneRef.current.getValue()
        ? parseInt(phoneRef.current.getValue())
        : parseInt(state.phone);
      const avatar = state.avatar;
      /** update info */
      const status = await updateUserData(
        userId,
        name,
        avatar,
        gmail,
        country,
        phone
      );
      if (status === 204) dispatch({ type: 'UPDATE_COMPLETED' });
    } catch (error) {
      console.log('Error update user information:', error.message);
    }
  };

  return state.isFetching ? (
    <SplashScreen />
  ) : (
    <ScrollView
      contentContainerStyle={{ flex: 1 }}
      refreshControl={
        <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
      }
    >
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
                  uri: state.avatar,
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
          <Text style={[styles.accountName]}>{state.username}</Text>
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
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginLeft: 20,
    marginBottom: 75,
  },
  profileInformation: {
    flex: 1,
    flexDirection: 'column',
    gap: 10,
  },
});

export default AccountScreen;
