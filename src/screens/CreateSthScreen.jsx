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

/** DEMO OFFLINE FEATURE: https://www.youtube.com/watch?v=Js0E_pEe71A&list=LL&index=1
 * guide: https://medium.com/differential/handling-offline-actions-in-react-native-74949cbfabf2#.b2sm29c4u
 */

const CreateSthScreen = () => {
  /** redux define */
  const itemData = useSelector((state) => state.itemReducers?.item);
  const dispatch = useDispatch();

  // input ref
  const ref = useRef(null);

  // submit handler function
  const submitHandler = async () => {
    try {
      /** dispatch to global state with redux */
      dispatch(addItem(JSON.stringify(ref.current?.getValue())));
    } catch (error) {
      Alert.alert(error);
    }
  };

  // get local data handler
  const getLocalDataHandler = async () => {
    try {
      console.log(itemData ? itemData : 'NOPE');
      const { name } = itemData;
      Alert.alert(JSON.parse(name));
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
