import firebase from "firebase/app";

import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyDY0kOWFaohrq6Gzu0jMZXgz0T0ZyobAkw",
  authDomain: "vutia-ke.firebaseapp.com",
  projectId: "vutia-ke",
  storageBucket: "vutia-ke.appspot.com",
  messagingSenderId: "733883423344",
  appId: "1:733883423344:web:ab1dcd001390b54b9ff2b5",
};

export default function initFirebase() {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    console.log("firebase initialized");
  }
}
