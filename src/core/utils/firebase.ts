import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCrKfBlgNcFlGXHwEhncrGwepOp5pUKcOo",
  authDomain: "browngpay.firebaseapp.com",
  databaseURL: "myproject-1234.firebaseapp.com'",
  projectId: "browngpay",
  storageBucket: "browngpay.appspot.com",
  messagingSenderId: "739297017105",
  appId: "1:739297017105:web:bd3de46e5745ac8a8ee0b0",
  measurementId: "G-7LKDPEG3F4",
};

const app = initializeApp(firebaseConfig);
export { app, firebaseConfig };
