import { StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react';

const CustomInput = (props) => {
  const { type, placeHolder, setValue } = props;
  return (
    <TextInput
      onChangeText={(value) => {
        setValue(value);
      }}
      type={type}
      placeholderTextColor={'black'}
      style={{ color: 'black' }}
      placeholder={placeHolder}
    />
  );
};

export default CustomInput;

const styles = StyleSheet.create({});
