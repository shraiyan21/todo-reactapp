
  import { initializeApp } from "firebase/app";

  // // TODO: Add SDKs for Firebase products that you want to use
  // // https://firebase.google.com/docs/web/setup#available-libraries

  // // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCoBz7yz1BRFGIMeAR-0N--Jwv6Db1Zn7A",
    authDomain: "mytodo07.firebaseapp.com",
    projectId: "mytodo07",
    storageBucket: "mytodo07.appspot.com",
    messagingSenderId: "746533200432",
    appId: "1:746533200432:web:1d01bbd3b6134bdb09c3f5"
  };

  // Initialize Firebase
  //  firebase.initializeApp(firebaseConfig);
const firebase = initializeApp(firebaseConfig);

  export default firebase;