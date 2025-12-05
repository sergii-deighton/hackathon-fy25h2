import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { NotificationItem } from '../../types';
import { NotificationsRepository } from '../../services/notifications.repository';
import { NotificationFiltersComponent } from '../notification-filters/notification-filters.component';
import { NotificationFormComponent, NewNotificationPayload } from '../notification-form/notification-form.component';
import { NotificationListComponent } from '../notification-list/notification-list.component';
import { NotificationStatsComponent } from '../notification-stats/notification-stats.component';

@Component({
    selector: 'lib-notifications-page',
    standalone: true,
    imports: [
        CommonModule,
        NotificationStatsComponent,
        NotificationFiltersComponent,
        NotificationListComponent,
        NotificationFormComponent
    ],
    templateUrl: './notifications-page.container.html',
    styleUrls: ['./notifications-page.container.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationsPageContainer implements OnInit, OnDestroy {
    @Input() view: 'dashboard' | 'notifications' | 'send' = 'notifications';

    category: 'all' | 'info' | 'warning' | 'error' = 'all';
    notifications: NotificationItem[] = [];
    filteredNotifications: NotificationItem[] = [];
    totalCount = 0;
    infoCount = 0;
    warningCount = 0;
    errorCount = 0;
    status: { type: 'success' | 'error' | null; text: string } = { type: null, text: '' };

    private destroy$ = new Subject<void>();

    constructor(private repo: NotificationsRepository) {}

    ngOnInit(): void {
        this.repo.load();

        this.repo.notifications$.pipe(takeUntil(this.destroy$)).subscribe((list) => {
            this.notifications = list;
        });

        this.repo.filteredNotifications$
            .pipe(takeUntil(this.destroy$))
            .subscribe((list) => (this.filteredNotifications = list));

        this.repo.totalCount$.pipe(takeUntil(this.destroy$)).subscribe((count) => (this.totalCount = count));
        this.repo.infoCount$.pipe(takeUntil(this.destroy$)).subscribe((count) => (this.infoCount = count));
        this.repo.warningCount$.pipe(takeUntil(this.destroy$)).subscribe((count) => (this.warningCount = count));
        this.repo.errorCount$.pipe(takeUntil(this.destroy$)).subscribe((count) => (this.errorCount = count));

        this.repo.category$.pipe(takeUntil(this.destroy$)).subscribe((cat) => (this.category = cat));
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    setView(view: 'dashboard' | 'notifications' | 'send'): void {
        this.view = view;
    }

    setCategory(category: 'all' | 'info' | 'warning' | 'error'): void {
        this.repo.setCategory(category);
    }

    handleSubmit(payload: NewNotificationPayload): void {
        this.repo.createNotification(payload);
        this.status = { type: 'success', text: 'Notification added locally.' };
    }

    toggleStatus(id: string): void {
        this.repo.toggleStatus(id);
    }

    removeNotification(id: string): void {
        this.repo.remove(id);
    }
}
