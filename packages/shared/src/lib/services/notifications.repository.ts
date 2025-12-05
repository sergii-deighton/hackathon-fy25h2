import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, tap } from 'rxjs';
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
        const current = this.notificationsSubject.getValue();

        this.api
            .fetchNotifications()
            .pipe(
                map((fetched) => this.mergeStatuses(current, fetched)),
                tap((data) => this.notificationsSubject.next(data))
            )
            .subscribe();
    }

    setCategory(category: 'all' | NotificationType): void {
        this.categorySubject.next(category);
    }

    createNotification(payload: NewNotificationPayload): void {
        this.api.createNotification(payload).subscribe((created) => {
            this.notificationsSubject.next([created, ...this.notificationsSubject.getValue()]);
        });
    }

    markRead(id: string): void {
        const current = this.notificationsSubject.getValue();
        const target = current.find((n) => n.id === id);

        if (!target || target.status === 'read') {
            return;
        }

        const optimistic = current.map((n) =>
            n.id === id ? { ...n, status: 'read' as const } : n
        );
        this.notificationsSubject.next(optimistic);

        this.api.markRead(id).subscribe({
            error: () => {
                // Roll back on API failure
                this.notificationsSubject.next(current);
            }
        });
    }

  remove(id: string): void {
    // Optimistically remove and roll back only on unexpected errors (keep hidden on 404)
    const current = this.notificationsSubject.getValue();
    const optimistic = current.filter((n) => n.id !== id);
    this.notificationsSubject.next(optimistic);

    this.api.delete(id).subscribe({
      next: () => {},
      error: (err) => {
        if (!err || err.status !== 404) {
          this.notificationsSubject.next(current);
        }
      }
    });
  }

    private countByType(list: NotificationItem[], type: NotificationType): number {
        return list.filter((n) => n.type === type).length;
    }

    private mergeStatuses(current: NotificationItem[], incoming: NotificationItem[]): NotificationItem[] {
        const currentMap = new Map(current.map((n) => [n.id, n]));

        return incoming.map((item) => {
            const existing = currentMap.get(item.id);
            if (existing?.status === 'read' && item.status !== 'read') {
                return { ...item, status: 'read' as const };
            }
            return item;
        });
    }
}
