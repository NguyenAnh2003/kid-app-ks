/* eslint-disable prettier/prettier */
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getHTTP } from '../apis/api.config';

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
  const [data, setData] = useState();

  useEffect(() => {
    const fetchDataaa = async () => {
      const { data, status } = await getHTTP(
        'https://jsonplaceholder.typicode.com/todos/1'
      );
      if (status === 200) setData(data);
    };
    fetchDataaa();
  }, []);

  const submitHandler = () => {
    // navigate('Account');
    alert(data.title);
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
