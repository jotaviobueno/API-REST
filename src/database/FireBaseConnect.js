import firebase from "firebase";
import {envConfig} from "../config/envConfig.js";

try {
	firebase.initializeApp(envConfig.firebaseConfig);

	console.log("connected to Firebase");
  
} catch(e) {
	console.log(e);
}

export default firebase;