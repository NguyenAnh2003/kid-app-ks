import { View, Text } from 'react-native';
import React from 'react';
import globalStyle from '../style/globalStyle';

const CreateSthScreen = () => {
  return (
    <View style={globalStyle.container}>
      <Text style={globalStyle.text}>Create Something</Text>
    </View>
  );
};

export default CreateSthScreen;
