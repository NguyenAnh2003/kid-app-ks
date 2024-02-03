/* eslint-disable prettier/prettier */
import React from 'react';
import {Text} from 'react-native';

const HomeScreen = props => {
  const {user} = props;
  return <Text>Hello {user}</Text>;
};

export default HomeScreen;
