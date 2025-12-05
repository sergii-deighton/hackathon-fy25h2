import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'lib-notification-stats',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './notification-stats.component.html',
    styleUrls: ['./notification-stats.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationStatsComponent {
    @Input() total = 0;
    @Input() info = 0;
    @Input() warning = 0;
    @Input() error = 0;
}
