import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'lib-base-layout',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './base-layout.component.html',
    styleUrls: ['./base-layout.component.scss']
})
export class BaseLayoutComponent {
    selected: 'dashboard' | 'notifications' | 'send' = 'dashboard';
    category: 'all' | 'info' | 'warning' | 'error' = 'all';
    isMenuOpen = true;
    isMobile = false;
    languages: Array<'English' | 'French'> = ['English', 'French'];
    selectedLanguage: 'English' | 'French' = 'English';

    notifications: Array<{
        id: string;
        sender: string;
        title: string;
        body: string;
        timestamp: string;
        type: 'info' | 'warning' | 'error';
        source: string;
        link?: string;
        status: 'unread' | 'read';
    }> = [
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

    newTitle = '';
    newBody = '';
    newType: 'info' | 'warning' | 'error' = 'info';
    newLink = '';
    newSource = 'Demo';
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

    select(section: 'dashboard' | 'notifications' | 'send'): void {
        this.selected = section;
        this.status = { type: null, text: '' };
        if (this.isMobile) {
            this.isMenuOpen = false;
        }
    }

    sendMessage(): void {
        if (!this.newTitle.trim() || !this.newBody.trim()) {
            this.status = { type: 'error', text: 'Please add a title and body.' };
            return;
        }
        const now = new Date();
        const timestamp = `${now.getHours().toString().padStart(2, '0')}:${now
            .getMinutes()
            .toString()
            .padStart(2, '0')}`;
        const next = {
            id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}`,
            sender: 'Demo User',
            title: this.newTitle.trim(),
            body: this.newBody.trim(),
            timestamp,
            type: this.newType,
            source: this.newSource || 'Demo',
            status: 'unread' as const,
            link: this.newLink?.trim() || undefined
        };
        this.notifications = [next, ...this.notifications];
        this.status = { type: 'success', text: 'Notification added locally.' };
        this.newTitle = '';
        this.newBody = '';
        this.newLink = '';
        this.newType = 'info';
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
