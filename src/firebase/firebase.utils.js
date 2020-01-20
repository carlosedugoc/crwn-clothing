import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAdMZq-juYU7iE9aioG5OfimOBPvY9dJvM",
    authDomain: "crwn-db-c8efa.firebaseapp.com",
    databaseURL: "https://crwn-db-c8efa.firebaseio.com",
    projectId: "crwn-db-c8efa",
    storageBucket: "crwn-db-c8efa.appspot.com",
    messagingSenderId: "1031692101891",
    appId: "1:1031692101891:web:77b51fa7b297f74448a136",
    measurementId: "G-V8YSBG116K"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
    debugger;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapshot = await userRef.get();
    if (!snapshot.exists) {
        const {displayName, email} = userAuth;
        const createAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error);
        }
    }
    return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;