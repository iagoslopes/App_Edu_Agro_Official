// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB-ZtTJyRA5N82NpEoYkeKHPbkZhH29eW8",
  authDomain: "appeducation-agro.firebaseapp.com",
  projectId: "appeducation-agro",
  storageBucket: "appeducation-agro.appspot.com",
  messagingSenderId: "196759893596",
  appId: "1:196759893596:web:92e0d92f1d57c244db9899",
  measurementId: "G-8CKW7KCTGZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };