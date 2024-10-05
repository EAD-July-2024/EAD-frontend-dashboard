// Import Firebase scripts
importScripts("https://www.gstatic.com/firebasejs/8.6.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.6.1/firebase-messaging.js");

// Initialize Firebase in the service worker
firebase.initializeApp({
  apiKey: "AIzaSyBgf-3G4kmLlR3Hvxsgok8DtKmSEjewsys",
  authDomain: "ead-e-commerce-ee253.firebaseapp.com",
  projectId: "ead-e-commerce-ee253",
  storageBucket: "ead-e-commerce-ee253.appspot.com",
  messagingSenderId: "863513370048",
  appId: "1:863513370048:web:dda120a7d6f169c1cd7c25",
  measurementId: "G-K4P5LBQDXF",
});

// Retrieve Firebase Messaging object
const messaging = firebase.messaging();

// Handle background notifications
messaging.onBackgroundMessage(function (payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );

  // Customize the notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/firebase-logo.png", // Ensure this path is correct
  };

  // Display the notification
  self.registration.showNotification(notificationTitle, notificationOptions);
});

// importScripts("https://www.gstatic.com/firebasejs/8.6.1/firebase-app.js");
// importScripts("https://www.gstatic.com/firebasejs/8.6.1/firebase-messaging.js");

// const firebaseConfig = {
//   apiKey: "AIzaSyBgf-3G4kmLlR3Hvxsgok8DtKmSEjewsys",
//   authDomain: "ead-e-commerce-ee253.firebaseapp.com",
//   projectId: "ead-e-commerce-ee253",
//   storageBucket: "ead-e-commerce-ee253.appspot.com",
//   messagingSenderId: "863513370048",
//   appId: "1:863513370048:web:dda120a7d6f169c1cd7c25",
//   measurementId: "G-K4P5LBQDXF",
// };

// const messaging = firebase.messaging();

// messaging.onBackgroundMessage(function (payload) {
//   console.log(
//     "[firebase-messaging-sw.js] Received background message ",
//     payload
//   );

//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//     icon: "/firebase-logo.png",
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });
