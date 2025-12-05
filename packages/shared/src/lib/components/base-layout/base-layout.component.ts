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

    notifications = [
        { id: '1', sender: 'Alice', text: 'Welcome to the hackathon!', timestamp: '10:00', type: 'info' as const },
        { id: '2', sender: 'Bob', text: 'Deploy failed on mobile pipeline.', timestamp: '10:05', type: 'error' as const },
        { id: '3', sender: 'Ops', text: 'Latency increased on EU region.', timestamp: '12:44', type: 'warning' as const }
    ];

    messageText = '';
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
        if (!this.messageText.trim()) {
            this.status = { type: 'error', text: 'Please enter a notification.' };
            return;
        }
        // Placeholder success; replace with real API call later
        this.status = { type: 'success', text: 'Notification sent (stub).' };
        this.messageText = '';
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
}
