/* eslint-disable prettier/prettier */
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getHttp } from '../configs/axios.config';
import globalStyle from '../styles/globalStyle';
import DeviceInfo from '../components/DeviceInfo';
import { PermissionsAndroid } from 'react-native';
import { Session } from '@supabase/supabase-js'
import { Button } from 'react-native-elements';
import { supabase } from '../libs/supabase'

const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: 'black',
  },
});

const Home = ({ session }: { session: Session }) => {
  const [data, setData] = useState();
  async function signOut() {
    const { error } = await supabase.auth.signOut()
  }
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
        <Button onPress={() => signOut()}>Logout</Button>
      </View>
    </View>
  );
};

export default Home;
