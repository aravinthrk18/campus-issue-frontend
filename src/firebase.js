import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB3oBwI93g6dW2WOrepBOJwnpjFtE_uzi8",
  authDomain: "campus-issue-system.firebaseapp.com",
  projectId: "campus-issue-system",
  storageBucket: "campus-issue-system.appspot.com",
  messagingSenderId: "1087917173851",
  appId: "1:1087917173851:web:2e59dee31032eb7b06e37e",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
