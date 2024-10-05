import React from "react";
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { messaging } from "../../firebaseConfig";
import { getToken } from "firebase/messaging";

const Dashboard = () => {
  const requestPermission = async () => {
    try {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        const token = await getToken(messaging, {
          vapidKey:
            "BOE2-gcCwJqJfGKXQWz4w1M5VRYZOmfwVTCafW6iUdijIH3StVug0Q6FJOC_VdSfO118CBwyoVkfKNoz-bjnWRc",
        });
        console.log("FCM Token:", token);
      } else {
        console.log("Notification permission denied");
      }
    } catch (error) {
      console.error("An error occurred while retrieving token. ", error);
    }
  };

  useEffect(() => {
    requestPermission();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard!</p>
      <Button>Allow Notifications</Button>
      <br />
    </div>
  );
};

export default Dashboard;
