/* eslint-disable prettier/prettier */
import React, { useRef } from 'react';
import { Text, TextInput, View } from 'react-native';
import CustomInput from '../components/CustomInput';

const HomeScreen = (props) => {
  const { user } = props;
  const input = useRef(null);

  const inputProps = {
    type: 'name',
    placeHolder: 'Enter your name',
  };

  return (
    <View
      style={{
        backgroundColor: 'white',
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 20,
      }}
    >
      <View>
        <Text style={{ color: 'black' }}>Hello {user}</Text>
        <CustomInput ref={input} {...inputProps} />
      </View>
    </View>
  );
};

export default HomeScreen;
