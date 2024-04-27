import React, { useEffect, useRef, useReducer, useState } from 'react';
import { StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import globalStyle from '../styles/globalStyle';
import CustomInput from '../components/CustomInput';
import Entypo from 'react-native-vector-icons/Entypo';
import { useDispatch, useSelector } from 'react-redux';
import { Form, TextValidator } from 'react-native-validator-form';
import { createChild } from '../libs/supabase/child.services';
import { supabase } from '../libs/supabase/supabase';
import { getImageUrl } from '../libs';
import SplashScreen from './SplashScreen';

const reducer = (state, action) => {
  switch (action.type) {
    case 'PROCESSING_ADDING':
      return { ...state, isFetching: true };
    case 'ADD_COMPLETE':
      return {
        // parentId: action.payload.parentId,
        // avatar: action.payload.avatarUrl,
        // username: action.payload.username,
        // gmail: action.payload.gmail,
        // country: action.payload.country,
        // phone: JSON.stringify(action.payload.phone),
        isFetching: false,
      };
    case 'UPLOAD_IMAGE':
      return { ...state, isFetching: true };
    case 'UPLOAD_IMAGE_SUCCESS':
      return { ...state, avatar: action.payload, isFetching: false };
    default:
      return state;
  }
};

const AddChild = ({ navigation }) => {
  /** current session */
  const currentUserSession = useSelector((state) => state.userReducers?.user);
  /** state & dispatch */
  const [state, dispatch] = useReducer(reducer, {
    isFetching: false,
    avatar:
      'https://scontent.fdad4-1.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeG9i1qn6l43gkgamWlIFfcBso2H55p0AlGyjYfnmnQCUWkluqxxNCGvGVG1PVYHXNR6aK5qtqLm_qilNbC_bMV0&_nc_ohc=cTJO8eTdhaEAb6zAot4&_nc_ht=scontent.fdad4-1.fna&oh=00_AfCRgXUDKFeVvmf0ySWAAXBsxuRyRoGjZzO5UJiRIJgbDQ&oe=66549EF8',
    username: '',
    gmail: '',
    country: '',
    phone: '',
  });

  /**
   * @field avatar
   * @field username
   * @field gmail
   * @field age
   * @field phone numer
   */

  const { navigate } = navigation;

  /** state ; ref */
  const nameRef = useRef();
  const phoneTypeRef = useRef();
  const ageRef = useRef();
  const phoneRef = useRef();

  const uploadImage = async (imageUri) => {
    dispatch({ type: 'UPLOAD_IMAGE' });
    try {
      const { data, error } = await supabase.storage
        .from('avatars')
        .upload(`public/${Date.now()}.jpg`, {
          uri: imageUri,
        });
      if (data) {
        const avatarUrl = getImageUrl(data.path);
        dispatch({ type: 'UPLOAD_IMAGE_SUCCESS', payload: avatarUrl });
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };
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
        uploadImage(imageUri);
      }
    });
  };

  const submitHandler = async () => {
    try {
      dispatch({ type: 'PROCESSING_ADDING' });
      const parentId = JSON.parse(currentUserSession.session).user.id;
      const kidname = nameRef.current.getValue();
      const age = parseInt(ageRef.current.getValue());
      const phone = parseInt(phoneRef.current.getValue());
      const phoneType = phoneTypeRef.current.getValue();
      const avatarUrl = state.avatar;
      const status = await createChild(
        parentId,
        kidname,
        age,
        phone,
        phoneType,
        avatarUrl
      );
      if (status === 201) {
        dispatch({ type: 'ADD_COMPLETE' });
        navigation.goBack();
      }
    } catch (error) {
      console.error('Error creating child:', error);
    }
  };

  return state.isFetching ? (
    <SplashScreen />
  ) : (
    <View style={[styles.profileContainer, globalStyle.container]}>
      {/** image view */}
      <View style={[styles.profile]}>
        <View style={[styles.avatar]}>
          {/** image uri read from user info fetch from service */}
          <Image
            style={styles.avatarImage}
            resizeMode="cover"
            // source={require('../assets/avatar.png')}
            source={{ uri: state.avatar }}
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
      </View>
      {/** from view */}
      <View style={styles.profileInformation}>
        <CustomInput
          ref={nameRef}
          type="text"
          placeHolder="Your child's name"
        />
        <CustomInput
          ref={phoneTypeRef}
          placeHolder="Enter phone type"
          type="text"
        />
        <CustomInput
          ref={phoneRef}
          type="phone"
          placeHolder="Your child's phone"
        />
        <CustomInput ref={ageRef} type="text" placeHolder="Your child's age" />
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
            Create
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
