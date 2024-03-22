import { StyleSheet, TextInput } from 'react-native';
import React, { forwardRef, useImperativeHandle, useState } from 'react';

export type InputHandle = {
  getValue: () => string;
};

type InputProps = {
  placeHolder: string;
  type: string;
};

const styles = StyleSheet.create({
  input: {
    color: 'black',
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
  },
});

const CustomInput = forwardRef<InputHandle, InputProps>(
  ({ placeHolder, type }, ref) => {
    const [value, setValue] = useState('');

    useImperativeHandle(ref, () => ({
      getValue: () => value,
    }));

    return (
      <TextInput
        onChangeText={setValue}
        type={type}
        placeholderTextColor={'black'}
        secureTextEntry={type === 'password' ? true : false}
        style={styles.input}
        placeholder={placeHolder}
      />
    );
  }
);

export default CustomInput;
