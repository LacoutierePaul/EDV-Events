import { Component } from '@angular/core';

export interface Event {
  eventId: number;
  eventType:string;
  eventTitle: string;
  eventLocation: string;
  eventDescription: string;
  eventDate: Date;
  eventLimit: number;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
}
