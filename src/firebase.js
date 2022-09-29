import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

const firebaseConfig = {
  apiKey: "AIzaSyBJ3Fwbz6fJWgLWYtvY5-GxCwegIV58m0k",
  authDomain: "app-contato-25d4b.firebaseapp.com",
  projectId: "app-contato-25d4b",
  storageBucket: "app-contato-25d4b.appspot.com",
  messagingSenderId: "633825068634",
  appId: "1:633825068634:web:047fa18010f3da6b69ba63"
};

const fireDb = firebase.initializeApp(firebaseConfig);
export default fireDb.database().ref();