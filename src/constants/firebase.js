import firebase from "firebase/app";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyAEISduCZQJgYppXigB8wjsQhYSj1HIKEE",
  authDomain: "sport-booking-1b140.firebaseio.com",
  databaseURL: "https://sport-booking-1b140.firebaseio.com",
  projectId: "sport-booking-1b140",
  storageBucket: "gs://sport-booking-1b140.appspot.com/",
  messagingSenderId: "763384219926",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//analytics is optional for this tutoral
const storage = firebase.storage();

export { storage, firebase as default };
