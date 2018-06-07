import * as firebase from 'firebase';
// import 'firebase/auth';
// import 'firebase/database'

const config = {
    apiKey: "AIzaSyDiMo5ql6hQ1RTa_07_j1gb4OOaGoi_m9k",
    authDomain: "campusrm-0.firebaseapp.com",
    databaseURL: "https://campusrm-0.firebaseio.com",
    projectId: "campusrm-0",
    storageBucket: "campusrm-0.appspot.com",
    messagingSenderId: "1038928756937"
};

firebase.initializeApp(config);

const db = firebase.database();
const auth = firebase.auth();

export {
  db,
  auth,
};





    


