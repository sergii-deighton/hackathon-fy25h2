import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavItem } from '../layout-frame/layout-frame.component';

@Component({
    selector: 'lib-nav-sidebar',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './nav-sidebar.component.html',
    styleUrls: ['./nav-sidebar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavSidebarComponent {
    @Input() navItems: NavItem[] = [];
    @Input() activeNav = '';
    @Output() navSelect = new EventEmitter<string>();
}
