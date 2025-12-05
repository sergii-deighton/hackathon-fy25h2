import { CommonModule } from '@angular/common';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { LayoutFrameComponent, NavItem } from '../layout-frame/layout-frame.component';
import { NotificationsRepository } from '../../services/notifications.repository';
import { Subject, takeUntil } from 'rxjs';
import { NotificationsPageContainer } from '../notifications-page/notifications-page.container';

@Component({
    selector: 'lib-base-layout',
    standalone: true,
    imports: [
        CommonModule,
        LayoutFrameComponent,
        NotificationsPageContainer
    ],
    templateUrl: './base-layout.component.html'
})
export class BaseLayoutComponent implements OnInit, OnDestroy {
    selected: 'dashboard' | 'notifications' | 'send' = 'notifications';
    isMenuOpen = true;
    isMobile = false;
    languages: Array<'English' | 'French'> = ['English', 'French'];
    selectedLanguage: 'English' | 'French' = 'English';
    navItems: NavItem[] = [
        { id: 'dashboard', label: 'Dashboard' },
        { id: 'notifications', label: 'Notifications', badge: 0, variant: 'info' },
        { id: 'send', label: 'Send a notification', badge: 'NEW', variant: 'success' }
    ];

    private destroy$ = new Subject<void>();

    constructor(private repo: NotificationsRepository) {
        this.syncMenuWithWidth(typeof window !== 'undefined' ? window.innerWidth : 1200);
    }

    ngOnInit(): void {
        this.repo.load();

        this.repo.totalCount$
            .pipe(takeUntil(this.destroy$))
            .subscribe((count) => {
                this.navItems = [
                    { id: 'dashboard', label: 'Dashboard' },
                    { id: 'notifications', label: 'Notifications', badge: count, variant: 'info' },
                    { id: 'send', label: 'Send a notification', badge: 'NEW', variant: 'success' }
                ];
            });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
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
        if (this.isMobile) {
            this.isMenuOpen = false;
        }
    }

    private syncMenuWithWidth(width: number): void {
        this.isMobile = width < 900;
        this.isMenuOpen = this.isMobile ? false : true;
    }

    setLanguage(lang: 'English' | 'French'): void {
        this.selectedLanguage = lang;
    }

}
