import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, { useRef } from 'react';
import globalStyle from '../styles/globalStyle';
import CustomInput from '../components/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../redux/actions/actions';
import firestore from '@react-native-firebase/firestore';

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
 * offline approaches: usage restrictions, caching, requests queues. https://www.bacancytechnology.com/blog/react-native-offline-support
 *
 */

const CreateSthScreen = () => {
  /** redux define */
  const itemData = useSelector((state) => state.itemReducers?.item);
  const dispatch = useDispatch();

  /** firebase firestore */
  const dbRef = firestore().collection('rnative-collection-test');

  // input ref
  const ref = useRef(null);

  // submit handler function
  const submitHandler = async () => {
    try {
      // firestore add
      const docRef = await dbRef
        .add({ name: ref.current?.getValue() })
        .then((res) => {
          return res;
        });
      if (docRef) {
        console.log('added item');
        /** dispatch to global state with redux */
        dispatch(addItem(JSON.stringify(ref.current?.getValue())));
      } else {
        Alert.alert('Problem exist cannot add');
      }
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
