import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseLayoutComponent } from '@hackathon/shared';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, BaseLayoutComponent],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'web-spa';
}
