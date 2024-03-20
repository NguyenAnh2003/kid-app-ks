import { View, Text, Button, Image } from 'react-native';
import React, { useRef, useState } from 'react';
import { Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import globalStyle from '../styles/globalStyle';
import CustomInput from '../components/CustomInput';

/**
 * must use currentUserId (parentId)
 * @package currentUserId, childAvatar(optional),
 * ChildName, childAge
 */
const CreateChildScreen = () => {
  /** ref */
  const nameRef = useRef();
  const ageRef = useRef();
  const [avatar, setAvatar] = useState(null);

  const avatarHandler = () => {
    /** options */
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    /** launchImage callback */
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setAvatar(imageUri);
      }
    });
  };

  /** handler */
  const submitHandler = async () => {
    Alert.alert(nameRef.current.getValue(), ageRef.current.getValue());
  };

  return (
    <View style={globalStyle.container}>
      {/** name */}
      <CustomInput type="text" placeHolder="Your child name" ref={nameRef} />
      {/** ageRef */}
      <CustomInput type="text" placeHolder="Your child age" ref={ageRef} />
      <Button title="Click me" onPress={submitHandler} />
      {/** avatar */}
      {avatar && (
        <Image
          source={{ uri: avatar }}
          style={{ flex: 1, width: 250, height: 250 }}
          resizeMode="cover"
        />
      )}
      <Button title="Choose photo" onPress={avatarHandler} />
    </View>
  );
};

export default CreateChildScreen;
