import { View, Text } from 'react-native';
import React from 'react';

const styles = {
  textTemp: {
    textAlign: 'center',
    color: 'black',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fdf6e2',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
};

const CreateSthScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.textTemp}>Create Something</Text>
    </View>
  );
};

export default CreateSthScreen;
