import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Event} from "../../app.component";

@Component({
  selector: 'app-other-events',
  templateUrl: './other-events.component.html',
  styleUrls: ['./other-events.component.css']
})
export class OtherEventsComponent implements OnInit{

  otherEventsList: Event[] = [];

  constructor(private httpClient: HttpClient){}

  ngOnInit(): void {
    this.getOtherEvents();
  }

  getOtherEvents(){
    this.httpClient.get<Event[]>("/api/eventsByType/Event").subscribe({
      next: (res: Event[]) => {
        this.otherEventsList = res;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

}
