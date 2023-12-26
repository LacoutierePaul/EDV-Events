import {Component, OnInit} from '@angular/core';
import {Event} from "../../app.component";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.component.html',
  styleUrls: ['./trainings.component.css']
})
export class TrainingsComponent implements OnInit{

  trainingsList: Event[] = [];

  constructor(private httpClient: HttpClient){}

  ngOnInit(): void {
    this.getTournaments();
  }

  getTournaments(){
    this.httpClient.get<Event[]>("/api/eventsByType/Training").subscribe({
      next: (res: Event[]) => {
        this.trainingsList = res;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
