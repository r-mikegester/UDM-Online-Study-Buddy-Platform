
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA4BjiZgKaXTCHvK2gfnrWTwc0LWDHGD3o",
  authDomain: "udm-buddies.firebaseapp.com",
  projectId: "udm-buddies",
  storageBucket: "udm-buddies.firebasestorage.app",
  messagingSenderId: "522913231155",
  appId: "1:522913231155:web:eb47b4b0703613b41c4e46",
  measurementId: "G-WB9CR2N3S1"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
