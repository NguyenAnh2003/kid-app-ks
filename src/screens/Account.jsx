import React from 'react';
import { Button, Text, View } from 'react-native';
import globalStyle from '../style/globalStyle';

const Account = ({ navigation }) => {
  const { navigate } = navigation;
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fdf6e2',
      }}
    >
      <Text style={globalStyle.h1}>Account</Text>
      {/**<Button title={'Move to home'} onPress={() => navigate('Home')} /> */}
      {/**<Button title="Go back" onPress={() => navigation.goBack()} />*/}
    </View>
  );
};

export default Account;
