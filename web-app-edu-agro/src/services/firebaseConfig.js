//Import do que preciso do firebase
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

//Configuração do firebase
const firebaseConfig = {
  apiKey: "AIzaSyB-ZtTJyRA5N82NpEoYkeKHPbkZhH29eW8",
  authDomain: "appeducation-agro.firebaseapp.com",
  projectId: "appeducation-agro",
  storageBucket: "appeducation-agro.appspot.com",
  messagingSenderId: "196759893596",
  appId: "1:196759893596:web:92e0d92f1d57c244db9899",
  measurementId: "G-8CKW7KCTGZ"
};

//Exportando o firebase
const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };