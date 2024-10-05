import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBgf-3G4kmLlR3Hvxsgok8DtKmSEjewsys",
  authDomain: "ead-e-commerce-ee253.firebaseapp.com",
  projectId: "ead-e-commerce-ee253",
  storageBucket: "ead-e-commerce-ee253.appspot.com",
  messagingSenderId: "863513370048",
  appId: "1:863513370048:web:dda120a7d6f169c1cd7c25",
  measurementId: "G-K4P5LBQDXF",
};

// Initialize Firebase app
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase Messaging
const messaging = getMessaging(firebaseApp);

// Register the service worker for push notifications
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/firebase-messaging-sw.js")
    .then((registration) => {
      console.log("Service Worker registered with scope:", registration.scope);
    })
    .catch((err) => {
      console.error("Service Worker registration failed:", err);
    });
}

export { messaging };
