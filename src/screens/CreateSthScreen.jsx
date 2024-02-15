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
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomInput from '../components/CustomInput';

const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: 'black',
  },
  text: {
    color: 'white',
  },
});

const CreateSthScreen = () => {
  // input ref
  const ref = useRef(null);

  // submit handler function
  const submitHandler = () => {
    Alert.alert(ref.current.getValue());
  };

  return (
    <View style={globalStyle.container}>
      <Text style={globalStyle.text}>Create Something</Text>
      <CustomInput type="text" placeHolder="Enter something" ref={ref} />
      <TouchableOpacity style={styles.button} onPress={submitHandler}>
        <Text style={styles.text}>Click</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateSthScreen;
