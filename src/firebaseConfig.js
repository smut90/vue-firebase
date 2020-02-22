import firebase from 'firebase'
import 'firebase/firestore'

// firebase init goes here
const config = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: ""
};
firebase.initializeApp(config);

// firebase utils
const db = firebase.firestore();
const auth = firebase.auth();
const currentUser = auth.currentUser;

// date issue fix according to firebase

// firebase collections
const usersCollection = db.collection('users');

export {
    db,
    auth,
    currentUser,
    usersCollection
}
