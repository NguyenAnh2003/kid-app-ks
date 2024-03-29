import React, { useEffect, useRef, useState } from 'react';
import { Button, StyleSheet, Image, Text, View, Pressable } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import globalStyle from '../styles/globalStyle';
import CustomInput, { InputHandle } from '../components/CustomInput';
import Entypo from 'react-native-vector-icons/Entypo';

const Account = ({ navigation }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  /**
   * @field avatar
   * @field username
   * @field gmail
   * @field country
   * @field phone numer
   */

  const { navigate } = navigation;

  /** state ; ref */
  const nameRef = useRef({ getValue: () => 'nguyen anh' });
  const gmailRef = useRef({ getValue: () => 'cunho@gmail.com' });
  const countryRef = useRef({ getValue: () => 'DN' });
  const phoneRef = useRef({ getValue: () => '0000' });

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

  useEffect(() => {
    return () => {
      setSelectedImage('');
    };
  }, []);

  useEffect(() => {
    console.log(selectedImage);
  }, [selectedImage]);

  return (
    <View style={[styles.profileContainer, globalStyle.container]}>
      {/** image view */}
      <View style={[styles.profile]}>
        <View style={[styles.avatar]}>
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
          defauleVal={nameRef.current.getValue()}
          type="text"
        />
        <CustomInput
          ref={gmailRef}
          defauleVal={gmailRef.current.getValue()}
          type="gmail"
        />
        <CustomInput
          ref={countryRef}
          defauleVal={countryRef.current.getValue()}
          type="text"
        />
        <CustomInput
          ref={phoneRef}
          defauleVal={phoneRef.current.getValue()}
          type="text"
        />
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
    marginVertical: 32,
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
    borderColor: "#333"
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
