import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NotificationFiltersComponent } from '../notification-filters/notification-filters.component';
import { NotificationFormComponent, NewNotificationPayload } from '../notification-form/notification-form.component';
import { NotificationListComponent } from '../notification-list/notification-list.component';
import { NotificationStatsComponent } from '../notification-stats/notification-stats.component';
import { LayoutFrameComponent, NavItem } from '../layout-frame/layout-frame.component';
import { NotificationItem } from '../../types';

@Component({
    selector: 'lib-base-layout',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        LayoutFrameComponent,
        NotificationStatsComponent,
        NotificationFiltersComponent,
        NotificationListComponent,
        NotificationFormComponent
    ],
    templateUrl: './base-layout.component.html'
})
export class BaseLayoutComponent {
    selected: 'dashboard' | 'notifications' | 'send' = 'dashboard';
    category: 'all' | 'info' | 'warning' | 'error' = 'all';
    isMenuOpen = true;
    isMobile = false;
    languages: Array<'English' | 'French'> = ['English', 'French'];
    selectedLanguage: 'English' | 'French' = 'English';
    navItems: NavItem[] = [
        { id: 'dashboard', label: 'Dashboard' },
        { id: 'notifications', label: 'Notifications', badge: 0, variant: 'info' },
        { id: 'send', label: 'Send a notification', badge: 'NEW', variant: 'success' }
    ];

    notifications: NotificationItem[] = [
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

    status: { type: 'success' | 'error' | null; text: string } = { type: null, text: '' };

    constructor() {
        this.syncMenuWithWidth(typeof window !== 'undefined' ? window.innerWidth : 1200);
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: any): void {
        this.syncMenuWithWidth(event.target.innerWidth);
    }

    toggleMenu(): void {
        this.isMenuOpen = !this.isMenuOpen;
    }

    onNavSelect(navId: string): void {
        const allowed: Array<'dashboard' | 'notifications' | 'send'> = ['dashboard', 'notifications', 'send'];
        if (allowed.includes(navId as any)) {
            this.select(navId as 'dashboard' | 'notifications' | 'send');
        }
    }

    select(section: 'dashboard' | 'notifications' | 'send'): void {
        this.selected = section;
        this.status = { type: null, text: '' };
        if (this.isMobile) {
            this.isMenuOpen = false;
        }
    }

    handleSubmit(payload: NewNotificationPayload): void {
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
        this.notifications = [next, ...this.notifications];
        this.status = { type: 'success', text: 'Notification added locally.' };
    }

    private syncMenuWithWidth(width: number): void {
        this.isMobile = width < 900;
        this.isMenuOpen = this.isMobile ? false : true;
    }

    setLanguage(lang: 'English' | 'French'): void {
        this.selectedLanguage = lang;
    }

    setCategory(category: 'all' | 'info' | 'warning' | 'error'): void {
        this.category = category;
    }

    get filteredNotifications(): typeof this.notifications {
        if (this.category === 'all') {
            return this.notifications;
        }
        return this.notifications.filter((n) => n.type === this.category);
    }

    get totalCount(): number {
        return this.notifications.length;
    }

    get infoCount(): number {
        return this.countByType('info');
    }

    get warningCount(): number {
        return this.countByType('warning');
    }

    get errorCount(): number {
        return this.countByType('error');
    }

    private countByType(type: 'info' | 'warning' | 'error'): number {
        return this.notifications.filter((n) => n.type === type).length;
    }

    toggleStatus(id: string): void {
        this.notifications = this.notifications.map((n) =>
            n.id === id ? { ...n, status: n.status === 'unread' ? 'read' : 'unread' } : n
        );
    }

    removeNotification(id: string): void {
        this.notifications = this.notifications.filter((n) => n.id !== id);
    }
}
