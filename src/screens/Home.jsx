/* eslint-disable prettier/prettier */
import React, { useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fdf6e2',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  button: {
    padding: 10,
    backgroundColor: 'black',
  },
  text: {
    textAlign: 'center',
    color: 'black',
  },
});

const Home = ({ user, navigation, route }) => {
  const { navigate, goBack } = navigation; //
  const inputRef = useRef();

  const submitHandler = () => {
    navigate('Account');
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>Hello {user}</Text>
        <TouchableOpacity style={styles.button} onPress={submitHandler}>
          <Text>Click</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;
