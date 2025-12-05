import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationItem } from '../../types';

@Component({
    selector: 'lib-notification-list',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './notification-list.component.html',
    styleUrls: ['./notification-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationListComponent {
    @Input() notifications: NotificationItem[] = [];
    @Output() toggleStatus = new EventEmitter<string>();
    @Output() remove = new EventEmitter<string>();
}
