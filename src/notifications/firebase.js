import { getMessaging, getToken } from "firebase/messaging";
import { initializeApp } from "firebase/app";
import { FCM_URLS } from "../utils/config";
import axios from "axios";

const firebaseConfig = {
  apiKey: "AIzaSyCyifgIjCeo5jHF1by1SuyYA2mM_rN-hiw",
  authDomain: "pushnotifications-fb14a.firebaseapp.com",
  projectId: "pushnotifications-fb14a",
  storageBucket: "pushnotifications-fb14a.appspot.com",
  messagingSenderId: "924046382081",
  appId: "1:924046382081:web:14dec6415ec0803d9e5c00",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

export const generateToken = async () => {
  const permission = await Notification.requestPermission();
  console.log(permission);

  if (permission === "granted") {
    const token = await getToken(messaging, {
      vapidKey:
        "BDhf6kliMK-ogdljqa8aAsTUHgExh8PxtCPmzGDAHjhI3vktN3_68PusccZ_YAZ_--TOL2ydd3ozB7-1eVHFDBs",
    });

    console.log(token);

    axios
      .post(FCM_URLS.FCM_TOKEN_CREATE_URL, {
        token,
      })
      .then((response) => {
        console.log("FCM Token send successfully");
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }
};
