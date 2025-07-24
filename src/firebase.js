import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDo46a8VjbReB8Ds11R-PLHvkC3tDcRqK8",
  authDomain: "stock-insight-hub.firebaseapp.com",
  projectId: "stock-insight-hub",
  storageBucket: "stock-insight-hub.firebasestorage.app",
  messagingSenderId: "79475548090",
  appId: "1:79475548090:web:611cf436c2de7137b28783",
  measurementId: "G-TDP9H8JXGX"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); 