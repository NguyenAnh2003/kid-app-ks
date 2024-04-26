import React, {
  useCallback,
  useEffect,
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
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from '../libs/supabase/parent.services';
import { updateUserData } from '../libs/supabase/parent.services';
import { supabase } from '../libs/supabase/supabase';
import SplashScreen from './SplashScreen';
import { getImageUrl } from '../libs';

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
  /**
   * @field avatar
   * @field username
   * @field gmail
   * @field country
   * @field phone numer
   */

  const currentUserSession = useSelector((state) => state.userReducers?.user);
  const [avatarUrl, setAvatarUrl] = useState('');
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
      const userData = JSON.parse(currentUserSession.session);
      if (userData) {
        const { id } = userData.user;
        const data = await getCurrentUser(id);
        if (data) {
          dispatch({ type: 'USER_DATA', payload: data[0] });
        }
      }
    };

    fetchDataaa();

    /** remove state */
    return () => {
      setAvatarUrl('');
    };
  }, [navigation]);

  const onRefresh = useCallback(() => {
    setRefresh(true);
    const fetchDataaa = async () => {
      const userData = JSON.parse(currentUserSession.session);
      if (userData) {
        const { id } = userData.user;
        const data = await getCurrentUser(id);
        if (data) {
          dispatch({ type: 'USER_DATA', payload: data[0] });
        }
      }
    };

    fetchDataaa();
    setRefresh(false);
  }, []);

  const uploadImage = async (imageUri) => {
    let avaUrl = `public/${Date.now()}.jpg`;
    try {
      const { data, error } = await supabase.storage
        .from('avatars')
        .upload(avaUrl, {
          uri: imageUri,
        });
      if (data) {
        const imageUrl = getImageUrl(data.path);
        setAvatarUrl(imageUrl);
      }
      console.log(data);
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
        console.log('Image uri:', imageUri);
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
      const avatar = avatarUrl ? avatarUrl : state.avaUrl;
      /** update info */
      const data = await updateUserData(
        userId,
        name,
        avatar,
        gmail,
        country,
        phone
      );
      if (data) console.log('User acount updated:', data);
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
                  uri: avatarUrl ? avatarUrl : state.avatar,
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
    </ScrollView>
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
