import firebase from 'firebase/app'; 
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyADLBZUEPKp58_8oZDRzbP9-owekmsswtY",
    authDomain: "test-89fb7.firebaseapp.com",
    projectId: "test-89fb7",
    storageBucket: "test-89fb7.appspot.com",
    messagingSenderId: "9684270574",
    appId: "1:9684270574:web:145a92cc404fcecab622ff",
    measurementId: "G-325QMY6RZM"
  };

const FireBaseApp =   firebase.initializeApp(firebaseConfig);

export default FireBaseApp; 