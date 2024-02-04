/* eslint-disable prettier/prettier */
import React, { useRef, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import CustomInput from '../components/CustomInput';

const HomeScreen = (props) => {
  const { user } = props;
  const inputRef = useRef();

  const submitHandler = () => {
    alert(inputRef.current?.getValue());
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
        <CustomInput
          ref={inputRef}
          type={'name'}
          placeHolder={'Enter your name'}
        />
        <TouchableOpacity
          style={{ backgroundColor: 'black' }}
          onPress={submitHandler}
        >
          <Text>Click</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;
