//this imported fromfirebase website
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCYpVxBrBXlJ1AcYMx3aGfVRRw_8Ba62T0",
  authDomain: "react-netflix-clone-9f4c9.firebaseapp.com",
  projectId: "react-netflix-clone-9f4c9",
  storageBucket: "react-netflix-clone-9f4c9.appspot.com",
  messagingSenderId: "754860363787",
  appId: "1:754860363787:web:77a7c31124fa72ab05370e",
  measurementId: "G-W5W247N53N"
};

// Initialize Firebase application
const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);//firebaseAuth will point to our netflix clone applicaton