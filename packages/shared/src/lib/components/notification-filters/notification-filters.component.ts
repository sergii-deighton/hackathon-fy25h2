import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationType } from '../../types';

@Component({
    selector: 'lib-notification-filters',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './notification-filters.component.html',
    styleUrls: ['./notification-filters.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationFiltersComponent {
    @Input() selected: 'all' | NotificationType = 'all';
    @Output() changeType = new EventEmitter<'all' | NotificationType>();
}
