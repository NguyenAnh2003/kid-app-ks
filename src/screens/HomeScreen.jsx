/* eslint-disable prettier/prettier */
import React from 'react';
import {Text, View} from 'react-native';

const HomeScreen = props => {
  const {user} = props;
  return (
    <View style={{backgroundColor: 'white', flex: 1, paddingHorizontal: 20, paddingVertical: 20}}>
      <Text style={{color: 'black'}}>Hello {user}</Text>
    </View>
  );
};

export default HomeScreen;
