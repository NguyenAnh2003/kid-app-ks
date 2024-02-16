import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDwcxHA9COSl9j5oIzmTNi4cbBonTisWKs',
  authDomain: 'your-auth-domain-b1234.firebaseapp.com',
  // databaseURL: 'https://your-database-name.firebaseio.com',
  projectId: 'rnative-app-61fd9',
  storageBucket: 'rnative-app-61fd9.appspot.com',
  appId: '1:876981519324:android:157ea6bcb2b45887dc4519',
  messagingSenderId: '876981519324',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
