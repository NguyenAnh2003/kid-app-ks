import { View, Text } from 'react-native';
import React from 'react';
import globalStyle from '../styles/globalStyle';

const SingleChildScreen = ({ route, navigation }) => {
  /** childId -> fetchDataByChildId */
  const { childId } = route.params;

  return (
    <View style={globalStyle.container}>
      <Text style={globalStyle.text}>{childId}</Text>
    </View>
  );
};

export default SingleChildScreen;
