import { StyleSheet, TextInput } from 'react-native';
import React, { forwardRef, useImperativeHandle, useState } from 'react';

export type InputHandle = {
  getValue: () => string;
};

type InputProps = {
  placeHolder: string;
  type: string;
};

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
        style={styles}
        placeholder={placeHolder}
      />
    );
  }
);

export default CustomInput;

const styles = StyleSheet.create({
  color: 'black',
});
