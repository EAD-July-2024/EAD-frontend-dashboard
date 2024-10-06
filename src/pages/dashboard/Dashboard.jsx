import React from "react";
import { Button } from "react-bootstrap";
import { useEffect } from "react";
import { generateToken, messaging } from "../../notifications/firebase";
import { onMessage } from "firebase/messaging";

const Dashboard = () => {
  // useEffect(() => {
  //   generateToken();
  //   onMessage(messaging, (payload) => {
  //     console.log("Message received: ", payload);
  //   });
  // }, []);

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
