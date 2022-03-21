// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {} from 'firebase/storage';
import {} from 'firebase/firestore';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDF5tY4_ioXT8Je9UI1AQ470yMhO6jvUgU",
  authDomain: "social-rolls.firebaseapp.com",
  projectId: "social-rolls",
  storageBucket: "social-rolls.appspot.com",
  messagingSenderId: "994427997645",
  appId: "1:994427997645:web:882021cd095881030e8884"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectStorage, projectFirestore, timestamp };