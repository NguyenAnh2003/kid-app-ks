/* eslint-disable prettier/prettier */
import React, { useRef, useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import CustomInput from '../components/CustomInput';

const HomeScreen = (props) => {
  const { user } = props;
  const [text, setText] = useState('');

  const submitHandler = () => {
    alert(text);
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
          setValue={setText}
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
