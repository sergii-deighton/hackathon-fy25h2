import { Component } from '@angular/core';
import { IonApp, IonContent } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { BaseLayoutComponent } from '@hackathon/shared';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [CommonModule, IonApp, IonContent, BaseLayoutComponent],
})
export class AppComponent {
  constructor() { }
}
