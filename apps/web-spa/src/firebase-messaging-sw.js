importScripts('https://www.gstatic.com/firebasejs/9.22.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.1/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyCDhWV8oC87gcyqeAbNhglMJyjHp9ZryfU",
    authDomain: "d8n-hackathon-team-b.firebaseapp.com",
    projectId: "d8n-hackathon-team-b",
    storageBucket: "d8n-hackathon-team-b.firebasestorage.app",
    messagingSenderId: "201061542746",
    appId: "1:201061542746:web:6e9a330a8a843b76362163"

});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(payload => {
    console.log('[firebase-messaging-sw.js] Received background message', payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: '/assets/icons/icon-72x72.png'
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
