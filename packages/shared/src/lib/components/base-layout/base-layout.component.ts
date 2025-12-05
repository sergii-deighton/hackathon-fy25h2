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
    selected: 'dashboard' | 'messages' | 'send' = 'dashboard';
    isMenuOpen = true;
    isMobile = false;
    languages: Array<'English' | 'French'> = ['English', 'French'];
    selectedLanguage: 'English' | 'French' = 'English';

    messages = [
        { id: '1', sender: 'Alice', text: 'Welcome to the hackathon!', timestamp: '10:00' },
        { id: '2', sender: 'Bob', text: 'Chat features will appear here.', timestamp: '10:05' }
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

    select(section: 'dashboard' | 'messages' | 'send'): void {
        this.selected = section;
        this.status = { type: null, text: '' };
        if (this.isMobile) {
            this.isMenuOpen = false;
        }
    }

    sendMessage(): void {
        if (!this.messageText.trim()) {
            this.status = { type: 'error', text: 'Please enter a message.' };
            return;
        }
        // Placeholder success; replace with real API call later
        this.status = { type: 'success', text: 'Message sent (stub).' };
        this.messageText = '';
    }

    private syncMenuWithWidth(width: number): void {
        this.isMobile = width < 900;
        this.isMenuOpen = this.isMobile ? false : true;
    }

    setLanguage(lang: 'English' | 'French'): void {
        this.selectedLanguage = lang;
    }
}
