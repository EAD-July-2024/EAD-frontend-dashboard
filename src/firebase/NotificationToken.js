// NotificationToken.js
import { useEffect, useState } from "react";
import { messaging } from "../firebaseConfig";
import { getToken } from "firebase/messaging";
import axios from "axios";
import { FCM_URLS } from "../utils/config";

const vapidKey =
  "BEMh1p1u6EXLsWXZwwHlW7fTujSPc5KGIsAGsVQmks2ognVsAEeXmIu2wB2ErctNnNl4yhigZmx0WXrUTSWXS4E";

const NotificationToken = () => {
  const [token, setToken] = useState("");

  // Request permission and get the token
  const requestPermission = async () => {
    try {
      const currentToken = await getToken(messaging, { vapidKey });
      if (currentToken) {
        console.log("FCM Token: ", currentToken);
        setToken(currentToken);
        // axios
        //   .post(FCM_URLS.FCM_TOKEN_CREATE_URL, {
        //     token: currentToken,
        //   })
        //   .then((response) => {
        //     console.log("Token saved successfully", response);
        //   })
        //   .catch((error) => {
        //     console.error("Error saving token", error);
        //   });
      } else {
        console.log(
          "No registration token available. Request permission to generate one."
        );
      }
    } catch (err) {
      console.error("An error occurred while retrieving token. ", err);
    }
  };

  useEffect(() => {
    requestPermission();
  }, []);

  return (
    <div>
      <h3>Your FCM Token</h3>
      <p>{token}</p> {/* Display token or store it */}
    </div>
  );
};

export default NotificationToken;
