import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { TopBarComponent } from '@hackathon/shared';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [CommonModule, IonApp, IonRouterOutlet, TopBarComponent],
})
export class AppComponent {
  constructor() { }
}
