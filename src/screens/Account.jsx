import React from 'react';
import { Button, Text, View } from 'react-native';
import globalStyle from '../styles/globalStyle';

const Account = ({ navigation }) => {

  /**
   * @field username
   * @field gmail
   * @field country
   * @field phone numer
   */

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
