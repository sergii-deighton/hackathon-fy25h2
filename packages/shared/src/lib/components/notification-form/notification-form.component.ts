import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationType } from '../../types';

export interface NewNotificationPayload {
    title: string;
    body: string;
    type: NotificationType;
    source: string;
    link?: string;
}

@Component({
    selector: 'lib-notification-form',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './notification-form.component.html',
    styleUrls: ['./notification-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationFormComponent {
    @Input() defaultType: NotificationType = 'info';
    @Input() statusMessage = '';
    @Input() statusType: 'success' | 'error' | null = null;
    @Output() submitNotification = new EventEmitter<NewNotificationPayload>();

    title = '';
    body = '';
    type: NotificationType = this.defaultType;
    source = 'Demo';
    link = '';

    onSubmit(): void {
        if (!this.title.trim() || !this.body.trim()) {
            this.statusType = 'error';
            this.statusMessage = 'Please add a title and body.';
            return;
        }
        this.submitNotification.emit({
            title: this.title.trim(),
            body: this.body.trim(),
            type: this.type,
            source: this.source.trim() || 'Demo',
            link: this.link.trim() || undefined
        });
        this.title = '';
        this.body = '';
        this.link = '';
        this.type = this.defaultType;
    }
}
