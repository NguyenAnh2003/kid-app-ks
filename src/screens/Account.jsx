import React from 'react';
import { Button, Text, View } from 'react-native';

const Account = ({ navigation }) => {
  const { navigate } = navigation;
  return (
    <View>
      <Text style={{ color: 'black' }}>Account screen</Text>
      <Button title={'Move to home'} onPress={() => navigate('Home')} />
    </View>
  );
};

export default Account;
