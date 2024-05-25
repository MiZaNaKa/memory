import React, { useState, useEffect } from 'react';

import { requestPermission, onMessageListener } from './firebase';
import toast, { Toaster } from 'react-hot-toast';

const notify = () => toast('Here is your toast.');

export const sendPushNotification = async (token, title, body,) => {
  //console.log("token==>", token);
  
  const FIREBASE_API_KEY ="BN4pXYEwRcpYlYbayOuan7SHqELFHafyilz19iIZCdXu4d87pwstR8Bc64FFP"
  
  const message = {
    registration_ids: ['e1s8bDb9HrulW8CY5FIbdS:APA91bH6iRuthNY2PAwm3BJXFTXtuhXaxCij0EgOS77ykQwZPGkdZ13Vi0yYE6dD04FmhGbixR8HubSjLbSCJcFUfD8S5De-P5gwVkkpANNatanRwhEbd3KDCR54XRnCzsSmrjzl6z85'],
    notification: {
      title: "ksdfjsdjfsdfkdsjfjdsf",
      body: {"name":"khin"},
      vibrate: 1,
      sound: 1,
      show_in_foreground: true,
      priority: "high",
      content_available: true
    },
  };
  
  let headers = new Headers({
    "Content-Type": "application/json",
    Authorization: "key=" + FIREBASE_API_KEY
  });
  
  let response = await fetch("https://fcm.googleapis.com/fcm/send", {
    method: "POST",
    headers,
    body: JSON.stringify(message)
  });
  
  // console.log("=><*", response);
  response = await response.json();
  console.log(response)
  console.log(response)
  console.log(response)
//  console.log("=><*", response);
  };

function Notification() {
  const [notification, setNotification] = useState({ title: '', body: '' });
  useEffect(() => {
    // var hello =  requestPermission();
    // alert(hello)
    const unsubscribe = onMessageListener().then((payload) => {
      setNotification({
        title: payload?.notification?.title,
        body: payload?.notification?.body,
      });
      toast.success(`${payload?.notification?.title}: ${payload?.notification?.body}`, {
        duration: 60000, 
        position: 'top-right', 
      });
});
    return () => {
      unsubscribe.catch((err) => alert('failed: ', err));
    };
  }, []);

  useEffect(() => {
    const getDatas = async () => {
        const response = await sendPushNotification();
        console.log(response)
        console.log(response)
    }
    getDatas()
});
  return (
    <div>
      <button onClick={notify}>Make me a toast</button>
      <Toaster />
    </div>
  );
}
export default Notification;

// import React, { useState, useEffect } from 'react';
// import { Toaster, toast } from 'react-hot-toast';
// import { requestPermission, onMessageListener } from './firebase';
// const notify = () => toast('Here is your toast.');
// function Notification() {
//   const [notification, setNotification] = useState({ title: '', body: '' });
//   useEffect(() => {
//     requestPermission();
//     const unsubscribe = onMessageListener().then((payload) => {
//       console.log(payload)
//       console.log(payload)
//       console.log(payload)
//       setNotification({
//         title: payload?.notification?.title,
//         body: payload?.notification?.body,
//       });
//       toast.success(`${payload?.notification?.title}: ${payload?.notification?.body}`, {
//         duration: 60000, 
//         position: 'top-right',
//       });
// });
//     return () => {
//       console.log("error")
//       unsubscribe.catch((err) => console.log('failed: ', err));
//     };
//   }, []);
//   return (
//     <div>
//       <button onClick={notify}>Make me a toast</button>
//       <Toaster />
//     </div>
//   );
// }
// export default Notification;