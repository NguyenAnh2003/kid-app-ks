import React, { useEffect, useRef, useReducer, useState } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { Form, TextValidator } from 'react-native-validator-form';
import { getCurrentUser } from '../libs/supabase/parent.services';
import { createChild } from '../libs/supabase/child.services';
import { supabase } from '../libs/supabase/supabase';

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

const AddChild = ({ navigation }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [mail, setMail] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneInvalid, setPhoneInvalid] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState('');
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
   * @field age
   * @field phone numer
   */

  const { navigate } = navigation;

  /** state ; ref */
  const nameRef = useRef();
  const gmailRef = useRef();
  const ageRef = useRef();
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

  const getImageUrl = (avaUrl) => {
    try {
      const { data } = supabase.storage.from('avatars').getPublicUrl(avaUrl);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const uploadImage = async (imageUri) => {
    let avaUrl = `public/${Date.now()}.jpg`;
    try {
      const { data, error } = await supabase.storage
        .from('avatars')
        .upload(avaUrl, {
          uri: imageUri,
        });
      if (data) {
        // avaUrl = getImageUrl(avaUrl);
        setAvatarUrl(getImageUrl(avaUrl).publicUrl);
      }
      console.log(data);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  useEffect(() => {
    console.log('Avatar url:', avatarUrl);
  }, [avatarUrl]);

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
        console.log('Image uri:', imageUri);
        uploadImage(imageUri);
      }
    });
  };

  const submitHandler = async () => {
    try {
      const parentId = JSON.parse(currentUserSession.session).user.id;
      const kidname = nameRef.current.getValue();
      const age = parseInt(ageRef.current.getValue());
      const phone = parseInt(phoneRef.current.getValue());
      console.log('Creating child:', parentId, kidname, age, phone, avatarUrl);
      const data = await createChild(parentId, kidname, age, phone, avatarUrl);
      console.log('Child created:', data);
    } catch (error) {
      console.error('Error creating child:', error);
    }
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
            // source={require('../assets/avatar.png')}
            source={{ uri: selectedImage ? selectedImage : state.avatar }}
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
        <Text style={[styles.accountName]}>Your child's name</Text>
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
        <CustomInput ref={ageRef} type="text" placeHolder="Enter your age" />
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
