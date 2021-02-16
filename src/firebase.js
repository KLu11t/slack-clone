import firebase from "firebase"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA4Hqqz952XnaGAPDVt8MgFOBC4NSZvsXg",
    authDomain: "slack-clone-c2f93.firebaseapp.com",
    databaseURL: "https://slack-clone-c2f93.firebaseio.com",
    projectId: "slack-clone-c2f93",
    storageBucket: "slack-clone-c2f93.appspot.com",
    messagingSenderId: "1039273565210",
    appId: "1:1039273565210:web:22b82af1fa2e25c92b45a3",
    measurementId: "G-Q1PTNH5HT8",
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { auth, provider};
  export default db;