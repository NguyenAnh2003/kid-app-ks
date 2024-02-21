import firebase from 'firebase/compat/app';
import firestore from '@react-native-firebase/firestore';

export const appFireStore = () => {
  /** fire store service defining collection */
  try {
    const dbRef = firestore().collection('rnative-collection-test');
    return dbRef;
  } catch (error) {
    throw new Error(error.message);
  }
};
