// src/app/messaging.service.ts
import { Injectable } from '@angular/core';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { initializeApp } from 'firebase/app';
import { environment } from '../environment/environment';

@Injectable({ providedIn: 'root' })
export class MessagingService {
  private messaging = getMessaging(initializeApp(environment.firebase));

  requestPermission() {
    getToken(this.messaging, { vapidKey: 'BHbUCA0M90OJX1l9Wsd8OhGeSqfYBri8zFjdfwO4RyTcLY_LdPmM337xYCQ5cPvFuLypg5vec-bcrM6-UJZVXgU' })
      .then(token => {
        console.log('FCM Token:', token);
        // Send token to backend if needed
      })
      .catch(err => console.error('Unable to get permission', err));
  }

  listenForMessages() {
    onMessage(this.messaging, payload => {
      console.log('Foreground message:', payload);
    });
  }
}
