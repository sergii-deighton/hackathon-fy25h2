import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseLayoutComponent } from '@hackathon/shared';
import { MessagingService } from './messaging.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, BaseLayoutComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private messagingService: MessagingService) {}
  title = 'web-spa';

  ngOnInit() {
    this.messagingService.requestPermission();
    this.messagingService.listenForMessages();
  }
}
