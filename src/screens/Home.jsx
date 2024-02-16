/* eslint-disable prettier/prettier */
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getHttp } from '../libs/configs/api.config';
import globalStyle from '../styles/globalStyle';

const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: 'black',
  },
});

const Home = ({ user, navigation, route }) => {
  const [data, setData] = useState();

  useEffect(() => {
    /** exp caching data */
    const fetchDataaa = async () => {
      const { data, status } = await getHttp(
        'https://jsonplaceholder.typicode.com/todos/1'
      );
      if (status === 200) setData(data);
    };
    fetchDataaa();
  }, []);

  return (
    <View style={globalStyle.container}>
      <View>
        <Text style={globalStyle.h1}>Hello</Text>
        <Text style={globalStyle.text}>{data?.title}</Text>
        {/**<TouchableOpacity style={styles.button} onPress={submitHandler}>
          <Text>Click</Text>
        </TouchableOpacity>*/}
      </View>
    </View>
  );
};

export default Home;
