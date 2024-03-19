import { View, Text, Button } from 'react-native';
import React, { useRef, useState } from 'react';
import { Alert } from 'react-native';
import globalStyle from '../styles/globalStyle';

/**
 * must use currentUserId (parentId)
 * @package currentUserId, childAvatar(optional),
 * ChildName, childAge
 */
const CreateChildScreen = () => {
  /** ref */
  const nameRef = useRef();
  const avatarRef = useRef();
  const ageRef = useRef();

  /** handler */
  const submitHandler = async () => {
    Alert.alert(
      nameRef.current.getValue(),
      avatarRef.current.getValue(),
      ageRef.current.getValue()
    );
  };

  return (
    <View>
      <Text style={globalStyle.text}>CreateChildScreen</Text>
      <Button title="haja" onPress={submitHandler} />
    </View>
  );
};

export default CreateChildScreen;
