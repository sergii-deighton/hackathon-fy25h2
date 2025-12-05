import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'lib-lang-switch',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './lang-switch.component.html',
    styleUrls: ['./lang-switch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LangSwitchComponent {
    @Input() languages: Array<'English' | 'French'> = ['English', 'French'];
    @Input() selectedLanguage: 'English' | 'French' = 'English';
    @Output() languageSelect = new EventEmitter<'English' | 'French'>();
}
