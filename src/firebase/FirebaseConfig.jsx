// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import { getAuth} from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDLXJ7jwu_8k4fkLbWrh-s-FySVa4muYtY",
  authDomain: "kanaksagar-traders.firebaseapp.com",
  projectId: "kanaksagar-traders",
  storageBucket: "kanaksagar-traders.appspot.com",
  messagingSenderId: "123871263980",
  appId: "1:123871263980:web:fd7ef62316233d201d79c9",
  measurementId: "G-VSERVS8PPB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { fireDB, auth, storage };