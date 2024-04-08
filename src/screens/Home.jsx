/* eslint-disable prettier/prettier */
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getHttp } from '../configs/axios.config';
import globalStyle from '../styles/globalStyle';
import DeviceInfo from '../components/DeviceInfo';
import { useDispatch } from 'react-redux';
import { userLogout } from '../redux/actions/actions';

const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: 'black',
  },
});

const Home = ({ user, navigation, route }) => {
  const [data, setData] = useState();
  const dispatch = useDispatch();

  /** permission */

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
        {/** device info */}
        <DeviceInfo />
        <Text style={globalStyle.text}>{data?.title}</Text>
        <TouchableOpacity
          style={{ marginVertical: 12 }}
          onPress={() => {
            dispatch(userLogout());
          }}
        >
          <Text style={{ fontSize: 13, color: 'black', fontWeight: 600 }}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;
