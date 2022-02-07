import firebase from 'firebase/app';

// "Duplicate" imports are required by Firebase v8
/* eslint-disable import/no-duplicates */
import 'firebase/auth';
import 'firebase/functions';
import 'firebase/firestore';

const prodConfig = {
  apiKey: 'AIzaSyCMaA64Ofz8aT0cNbTeEzA9w5DUE9njcP4', // API Key from Firebase that is meant to be public
  authDomain: 'gitguardian-tech-interview.firebaseapp.com',
  projectId: 'gitguardian-tech-interview',
  storageBucket: 'gitguardian-tech-interview.appspot.com',
  messagingSenderId: '553966667081',
  appId: '1:553966667081:web:7d16be5ee7fa5ccdf40698',
};

const devConfig = {
  apiKey: 'AIzaSyCMaA64Ofz8aT0cNbTeEzA9w5DUE9njcP4', // API Key from Firebase that is meant to be public
  authDomain: 'gitguardian-tech-interview.firebaseapp.com',
  projectId: 'gitguardian-tech-interview',
  storageBucket: 'gitguardian-tech-interview.appspot.com',
  messagingSenderId: '553966667081',
  appId: '1:553966667081:web:7d16be5ee7fa5ccdf40698',
};

firebase.initializeApp(
  process.env.APP_ENV === 'development' ? devConfig : prodConfig,
);

export const FireAuth = firebase.auth();
export const FireFunctions = firebase.functions();
export const FireDb = firebase.firestore();

export { firebase };
