import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "hoge",
  authDomain: "hoge",
  projectId: "hoge",
  storageBucket: "hoge",
  messagingSenderId: "hoge",
  appId: "hoge"
};

// Firebaseアプリの初期化
const app = initializeApp(firebaseConfig);

// Firebase Authenticationの初期化
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Firestoreの初期化
const db = getFirestore(app);

// Firebase Storageの初期化
const storage = getStorage(app);

export { auth, db, storage };