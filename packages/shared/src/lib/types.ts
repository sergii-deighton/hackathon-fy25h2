/**
 * Interfaces shared across web and mobile apps
 */
export interface User {
    id: string;
    name: string;
}

export interface AppState {
    isLoaded: boolean;
}

export type NotificationType = 'info' | 'warning' | 'error';

export interface NotificationItem {
    id: string;
    sender: string;
    title: string;
    body: string;
    timestamp: string;
    type: NotificationType;
    source: string;
    link?: string;
    status: 'unread' | 'read';
}
