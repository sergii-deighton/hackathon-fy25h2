import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { NotificationItem } from '../types';
import { NewNotificationPayload } from '../components/notification-form/notification-form.component';

@Injectable({
    providedIn: 'root'
})
export class NotificationsApiService {
    private readonly baseUrl = 'http://localhost:5001/api/notifications';
    // Opt-in demo fallback: set window.USE_MOCK_NOTIFICATIONS = true in the browser console
    private readonly useMockFallback =
        typeof window !== 'undefined' && Boolean((window as any)?.USE_MOCK_NOTIFICATIONS);

    constructor(private http: HttpClient) {}

    fetchNotifications(): Observable<NotificationItem[]> {
        return this.http.get<ApiNotification[]>(this.baseUrl).pipe(
            map((items: ApiNotification[]) => items.map(mapFromApi)),
            catchError((err) => {
                // Avoid silent mock data when the API is down so status changes persist.
                if (this.useMockFallback) {
                    console.warn('Using mock notifications because API call failed', err);
                    return of(this.mockData());
                }
                console.error('Failed to load notifications from API', err);
                return of([]);
            })
        );
    }

    createNotification(payload: NewNotificationPayload): Observable<NotificationItem> {
        const body: ApiNotificationCreate = {
            userId: undefined,
            type: payload.type,
            status: 'unread',
            source: payload.source || 'Demo',
            title: payload.title,
            body: payload.body,
            link: payload.link
        };
        return this.http.post<ApiNotification>(this.baseUrl, body).pipe(map(mapFromApi));
    }

    markRead(id: string): Observable<string> {
        return this.http.post<void>(`${this.baseUrl}/${id}/read`, {}).pipe(map(() => id));
    }

    delete(id: string): Observable<string> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(map(() => id));
    }

    private mockData(): NotificationItem[] {
        return [
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
        ];
    }
}

interface ApiNotification {
    id: string;
    userId?: string | null;
    type: 'info' | 'warning' | 'error';
    status: 'unread' | 'read';
    createdAt?: string;
    readAt?: string | null;
    source: string;
    title: string;
    body: string;
    link?: string | null;
}

interface ApiNotificationCreate {
    userId?: string | null;
    type: ApiNotification['type'];
    status: ApiNotification['status'];
    source: string;
    title: string;
    body: string;
    link?: string | null;
}

function mapFromApi(item: ApiNotification): NotificationItem {
    const created = item.createdAt ? new Date(item.createdAt) : new Date();
    const timestamp = `${created.getHours().toString().padStart(2, '0')}:${created
        .getMinutes()
        .toString()
        .padStart(2, '0')}`;

    const status: NotificationItem['status'] = item.status === 'read' ? 'read' : 'unread';

    return {
        id: item.id,
        sender: item.userId || 'System',
        title: item.title,
        body: item.body,
        timestamp,
        type: item.type,
        source: item.source,
        status,
        link: item.link ?? undefined
    };
}
