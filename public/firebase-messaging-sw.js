importScripts("https://www.gstatic.com/firebasejs/10.11.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.11.0/firebase-messaging-compat.js");

const firebaseConfig = {
    apiKey: "AIzaSyAl263kr3apXXanmx-wKvAaxWFHx0lzjNs",
    authDomain: "memory-264fe.firebaseapp.com",
    projectId: "memory-264fe",
    storageBucket: "memory-264fe.appspot.com",
    messagingSenderId: "889358331826",
    appId: "1:889358331826:web:4de41ac41fba53ff2e7eab",
    measurementId: "G-HK9DWQCX90"
};

 //the Firebase config object 
 firebase.initializeApp(firebaseConfig);
 const messaging = firebase.messaging();


messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});

self.addEventListener('push', function(event) {
    const payload = event.data.json();
    console.log('Received a push event', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
    };
    event.waitUntil(self.registration.showNotification(notificationTitle, notificationOptions));
  });