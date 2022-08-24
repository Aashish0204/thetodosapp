import firebase from "firebase/compat/app"
import "firebase/compat/firestore"
import {getAuth , createUserWithEmailAndPassword, signInWithEmailAndPassword ,signOut ,onAuthStateChanged} from 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyBgEpIu6ORuqdOxJ9PyFwJLHzcELQ1Mhno",
    authDomain: "todosapp-a8a8c.firebaseapp.com",
    projectId: "todosapp-a8a8c",
    storageBucket: "todosapp-a8a8c.appspot.com",
    messagingSenderId: "256101202066",
    appId: "1:256101202066:web:3cb601bfee4a5586ae8e4b"
  };

  firebase.initializeApp(firebaseConfig)
  const db=firebase.firestore();
  const auth = getAuth();

  var uid=""
  onAuthStateChanged(auth, (user) => {
    if (user) {
      uid = user.uid;
      console.log(uid)
      return {uid}
    } else {
    }
  });
  export {uid}

  export{db};
  export function signUp(email,password){
    return createUserWithEmailAndPassword(auth,email,password);
}
  export function logIn(email,password){
    return signInWithEmailAndPassword(auth,email,password);
}
  export function logOut(){
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      console.log(error)
    });

}

