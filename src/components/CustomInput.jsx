import { TextInput } from 'react-native';
import React, { forwardRef } from 'react';

const CustomInput = forwardRef((props, ref) => {
  const { type, placeHolder } = props;
  return (
    <TextInput
      placeholderTextColor={'black'}
      placeholder={placeHolder}
      secureTextEntry={type === 'password' ? true : false}
      style={{ color: 'black' }}
      ref={ref}
    />
  );
});

export default CustomInput;
