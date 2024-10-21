const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAkR7hGf6wg5Bwf3SfN3GBWANupSC6v1e0",
    authDomain: "innovaweb-login.firebaseapp.com",
    projectId: "innovaweb-login",
    storageBucket: "innovaweb-login.appspot.com",
    messagingSenderId: "199816425934",
    appId: "1:199816425934:web:b21a983bcf504cbccf7b9f",
    measurementId: "G-5E7T3624DK"

});

const auth = firebase.auth();

const signUp = () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  console.log(email, password);

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((result) => {
      document.write("You are signed up successfully");
      console.log(result);
    })
    .catch((error) => {
      console.log(error.code);
      console.log(error.message);
    });
};

const signIn = () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  console.log(email, password);

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((result) => {
      document.write("You are signed in successfully");
      console.log(result);
    })
    .catch((error) => {
      console.log(error.code);
      console.log(error.message);
    });
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);