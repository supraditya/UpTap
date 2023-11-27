import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "../Secrets";

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);