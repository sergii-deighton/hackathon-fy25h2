import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'lib-top-bar',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './top-bar.component.html',
    styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent {
    @Input() title: string = 'Hackathon Starter';
}
