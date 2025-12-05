import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { NotificationsApiService } from './notifications-api.service';
import { NotificationItem, NotificationType } from '../types';
import { NewNotificationPayload } from '../components/notification-form/notification-form.component';

@Injectable({
    providedIn: 'root'
})
export class NotificationsRepository {
    private notificationsSubject = new BehaviorSubject<NotificationItem[]>([]);
    readonly notifications$ = this.notificationsSubject.asObservable();

    private categorySubject = new BehaviorSubject<'all' | NotificationType>('all');
    readonly category$ = this.categorySubject.asObservable();

    readonly filteredNotifications$ = combineLatest([this.notifications$, this.category$]).pipe(
        map(([notifications, category]) =>
            category === 'all' ? notifications : notifications.filter((n) => n.type === category)
        )
    );

    readonly totalCount$ = this.notifications$.pipe(map((list) => list.length));
    readonly infoCount$ = this.notifications$.pipe(map((list) => this.countByType(list, 'info')));
    readonly warningCount$ = this.notifications$.pipe(map((list) => this.countByType(list, 'warning')));
    readonly errorCount$ = this.notifications$.pipe(map((list) => this.countByType(list, 'error')));

    constructor(private api: NotificationsApiService) {}

    load(): void {
        this.api.fetchNotifications().subscribe((data) => this.notificationsSubject.next(data));
    }

    setCategory(category: 'all' | NotificationType): void {
        this.categorySubject.next(category);
    }

    createNotification(payload: NewNotificationPayload): void {
        const now = new Date();
        const timestamp = `${now.getHours().toString().padStart(2, '0')}:${now
            .getMinutes()
            .toString()
            .padStart(2, '0')}`;
        const next: NotificationItem = {
            id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}`,
            sender: 'Demo User',
            title: payload.title,
            body: payload.body,
            timestamp,
            type: payload.type,
            source: payload.source || 'Demo',
            status: 'unread',
            link: payload.link
        };
        this.notificationsSubject.next([next, ...this.notificationsSubject.getValue()]);
    }

    toggleStatus(id: string): void {
        this.notificationsSubject.next(
            this.notificationsSubject.getValue().map((n) =>
                n.id === id ? { ...n, status: n.status === 'unread' ? 'read' : 'unread' } : n
            )
        );
    }

    remove(id: string): void {
        this.notificationsSubject.next(this.notificationsSubject.getValue().filter((n) => n.id !== id));
    }

    private countByType(list: NotificationItem[], type: NotificationType): number {
        return list.filter((n) => n.type === type).length;
    }
}
