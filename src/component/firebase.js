import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAl263kr3apXXanmx-wKvAaxWFHx0lzjNs",
  authDomain: "memory-264fe.firebaseapp.com",
  projectId: "memory-264fe",
  storageBucket: "memory-264fe.appspot.com",
  messagingSenderId: "889358331826",
  appId: "1:889358331826:web:4de41ac41fba53ff2e7eab",
  measurementId: "G-HK9DWQCX90"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);
const analytics = getAnalytics(app);


export const requestPermission = () => {
  console.log("Requesting User Permission......");
  Notification.requestPermission().then((permission) => {

    if (permission === "granted") {

      console.log("Notification User Permission Granted."); 
      return getToken(messaging, { vapidKey: "BN4pXYEwRcpYlYbayOuan7SHqELFHafyilz19iIZCdXu4d87pwstR8Bc64FFP-EE3aZjOc44gxIoYNc1tCFBZGQ"})
        .then((currentToken) => {

          if (currentToken) {
            
            console.log(currentToken)
            console.log(currentToken)
          } else {
            console.log("no currentToken")
            console.log("no currentToken")
          }
        })
        .catch((err) => {
          console.log(err)
          console.log(err)
        });
    } else {
      console.log("ererewrew")
      console.log("ererewrew")
    }
  });

}

requestPermission();

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
});