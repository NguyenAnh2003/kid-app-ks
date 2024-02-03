/* eslint-disable prettier/prettier */
import React, { useRef } from 'react';
import { Text, TextInput, View } from 'react-native';
import CustomInput from '../components/CustomInput';

const HomeScreen = (props) => {
  const { user } = props;
  const input = useRef(null);

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
        <CustomInput
          ref={input}
          type={'name'}
          placeHolder={'Enter your name'}
        />
      </View>
    </View>
  );
};

export default HomeScreen;
