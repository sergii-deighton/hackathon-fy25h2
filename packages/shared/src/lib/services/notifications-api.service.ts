import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { NotificationItem } from '../types';

@Injectable({
    providedIn: 'root'
})
export class NotificationsApiService {
    fetchNotifications(): Observable<NotificationItem[]> {
        // Stubbed data; replace with real HTTP call later
        return of([
            {
                id: '1',
                sender: 'Alice',
                title: 'Welcome to the hackathon!',
                body: 'Kick off the demo by reviewing the notification architecture.',
                timestamp: '10:00',
                type: 'info',
                source: 'ReleaseService',
                status: 'read',
                link: '#'
            },
            {
                id: '2',
                sender: 'Bob',
                title: 'Deploy failed on mobile pipeline.',
                body: 'Action required: investigate the Android build logs.',
                timestamp: '10:05',
                type: 'error',
                source: 'CI/CD',
                status: 'unread'
            },
            {
                id: '3',
                sender: 'Ops',
                title: 'Latency increased on EU region.',
                body: 'EU users may see slower responses. Monitoring in progress.',
                timestamp: '12:44',
                type: 'warning',
                source: 'Ops',
                status: 'unread',
                link: '#'
            }
        ]);
    }
}
