import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, { useRef } from 'react';
import globalStyle from '../style/globalStyle';
import CustomInput from '../components/CustomInput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../redux/actions/actions';

const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: 'black',
    marginTop: 10,
  },
  localH1: {
    marginBottom: 20,
  },
  text: {
    color: 'white',
  },
});

const CreateSthScreen = () => {
  /** redux define */
  const { item } = useSelector((state) => state.appReducders);
  const dispatch = useDispatch();

  // input ref
  const ref = useRef(null);

  // submit handler function
  const submitHandler = async () => {
    try {
      /** AsyncStorage store only string so if the input is JSON format
       * it should be converted to string
       */
      // await AsyncStorage.setItem(
      //   'item',
      //   JSON.stringify(ref.current?.getValue())
      // );

      /** dispatch to global state with redux */
      dispatch(addItem(JSON.stringify(ref.current?.getValue())));
    } catch (error) {
      Alert.alert(error);
    }
  };

  // get local data handler
  const getLocalDataHandler = async () => {
    try {
      const data = JSON.parse(await AsyncStorage.getItem('item'));
      Alert.alert(JSON.parse(data));
    } catch (error) {
      Alert.alert(error);
    }
  };

  return (
    <View style={globalStyle.container}>
      <Text style={[globalStyle.h1, styles.localH1]}>Create Something</Text>
      <CustomInput type="text" placeHolder="Enter something" ref={ref} />
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <TouchableOpacity style={styles.button} onPress={submitHandler}>
          <Text style={styles.text}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={getLocalDataHandler}>
          <Text style={styles.text}>Get</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreateSthScreen;
