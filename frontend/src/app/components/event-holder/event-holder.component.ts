import {Component, Input} from '@angular/core';
import {Event} from "../../app.component";
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-event-holder',
  templateUrl: './event-holder.component.html',
  styleUrls: ['./event-holder.component.css']
})
export class EventHolderComponent {

  @Input({required: true})
  event: Event = {
    eventId: 0,
    eventType: "",
    eventTitle: "",
    eventLocation: "",
    eventDescription: "",
    eventDate: new Date(),
    eventLimit: 0
  }

  constructor(private httpClient: HttpClient){}



}
