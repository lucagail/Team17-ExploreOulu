import { initializeApp } from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyA6Cq4MvuI9xmzuyZB5KWm8jcvRFh5ue2I",
  authDomain: "team17-exploreoulu.firebaseapp.com",
  projectId: "team17-exploreoulu",
  storageBucket: "team17-exploreoulu.appspot.com",
  messagingSenderId: "749061149593",
  appId: "1:749061149593:web:bed0d1b5443ac15d0c3908",
  measurementId: "G-ED9C4YMQG0"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
export { auth };


export const FAVORITES_REF = "favorites";
export const USERS_REF = "users";
