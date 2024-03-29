import { StyleSheet, TextInput } from 'react-native';
import React, { forwardRef, useImperativeHandle, useState } from 'react';

export type InputHandle = {
  getValue: () => string;
};

type InputProps = {
  placeHolder: string;
  type: string;
  defauleVal: string;
};

const styles = StyleSheet.create({
  input: {
    color: 'black',
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    fontSize: 16,
    paddingLeft: 15,
    backgroundColor: '#fffdfd',
  },
});

const CustomInput = forwardRef<InputHandle, InputProps>(
  ({ placeHolder, type, defauleVal }, ref) => {
    /** guide: https://www.youtube.com/watch?v=NT6FlJv8VoI */
    const [value, setValue] = useState('');

    useImperativeHandle(ref, () => ({
      getValue: () => value,
    }));

    return (
      <TextInput
        onChangeText={setValue}
        placeholderTextColor={'black'}
        secureTextEntry={type === 'password' ? true : false}
        type={type}
        defaultValue={defauleVal}
        style={styles.input}
        placeholder={placeHolder}
      />
    );
  }
);

export default CustomInput;
