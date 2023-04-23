import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";



// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBPUazjuFvSPs4YXMtbgfdJCrPUqF6FoyI",
  authDomain: "soek-749c3.firebaseapp.com",
  projectId: "soek-749c3",
  storageBucket: "soek-749c3.appspot.com",
  messagingSenderId: "11652299709",
  appId: "1:11652299709:web:0238c43d56d6d2659f30d4",
  measurementId: "G-3MV4PHZCB9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth }