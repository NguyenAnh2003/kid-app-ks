/* eslint-disable prettier/prettier */
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getHttp } from '../configs/axios.config';
import globalStyle from '../styles/globalStyle';
import DeviceInfo from '../components/DeviceInfo';
import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from '../redux/actions/actions';
import { getCurrentUser } from '../libs/supabase/parent.services';

const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: 'black',
  },
});

const HomeScreen = ({ user, navigation, route }) => {
  const [data, setData] = useState();
  const dispatch = useDispatch();

  const currentUserSession = useSelector((state) => state.userReducers?.user);

  /** permission */

  useEffect(() => {
    /** exp caching data */
    const fetchDataaa = async () => {
      const userData = JSON.parse(currentUserSession.session);
      console.log(userData.user.id);
      if (userData) {
        const { id } = userData.user;
        const user = await getCurrentUser(id);
        if (user) {
          console.log(user);
          setData(user);
        }
      }
    };
    fetchDataaa();

    /** config header */
    navigation.setOptions({
      headerTitle: () => <Text></Text>,
    });

    /** remove state */
    return () => {};
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

export default HomeScreen;
