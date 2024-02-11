import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB2f-ge7AgALbxFoSXMkKo7KQ3ZrTrkLcY",
  authDomain: "js21teamwork.firebaseapp.com",
  projectId: "js21teamwork",
  storageBucket: "js21teamwork.appspot.com",
  messagingSenderId: "208178116589",
  appId: "1:208178116589:web:bdba25027bae4632e019e4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };