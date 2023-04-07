import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAtj1V91RMc45nQ4MKlwbfyUyJMBCbYuBU",
  authDomain: "kiwibot-ab44d.firebaseapp.com",
  projectId: "kiwibot-ab44d",
  storageBucket: "kiwibot-ab44d.appspot.com",
  messagingSenderId: "529534129624",
  appId: "1:529534129624:web:e045a71b336a19383e0ead",
  measurementId: "G-HLV5KGN3EJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;

