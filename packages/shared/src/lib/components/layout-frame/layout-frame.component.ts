import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { LangSwitchComponent } from '../lang-switch/lang-switch.component';
import { NavSidebarComponent } from '../nav-sidebar/nav-sidebar.component';

export interface NavItem {
    id: string;
    label: string;
    badge?: string | number;
    variant?: 'info' | 'success';
}

@Component({
    selector: 'lib-layout-frame',
    standalone: true,
    imports: [CommonModule, LangSwitchComponent, NavSidebarComponent],
    templateUrl: './layout-frame.component.html',
    styleUrls: ['./layout-frame.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutFrameComponent {
    @Input() navItems: NavItem[] = [];
    @Input() activeNav = '';
    @Input() languages: Array<'English' | 'French'> = ['English', 'French'];
    @Input() selectedLanguage: 'English' | 'French' = 'English';
    @Input() isMenuOpen = true;

    @Output() navSelect = new EventEmitter<string>();
    @Output() languageSelect = new EventEmitter<'English' | 'French'>();
    @Output() toggleMenu = new EventEmitter<void>();
}
