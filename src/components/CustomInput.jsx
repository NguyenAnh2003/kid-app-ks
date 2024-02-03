import { TextInput } from 'react-native';
import React, { forwardRef } from 'react';

const CustomInput = forwardRef((props, inputRef) => {
  const { type, placeHolder } = props;
  return (
    <TextInput
      ref={inputRef}
      placeholderTextColor={'black'}
      placeholder={placeHolder}
      secureTextEntry={type === 'password' ? true : false}
      style={{ color: 'black' }}
    />
  );
});

export default CustomInput;
