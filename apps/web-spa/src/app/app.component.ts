import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TopBarComponent } from '@hackathon/shared';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterOutlet, TopBarComponent],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'web-spa';
}
